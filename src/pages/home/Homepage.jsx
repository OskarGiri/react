import React from 'react';
import Layout from '../../components/layout/Layout';
// import HouseSection from '../../components/housesection/HouseSection';
import Category from '../../components/category/Category';
import HomePageProduct from '../../components/homepageproduct/HomePageProduct';
import Testimonial from '../../components/testimonial/Testimonial';

const Homepage = () => {
    return (
        <Layout>
            {/* <HouseSection/> */}
            <Category/>
            <HomePageProduct/>
            <Testimonial/>
        </Layout>
    );
};

export default Homepage;