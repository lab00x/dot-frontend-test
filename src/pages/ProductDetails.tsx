// import React from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, fetchSingleProduct, ProductResponse } from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { SVGS } from "@/assets/SVGS";
import { twMerge } from "tailwind-merge";
import productImageUrl from "@/assets/images/product-not-found.png";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { camelCaseSpacing } from "@/utils/camelCaseSpacing";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigateTo = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const [isDefaultImg, setIsDefaultImg] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => (productId ? fetchSingleProduct(productId) : ""),
  });

  const deleteMutation = useMutation<
    ProductResponse,
    Error,
    { productId: string }
  >({
    mutationFn: ({ productId }) => deleteProduct(productId),
    onSuccess: (data: ProductResponse) => {
      console.log("Product Delete:", data);
      toast.success("Product deleted successfully");
      navigateTo("/");
    },
    onError: (error: Error) => {
      console.error("Error deleting product:", error);
      toast.error(error.message ?? "Error occured");
    },
  });

  const handleOnError = () => {
    setImgSrc(productImageUrl); // Use the fallback image if the primary fails
    setIsDefaultImg(true);
  };
  useEffect(() => {
    if (!product?.imageUrl) {
      setImgSrc(productImageUrl);
      setIsDefaultImg(true);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {(error as Error).message}</div>;
  }

  const productInCart = cart.find((item) => item.id == product.id);

  return (
    <DashboardLayout>
      <main className="w-full min-h-screen">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg font-medium">Product Details</h4>
        </div>
        <div className="w-full my-5 bg-white rounded-xl overflow-hidden">
          <div className="w-full flex items-center h-20 border-b border-gray-200 px-5">
            <Button
              onClick={() => navigateTo("/")}
              className="shadow-none bg-transparent hover:bg-transparent text-black flex items-center gap-x-3"
            >
              <span className="flex w-4">
                <SVGS.ArrowLeft />
              </span>
              <span className="text-md font-medium">Back to Products</span>
            </Button>
          </div>
          <div className="w-full h-full grid grid-cols-6 items-center">
            <div className="w-full min-h-[400px] h-full flex items-center justify-center col-span-2 relative bg-gray-100">
              <img
                src={imgSrc}
                alt="product_image_not_found"
                className={twMerge(
                  "w-full h-full absolute object-contain",
                  isDefaultImg && "w-[75px] h-[75px] relative opacity-10"
                )}
                onError={handleOnError}
              />
            </div>
            <div className="col-span-4 p-5">
              <label
                htmlFor=""
                className="group flex items-center font-medium gap-1 uppercase text-sm text-purple-700"
              >
                <span>{product.category}</span>
                <span className="flex w-4 -rotate-90">
                  <SVGS.CheveronDownIcon />
                </span>
                <span>{product.subCategory}</span>
              </label>
              <h3 className="text-2xl mt-4 mb-1 font-bold capitalize">
                {product.name}
              </h3>
              <p className="text-gray-500 text-[17px] font-medium_">
                {product.description}
              </p>
              <h3 className="text-3xl mt-4 mb-1 font-bold capitalize">
                {formatCurrency(product.price)}{" "}
                <span className="text-gray-500 text-sm">
                  In stock: {product.stock}
                </span>
              </h3>
              <div className="star-rating flex items-center gap-1">
                <span className="w-4 flex">
                  <SVGS.StarIcon />
                </span>
                <span className="font-medium text-sm">{product.rating}</span>
                <span className="font-normal text-gray-600 text-sm">
                  ({product.reviews} reviews)
                </span>
              </div>

              <h5 className="text-lg font-semibold mt-2 mb-3">
                Specifications
              </h5>
              {Object.keys(product.specifications).map(
                (key: string, id: number) => {
                  const value = product.specifications[key];
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

              <div className="w-full my-5 flex gap-3">
                <Button
                  onClick={() =>
                    productInCart
                      ? removeFromCart(product.id)
                      : addToCart(product.id, product.name, 1)
                  }
                  className={
                    productInCart &&
                    "bg-white hover:bg-white border border-black text-black"
                  }
                >
                  {productInCart ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button asChild className="bg-blue-700">
                  <Link to={`/edit-product/${product.id}`}>Edit Product</Link>
                </Button>
                <Button
                  onClick={() =>
                    deleteMutation.mutate({
                      productId: product.id,
                    })
                  }
                  className="bg-red-500 hover:bg-red-500 hover:bg-opacity-40"
                >
                  Delete Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProductDetails;
