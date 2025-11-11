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
    <div className="p-4 bg-gray-400 mt-24 md:mt-12 min-h-screen">
      {/* Categories Section */}
      <div className="mt-3">
        <button
          onClick={handleClick}
          className={`${
            activeCategory === "All" ? "bg-gray-700" : "bg-gray-500"
          } m-1 px-4 py-1 rounded-md text-white`}
        >
          All
        </button>

        {allCategories.map((category, index) => (
          <button
            onClick={handleClick}
            className={`${
              activeCategory === category ? "bg-gray-700" : "bg-gray-500"
            } m-1 px-4 py-1 rounded-md text-white`}
            key={category + index}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center justify-between flex-wrap gap-3 my-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-semibold">{filters.length}</span>{" "}
          products
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors min-w-[200px] justify-between"
          >
            <span className="text-sm font-medium text-gray-700">
              Sort by: {currentSortLabel}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[220px] bg-white rounded-md shadow-lg border border-gray-200 z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    sortBy === option.value
                      ? "bg-gray-100 font-semibold text-gray-900"
                      : "text-gray-700"
                  } first:rounded-t-md last:rounded-b-md`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
