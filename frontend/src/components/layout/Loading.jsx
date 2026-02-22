const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030712] text-white">

      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-gray-400">Loading, please wait...</p>

      </div>

    </div>
  );
};

export default Loading;