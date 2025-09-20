"use client";
import {
  clearCart,
  getCartData,
  removeProduct,
  updateProductQuantity,
} from "@/app/CartActions/AddToCard.action";
import { Button } from "@/components/ui/button";
import { countContext } from "@/CountProvider";
import type { Cart, CartData } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [cartLoading, setCartLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [countDisable, setCountDisable] = useState(false);
  const {setCount} = useContext(countContext)

  const [cart, setCart] = useState<Cart>();
  useEffect(() => {
    GetAllCartData();
  }, []);

  async function GetAllCartData() {
    setCartLoading(true);
    const data: CartData = await getCartData();
    setCart(data.data);
    setCartLoading(false);
  }
  async function deleteProduct(id: string) {
    const data = await removeProduct(id);
    if (data.status == "success") {
      toast.success("Product Deleted", {
        duration: 2500,
        position: "top-center",
      });
      setCart(data.data);
      const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count,0)
      setCount(sum)
    } else {
      toast.error("An Error Occurred", {
        duration: 2500,
        position: "top-center",
      });
    }
  }

  async function handleClearCart() {
    const data = await clearCart();
    if (data.message == "success") {
      toast.success("Cart Deleted", {
        duration: 2500,
        position: "top-center",
      });
      setCart(undefined);
      setCount(0);
    }
  }

  async function updateProductCount(id:string, count:number){
    setCountLoading(true);
    setCurrentId(id);
    setCountDisable(true);
    const data = await updateProductQuantity(id, count);
    if (data.status == "success") {
      setCart(data.data);
      const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count,0)
      setCount(sum)
    }
    setCountLoading(false);
    setCountDisable(false);
  }

  return (
    <>
      {cartLoading ? (
        <div className="w-full flex justify-center items-center bg-gray-300 dark:bg-transparent p-48">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {cart != undefined && cart?.totalCartPrice != 0 ? (
            <>
              <h2 className="text-3xl text-center my-10 ">Your Cart</h2>
              <div className="flex justify-between items-center w-10/12 mx-auto my-5">
              <h3 className="text-2xl text-pink-700 ms-5">
                Total Price: {cart?.totalCartPrice} EG
              </h3>
                <Button disabled={countDisable}
                  onClick={handleClearCart}
                  className=" rounded-full hover:bg-red-700 bg-red-400 text-black hover:text-white text-center cursor-pointer me-5"
                >
                  Clear Cart
                </Button>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10 w-10/12 mx-auto dark ">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                  <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Product Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.products.map((item) => {
                      return (
                        <tr
                          key={item._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="p-4">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={100}
                              height={150}
                              className="w-16 md:w-32 max-w-full mx-auto"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.product.title}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <Button disabled={countDisable}
                              onClick={()=> updateProductCount(item.product._id, item.count -=1)}
                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                {
                                  item.count == 1 ? 
                                  <i className="fa-solid fa-trash-can"></i>
                                  :
                                  <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                                }
                              </Button>
                              <div>
                                {
                                  countLoading && currentId == item.product._id ? <i className="fa-solid fa-spinner fa-spin"></i>
                                  :
                                  <span> {item.count}</span>
                                }
                              </div>
                              <Button disabled={countDisable}
                              onClick={()=> updateProductCount(item.product._id, item.count +=1)}
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.count <= 1
                              ? `${item.price}`
                              : `(${item.price} x ${item.count}) = ${
                                  item.price * item.count
                                }`}
                            EG
                          </td>
                          <td className="px-6 py-4">
                            <Button disabled={countDisable}
                              className="bg-transparent hover:bg-transparent"
                              onClick={() => deleteProduct(item.product._id)}
                            >
                              <i className="fa-solid fa-trash-can text-red-500 cursor-pointer"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className=" text-center my-10">
                <Link href={"/checkoutsession/"+cart._id}
                  className="transition-all duration-300 rounded-full hover:bg-pink-900 bg-pink-700 text-black hover:text-white text-center px-10 py-3 hover:px-15"
                >
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <div
              className="py-44 w-full text-center text-2xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              Cart Empty
            </div>
          )}
        </>
      )}
    </>
  );
}
