import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  updateProduct,
  ProductPayload,
  ProductResponse,
  fetchSingleProduct,
} from "../api"; // Adjust the import based on your setup
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { camelCaseSpacing } from "@/utils/camelCaseSpacing";
import { FileInput } from "@/components/ui/fileInput";

const UpdateProduct = () => {
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
      toast.success("Product created successfully");
      navigateTo("/");
    },
    onError: (error: Error) => {
      console.error("Error updating product:", error);
      toast.error(error.message ?? "Error occured");
    },
  });

  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => (productId ? fetchSingleProduct(productId) : ""),
  });

  const [payload, setPayload] = useState<ProductPayload>({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    price: 0,
    brand: "",
    subCategory: "",
    stock: 0,
    specifications: {},
  });

  useEffect(() => {
    console.log(productData);
    setPayload({
      name: productData?.name,
      category: productData?.category,
      description: productData?.description,
      imageUrl: productData?.imageUrl,
      price: productData?.price,
      brand: productData?.brand,
      subCategory: productData?.subCategory,
      stock: productData?.stock,
      specifications: productData?.specifications,
    });
    setSpecifications(productData?.specifications ?? {});
  }, [productData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productData: ProductPayload = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      brand: "",
      category: "",
      description: "",
      imageUrl: "",
      specifications: {},
      stock: 0,
      subCategory: "",
    };
    if (productId) {
      mutation.mutate({ productId, ...productData });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  return (
    <DashboardLayout>
      {productError ? (
        <div>An error occurred: {(productError as Error).message}</div>
      ) : (
        <main className="w-full min-h-screen">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-lg font-medium">Edit Product</h4>
          </div>
          <div className="w-full my-5 bg-white rounded-xl p-5">
            <h4 className="text-md font-medium my-3">Edit Product</h4>
            {productLoading ? (
              <Spinner />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 my-10 gap-5"
              >
                <Input
                  value={payload.name}
                  onChange={handleInputChange}
                  label="Product Name"
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  required
                />
                <Input
                  value={payload.brand}
                  onChange={handleInputChange}
                  label="Brand"
                  name="brand"
                  type="text"
                  placeholder="Brand"
                  required
                />
                <Input
                  value={payload.category}
                  onChange={handleInputChange}
                  label="Category"
                  name="category"
                  type="text"
                  placeholder="Category"
                  required
                />
                <Input
                  value={payload.subCategory}
                  onChange={handleInputChange}
                  label="Sub category"
                  name="subCategory"
                  type="text"
                  placeholder="Sub-category"
                  required
                />
                <Input
                  value={payload.price}
                  onChange={handleInputChange}
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  required
                />
                <Input
                  value={payload.stock}
                  onChange={handleInputChange}
                  label="Stock"
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  required
                />
                <Textarea
                  value={payload.description}
                  onChange={handleInputChange}
                  label="Description"
                  name="description"
                  placeholder="Description"
                  required
                  fullCol={true}
                  className="resize-none"
                />
                <FileInput
                  value={payload.imageUrl}
                  onChange={handleInputChange}
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
                  {Object.keys(specifications).map(
                    (key: string, id: number) => {
                      const value = specifications[key];
                      return (
                        <div key={id} className="flex items-center">
                          <span className="font-medium text-sm">
                            {camelCaseSpacing(key)}:{" "}
                          </span>
                          <span className="text-md px-3.5">{value}</span>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="col-span-2 mt-10 flex items-center justify-between">
                  <Button type="submit">Update Product</Button>
                  <Button
                    onClick={() => navigateTo("/")}
                    type="button"
                    className="bg-white hover:bg-white text-black border border-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </main>
      )}
    </DashboardLayout>
  );
};

export default UpdateProduct;
