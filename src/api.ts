import axios from "axios";

const isProduction = import.meta.env.VITE_ENV === "production";

const axiosInstance = axios.create({
  baseURL: isProduction ? "" : "http://localhost:3000/api",
});

interface Specification {
  key: string;
  value: string;
}

export interface ProductPayload {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  image_url: string;
  specifications: Specification[];
}

export interface ProductResponse {
  id: string; // or whatever properties your response includes
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  description: string;
  image_url: string;
  specifications: Specification[];
}

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

// Products
export const fetchProducts = async () => {
  const query = {
    page: 1,
    limit: 10,
    sort: "id",
    order: "asc",
    search: "",
  };
  try {
    const response = await axiosInstance.get("/products", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchSingleProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const createProduct = async (
  payload: ProductPayload
): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`/products`, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const updateProduct = async (
  productId: string,
  payload: ProductPayload
) => {
  try {
    const response = await axiosInstance.patch(`/${productId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axiosInstance.delete(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
