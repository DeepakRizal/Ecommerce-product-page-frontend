import { useContext } from "react";
import { CartContext } from "../features/ContextProvider";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Product = ({ product }) => {
  const { dispatch, cart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleClick(product) {
    const productIsThereInCart = cart.find((p) => p.id === product.id);

    if (productIsThereInCart) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      dispatch({ type: "Increase", updatedCart });
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      dispatch({ type: "Add", product: productWithQuantity });
    }
  }

  function handleNavigate() {
    navigate(`/product/${product.id}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col bg-slate-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <img
        className="h-40 w-full object-contain bg-slate-900 p-3"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="flex flex-col justify-between flex-grow px-3 py-2">
        <p className="text-sm text-center font-medium line-clamp-2">
          {product.title}
        </p>

        <div className="flex items-center justify-between text-sm mt-2">
          <p>⭐ {product.rating?.rate || product.rating}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(product);
            }}
            className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded-md text-xs"
          >
            Add to Cart
          </button>
        </div>

        <p className="text-lg font-semibold text-center mt-2">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default Product;
