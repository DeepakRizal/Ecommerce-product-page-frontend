import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../features/ContextProvider";

const Navigation = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex px-10 md:px-6 lg:px-10 py-4 justify-between bg-blue-900 text-white">
      <Link to={"/"} className=" font-bold ">
        Product page
      </Link>
      <Link to={"/cart"} className=" relative ">
        {cart.length > 0 && (
          <span className="bg-orange-500 w-5 h-5 rounded-full text-xs absolute flex items-center justify-center top-[-10px] right-[-13px]">
            {cart.length}
          </span>
        )}
        <ShoppingCartIcon />
      </Link>
    </div>
  );
};

export default Navigation;
