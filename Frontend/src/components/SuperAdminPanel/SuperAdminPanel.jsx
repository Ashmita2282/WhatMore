import { useState } from "react";
import axios from "axios";

function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState("addPlan");
  const [planForm, setPlanForm] = useState({
    plan_name: "",
    description: "",
    price: "",
    duration_in_months: "",
  });
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  // Retrieve token from localStorage (assumes you've saved it on login)
  const token = localStorage.getItem("token");

  // Handler for tab switching
  const switchTab = (tab) => setActiveTab(tab);

  // Handle input change for plan form
  const handlePlanChange = (e) => {
    setPlanForm({
      ...planForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input change for client form
  const handleClientChange = (e) => {
    setClientForm({
      ...clientForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit new plan (only Super Admin allowed)
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/plans",
        {
          ...planForm,
          price: Number(planForm.price),
          duration_in_months: Number(planForm.duration_in_months),
        },
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
      setPlanForm({ plan_name: "", description: "", price: "", duration_in_months: "" });
    } catch (error) {
      setMessage(error.response?.data.error || "Plan creation failed.");
      console.error("Plan submit error:", error.response?.data);
    }
  };

  // Submit new client
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/superadmin/clients",
        clientForm,
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
      setClientForm({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      setMessage(error.response?.data.error || "Client creation failed.");
      console.error("Client submit error:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Super Admin Panel</h1>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow p-4">
          <ul>
            <li
              className={`p-2 cursor-pointer ${activeTab === "addPlan" && "bg-blue-100"}`}
              onClick={() => switchTab("addPlan")}
            >
              Add Plan
            </li>
            <li
              className={`p-2 cursor-pointer ${activeTab === "addClient" && "bg-blue-100"}`}
              onClick={() => switchTab("addClient")}
            >
              Add Client
            </li>
            {/* You can add more sidebar options here */}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {message && (
            <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>
          )}

          {activeTab === "addPlan" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add New Plan</h2>
              <form onSubmit={handlePlanSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Plan Name</label>
                  <input
                    type="text"
                    name="plan_name"
                    value={planForm.plan_name}
                    onChange={handlePlanChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={planForm.description}
                    onChange={handlePlanChange}
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={planForm.price}
                    onChange={handlePlanChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Duration (months)</label>
                  <input
                    type="number"
                    name="duration_in_months"
                    value={planForm.duration_in_months}
                    onChange={handlePlanChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Plan
                </button>
              </form>
            </div>
          )}

          {activeTab === "addClient" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Add New Client</h2>
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={clientForm.name}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={clientForm.email}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={clientForm.phone}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={clientForm.address}
                    onChange={handleClientChange}
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Client
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SuperAdminPanel;
