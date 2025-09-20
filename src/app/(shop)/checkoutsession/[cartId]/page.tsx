"use client";
import { checkoutPayment } from "@/app/OrderAction/OrderAction";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckOutSession() {
  const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const schema = z.object({
    details: z.string().nonempty("Details is Required"),
    phone: z
      .string()
      .regex(
        /^(\+2)?01[0125][0-9]{8}$/,
        "Phone number must be a valid Egyptian phone number"
      )
      .nonempty("Phone is Required"),
    city: z.string().nonempty("City is Required"),
  });

  const { cartId }: { cartId: string } = useParams();
  const shippingForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function checkoutSessionPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    setBtnLoading(false);
    const data = await checkoutPayment(cartId, values);
    setBtnLoading(true);
    window.open(data.session.url, "_blank");
  }
  return (
    <div className="w-10/12 mx-auto my-10 text-center">
      <h1 className="text-2xl text-pink-700 mb-5">Checkout Payment</h1>
      <Form {...shippingForm}>
        <form
          onSubmit={shippingForm.handleSubmit(checkoutSessionPayment)}
          className="space-y-5"
        >
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem className="relative group">
                <FormControl>
                  <FloatingLabelInput
                    type="text"
                    label="Details:"
                    id="details"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative group">
                <FormControl>
                  <FloatingLabelInput
                    type="text"
                    label="Phone:"
                    id="phone"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem className="relative group">
                <FormControl>
                  <FloatingLabelInput
                    type="text"
                    label="City:"
                    id="city"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {btnLoading ? (
            <Button className="w-10/12 hover:w-full transition-all duration-300 rounded-full hover:bg-blue-900 bg-blue-300 text-black hover:text-white text-center my-4 cursor-pointer">
              Payment
            </Button>
          ) : (
            <Button
              disabled
              type="button"
              className="w-full rounded-full bg-blue-900 text-center my-4"
            >
              Processing...
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
