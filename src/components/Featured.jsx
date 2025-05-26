import React from 'react';
import { FaHeartbeat, FaUsers, FaTint } from 'react-icons/fa';

const Featured = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Why Donate Blood?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Blood donation is a simple act of kindness that saves lives. Your contribution can bring hope to accident victims, surgery patients, and those with chronic illnesses.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <div className="text-red-600 text-4xl mb-4 mx-auto">
              <FaHeartbeat />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">Save Lives</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every blood donation can help save up to three lives. It's a powerful gift you can give to someone in need.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <div className="text-red-600 text-4xl mb-4 mx-auto">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">Join a Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Be part of a growing community of donors committed to making a difference together.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition">
            <div className="text-red-600 text-4xl mb-4 mx-auto">
              <FaTint />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">Quick & Safe</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The process is simple, safe, and only takes a few minutes of your time to create a lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
