import { getCategories } from "@/api";
import { extractCategories } from "@/utils/extractCategories";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (categoryLoading) {
    return <div>Loading...</div>;
  }

  if (categoryError) {
    return <div>An error occurred: {(categoryError as Error).message}</div>;
  }
  return (
    <nav className="w-[220px] border-r border-gray-200 h-screen bg-white flex shrink-0">
      <ul className="side-menu w-full flex flex-col px-5 py-10">
        {extractCategories(categoryData).map(
          ({ category, subCategories }, id) => (
            <React.Fragment key={id}>
              <Link to={`/#${category}`}  className="my-3">
                <li>{category}</li>
              </Link>
              <ul className="sub-category pl-3">
                {subCategories.map((subcategory, idx) => (
                  <Link to={`/#${subcategory}`} key={`${id}__${idx}`}>
                    <li>{subcategory}</li>
                  </Link>
                ))}
              </ul>
            </React.Fragment>
          )
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;
