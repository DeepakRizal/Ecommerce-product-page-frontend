import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../features/ContextProvider";
import { SearchContext } from "../features/searchContext";

const Navigation = () => {
  const { cart } = useContext(CartContext);
  const { query, setQuery } = useContext(SearchContext);
  const totalProduct = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-lg sm:text-xl tracking-wide hover:text-gray-200 transition-colors whitespace-nowrap"
        >
          Product Page
        </Link>

        {/* Search (centered for medium+ screens) */}
        <div className="hidden sm:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-sm px-3 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative flex items-center">
          {cart.length > 0 && (
            <span className="bg-orange-500 text-white w-5 h-5 rounded-full text-xs absolute flex items-center justify-center -top-2 -right-2">
              {totalProduct}
            </span>
          )}
          <ShoppingCartIcon className="text-white text-2xl hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Search visible below for mobile */}
      <div className="sm:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded-md text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
      </div>
    </nav>
  );
};

export default Navigation;
