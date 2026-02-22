import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030712] text-white px-4">

      <div className="text-center max-w-md">

        {/* 404 Text */}
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6">

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Go Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFound;