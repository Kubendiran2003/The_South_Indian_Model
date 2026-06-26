import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';

const requestTypes = [
  'Bridal Shoot',
  'Saree Shoot',
  'Jewelry Promotion',
  'Brand Collaboration',
  'Sponsorship',
  'Event Appearance',
  'Influencer Campaign',
  'General Inquiry',
  'Other'
];

const BookingForm = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    requestType: '',
    budget: '',
    preferredDate: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Spotlight references and coordinates
  const formRef = useRef(null);
  const info1Ref = useRef(null);
  const info2Ref = useRef(null);

  const [formMouse, setFormMouse] = useState({ x: 0, y: 0 });
  const [formHover, setFormHover] = useState(false);
  const [info1Mouse, setInfo1Mouse] = useState({ x: 0, y: 0 });
  const [info1Hover, setInfo1Hover] = useState(false);
  const [info2Mouse, setInfo2Mouse] = useState({ x: 0, y: 0 });
  const [info2Hover, setInfo2Hover] = useState(false);

  const handleMouseMove = (e, ref, setMouse) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you. Your request has been successfully submitted. We will contact you shortly.'
        });
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          company: '',
          requestType: '',
          budget: '',
          preferredDate: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to submit request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "input-field";
  const selectClasses = "select-field";
  const labelClasses = "block text-sm font-semibold text-maroon-600 mb-2";

  return (
    <section id="booking" className="section-padding bg-ivory-100 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div ref={sectionRef} className="container-padding max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-label">Booking & Collaboration</span>
          <h2 className="heading-section mt-4">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-body max-w-2xl mx-auto mt-6">
            Submit your inquiry for bridal shoots, brand collaborations, sponsorships, or any modeling opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form 
              ref={formRef}
              onMouseMove={(e) => handleMouseMove(e, formRef, setFormMouse)}
              onMouseEnter={() => setFormHover(true)}
              onMouseLeave={() => setFormHover(false)}
              onSubmit={handleSubmit} 
              className="glass-card p-8 md:p-10 space-y-6 relative overflow-hidden border border-white/20 shadow-luxury"
            >
              {/* Spotlight Glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                style={{
                  opacity: formHover ? 1 : 0,
                  background: `radial-gradient(250px circle at ${formMouse.x}px ${formMouse.y}px, rgba(212, 175, 55, 0.15), transparent 80%)`,
                }}
              />

              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6 relative z-20">
                <div>
                  <label className={labelClasses}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Mobile & Company */}
              <div className="grid md:grid-cols-2 gap-6 relative z-20">
                <div>
                  <label className={labelClasses}>Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Company / Brand Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Optional"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Request Type & Budget */}
              <div className="grid md:grid-cols-2 gap-6 relative z-20">
                <div>
                  <label className={labelClasses}>Request Type *</label>
                  <select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    required
                    className={selectClasses}
                  >
                    <option value="">Select request type</option>
                    {requestTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select budget range</option>
                    <option value="Under INR 50,000">Under INR 50,000</option>
                    <option value="INR 50,000 - 1,00,000">INR 50,000 - 1,00,000</option>
                    <option value="INR 1,00,000 - 2,00,000">INR 1,00,000 - 2,00,000</option>
                    <option value="INR 2,00,000 - 5,00,000">INR 2,00,000 - 5,00,000</option>
                    <option value="Above INR 5,00,000">Above INR 5,00,000</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div className="relative z-20">
                <label className={labelClasses}>Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Message */}
              <div className="relative z-20">
                <label className={labelClasses}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project, requirements, and expectations..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary flex items-center justify-center gap-3 relative z-20 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Inquiry
                  </>
                )}
              </button>

              {/* Status Messages */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg flex items-start gap-3 relative z-20 ${
                      status.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <FiCheck className="text-green-600 mt-0.5" />
                    ) : (
                      <FiAlertCircle className="text-red-600 mt-0.5" />
                    )}
                    <span className="text-sm font-semibold">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div 
              ref={info1Ref}
              onMouseMove={(e) => handleMouseMove(e, info1Ref, setInfo1Mouse)}
              onMouseEnter={() => setInfo1Hover(true)}
              onMouseLeave={() => setInfo1Hover(false)}
              className="glass-card-dark p-8 relative overflow-hidden border border-gold-400/20 shadow-luxury"
            >
              {/* Spotlight glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                style={{
                  opacity: info1Hover ? 1 : 0,
                  background: `radial-gradient(220px circle at ${info1Mouse.x}px ${info1Mouse.y}px, rgba(212, 175, 55, 0.18), transparent 80%)`,
                }}
              />

              <h3 className="font-display text-2xl text-white mb-6 relative z-20">
                What to Expect
              </h3>
              <ul className="space-y-4 text-ivory-200 relative z-20 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  Quick response within 24-48 hours
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  Personalized consultation for your project
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  Transparent pricing with no hidden costs
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  Professional approach from start to finish
                </li>
              </ul>
            </div>

            <div 
              ref={info2Ref}
              onMouseMove={(e) => handleMouseMove(e, info2Ref, setInfo2Mouse)}
              onMouseEnter={() => setInfo2Hover(true)}
              onMouseLeave={() => setInfo2Hover(false)}
              className="glass-card p-8 relative overflow-hidden border border-white/20 shadow-luxury"
            >
              {/* Spotlight glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
                style={{
                  opacity: info2Hover ? 1 : 0,
                  background: `radial-gradient(220px circle at ${info2Mouse.x}px ${info2Mouse.y}px, rgba(212, 175, 55, 0.12), transparent 80%)`,
                }}
              />

              <h3 className="font-display text-xl text-maroon-600 mb-5 relative z-20">
                Popular Services
              </h3>
              <div className="flex flex-wrap gap-2.5 relative z-20">
                {['Bridal Shoot', 'Jewelry Promotion', 'Brand Collaboration', 'Saree Modeling'].map(service => (
                  <span
                    key={service}
                    className="px-4.5 py-1.5 bg-ivory-200 hover:bg-gold-400 hover:text-white transition-colors duration-300 text-maroon-600 text-sm rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
