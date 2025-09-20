import { getCartData} from "@/app/CartActions/AddToCard.action";
import { CartItem, OrderData } from "@/types/orders.type";
import Image from "next/image";
import React from "react";

export default async function Orders() {
  const cartData = await getCartData();
  const cartOwnerId = cartData.data.cartOwner;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${cartOwnerId}`
  );
  const data: OrderData = await response.json();
  const orderItems: CartItem[] = data.cartItems
  

  return orderItems  ? (
    <>
      <div className="w-10/12 mx-auto my-10">
        <h2 className="text-center text-3xl mx-auto mt-5 text-pink-700 animate__animated animate__fadeInDown">
          Orders List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-2xl my-10">
          {orderItems.map((item) => {
            return (
              <div
                key={item._id}
                className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={300}
                    height={300}
                    className="w-full h-72 object-cover rounded-t-2xl"
                  />
                  <h4 className="text-start  text-pink-700">
                    {item.product.category.name}
                  </h4>
                  <h3 className=" text-blue-900 text-start ">
                    {item.product.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center">
                  <h4>{item.price} EG</h4>
                  <h4>
                    <i className="fa-solid fa-star text-orange-400"></i>
                    {item.product.ratingsAverage}
                  </h4>
                </div>
              </div>
            );
          })}
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
  );
}
