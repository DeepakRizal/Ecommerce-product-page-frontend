import { useEffect, useState } from "react";

import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts();

      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <div className="p-4 mt-14 bg-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
