import React from 'react';
import Slider from '../components/slides/Slider';
import Featured from '../components/Featured';
import StatisticsSection from '../components/StatisticsSection';
import BenefitsAndRecovery from '../components/BenefitsAndRecovery';
import DonationHelpAndRequests from '../components/DonationHelpAndRequests';
import ContactUs from '../components/ContactUs';
const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Featured></Featured>
            <StatisticsSection></StatisticsSection>
            <BenefitsAndRecovery></BenefitsAndRecovery>
            <DonationHelpAndRequests></DonationHelpAndRequests>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;