import { productList, ProductsData } from "@/types/products.type";
import React from "react";
import ProductsCard from "./_Component/ProductsCard/ProductsCard";
import HomeSlider from "./_Component/HomeSlider/HomeSlider";
import CategoriesPage from "./_Component/CategoriesPage/CategoriesPage";
import SearchProducts from "./_Component/SearchProducts/SearchProducts";
import Link from "next/link";

export default async function Home() {
  const response = await fetch(
    `${process.env.Next_Public_Base_URL}/api/v1/products`
  );
  const data: ProductsData = await response.json();
  const productsList: productList[] = data.data;
  // Women's Fashion - Men's Fashion - Electronics
  const womenProducts = productsList.filter((product) =>
    product.category.name.includes("Women's Fashion")
  );
  const menProducts = productsList.filter((product) =>
    product.category.name.includes("Men's Fashion")
  );
  const electronicsProducts = productsList.filter((product) =>
    product.category.name.includes("Electronics")
  );

  return (
    <div className="w-10/12 mx-auto">
      <HomeSlider />
    <CategoriesPage />
      <h2 className="text-2xl lg:text-3xl mt-16 text-pink-700 text-center animate__animated animate__fadeInDown">
        Find All you need in one place!
      </h2>
      <SearchProducts products={productsList} />
      <div className="flex flex-row justify-start mt-10 items-center">
        <h2 className="text-pink-700 text-2xl ">Popular Women`s Collection:</h2>
        <Link className="hover:text-pink-700 mx-2" href="/womenProducts">
          See More <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl mb-10">
        {womenProducts.slice(0, 4).map((product) => {
          return <ProductsCard key={product._id} product={product} />;
        })}
      </div>

      <div className="flex flex-row justify-start mt-10 items-center">
        <h2 className="text-pink-700 text-2xl ">Popular Men`s Collection:</h2>
        <Link className="hover:text-pink-700 mx-2" href="/menProducts">
          See More <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl mb-10">
        {menProducts.slice(0, 4).map((product) => {
          return <ProductsCard key={product._id} product={product} />;
        })}
      </div>
      <div className="flex flex-row justify-start mt-10 items-center">
        <h2 className="text-pink-700 text-2xl ">
          Popular Electronics Collection:
        </h2>
        <Link className="hover:text-pink-700 mx-2" href="/electronicsProducts">
          See More <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl mb-10">
        {electronicsProducts.slice(0, 4).map((product) => {
          return <ProductsCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}
