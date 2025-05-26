import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import banner1 from '../../assets/banner-1.jpg';
import banner2 from '../../assets/banner-2.jpg';
import banner3 from '../../assets/banner-3.jpg';

import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Slider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <div className="h-[88vh] w-full relative z-0">
      <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper">

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={banner2} className="w-full h-full object-cover" alt="banner2" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-10 md:px-20 text-white space-y-6">
              <h2 className="text-2xl md:text-5xl font-bold max-w-2xl text-left">
                Donate Blood, Be a Hero
              </h2>
              <p className="max-w-xl text-sm md:text-base">
                One donation can save up to three lives. Be the reason someone smiles again.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/sign-up"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                >
                  Join as a Donor
                </Link>
                <Link
                  to="/search"
                  className="border border-white hover:bg-white hover:text-black text-white px-6 py-2 rounded-md transition"
                >
                   Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
         <SwiperSlide>

          <div className="relative w-full h-full">
            <img src={banner1} className="w-full h-full object-cover" alt="banner1" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-10 md:px-20 text-white space-y-6">
              <h2 className="text-2xl md:text-5xl font-bold max-w-2xl text-left ">
                Be the Lifeline Someone 
              </h2>
              <p className="max-w-xl text-sm md:text-base">
                Your blood can save lives. Take the step to become a donor and bring hope to those in need.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/sign-up"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                >
                  Join as a Donor
                </Link>
                <Link
                  to="/search"
                  className="border border-white hover:bg-white hover:text-black text-white px-6 py-2 rounded-md transition"
                >
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={banner3} className="w-full h-full object-cover" alt="banner3" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-10 md:px-20 text-white space-y-6">
              <h2 className="text-2xl md:text-5xl font-bold max-w-2xl text-left">
                Together We Can Make a Difference
              </h2>
              <p className="max-w-xl text-sm md:text-base">
                Join our growing community of life savers. Your blood can heal, help, and give life.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/sign-up"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                >
                  Join as a Donor
                </Link>
                <Link
                  to="/search"
                  className="border border-white hover:bg-white hover:text-black text-white px-6 py-2 rounded-md transition"
                >
                   Search Donors
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
       

      </Swiper>
    </div>
  );
};

export default Slider;
