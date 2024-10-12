import { useParams } from "react-router-dom";
import products from "./../../products.json";
import ImageGallery from "./ImageGallery";
import { useContext } from "react";
import { CartContext } from "../features/ContextProvider";

const ProductDescription = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));

  function handleClick(product) {
    const updatedCart = cart.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    dispatch({ type: "Increase", updatedCart });
  }

  return (
    <div className="p-4 mt-14">
      <ImageGallery images={product.images} />
      <div className="product-description p-10 lg:px-32 py-20">
        <p className="text-2xl underline ">{product.title}</p>
        <div className=" px-10 md:px-20 py-2 rating-price flex gap-28 items-center">
          <p className="text-2xl">
            Rating.{" "}
            <span className=" font-semibold ">{product.rating.rate}</span>
          </p>
          <p className="text-3xl">
            Rs. <span className="font-bold">{product.price}</span>
          </p>
        </div>
        <button onClick={() => handleClick(product)}>ADD TO CART</button>
        <p className=" text-gray-600">{product.description}</p>
      </div>
      <h3 className="px-10 mb-2 text-2xl font-bold">Reviews</h3>
      <div className="ratings px-10">
        {product.reviews.map((review) => (
          <div key={review.reviewer} className="mb-3">
            <p className="font-bold">{review.reviewer}</p>
            <p className=" text-gray-500">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
