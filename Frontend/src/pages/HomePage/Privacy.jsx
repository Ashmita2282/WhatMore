import React from "react";
import Header from "../../components/HomePageComponents/Header";
import Footer from "../../components/HomePageComponents/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
        <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold mb-4 items-center pt-24">
        <span className="bg-gradient-to-r from-[#FD9BB8] to-[#CF9FF9] bg-clip-text text-transparent font-bold">
          Privacy
        </span>{" "}
        <span className="bg-gradient-to-r from-[#FC739C] to-[#FDA19B] bg-clip-text text-transparent font-bold">
          Policy
        </span>{" "}
      </h1>
      <p className="text-gray-700 font-bold">Effective Date: 6th March 2025</p>

      {/* Section 1: Information We Collect */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">1. Information We Collect</h2>

        {/* 1.1. Information You Provide */}
        <h3 className="text-2xl font-medium mt-4 pt-3">1.1. Information You Provide</h3>
        <ul className="text-lg list-disc pl-6 mt-2 pt-2">
          <li>
            <strong>Account Information:</strong> When you register, we collect your name, email, phone number, and password to create and manage your account.
          </li>
          <li>
            <strong>Payment Information:</strong> We collect billing details (like credit/debit card information) to process transactions, but payments are handled through **secure third-party gateways**.
          </li>
          <li>
            <strong>Customer Support:</strong> If you contact us, we may collect messages, inquiries, or feedback for support purposes.
          </li>
        </ul>

        {/* 1.2. Information Collected Automatically */}
        <h3 className="text-2xl font-medium mt-6 pt-3">1.2. Information Collected Automatically</h3>
        <ul className="list-disc pl-6 mt-2 pt-2 text-lg">
          <li><strong>Device Information:</strong> We collect details such as IP address, browser type, and operating system.</li>
          <li><strong>Usage Data:</strong> Information about your interactions with our platform (e.g., pages visited, features used, time spent on the site).</li>
          <li><strong>Cookies & Tracking Technologies:</strong> We use cookies, tracking pixels, and analytics tools to improve user experience and site performance.</li>
        </ul>
      </section>

      {/* Section 2: How We Use Your Information */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li>To provide, personalize, and improve our platform.</li>
          <li>To process transactions securely.</li>
          <li>To communicate updates, offers, and promotional materials.</li>
          <li>To detect, investigate, and prevent fraud or security risks.</li>
          <li>To analyze and optimize website traffic and user experience.</li>
        </ul>
      </section>

      {/* Section 3: How We Share Your Information */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">3. How We Share Your Information</h2>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li><strong>With Sellers:</strong> When you purchase items, we share necessary details with sellers to fulfill your order.</li>
          <li><strong>With Third-Party Service Providers:</strong> Payment processors, analytics providers, marketing tools, and cloud storage services.</li>
          <li><strong>Legal Compliance:</strong> We may disclose information if required by law or to protect our rights.</li>
        </ul>
      </section>

      {/* Section 4: Your Choices & Rights */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">4. Your Choices & Rights</h2>
        <ul className="list-disc pl-6 mt-2 text-lg">
          <li className="text-lg"><strong>Access & Update:</strong> You can manage your personal details in your account settings.</li>
          <li className="text-lg"><strong>Marketing Preferences:</strong> Opt-out of promotional emails at any time.</li>
          <li className="text-lg"><strong>Cookies & Tracking:</strong> Modify cookie settings in your browser to limit tracking.</li>
          <li className="text-lg"><strong>Data Deletion:</strong> Request account deletion by contacting us.</li>
        </ul>
      </section>

      {/* Section 5: Data Security */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">5. Data Security</h2>
        <p className="mt-2 text-lg">
          We implement security measures like encryption, firewalls, and access controls to protect your data. However, no system is 100% secure, and users should take precautions (e.g., using strong passwords).
        </p>
      </section>

      {/* Section 6: Data Retention */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">6. Data Retention</h2>
        <p className="mt-2 text-lg">
          We retain personal data for as long as necessary to provide services, comply with legal obligations, and resolve disputes.
        </p>
      </section>

      {/* Section 7: Children's Privacy */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">7. Children's Privacy</h2>
        <p className="mt-2 text-lg">
          Our platform is not intended for users under 18 without parental consent. If we discover that we have collected data from a minor without consent, we will take appropriate steps to remove it.
        </p>
      </section>

      {/* Section 8: Changes to This Privacy Policy */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">8. Changes to This Privacy Policy</h2>
        <p className="mt-2 text-lg">
          We may update this policy from time to time. Users will be notified of significant changes, and continued use of our platform implies acceptance of the new terms.
        </p>
      </section>

      {/* Section 9: Contact Us */}
      <section className="mt-8">
        <h2 className="text-3xl font-semibold pt-4">9. Contact Us</h2>
        <p className="mt-2 text-lg">
          If you have any questions or concerns about this Privacy Policy, please visit our{" "}
          <a href="/contact" className="text-blue-500 underline">
            Contact Us
          </a>{" "}
          page.
        </p>
      </section>
      <div className="py-10"></div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
