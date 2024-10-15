// import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../api";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => (productId ? fetchSingleProduct(productId) : ""),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>Data Fetching with TanStack Query</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProductDetails;
