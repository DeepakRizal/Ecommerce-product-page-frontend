/* eslint-disable react/prop-types */
const Pagination = ({ page, handleNext, handlePrev }) => {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        disabled={page === 1}
        onClick={handlePrev}
        className={`px-5 py-2 rounded-lg font-medium text-white transition-all duration-200 ${
          page === 1
            ? "bg-slate-700 text-gray-400 cursor-not-allowed"
            : "bg-blue-900 hover:bg-blue-800 active:scale-95 shadow-sm"
        }`}
      >
        Prev
      </button>

      <span className="text-white font-semibold text-lg tracking-wide">
        {page}
      </span>

      <button
        onClick={handleNext}
        className="px-5 py-2 rounded-lg font-medium bg-blue-900 text-white hover:bg-blue-800 active:scale-95 transition-all duration-200 shadow-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
