import { useState } from "react";

const Home = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form); // later connect API

    alert("Feedback submitted 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 space-y-8">

      {/* Welcome Section */}
      <div className="bg-[#0b1220] border border-white/5 rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Welcome back 👋
        </h1>
        <p className="text-gray-400 text-sm">
          We’re glad you’re here. Let us know if you face any issues or have suggestions to improve the app.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="bg-[#0b1220] border border-white/5 rounded-xl p-6 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">
          Report a Problem / Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 bg-[#030712] border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 bg-[#030712] border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-400">Your Issue / Feedback</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 bg-[#030712] border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>

    </div>
  );
};

export default Home;