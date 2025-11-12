import { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";
import Pagination from "./Pagination";
import { SearchContext } from "../features/searchContext";

export default function ProductList() {
  const { query } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // NEW: controls whether the full "filters + sorting" panel is expanded.
  // Default: collapsed but categories (the main filter area) remain visible.
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

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
      {/* Collapsible Filters Card - simplified header: only category buttons + toggle on one line */}
      <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-3 md:p-5 space-y-4 text-white">
        <div className="flex items-center justify-between gap-4">
          {/* Categories (buttons only, no title or icon) */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleClick}
                className={`${
                  activeCategory === "All"
                    ? "bg-blue-900 text-white shadow-md"
                    : "bg-slate-700 text-gray-200 hover:bg-slate-600"
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
                      ? "bg-blue-900 text-white shadow-md"
                      : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                  } px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle: clicking this expands/collapses the full filter+sort area. */}
          <div>
            <button
              aria-expanded={isFiltersExpanded}
              onClick={() => setIsFiltersExpanded((s) => !s)}
              className="flex items-center gap-2 text-sm text-gray-200 px-3 py-2 rounded-full hover:bg-slate-700 transition-colors"
            >
              <span className="hidden sm:inline">
                {isFiltersExpanded ? "Hide options" : "Show options"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isFiltersExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Divider is hidden when collapsed; the rest (count + sort) live inside a collapsible section */}
        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out ${
            isFiltersExpanded
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {/* Divider */}
          <div className="border-t border-slate-700 my-3"></div>

          {/* Product Count & Sort Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-300">
              Showing{" "}
              <span className="font-semibold text-white">{filters.length}</span>{" "}
              {filters.length === 1 ? "product" : "products"}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <span className="text-sm text-gray-200">
                  <span className="hidden sm:inline font-medium">Sort by:</span>{" "}
                  <span className="font-semibold text-white underline underline-offset-2 hover:text-gray-300 transition-colors duration-150">
                    {currentSortLabel}
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-200 transition-transform duration-200 ${
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

                  <div className="absolute right-0 mt-2 w-full sm:min-w-[220px] bg-slate-900 rounded-xl shadow-lg border border-slate-700 z-20 overflow-hidden animate-fadeIn">
                    {sortOptions.map((option, index) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          sortBy === option.value
                            ? "bg-blue-900 text-white font-medium"
                            : "text-gray-300 hover:bg-slate-800"
                        } ${index !== 0 ? "border-t border-slate-700" : ""}`}
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
}
