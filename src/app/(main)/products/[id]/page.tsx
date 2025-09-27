import AddToCartBtn from "@/app/_Component/AddToCartBtn/AddToCartBtn";
import AddWishList from "@/app/_Component/AddToWishList/AddToWishList";
import ProductDetailsSlider from "@/app/_Component/ProductDetailsSlider/ProductDetailsSlider";
import { ProductDetails, productItem } from "@/types/productDetails.type";
import React from "react";

export default async function productDetailsPage({params}: {params: Promise<{id:string}>}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
  );
  const data: ProductDetails = await response.json();
  const product: productItem = data.data;
  const {
    price,
    category: { name },
    ratingsAverage,
    title,
    description,
    images,
    _id
  } = product;
  return (
    <>
      <div className=" lg:w-10/12 mx-auto my-10 p-5 rounded-2xl border dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 shadow-lg">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-4 rounded-2xl m-4">
            <ProductDetailsSlider images={images} title={title}/>
          </div>
          <div className="col-span-12 md:col-span-8 space-y-7 self-center text-center px-10">
            <h3 className=" text-blue-900 text-start text-3xl">{title}</h3>
            <p className="text-gray-500 text-start">{description}</p>
            <h4 className=" text-pink-700 text-start ">{name}</h4>
            <div className="flex justify-between items-center">
              <h4>{price} EG</h4>
              <h4>
                <i className="fa-solid fa-star text-orange-400"></i>{" "}
                {ratingsAverage}
              </h4>
              <AddWishList id={_id}/>
            </div>
            <AddToCartBtn id={_id}/>
          </div>
        </div>
      </div>
    </>
  );
}
