"use client";
import { AddToWishList } from "@/app/WishListAction/WishListActions";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddWishList({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  async function addWishList(id: string) {
    setIsLoading(true);
    const data = await AddToWishList(id);
    if (data.status === "success") {
      toast.success(data.message, {
        duration: 2500,
        position: "top-center",
      });
      setIsAdded(true);
    } else {
      toast.error(data.message, {
        duration: 2500,
        position: "top-center",
      });
    }
    setIsLoading(false);
  }
  return (
    <div>
      <Button
        disabled={isLoading}
        className={` bg-transparent hover:bg-transparent  cursor-pointer `}
        onClick={() => addWishList(id)}
      >
        <i
          className={`fa-solid fa-heart text-2xl align-middle focus:bg-transparent hover:text-pink-700 ${
            isAdded ? "!text-pink-700" : "text-black"
          }`}
        ></i>
      </Button>
    </div>
  );
}
