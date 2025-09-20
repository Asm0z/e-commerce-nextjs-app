import SearchProducts from "@/app/_Component/SearchProducts/SearchProducts";
import { CategoryData, ProductCategory } from "@/types/categories";
import { productList, ProductsData } from "@/types/products.type";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Online Store | Our Categories",
  description: "Explore our wide range products with fast delivery ",
};

export default async function categoryPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
  );
  const catData: ProductCategory = await res.json();
  const categoryList: CategoryData[] = catData.data;

  // products api to call products search
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
    );
    const data: ProductsData = await response.json();
    const productsList: productList[] = data.data;
  
  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-center text-3xl mx-auto mt-5 text-pink-700 animate__animated animate__fadeInDown">
        Search the world - we`ll bring it to you!
      </h2>
      <SearchProducts products={productsList} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-2xl my-10">
        {categoryList.map((category) => {
          return (
            <div
              key={category._id}
              className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="w-full rounded-t-2xl"
              />
              <h3 className=" text-blue-900">{category.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
