import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="text-center py-8 md:py-16">
          <div className="text-4xl md:text-6xl mb-4">✅</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8 text-sm md:text-base">Your message has been sent successfully. We'll get back to you soon!</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-orange-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-base md:text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base ${errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base ${errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="How can we help you?"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-sm md:text-base ${errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm md:text-base"
            >
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Get in touch</h2>
          <div className="space-y-6 md:space-y-8">
            <div className="flex gap-3 md:gap-4">
              <div className="text-xl md:text-2xl">📍</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Address</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  123 Food Street, Kitchen District<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="text-xl md:text-2xl">📞</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Phone</h3>
                <p className="text-gray-600 text-sm md:text-base">+91 98765 43210</p>
                <p className="text-gray-600 text-sm md:text-base">Mon-Sat: 9AM-9PM</p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="text-xl md:text-2xl">✉️</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Email</h3>
                <p className="text-gray-600 text-sm md:text-base">support@foodieexpress.com</p>
                <p className="text-gray-600 text-sm md:text-base">We respond within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="text-xl md:text-2xl">⏰</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Business Hours</h3>
                <p className="text-gray-600 text-sm md:text-base">Monday - Saturday: 9AM - 9PM</p>
                <p className="text-gray-600 text-sm md:text-base">Sunday: 10AM - 6PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Need immediate help?</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Chat with our support team for instant assistance with your orders and account issues.
            </p>
            <button className="bg-orange-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;