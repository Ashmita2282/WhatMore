import React from "react";

const Integration = () => {

 const store_id = localStorage.getItem("store_id"); // Directly retrieve store ID

  const iframeCode = `<iframe
  src="https://nodejs.gristip.com/videoGrid/${store_id}"
  width="100%"
  height="700px"
  style="border: none;"
></iframe>`;

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>iFrame Example</title>
  </head>
  <body>
    <iframe
      src="https://nodejs.gristip.com/videoGrid/${store_id}"
      width="100%"
      height="700px"
      style="border: none;"
    ></iframe>
  </body>
</html>`;

  const reactCode = `const IntegrationWidget = () => {
  return (
    <iframe
      src="https://nodejs.gristip.com/videoGrid/${store_id}"
      width="100%"
      height="700px"
      style={{ border: 'none' }}
      title="Integration Widget"
    ></iframe>
  );
};

export default IntegrationWidget;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">📥 Embed with iFrame</h2>
      <p className="mb-3 text-gray-600">
        Use the following code snippet to embed the carousel in your website.
      </p>

      <div className="relative bg-gray-900 text-white text-sm rounded-lg p-4 font-mono">
        <pre>{iframeCode}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded"
        >
          Copy
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        You can adjust the <code>width</code> and <code>height</code> values according to the layout of your website.
      </p>
      
      <h3 className="mt-6 font-semibold text-lg text-gray-800">Implementation examples</h3>


      <h3 className="mt-6 font-semibold text-lg text-gray-800">🔸 HTML Example:</h3>
      <pre className="bg-gray-100 p-3 rounded-md text-sm font-mono text-gray-700 mt-2 whitespace-pre-wrap">
        {htmlCode}
      </pre>

      <h3 className="mt-6 font-semibold text-lg text-gray-800">🔹 React Example:</h3>
      <pre className="bg-gray-100 p-3 rounded-md text-sm font-mono text-gray-700 mt-2 whitespace-pre-wrap">
        {reactCode}
      </pre>
    </div>
  );
};

export default Integration;
