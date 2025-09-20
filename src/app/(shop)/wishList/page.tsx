"use client";
import AddToCartBtn from "@/app/_Component/AddToCartBtn/AddToCartBtn";
import {
  GetWishList,
  RemoveWishList,
} from "@/app/WishListAction/WishListActions";
import { wishData, WishListData } from "@/types/wishList.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function WishList() {
  const [wishLoading, setWishLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  useEffect(() => {
    GetAllWishList();
  }, []);
  const [wish, setWish] = useState<wishData[]>([]);
  async function GetAllWishList() {
    setWishLoading(true);
    const data: WishListData = await GetWishList();
    setWish(data.data);
    setWishLoading(false);
  }

  async function deleteWishList(id: string) {
    setIsLoading(true);
    setCurrentId(id);
    const data = await RemoveWishList(id);
    if (data.status == "success") {
      toast.success(data.message, {
        duration: 2500,
        position: "top-center",
      });
      setWish(data.data);
    } else {
      toast.error("An Error Occurred", {
        duration: 2500,
        position: "top-center",
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      {wishLoading ? (
        <div className="w-full flex justify-center items-center bg-gray-300 dark:bg-transparent p-48">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {wish && wish.length > 0 ? (
            <>
              <div className="w-10/12 mx-auto my-10">
                <h2 className="text-center text-3xl mx-auto mt-5 text-pink-700 animate__animated animate__fadeInDown">
                  Wish List
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 rounded-2xl my-10">
                  {wish?.map((product) => {
                    return (
                      <div
                        key={product?.id}
                        className="rounded-2xl border space-y-4 p-5 hover:shadow-2xl transition duration-300 my-5 text-center dark:bg-gray-800 dark:border-0 dark:shadow-gray-400 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <Image
                            src={product?.imageCover}
                            alt={product?.title}
                            width={300}
                            height={300}
                            className="w-full h-72 object-cover rounded-t-2xl"
                          />
                          <h4 className="text-start  text-pink-700">
                            {product?.category?.name}
                          </h4>
                          <h3 className=" text-blue-900 text-start ">
                            {product?.title}
                          </h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4>{product?.price} EG</h4>
                          <h4>
                            <i className="fa-solid fa-star text-orange-400"></i>{" "}
                            {product?.ratingsAverage}
                          </h4>
                        </div>
                        <div>
                          <AddToCartBtn id={product?._id} />
                          <Button
                            disabled={isLoading && currentId == product?._id}
                            className="w-9/12 hover:w-11/12 transition-all duration-300 rounded-full hover:bg-pink-700 bg-pink-500 text-black hover:text-white text-center cursor-pointer"
                            onClick={() => deleteWishList(product?._id)}
                          >
                            Remove Wish List
                          </Button>
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
              Wish List is Empty
            </div>
          )}
        </>
      )}
    </>
  );
}
