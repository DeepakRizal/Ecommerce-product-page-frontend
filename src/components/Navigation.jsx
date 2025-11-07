import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../features/ContextProvider";

const Navigation = () => {
  const { cart } = useContext(CartContext);

  const totalProduct = cart.reduce((acc, item) => (acc += item.quantity), 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between flex-wrap bg-blue-900 text-white px-4 sm:px-6 lg:px-10 py-3 shadow-md">
      {/* Logo / Title */}
      <Link
        to="/"
        className="font-bold text-lg sm:text-xl tracking-wide hover:text-gray-200 transition-colors"
      >
        Product Page
      </Link>

      {/* Search Input */}
      <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:flex-1 sm:max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 text-gray-900 rounded-md outline-none  transition-all"
        />
      </div>

      {/* Cart Icon */}
      <Link
        to="/cart"
        className="relative mt-3 sm:mt-0 flex items-center justify-center"
      >
        {cart.length > 0 && (
          <span className="bg-orange-500 text-white w-5 h-5 rounded-full text-xs absolute flex items-center justify-center -top-2 -right-2">
            {totalProduct}
          </span>
        )}
        <ShoppingCartIcon className="text-white text-2xl hover:scale-110 transition-transform" />
      </Link>
    </nav>
  );
};

export default Navigation;
