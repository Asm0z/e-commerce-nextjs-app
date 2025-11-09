import React from "react";
import Image from "next/image";
import { productList } from "@/types/products.type";
import Link from "next/link";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import AddWishList from "../AddToWishList/AddToWishList";

export default function ProductsCard({ product }: { product: productList}) {
  const {
    imageCover,
    price,
    category: { name },
    ratingsAverage,
    title,
    _id,
  } = product;
  return (
    <div className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between relative">
      <Link href={"/products/" + _id}>
        <div className="space-y-4">
          <Image
            src={imageCover}
            alt={title}
            width={300}
            height={300}
            className="w-full h-72 object-cover rounded-t-2xl"
          />
          <h4 className="text-start  text-pink-700">{name}</h4>
          <h3 className=" text-blue-900 text-start line-clamp-1">{title}</h3>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <h4>{price} EG</h4>
        <h4>
          <i className="fa-solid fa-star text-orange-400"></i> {ratingsAverage}
        </h4>
      </div>
      <AddToCartBtn id={_id}/>
      <div className="absolute top-2 right-2">
        <AddWishList id={_id}/>
      </div>
    </div>
  );
}
