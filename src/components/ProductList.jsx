import { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";
import Pagination from "./Pagination";
import { SearchContext } from "../features/searchContext";

const ProductList = () => {
  const { query } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalPages = Math.ceil(194 / 20);

  useEffect(() => {
    const getProducts = async () => {
      const skip = (page - 1) * 20;
      const products = await fetchAllProducts(skip);

      setProducts(products);
      setFilters(products);
    };

    getProducts();
  }, [page]);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilters(filtered);
  }, [query, products]);

  const allCategories =
    products.length > 1
      ? [...new Set(products.map((product) => product.category))]
      : [];

  function handleClick(event) {
    const buttonText = event.target.textContent;

    setActiveCategory(buttonText);

    if (buttonText === "All") {
      setFilters(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === buttonText
      );
      setFilters(filtered);
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating-high", label: "Rating: High to Low" },
    { value: "rating-low", label: "Rating: Low to High" },
    { value: "name-az", label: "Name: A to Z" },
    { value: "name-za", label: "Name: Z to A" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Default";

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-400 mt-24 md:mt-12 min-h-screen">
      {/* Filters and Sort Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-5 space-y-4">
        {/* Categories Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3 tracking-wide">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleClick}
              className={`${
                activeCategory === "All"
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95`}
            >
              All
            </button>

            {allCategories.map((category, index) => (
              <button
                key={category + index}
                onClick={handleClick}
                className={`${
                  activeCategory === category
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Product Count & Sort Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filters.length}
            </span>{" "}
            {filters.length === 1 ? "product" : "products"}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <span className="text-sm text-gray-700">
                <span className="hidden sm:inline font-medium">Sort by:</span>{" "}
                <span className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors duration-150">
                  {currentSortLabel}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isDropdownOpen && (
              <>
                {/* Click outside to close (mobile overlay) */}
                <div
                  className="fixed inset-0 z-10 sm:hidden"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>

                <div className="absolute right-0 mt-2 w-full sm:min-w-[220px] bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden animate-fadeIn">
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        sortBy === option.value
                          ? "bg-gray-900 text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${index !== 0 ? "border-t border-gray-100" : ""}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filters.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default ProductList;
