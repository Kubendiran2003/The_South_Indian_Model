import { Resend } from 'resend';

// Initialise Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, mobile, company, requestType, budget, preferredDate, message } = req.body;

    // Basic validation
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full Name and Email are required.' });
    }

    // Determine destination email (from environment variable or fallback)
    const toEmail = process.env.TO_EMAIL || 'sivaprabavathi07@gmail.com';

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Model Portfolio <onboarding@resend.dev>',
      to: [toEmail],
      subject: `✨ New Booking Inquiry: ${requestType} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fcfcfb;">
          <h2 style="color: #6D071A; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-top: 0;">New Booking Inquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #540513;">Client Name:</td>
              <td style="padding: 8px 0; color: #333;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Email Address:</td>
              <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #6D071A; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Phone / Mobile:</td>
              <td style="padding: 8px 0; color: #333;">${mobile || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Company:</td>
              <td style="padding: 8px 0; color: #333;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Inquiry Type:</td>
              <td style="padding: 8px 0; color: #333;"><span style="background-color: #efefe8; padding: 4px 8px; border-radius: 4px; font-size: 14px; font-weight: 500;">${requestType}</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Budget Range:</td>
              <td style="padding: 8px 0; color: #333;">${budget || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #540513;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #333;">${preferredDate || 'Not provided'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #deded0;">
            <p style="font-weight: bold; color: #540513; margin-bottom: 5px;">Message / Details:</p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #D4AF37; border-radius: 4px; color: #444; line-height: 1.6; white-space: pre-wrap;">${message || 'No additional details provided.'}</div>
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; text-align: center; color: #8d8d71; border-top: 1px solid #eee; padding-top: 15px;">
            This email was sent automatically from your Model Portfolio Website Booking Form.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error: error.message || 'Failed to send email via Resend' });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server-side Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error occurred' });
  }
}
