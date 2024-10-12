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
        p.id === product.id
          ? {
              ...p,
              quantity: p.quantity + 1,
            }
          : p
      );
      dispatch({ type: "Increase", updatedCart });
    } else {
      const productWithQuanity = { ...product, quantity: 1 };
      dispatch({ type: "Add", product: productWithQuanity });
    }
  }

  function handleNavigate() {
    navigate(`/product/${product.id}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col items-center bg-slate-800 text-white py-6 rounded-md cursor-pointer"
    >
      <img
        className=" h-52 p-2 "
        src={product["images"][0]}
        alt={product.title}
      />
      <p className=" text-center">{product.title}</p>
      <div className="flex items-center justify-between gap-7 p-2">
        <p>ratings: {product.rating.rate}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick(product);
          }}
          className="bg-green-800 hover:bg-green-900 px-2 py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
      <p className="text-2xl font-bold">Price: Rs.{product.price}</p>
    </div>
  );
};

export default Product;
