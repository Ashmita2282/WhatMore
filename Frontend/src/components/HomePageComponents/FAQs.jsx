import React, { useState } from "react";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "Will this have an impact on the load time of the website?",
      answer:
        "Adding the VidsCommerce component doesn't have any impact on the loading time of the website. As the videos are loaded on demand when the user clicks on the video. The videos are served through CDNs (Content Delivery Networks) which doesn't impact the website loading time.",
    },
    {
      question: "To increase traffic. Should I integrate shoppable videos?",
      answer:
        "Yes, integrating shoppable videos can significantly increase user engagement and conversion rates.",
    },
    {
      question: "Can I customize the look and feel of the widget?",
      answer:
        "Absolutely! The widget is fully customizable to match your brand's design.",
    },
    {
      question:
        "How much increase in the conversion can I expect after integrating VidsCommerce plugin?",
      answer:
        "The increase in conversion varies by use case, but many clients report a significant boost in user engagement and sales.",
    },
    {
      question:
        "I have a feature request/suggestion. How can I provide feedback?",
      answer:
        "We love hearing from you! Please use our feedback form or contact support to share your suggestions.",
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
        {/* Left Pink Box */}
        <div className="flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-pink-500 rounded-lg flex items-center justify-center">
            <video
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
              src="https://d1rem61pdixo0z.cloudfront.net/website-cdn/public/img/shared/faq-anim.mp4"
            ></video>
          </div>
        </div>

        {/* Right FAQ Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
            FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                {/* FAQ Question */}
                <div
                  className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <p className="text-gray-800 font-medium flex-1">{faq.question}</p>
                  <button className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white rounded-full text-2xl font-bold flex-shrink-0 transition-all duration-300 leading-none">
  {activeIndex === index ? "−" : "+"}
</button>


                </div>
                {/* FAQ Answer */}
                {activeIndex === index && (
                  <div className="p-4 bg-white text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
