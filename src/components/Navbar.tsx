import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SVGS } from "@/assets/SVGS";
import useCart from "@/hooks/useCart";

function Navbar() {
  const { getCart } = useCart();
  return (
    <nav className="flex items-center justify-between w-full h-14 border-b border-gray-200 px-40">
      <Link to="" className="text-lg font-semibold">
        LOGO
      </Link>
      <Button className="bg-white relative shadow-none hover:bg-white">
        <span className="absolute rounded-full -top-1 left-10 bg-black py-1 px-2 text-xs text-white">
          {getCart().length}
        </span>
        <SVGS.CartIcon />
      </Button>
    </nav>
  );
}

export default Navbar;
