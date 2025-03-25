import React from "react";
import Header from "../../components/HomePageComponents/Header";
import Footer from "../../components/HomePageComponents/Footer";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-4 items-center pt-24">
        <span className="bg-gradient-to-r from-[#FD9BB8] to-[#CF9FF9] bg-clip-text text-transparent font-bold">
          About
        </span>{" "}
        <span className="bg-gradient-to-r from-[#FC739C] to-[#FDA19B] bg-clip-text text-transparent font-bold">
          Us
        </span>{" "}
      </h1>
      <p className="text-gray-700 font-bold">Who We Are | Our Story | Our Mission</p>

      <section className="mt-6">
        {/* <h2 className="text-2xl font-semibold pt-8">1. Who We Are</h2> */}
        <p className="text-lg pt-3">
          Welcome to <strong>VidsCommerce</strong>, a revolutionary platform that connects businesses with customers through engaging 
          social media content. We specialize in curating <strong>Instagram reels</strong> from verified business accounts, making it easier 
          for users to discover and shop for trending products featured in these videos.  
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold pt-4">Our Story</h2>
        <p className="text-lg pt-3">
          The idea for VidsCommerce was born out of a need to bridge the gap between <strong>social media engagement</strong> and <strong>seamless shopping</strong>.  
          We noticed that many users love discovering products via short-form videos but often struggle to find reliable purchasing options.  
          Our team built a <strong>smart, AI-powered</strong> platform that enhances the shopping experience by linking directly to trusted sellers.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold pt-4">Our Mission</h2>
        <ul className="list-disc pl-6 text-lg pt-4">
          <li>To create a <strong>seamless shopping experience</strong> through interactive and engaging video content.</li>
          <li>To <strong>empower businesses</strong> by giving them a platform to showcase their products to a broader audience.</li>
          <li>To ensure a <strong>trusted, transparent, and secure</strong> shopping experience for customers worldwide.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold pt-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-lg pt-4">
          <li><strong>Innovative Shopping:</strong> Watch product demos in real-time through Instagram reels.</li>
          <li><strong>Verified Sellers:</strong> We partner with authentic brands and businesses to ensure quality.</li>
          <li><strong>Seamless Experience:</strong> A one-click transition from video to purchase.</li>
          <li><strong>Secure Transactions:</strong> We integrate trusted payment gateways for safe purchases.</li>
          <li><strong>Data Privacy:</strong> We respect user privacy and do not share personal data without consent.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold pt-4">Get in Touch!</h2>
        <p className="text-lg pt-3">
          Have questions or feedback? We’d love to hear from you!  
          Visit our <a href="/contact" className="text-blue-500 underline">Contact Us</a> page to reach out.
        </p>
      </section>
      <div className="py-10"></div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
