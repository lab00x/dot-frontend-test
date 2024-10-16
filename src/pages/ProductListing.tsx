// import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/utils/extractCategories";
import SelectInput from "@/components/SelectInput";

const ProductListing = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (productsLoading) {
    return <div>Loading...</div>;
  }

  if (productsError) {
    return <div>An error occurred: {(productsError as Error).message}</div>;
  }

  return (
    <DashboardLayout>
      <main className="w-full min-h-screen">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg font-medium">All Products</h4>
          <Button asChild>
            <Link to="/product/new">Add New Product</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 my-5">
          <div className="flex items-center justify-between gap-x-5">
            <div className="input-group w-full">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <Input
                name="search"
                id="search"
                type="search"
                placeholder="Search Products..."
                className="w-full bg-white font-medium placeholder:font-normal"
              />
            </div>
            <div className="input-group">
              <label htmlFor="start_price" className="text-sm font-medium">
                Price Range
              </label>
              <div className="flex items-center gap-x-2">
                <Input
                  name="start_price"
                  id="start_price"
                  type="number"
                  className="w-[64px] bg-white font-medium placeholder:font-normal"
                  defaultValue={0}
                />
                <span>to</span>
                <Input
                  name="end_price"
                  id="end_price"
                  type="number"
                  className="w-[64px] bg-white font-medium placeholder:font-normal"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>

          <div className="input-group w-full flex flex-col items-end">
            <div>
              <label htmlFor="sortBy" className="text-sm font-medium">
                Sort By
              </label>
              <SelectInput
                options={[
                  { value: "price", label: "Price" },
                  { value: "category", label: "Category" },
                ]}
              />
            </div>
          </div>

          <div className="input-group">
            <div>
              <label htmlFor="order" className="text-sm font-medium">
                Order
              </label>
              <SelectInput
                options={[
                  { value: "asc", label: "Ascending" },
                  { value: "dsc", label: "Descending" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {productsData.products.map((product: Product, id: number) => (
            <ProductCard key={`product__${id}`} product={product} />
          ))}
        </div>

        <div className="pagination flex items-center justify-between py-10">
          <div className="flex items-center gap-2">
            <Button disabled={productsData.currentPage === 1}>Previous</Button>
            <span className="text-sm">Page {productsData.currentPage}</span>
            <Button
              disabled={productsData.currentPage >= productsData.totalPages}
            >
              Next
            </Button>
          </div>

          <SelectInput
            options={[
              { value: "2", label: "2 per page" },
              { value: "5", label: "5 per page" },
              { value: "10", label: "10 per page" },
              { value: "20", label: "20 per page" },
            ]}
            className="w-[100px]"
            placeholder="per page"
          />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProductListing;
