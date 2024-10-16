import { SVGS } from "@/assets/SVGS";
import { Product } from "@/utils/extractCategories";
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";
import productImageUrl from "@/assets/images/product-not-found.png";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function ProductCard({ product }: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [isDefaultImg, setIsDefaultImg] = useState(false);
  const { addToCart, cart, removeFromCart } = useCart();
  const productInCart = cart.find((item) => item.id == product.id);
  const handleOnError = () => {
    setImgSrc(productImageUrl); // Use the fallback image if the primary fails
    setIsDefaultImg(true);
  };

  return (
    <div className="w-full min-h-[320px] overflow-hidden rounded-lg shadow-sm border border-gray-200">
      <div className=" relative image-container flex items-center justify-center w-full h-[200px] bg-gray-200">
        <img
          src={imgSrc}
          alt="product_image_not_found"
          className={twMerge(
            "w-full h-full absolute object-contain",
            isDefaultImg && "w-[75px] h-[75px] relative opacity-10"
          )}
          onError={handleOnError}
        />
        {/* <img
          src={productImageUrl}
          alt="product_image_not_found"
          className="w-full h-full absolute object-contain"
        /> */}
      </div>
      <div className="w-full min-h-[170px] bg-white px-4 py-2 flex flex-col gap-1.5">
        <h5 className="text-md font-semibold">{product.name}</h5>
        <p className="text-sm">{product.brand ?? product.category}</p>
        <div className="star-rating flex items-center gap-1">
          <span className="w-4 flex">
            <SVGS.StarIcon />
          </span>
          <span className="font-medium text-sm">{product.rating}</span>
          <span className="font-normal text-gray-600 text-sm">
            ({product.reviews} reviews)
          </span>
        </div>
        <h3 className="text-lg font-semibold">${product.price}</h3>

        <Button
          className={twMerge(
            "w-full",
            productInCart &&
              "bg-transparent hover:bg-gray-200 border text-black border-black"
          )}
          onClick={() =>
            productInCart
              ? removeFromCart(product.id)
              : addToCart(product.id, product.name, 1)
          }
        >
          {productInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
