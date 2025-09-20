"use server";
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";

// get cart
export async function getCartData() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      headers: {
        token: token as string,
      },
    }
  );
  const data: CartData = await response.json();
  return data;
}

// add to cart
export async function AddProductToCart(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
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

// remove from cart
export async function removeProduct(id:string){
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    }
  );
  const data = await response.json();
  return data
}

// clear cart
export async function clearCart(){
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    }
  );
  const data = await response.json();
  return data
}

// update quantity

export async function updateProductQuantity(id:string, count:number){
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "PUT",
      body:JSON.stringify(
        {
          count: count
        }
      ),
      headers: {
        token: token as string,
        "content-type": "application/json",
      }
    }
  )
  const data = await response.json();
  return data
}

// cart count 
export async function getCartCount(){
  const token = await getUserToken();
  if(token){
    const data:CartData = await getCartData()
    const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count,0)
    return sum;
  }
}


// get cart to order
export async function getOrderId() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("not authorized, please Login!");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      headers: {
        token: token as string,
      },
    }
  );
  const data: CartData = await response.json();
  const OwnerId:string = data.data.cartOwner
  console.log("cart owner", OwnerId)
  return OwnerId;
}