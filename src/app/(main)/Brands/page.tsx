import { BrandItems, BrandsData } from "@/types/brands.type";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Online Store | Brands",
  description: "Explore our wide range brands with fast delivery ",
};

export default async function BrandsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`
  );
  const data: BrandsData = await response.json();
  const brandsList: BrandItems[] = data.data;

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-center text-3xl mx-auto mt-10 text-pink-700 animate__animated animate__fadeInDown">
        Explore our Brands collection
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rounded-2xl my-10 text-center">
        {brandsList.map((item) => {
          return (
            <div className="space-y-4 hover:shadow-2xl rounded-2xl transition-all duration-300" key={item._id}>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                className="w-full object-cover rounded-2xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
