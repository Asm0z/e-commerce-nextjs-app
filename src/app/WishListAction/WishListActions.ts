"use server";
import { getUserToken } from "@/getUserToken";
import { WishListData } from "@/types/wishList.type";

export async function GetWishList(){
    const token = await getUserToken();
      if (!token) {
        throw new Error("not authorized, please Login!");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
          headers: {
            token: token as string,
          },
        }
      );
      const data:WishListData = await response.json();
      return data
}

export async function AddToWishList(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function RemoveWishList(id: string){
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
    {
        method: "DELETE",
        headers: {
            token: token as string,
          },
        }
  )  
  const data = await response.json();
  return data
}