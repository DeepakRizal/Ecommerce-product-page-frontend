const baseUrl = "https://dummyjson.com";

export const fetchAllProducts = async (skip = 0) => {
  const response = await fetch(`${baseUrl}/products?limit=20&skip=${skip}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = await response.json();

  return data.products;
};

export const fetchAProduct = async (id) => {
  const response = await fetch(`${baseUrl}/products/${id}`);

  if (!response.ok) throw new Error("Failed to fetch product details");

  return response.json();
};
