import React, {useState, useEffect} from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const ReportsContent = (    ) => {

  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");


  const fetchCount = async () => {
    try {
        const response = await axios.get("http://localhost:5000/analytics/getCount", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        let currentCount = parseInt(response.data.count, 10) || 0; // Ensure it's an integer
        console.log("Fetched Count:", currentCount);

        setCount(currentCount); // Store the fetched count in state
    } catch (error) {
        console.error("Error fetching count:", error.response ? error.response.data : error.message);
    }
};
  
useEffect(() => {
fetchCount();
});

  // Define series data
  const series = {
    monthDataSeries1: {
      prices: [8100, 8105, 8120, 8105, 8125, 8130, 8120, 8105, 8110, 8120],
      dates: [
        "2023-03-01",
        "2023-03-02",
        "2023-03-03",
        "2023-03-04",
        "2023-03-05",
        "2023-03-06",
        "2023-03-07",
        "2023-03-08",
        "2023-03-09",
        "2023-03-10",
      ],
    },
  };

  const [state, setState] = React.useState({
    series: [
      {
        name: "STOCK ABC",
        data: series.monthDataSeries1.prices,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: { enabled: false },
        toolbar: {
          show: false // Hides the menu icon
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: { text: "Fundamental Analysis of Stocks", align: "left" },
      subtitle: { text: "Price Movements", align: "left" },
      labels: series.monthDataSeries1.dates,
      xaxis: { type: "datetime" },
      yaxis: { opposite: true },
      legend: { horizontalAlign: "left" },
    },
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Cards Container 1 */}
      <div className="flex flex-wrap gap-16 justify-center min-h-[200px] py-4">
        <div className="relative bg-purple-600 text-white rounded-xl p-6 w-60 h-40 shadow-lg self-stretch">
          <div className="absolute top-3 left-3 bg-white/20 p-2 rounded-md">
            <img src="images/shopify.png" alt="Shopify Logo" className="w-8 h-8 rounded-lg" />
          </div>

          <div className="absolute top-0 right-14 w-20 h-20 bg-purple-500 rounded-bl-full rotate-135"></div>

          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-700 rounded-bl-full"></div>

          <h1 className="absolute bottom-12 text-3xl font-bold">{count}</h1>
          <span className="absolute bottom-6 text-gray-200 mt-2">Total Clicks</span>
        </div>
       
             {/* Cards Container 2 */}

        <div className="relative bg-blue-600 text-white rounded-xl p-6 w-60 h-40 shadow-lg self-stretch">
          <div className="absolute top-3 left-3 bg-white/20 p-2 rounded-md">
            <img src="images/shopify.png" alt="Shopify Logo" className="w-8 h-8 rounded-lg" />
          </div>

          <div className="absolute top-0 right-14 w-20 h-20 bg-blue-500 rounded-bl-full rotate-135"></div>

          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-700 rounded-bl-full"></div>

          <h1 className="absolute bottom-12 text-3xl font-bold">₹500.00</h1>
          <span className="absolute bottom-6 text-gray-200 mt-2">Total Earning</span>
        </div>

        
             {/* Cards Container 2 */}

          <div className="relative bg-blue-600 text-white rounded-xl p-6 w-60 h-40 shadow-lg self-stretch">
          <div className="absolute top-3 left-3 bg-white/20 p-2 rounded-md">
            <img src="images/shopify.png" alt="Shopify Logo" className="w-8 h-8 rounded-lg" />
          </div>

          <div className="absolute top-0 right-14 w-20 h-20 bg-blue-500 rounded-bl-full rotate-135"></div>

          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-700 rounded-bl-full"></div>

          <h1 className="absolute bottom-12 text-3xl font-bold">₹500.00</h1>
          <span className="absolute bottom-6 text-gray-200 mt-2">Total Earning</span>
        </div>
      </div>

      


      {/* Apex Chart */}
      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>
  );
};

export default ReportsContent;