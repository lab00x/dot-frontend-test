import { Product } from "@/utils/extractCategories";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full min-h-[320px] rounded-lg">
      {JSON.stringify(product)}
    </div>
  );
}

export default ProductCard;
