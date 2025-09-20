import { ProductCategory } from "@/types/categories";
import React from "react";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default async function CategoriesPage() {
  

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
  );
  const data: ProductCategory = await response.json();

  return (
    <>
      <CategoriesSlider productsCategory={data.data}/>
    </>
  );
}
