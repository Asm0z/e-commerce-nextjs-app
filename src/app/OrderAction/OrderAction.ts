"use server";
import { getUserToken } from "@/getUserToken";

export async function checkoutPayment(
  cartId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token = await getUserToken();
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,
      {
        method: "POST",
        body: JSON.stringify({
          shippingAddress: shippingData,
        }),
        headers: {
          token: token as string,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json()
    return data
  }
}
