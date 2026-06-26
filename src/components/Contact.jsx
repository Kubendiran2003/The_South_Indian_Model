import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import siteConfig from '../data/siteConfig';

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const contactItems = [
    {
      icon: FiPhone,
      label: "Mobile",
      value: siteConfig.contact.mobile,
      href: `tel:${siteConfig.contact.mobile}`,
      buttonText: "Call Now",
      buttonClass: "btn-primary"
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp,
      href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`,
      buttonText: "Message on WhatsApp",
      buttonClass: "btn-gold"
    },
    {
      icon: FiMail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      buttonText: "Send Email",
      buttonClass: "btn-secondary"
    }
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      label: "Instagram",
      href: siteConfig.contact.instagram,
      color: "hover:bg-pink-600"
    },
    {
      icon: FaYoutube,
      label: "YouTube",
      href: siteConfig.contact.youtube,
      color: "hover:bg-red-600"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Contact</span>
          <h2 className="heading-section mt-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 text-center hover-lift"
            >
              <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                <item.icon className="text-gold-500 text-2xl" />
              </div>
              <p className="text-sm text-gold-500 uppercase tracking-wider mb-2">{item.label}</p>
              <p className="font-display text-lg text-maroon-600 mb-6 break-all">{item.value}</p>
              <a
                href={item.href}
                target={item.href.startsWith('https') ? '_blank' : undefined}
                rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                className={`${item.buttonClass} inline-block text-sm`}
              >
                {item.buttonText}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-maroon-500 mb-4">Follow on Social Media</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-full bg-maroon-600 ${social.color} text-white flex items-center justify-center transition-colors duration-300`}
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Big CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="glass-card-dark px-6 py-10 md:p-12 text-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 border border-gold-400/20 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-gold-400/20 rounded-full" />

            <div className="relative z-10">
              <FiMessageCircle className="text-gold-400 text-4xl mx-auto mb-6" />
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                Let's Create Something Beautiful Together
              </h3>
              <p className="text-ivory-200 max-w-2xl mx-auto mb-8">
                Whether you're planning a bridal shoot, jewelry promotion, or brand collaboration, I'd love to hear your vision and bring it to life.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('booking');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-gold"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
