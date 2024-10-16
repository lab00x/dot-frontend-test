import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct, ProductPayload, ProductResponse } from "../api"; // Adjust the import based on your setup
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { camelCaseSpacing } from "@/utils/camelCaseSpacing";

const AddNewProduct = () => {
  const navigateTo = useNavigate();

  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specifications, setSpecifications] = useState<{
    [key: string]: string;
  }>({});

  const addSpecification = () => {
    if (!specKey || !specValue) {
      toast("Empty specification cannot be added.");
    } else if (Object.keys(specifications).find((key) => key === specKey)) {
      toast.error("Specification already exist");
    } else {
      setSpecifications({
        ...specifications,
        [specKey]: specValue,
      });
      setSpecKey("");
      setSpecValue("");
      toast.success("Specification added");
    }
  };
  const mutation = useMutation<ProductResponse, Error, ProductPayload>({
    mutationFn: ({ ...payload }) => createProduct(payload),
    onSuccess: (data: ProductResponse) => {
      console.log("Product updated:", data);
      toast.success("Product created successfully");
      navigateTo("/");
    },
    onError: (error: Error) => {
      console.error("Error updating product:", error);
      toast.error(error.message ?? "Error occured");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData: ProductPayload = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      subCategory: formData.get("subCategory") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string, 10),
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      specifications: specifications,
    };

    mutation.mutate(productData);
  };

  return (
    <DashboardLayout>
      <main className="w-full min-h-screen">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg font-medium">Create New Product</h4>
        </div>
        <div className="w-full my-5 bg-white rounded-xl p-5">
          <h4 className="text-md font-medium my-3">Create New Product</h4>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 my-10 gap-5"
          >
            <Input
              label="Product Name"
              name="name"
              type="text"
              placeholder="Product Name"
              required
            />
            <Input
              label="Brand"
              name="brand"
              type="text"
              placeholder="Brand"
              required
            />
            <Input
              label="Category"
              name="category"
              type="text"
              placeholder="Category"
              required
            />
            <Input
              label="Sub category"
              name="subCategory"
              type="text"
              placeholder="Sub-category"
              required
            />
            <Input
              label="Price"
              name="price"
              type="number"
              placeholder="Price"
              required
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              placeholder="Stock"
              required
            />
            <Textarea
              label="Description"
              name="description"
              placeholder="Description"
              required
              fullCol={true}
              className="resize-none"
            />
            <Input
              label="Image URL"
              name="imageUrl"
              type="file"
              placeholder="Image URL"
              required
              fullCol={true}
              className="col-span-2"
            />

            <div className="w-full col-span-2 grid grid-cols-2 gap-5">
              <Input
                value={specKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSpecKey(e.target.value)
                }
                label="Specifications"
                name="spec_key"
                placeholder="Specification Key"
              />
              <div className="w-full flex items-center gap-2 pt-5">
                <Input
                  value={specValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSpecValue(e.target.value)
                  }
                  name="spec_value"
                  placeholder="Specification Value"
                  className="w-full"
                />
                <Button
                  type="button"
                  onClick={addSpecification}
                  className="mt-3"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="col-span-2 mt-5">
              {Object.keys(specifications).map((key: string, id: number) => {
                const value = specifications[key];
                return (
                  <div key={id} className="flex items-center">
                    <span className="font-medium text-sm">
                      {camelCaseSpacing(key)}:{" "}
                    </span>
                    <span className="text-md px-3.5">{value}</span>
                  </div>
                );
              })}
            </div>

            <div className="col-span-2 mt-10 flex items-center justify-between">
              <Button type="submit">Create Product</Button>
              <Button
                onClick={() => navigateTo("/")}
                type="button"
                className="bg-white hover:bg-white text-black border border-gray-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AddNewProduct;
