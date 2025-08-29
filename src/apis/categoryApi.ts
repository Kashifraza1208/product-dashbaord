import axios from "axios";
const BASE_URL = "https://dummyjson.com/products";

export const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
};
