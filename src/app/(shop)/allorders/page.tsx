"use client";
import AddToCartBtn from "@/app/_Component/AddToCartBtn/AddToCartBtn";
import AddWishList from "@/app/_Component/AddToWishList/AddToWishList";
import getOrdersData from "@/app/OrderAction/OrderAction";
import { OrderData } from "@/types/orders.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orderLoading, setOrderLoading] = useState(true);
  const [order, setOrder] = useState<OrderData[]>([]);
  useEffect(() => {
    getAllOrdersData();
  }, []);
  async function getAllOrdersData() {
    setOrderLoading(true);
    const data: OrderData[] = await getOrdersData();
    setOrder(data);
    setOrderLoading(false);
  }

  return (
    <>
      {orderLoading ? (
        <div className="w-full flex justify-center items-center bg-gray-300 dark:bg-transparent p-48">
          <span className="loader"></span>
        </div>
      ) : order.length > 0 ? (
        <>
          <div className="w-10/12 mx-auto my-10">
            <h2 className="text-center text-3xl mx-auto mt-5 text-pink-700 animate__animated animate__fadeInDown">
              Orders List
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-2xl my-10">
              {order.map((item) =>
                item.cartItems?.map((cartItem) => {
                  return (
                    <div
                      key={cartItem._id}
                      className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between relative"
                    >
                      <Link href={"/products/" + cartItem.product._id}>
                        <div className="space-y-4">
                          <Image
                            src={cartItem.product?.imageCover}
                            alt={cartItem.product?.title}
                            width={300}
                            height={300}
                            className="w-full h-72 object-cover rounded-t-2xl"
                          />
                          <h4 className="text-start  text-pink-700">
                            {cartItem.product?.category.name}
                          </h4>
                          <h3 className=" text-blue-900 text-start ">
                            {cartItem.product?.title}
                          </h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4>{cartItem.price} EG</h4>
                          <h4>
                            <i className="fa-solid fa-star text-orange-400"></i>
                            {cartItem.product?.ratingsAverage}
                          </h4>
                        </div>
                      </Link>
                      <AddToCartBtn id={cartItem.product._id} />
                      <div className="absolute top-2 right-2">
                        <AddWishList id={cartItem.product._id} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="py-44 w-full text-center text-2xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          Order List is Empty
        </div>
      )}
    </>
  );
}
