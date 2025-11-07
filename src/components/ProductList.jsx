import { useEffect, useState } from "react";

import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";
import Pagination from "./Pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

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

  return (
    <div className=" p-4 bg-gray-400  mt-24 md:mt-12 ">
      <div className="">
        <button
          onClick={handleClick}
          className={` ${
            activeCategory === "All" ? " bg-gray-700" : "bg-gray-500"
          } m-1 px-4 py-1 rounded-md text-white`}
        >
          All
        </button>

        {allCategories.map((category, index) => (
          <button
            onClick={handleClick}
            className={`${
              activeCategory === category ? " bg-gray-700" : "bg-gray-500"
            } m-1 px-4 py-1 rounded-md text-white`}
            key={category + index}
          >
            {category}
          </button>
        ))}
      </div>
      <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filters.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={page} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default ProductList;
