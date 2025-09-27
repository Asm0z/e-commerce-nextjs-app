"use client";
import { AddProductToCart } from "@/app/CartActions/AddToCard.action";
import { Button } from "@/components/ui/button";
import { countContext } from "@/CountProvider";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToCartBtn({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const {setCount} = useContext(countContext);
  async function addProduct(id: string) {
    try{
      setIsLoading(true);
    const data = await AddProductToCart(id);
    if (data.status == "success") {
      toast.success(data.message, {
        duration: 2500,
        position: "top-center",
      });
      const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count,0)
      setCount(sum)
    }else{
        toast.error("An Error Occurred", {
        duration: 2500,
        position: "top-center",
      });
    }
  }catch{
    toast.error("Login to add products to your cart", {
      duration: 2500,
      position: "top-center",
    })
    setIsLoading(false);
    }
  }
  return (
    <div>
      <Button disabled={isLoading}
        className="w-9/12 hover:w-11/12 transition-all duration-300 rounded-full hover:bg-blue-900 bg-blue-300 text-black hover:text-white text-center my-4 self-center cursor-pointer"
        onClick={() => addProduct(id)}
      >
        Add To Cart <i className="fa-solid fa-cart-arrow-down ms-1"></i>
      </Button>
    </div>
  );
}
