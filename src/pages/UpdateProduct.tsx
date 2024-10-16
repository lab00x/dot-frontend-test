import React from "react";
import { useMutation } from "@tanstack/react-query";
import { updateProduct, ProductPayload, ProductResponse } from "../api"; // Adjust the import based on your setup
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const mutation = useMutation<
    ProductResponse,
    Error,
    { productId: string } & ProductPayload
  >({
    mutationFn: ({ productId, ...payload }) =>
      updateProduct(productId, payload),
    onSuccess: (data: ProductResponse) => {
      console.log("Product updated:", data);
    },
    onError: (error: Error) => {
      console.error("Error updating product:", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData: ProductPayload = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      brand: "",
      category: "",
      description: "",
      image_url: "",
      specifications: [],
      stock: 0,
      subCategory: "",
    };
    if (productId) {
      mutation.mutate({ productId, ...productData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Updated Product Name"
        required
      />
      <input name="price" type="number" placeholder="Updated Price" required />
      {/* Add additional fields for other properties you want to update */}
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
