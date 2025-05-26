import React from 'react';
import { FaUsers, FaTint, FaSmileBeam, FaTrophy } from 'react-icons/fa';

const StatisticsSection = () => {
  return (
    <section className=" bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-blue-500 rounded">
          {/* Total Donors */}
          <div className="p-6 rounded-lg   dark:bg-gray-800">
            <FaUsers className="text-red-600 text-4xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">8,500+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Donors</p>
          </div>

          {/* Blood Groups */}
          <div className="p-6 rounded-lg   dark:bg-gray-800">
            <FaTint className="text-red-600 text-4xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">8 Types</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Blood Groups</p>
          </div>

          {/* Successful Smiles */}
          <div className="p-6 rounded-lg   dark:bg-gray-800">
            <FaSmileBeam className="text-red-600 text-4xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">12,000+</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Smiles Delivered</p>
          </div>

          {/* Awards */}
          <div className="p-6 rounded-lg  dark:bg-gray-800">
            <FaTrophy className="text-red-600 text-4xl mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">22</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recognitions & Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
