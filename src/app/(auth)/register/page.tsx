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
import Link from "next/link";

export default function RegisterPage() {
  const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const schema = z
    .object({
      name: z
        .string()
        .nonempty("Name is Required")
        .max(20, "Name must be less than 20 characters")
        .min(3, "Name must be at least 3 characters"),
      email: z.email("invalid Email Format").nonempty("Email is Required"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
          "Password can't be less than six characters with at least one uppercase letter, one lowercase letter, one number and one special character"
        )
        .nonempty("Password is Required"),
      rePassword: z.string().nonempty("Re_Password is Required"),
      phone: z
        .string()
        .regex(
          /^(\+2)?01[0125][0-9]{8}$/,
          "Phone number must be a valid Egyptian phone number"
        )
        .nonempty("Phone is Required"),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "password and re-password must match",
      path: ["rePassword"],
    });
  const registerForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function handleRegister(values: z.infer<typeof schema>) {
    setBtnLoading(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBtnLoading(true)

    if (data.message === "success") {
      toast.success("Registered Successfully", {
        duration: 2500,
        position: "top-center",
      });
      Route.push("/login")
    } else {
      toast.error(data.message, {
        duration: 2500,
        position: "top-center",
      });
    }
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-2 items-center my-10 md:my-20 w-10/12 mx-auto">
      <div className="hidden md:block">
        <Image
          src="/images/Sign-up.svg"
          alt="register"
          width={500}
          height={500}
          className="w-10/12 px-10"
        />
      </div>
      <div className="text-center mx-7">
        <h3 className="text-pink-700 mb-3 animate__animated animate__fadeInDown">Create Your Account and Unlock Exclusive Features</h3>
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="space-y-5"
          >
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="text"
                      label="Name:"
                      id="name"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="password"
                      label="Password:"
                      id="password"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="password"
                      label="Re_Password:"
                      id="rePassword"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="tel"
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
            <h5>Already have an account!? <Link href="/login" className="hover:text-pink-700 hover:underline hover:underline-offset-2 ms-1">Login</Link></h5>
            {btnLoading ? (
              <Button className="w-10/12 hover:w-full transition-all duration-300 rounded-full hover:bg-blue-900 bg-blue-300 text-black hover:text-white text-center my-4 cursor-pointer">
                Register
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
