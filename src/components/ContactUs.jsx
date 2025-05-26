import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We'd love to hear from you. Whether you have a question about blood donations,
            volunteering, or anything else, our team is ready to answer all your questions.
          </p>

          <div className="space-y-5 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-600" />
              <span>+880 1234 567 890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-600" />
              <span>support@blooddonation.org</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600" />
              <span>Banani, Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Contact Form
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                rows="4"
                placeholder="Your message"
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded w-full"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
