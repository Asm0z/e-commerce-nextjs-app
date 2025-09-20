import { productList, ProductsData } from "@/types/products.type";
import React from "react";
import SearchProducts from "@/app/_Component/SearchProducts/SearchProducts";
import ProductsCard from "@/app/_Component/ProductsCard/ProductsCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Store | Men's Collection",
  description: "Explore our wide range of men products with fast delivery ",
};

export default async function MenProducts() {
  const response = await fetch(
    `${process.env.Next_Public_Base_URL}/api/v1/products`
  );
  const data: ProductsData = await response.json();
  const productsList: productList[] = data.data;
  // Men's Fashion
  const menProducts = productsList.filter((product) => product.category.name.includes("Men's Fashion"));
  
  return (
    <div className="w-10/12 mx-auto">
      <SearchProducts products={productsList} />
        <h2 className="text-pink-700 text-2xl text-center">Men`s Fashion Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl mb-10">
        {menProducts.map((product) => {
          return <ProductsCard key={product._id} product={product}/>;
        })}
      </div>
    </div>
  );
}
