import { useContext, useState } from "react";
import { CartContext } from "../features/ContextProvider";
import DeleteCartItemModal from "./DeleteCartItemModal";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const [modalFunctionality, setModalFunctionality] = useState({
    isModalOpen: false,
    selectedItem: null,
  });

  const overallTotalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  function handleDecreaseQuantity(product) {
    if (product.quantity > 1) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      dispatch({ type: "Decrease", updatedCart });
    } else {
      const updatedCart = cart.filter((p) => p.id !== product.id);
      dispatch({ type: "Remove", updatedCart });
    }
  }

  function handleIncreaseQuantity(product) {
    if (product.quantity < 20) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      dispatch({ type: "Increase", updatedCart });
    }
  }

  function handleRemoveItem() {
    const updatedCart = cart.filter(
      (p) => p.id !== modalFunctionality.selectedItem.id
    );

    dispatch({ type: "Remove", updatedCart });
    setModalFunctionality({
      isModalOpen: false,
      selectedItem: null,
    });
  }

  function handleOpen(product) {
    setModalFunctionality({
      isModalOpen: true,
      selectedItem: product,
    });
  }

  function handleClose() {
    setModalFunctionality({
      isModalOpen: false,
      selectedItem: null,
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-3 gap-3 mt-14">
        {cart.length === 0 && (
          <div className="flex col-span-full p-20 items-center justify-center">
            <p className=" text-4xl font-semibold mt-8">
              No Items to show in the cart
            </p>
          </div>
        )}

        {cart.map((product) => (
          <div
            className=" p-5  rounded-md text-white mt-5 bg-slate-500"
            key={product.id}
          >
            <div>
              <img
                className="h-16 mx-auto"
                src={product.images[0]}
                alt={product.title}
              />
              <p className=" font-bold">{product.title}</p>
              <p className=" mt-2 flex items-center gap-3 justify-center">
                <button
                  onClick={() => handleDecreaseQuantity(product)}
                  className="bg-green-900 px-2 rounded-sm"
                >
                  -
                </button>{" "}
                {product.quantity}{" "}
                <button
                  onClick={() => handleIncreaseQuantity(product)}
                  className="bg-green-900 px-2 rounded-sm"
                >
                  +
                </button>
              </p>
              <p className="mb-2">
                {" "}
                Price: {(product.price * product.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => handleOpen(product)}
                className="bg-green-900 px-2 py-2 rounded-md"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-green-500 font-bold m-5 p-5 rounded-md text-black">
          <p>product price: {overallTotalPrice.toFixed(2)}</p>
          <p className="underline mb-2">Delivery Charges: {20}</p>
          {overallTotalPrice > 0 && (
            <p className="mb-3">
              Total Price:{(overallTotalPrice + 20).toFixed(2)}
            </p>
          )}
          <button className="bg-green-900 px-10 py-2 rounded-md text-white hover:bg-green-950">
            {" "}
            proceed to checkout
          </button>
        </div>
        <DeleteCartItemModal
          onConfirm={handleRemoveItem}
          onClose={handleClose}
          isOpen={modalFunctionality.isModalOpen}
        />
      </div>
    </>
  );
};

export default Cart;
