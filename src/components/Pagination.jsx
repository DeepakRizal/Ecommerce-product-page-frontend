/* eslint-disable react/prop-types */
const Pagination = ({ page, handleNext, handlePrev }) => {
  return (
    <div className="flex items-center justify-center gap-4 py-4 sticky bottom-5">
      <button
        disabled={page === 1}
        onClick={handlePrev}
        className={`px-4 py-2 rounded-lg text-gray-100 transition ${
          page === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        Prev
      </button>
      <span className="text-gray-700 font-medium">{page}</span>
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition text-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
