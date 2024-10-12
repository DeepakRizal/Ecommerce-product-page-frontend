import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./features/ContextProvider.jsx";
import Layout from "./components/Layout.jsx";
import Cart from "./components/Cart.jsx";
import ProductDescription from "./components/ProductDescription.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <App />
        </Layout>
      ),
    },
    {
      path: "/cart",
      element: (
        <Layout>
          <Cart />
        </Layout>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <Layout>
          <ProductDescription />
        </Layout>
      ),
    },
  ],
  {
    basename: "/Ecommerce-product-page-frontend",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
