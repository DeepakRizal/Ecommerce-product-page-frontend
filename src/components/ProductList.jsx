import { useEffect, useState } from "react";

import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts();

      setProducts(products);
      setFilters(products);
    };

    getProducts();
  }, []);

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

  return (
    <div className=" p-4 bg-gray-200 mt-14">
      <div className="">
        <button
          onClick={handleClick}
          className={` ${
            activeCategory === "All" ? " bg-gray-700" : "bg-gray-500"
          } m-2 px-4 py-1 rounded-md text-white`}
        >
          All
        </button>

        {allCategories.map((category, index) => (
          <button
            onClick={handleClick}
            className={` ${
              activeCategory === category ? " bg-gray-700" : "bg-gray-500"
            } m-2 px-4 py-1 rounded-md text-white`}
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
    </div>
  );
};

export default ProductList;
