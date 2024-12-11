const BASE_URL = "https://localhost:7184/api";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};


