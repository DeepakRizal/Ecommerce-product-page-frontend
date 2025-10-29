import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ImageGallery from "./ImageGallery";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../features/ContextProvider";
import { fetchAProduct } from "../api/productsApi";

const ProductDescription = () => {
  const [product, setProduct] = useState({});
  const { cart, dispatch } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchAProduct(id);
      setProduct(product);
    };

    getProduct();
  }, [id]);

  function handleClick(product) {
    const productExist = cart.find((product) => product.id === parseInt(id));

    console.log(productExist);

    if (productExist) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      dispatch({ type: "Increase", updatedCart });
    } else {
      const productWithQuanity = { ...product, quantity: 1 };

      dispatch({ type: "Add", product: productWithQuanity });
    }
  }

  return (
    <div className="p-4 mt-14 relative">
      <Link
        to={"/"}
        className="absolute z-10 left-10 md:left-20 cursor-pointer top-10"
      >
        <ArrowBackIcon />
      </Link>
      {product.images && <ImageGallery images={product.images} />}
      <div className="product-description mb-5 p-10 lg:px-32 py-20">
        <p className="text-2xl underline ">{product.title}</p>
        <div className=" px-10 md:px-20 py-2 rating-price flex gap-28 items-center">
          <p className="text-2xl">
            Rating. <span className=" font-semibold ">{product.rating}</span>
          </p>
          <p className="text-3xl">
            Rs. <span className="font-bold">{product.price}</span>
          </p>
        </div>
        <button
          className="bg-gray-600 py-2 px-3 rounded-md text-white"
          onClick={() => handleClick(product)}
        >
          ADD TO CART
        </button>
        <p className=" mt-5 text-gray-600">{product.description}</p>
      </div>
      <h3 className="px-10 mb-2 text-2xl font-bold">Reviews</h3>
      <div className="ratings px-10">
        {product.reviews &&
          product.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p className="font-bold">{review.reviewerName}</p>
              <p className=" text-gray-500">{review.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDescription;
