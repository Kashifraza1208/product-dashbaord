import { toast } from "react-toastify";

const BASE_URL = "https://dummyjson.com/products";

const fetchAPI = async (
  url: string,
  options: RequestInit,
  successMessage?: string
) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (successMessage) {
      toast.success(successMessage);
    }

    return data;
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
    throw error;
  }
};

export const getProducts = async () => {
  const data = await fetchAPI(BASE_URL, { method: "GET" });

  return data.products;
};

export const addProduct = async (inputData: any) => {
  return await fetchAPI(
    `${BASE_URL}/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    },
    "Product added successfully!"
  );
};

export const deleteProduct = async (productId: string) => {
  return await fetchAPI(
    `${BASE_URL}/${productId}`,
    { method: "DELETE" },
    "Product deleted successfully!"
  );
};

export const updateProduct = async (productId: string, inputData: any) => {
  return await fetchAPI(
    `${BASE_URL}/${productId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    },
    "Product updated successfully!"
  );
};
