import React from 'react';
import image1 from '../assets/banner-1.jpg'; 
import image2 from '../assets/banner-2.jpg'; 

const BenefitsAndRecovery = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      {/* Section 1: Health Benefits */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div>
          <img
            src={image1}
            alt="Be a Hero - Give Blood"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            The Health Benefits of Donating Blood
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            A blood transfusion can be a life-saving treatment for patients with cancer, those undergoing surgery, children with anaemia, or women facing complications.
          </p>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            <li>Reduce harmful iron stores.</li>
            <li>Preserve cardiovascular health.</li>
            <li>Reduce the risk of cancer.</li>
            <li>Give you a sense of pride.</li>
            <li>Free blood analysis.</li>
          </ul>
          
        </div>
      </div>

      {/* Section 2: Recovery and Time */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Recovery and Time Between Donations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A blood transfusion can be a life-saving treatment for patients with cancer, those undergoing surgery, children with anaemia, or women facing complications.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            You must wait at least 8 weeks (56 days) between whole blood donations, and 16 weeks (112 days) between Power Red donations. Platelet donors can give every 7 days up to 24 times per year. Most people’s hemoglobin levels return to normal after 6–12 weeks.
          </p>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={image2}
            alt="Donation Recovery"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsAndRecovery;
