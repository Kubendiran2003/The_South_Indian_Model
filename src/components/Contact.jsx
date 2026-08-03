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
      buttonClass: "btn-secondary",
      iconColor: "text-gold-500",
      bgColor: "bg-gold-400/10"
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: siteConfig.contact.whatsapp,
      href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`,
      buttonText: "Message on WhatsApp",
      buttonClass: "btn-secondary",
      iconColor: "text-gold-500",
      bgColor: "bg-gold-400/10"
    },
    {
      icon: FiMail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      buttonText: "Send Email",
      buttonClass: "btn-secondary",
      iconColor: "text-gold-500",
      bgColor: "bg-gold-400/10"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      value: siteConfig.contact.instagramHandle,
      href: siteConfig.contact.instagram,
      buttonText: "Follow on Instagram",
      buttonClass: "btn-secondary",
      iconColor: "text-gold-500",
      bgColor: "bg-gold-400/10"
    }
  ];
  
  return (
    <section id="contact" className="section-padding bg-ivory-100">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover-lift flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-transparent`}>
                  <item.icon className={`${item.iconColor} text-xl`} />
                </div>
                <p className="text-xs text-gold-500 uppercase tracking-wider mb-1.5">{item.label}</p>
                <p className="font-display text-base text-maroon-600 mb-5 break-all">{item.value}</p>
              </div>
              <a
                href={item.href}
                target={item.href.startsWith('https') ? '_blank' : undefined}
                rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                className={`${item.buttonClass} inline-block text-xs py-2.5 px-4 w-full`}
              >
                {item.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
