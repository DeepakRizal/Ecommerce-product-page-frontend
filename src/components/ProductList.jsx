import products from "./../../products.json";
import Product from "./Product";

const ProductList = () => {
  return (
    <div className="p-4 mt-14 bg-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
