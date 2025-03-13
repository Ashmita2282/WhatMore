import Header from "../../components/HomePageComponents/Header";
import Footer from "../../components/HomePageComponents/Footer";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      {/* Ensuring the content is properly spaced below the header */}
      <div className="flex flex-col items-center pt-24">
        <h1 className="text-6xl font-bold text-black-600">
        <span className="bg-gradient-to-r from-[#FD9BB8] to-[#CF9FF9] bg-clip-text text-transparent font-bold">
            Contact
          </span>{" "}
        <span className="bg-gradient-to-r from-[#FC739C] to-[#FDA19B] bg-clip-text text-transparent font-bold">
            Us
          </span>{" "}
          {/* Send us a message. */}
        </h1>
        <h3 className="text-2xl font-bold text-black-700 mt-2 text-center">
    Feel free to send us a message.
  </h3>

        <div className="p-8 rounded-lg shadow-lg mt-6 w-full max-w-lg">
          <form className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea 
                placeholder="Write your message here..." 
                className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button 
  type="submit" 
  className="w-full p-3 rounded-lg font-semibold text-white transition duration-200 
             bg-gradient-to-r from-[#FD9BB8] to-[#CF9FF9] hover:from-[#FC739C] hover:to-[#FDA19B]"
>
  Send Message
</button>

          </form>
        </div>
      </div>
      <div className="py-10"></div>
      <Footer />
    </div>

  );
};

export default Contact
