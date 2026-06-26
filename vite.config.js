import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env variables to process.env so our local API handler can access RESEND_API_KEY
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/send-email' && req.method === 'POST') {
              try {
                // Parse request body
                let body = '';
                await new Promise((resolve) => {
                  req.on('data', chunk => { body += chunk; });
                  req.on('end', resolve);
                });
                
                const parsedBody = JSON.parse(body);
                
                // Import the serverless function handler dynamically
                const { default: handler } = await server.ssrLoadModule('./api/send-email.js');
                
                // Mock Vercel response object
                const resMock = {
                  status(code) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  }
                };
                
                // Mock Vercel request object
                const reqMock = {
                  method: 'POST',
                  body: parsedBody
                };
                
                await handler(reqMock, resMock);
              } catch (err) {
                console.error('Vite API Middleware Error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
              }
            } else {
              next();
            }
          });
        }
      }
    ]
  }
})
