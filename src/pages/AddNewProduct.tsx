import React from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct, ProductPayload, ProductResponse } from "../api"; // Adjust the import based on your setup

const AddNewProduct = () => {
  const mutation = useMutation<ProductResponse, Error, ProductPayload>(
    createProduct,
    {
      onSuccess: (data: ProductResponse) => {
        console.log("Product created:", data);
      },
      onError: (error: Error) => {
        console.error("Error creating product:", error);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData: ProductPayload = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      sub_category: formData.get("sub_category") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string, 10),
      description: formData.get("description") as string,
      image_url: formData.get("image_url") as string,
      specifications: [], // You can populate this based on your application's needs
    };

    mutation.mutate(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Product Name" required />
      <input name="brand" type="text" placeholder="Brand" required />
      <input name="category" type="text" placeholder="Category" required />
      <input
        name="sub_category"
        type="text"
        placeholder="Sub-category"
        required
      />
      <input name="price" type="number" placeholder="Price" required />
      <input name="stock" type="number" placeholder="Stock" required />
      <textarea name="description" placeholder="Description" required />
      <input name="image_url" type="url" placeholder="Image URL" required />
      {/* Add fields for specifications as needed */}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default AddNewProduct;
