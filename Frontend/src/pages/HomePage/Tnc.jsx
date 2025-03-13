import React from "react";
import Header from "../../components/HomePageComponents/Header";
import Footer from "../../components/HomePageComponents/Footer";

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
      <h1 className="text-6xl font-bold mb-4 items-center pt-24">
      <span className="bg-gradient-to-r from-[#FD9BB8] to-[#CF9FF9] bg-clip-text text-transparent font-bold">
            Terms
          </span>{" "}
          & {" "}
        <span className="bg-gradient-to-r from-[#FC739C] to-[#FDA19B] bg-clip-text text-transparent font-bold">
            Conditions
          </span>{" "}         
      </h1>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-8">1. Introduction</h2>
      <p className="text-lg items-center pt-3">
      Welcome to VidsCommerce! We appreciate your interest in our platform. By accessing or using our services, you agree to abide by these Terms and Conditions. These terms govern your use of VidsCommerce, including browsing, purchasing products, or any other interaction on our platform. If you do not agree with these terms, we kindly request that you refrain from using our services. Your continued use of VidsCommerce signifies your acceptance of these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">2. Services Provided</h2>
      <p className="text-lg items-center pt-3">
      VidsCommerce is an e-commerce discovery platform that curates Instagram reels from verified business accounts. We allow users to explore products featured in these videos and provide an easy way to purchase them. While we facilitate the discovery of products, the actual sale, shipping, and fulfillment of these items are managed by third-party businesses. VidsCommerce does not directly sell or manufacture any products.        </p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">3. User Responsibilities</h2>
      <ul className="list-disc ml-6 text-lg items-center pt-3">
        <li>You must be at least 18 years old or have explicit parental consent to use our platform.</li>
        <li>The information you provide while creating an account must be accurate, complete, and regularly updated.</li>
        <li>You agree to use VidsCommerce solely for lawful purposes. Engaging in any fraudulent, deceptive, or illegal activities is strictly prohibited.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials. Any activities carried out under your account will be considered your responsibility.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">4. Product Information and Pricing</h2>
      <p className="text-lg items-center pt-3">
      We aim to ensure that all product descriptions, images, and prices displayed on VidsCommerce are accurate and up-to-date. However, as this information is provided by third-party sellers, we cannot guarantee that all details will always be correct, complete, or reliable. Prices may change due to discounts, promotions, or fluctuations set by the respective businesses.
      </p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">5. Orders and Payments</h2>
      <ul className="list-disc ml-6 text-lg items-center pt-3">
        <li>Placing an order through VidsCommerce constitutes an offer to purchase a product. The order is only confirmed once the seller accepts and dispatches it.</li>
        <li>We support multiple payment methods, including credit/debit cards, UPI, net banking, and digital wallets.</li>
        <li>Users must ensure that payments are made in full and on time to avoid order cancellations.</li>
        <li>VidsCommerce is not responsible for failed transactions caused by technical issues with banks or payment gateways.</li>

      </ul>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">6. Shipping and Delivery</h2>
        <ul className="list-disc ml-6 text-lg items-center pt-3">
            <li>All shipping and delivery processes are managed directly by the respective businesses selling the products.</li>
            <li>Estimated delivery times are provided by the sellers and may vary based on location, logistics, or unforeseen circumstances.</li>
            <li>VidsCommerce is not liable for any shipping delays, lost packages, or damages during transit. However, we encourage users to reach out to sellers for resolutions regarding such issues.</li>
        </ul>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">7. Returns and Refunds</h2>
        <ul className="list-disc ml-6 text-lg items-center pt-3">
            <li>Return and refund policies vary by seller. Users are advised to carefully review the return policies before making a purchase.</li>
            <li>VidsCommerce is not responsible for processing refunds or exchanges; all disputes must be handled directly with the respective seller.</li>
            <li>If you face any issues with a seller regarding returns, you may contact us for guidance, but we do not guarantee a resolution.</li>
        </ul>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">8. Intellectual Property</h2>
        <ul className="list-disc ml-6 text-lg items-center pt-3">
            <li>All content available on VidsCommerce, including logos, text, images, videos, and software, is protected under intellectual property laws.</li>
            <li>Users may not copy, reproduce, distribute, or modify any content on the platform without prior written consent.</li>
            <li>Any unauthorized use of our intellectual property may result in legal action.</li>
        </ul>
      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">9. Limitation of Liability</h2>
        <ul className="list-disc ml-6 text-lg items-center pt-3">
            <li>VidsCommerce acts as a discovery platform and does not assume responsibility for product quality, seller reliability, or customer satisfaction.</li>
            <li>We are not liable for any indirect, incidental, or consequential damages that may arise from your use of our platform.</li>
            <li>Users agree that they use VidsCommerce at their own risk and should conduct due diligence before making any purchase.</li>
        </ul>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">10. Indemnification</h2>
      <p className="text-lg items-center pt-3">By using our platform, you agree to indemnify and hold VidsCommerce harmless from any claims, liabilities, or damages arising from your misuse of the platform, any breach of these Terms and Conditions or any legal disputes between you and a seller.</p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">11. Changes to Terms</h2>
      <p className="text-lg items-center pt-3">VidsCommerce reserves the right to update, modify, or amend these Terms and Conditions at any time. Any changes will be reflected on this page, and your continued use of our platform will signify acceptance of the updated terms. We encourage users to periodically review this section for any updates.</p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">12. Governing Law</h2>
      <p className="text-lg items-center pt-3">These Terms and Conditions are governed by the laws of India. Any disputes arising from the use of our platform will be subject to the exclusive jurisdiction of the courts in Nagpur, Maharashtra.</p>

      <h2 className="text-2xl font-semibold mt-4 items-center pt-4">13. Contact Information</h2>
      <p className="text-lg items-center pt-3">If you have any questions, concerns, or require assistance, please visit our, {" "}
  <a href="/contact-us" className="text-blue-600 hover:underline">
    Contact Us
  </a>{" "} page.</p>
  <div className="py-10"></div>
  </div>
  <Footer />
    </div>
  );
};

export default TermsAndConditions;
