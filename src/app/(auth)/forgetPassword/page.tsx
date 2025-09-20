"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const schema = z.object({
    email: z.email("invalid Email Format").nonempty("Email is Required"),
  });
  const forgetPasswordForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function handleForgetPassword(values: z.infer<typeof schema>) {
    setBtnLoading(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBtnLoading(true);

    if (data.statusMsg === "success") {
      toast.success(data.message, {
        duration: 2500,
        position: "top-center",
      });
      Route.push("/resetPassword");
    } else {
      toast.error(data.message, {
        duration: 2500,
        position: "top-center",
      });
    }
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-2 items-center  my-10 md:my-20 w-10/12 mx-auto">
      <div className="hidden md:block">
        <Image
          src="/images/Forgot-password.svg"
          alt="register"
          width={500}
          height={500}
          className="w-10/12 px-10"
        />
      </div>
      <div className="text-center mx-7">
        <h3 className="text-pink-700 mb-3 animate__animated animate__fadeInDown">
          Forgot Your Password!? Don`t Worry{" "}
        </h3>
        <Form {...forgetPasswordForm}>
          <form
            onSubmit={forgetPasswordForm.handleSubmit(handleForgetPassword)}
            className="space-y-5"
          >
            <FormField
              control={forgetPasswordForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="email"
                      label="Email:"
                      id="email"
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
                Send Reset Link
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
    </div>
  );
}
