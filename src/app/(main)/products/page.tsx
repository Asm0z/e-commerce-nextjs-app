import ProductLoading from "@/app/_Component/ProductLoading/ProductLoading";
import ProductsCard from "@/app/_Component/ProductsCard/ProductsCard";
import SearchProducts from "@/app/_Component/SearchProducts/SearchProducts";
import { productList, ProductsData } from "@/types/products.type";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Online Store | Our Products",
  description: "Explore our wide range products with fast delivery ",
};

export default async function productsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
  );
  const data: ProductsData = await response.json();
  const productsList: productList[] = data.data;

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-center text-3xl mx-auto mt-5 text-pink-700 animate__animated animate__fadeInDown">
        Explore our full collection - everything you need is here!
      </h2>
      <SearchProducts products={productsList} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-2xl my-10">
        <Suspense fallback={<ProductLoading />}>
          {productsList.map((product) => {
            return <ProductsCard key={product._id} product={product} />;
          })}
        </Suspense>
      </div>
    </div>
  );
}
