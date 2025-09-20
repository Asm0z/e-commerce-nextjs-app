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
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { getCartCount } from "@/app/CartActions/AddToCard.action";
import { countContext } from "@/CountProvider";

export default function LoginPage() {
  const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const schema = z.object({
    email: z.email("invalid Email Format").nonempty("Email is Required"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        "Password can't be less than six characters with at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .nonempty("Password is Required"),
  });
  const loginForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {setCount} = useContext(countContext)
  async function handleLogin(values: z.infer<typeof schema>) {
    setBtnLoading(false);
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (data?.ok) {
      toast.success("Logged-in Successfully", {
        duration: 2500,
        position: "top-center",
      });
        const totalCount = await getCartCount();
        setCount(totalCount ?? 0);
      Route.push("/");
    }else{
      toast.error(data?.error, {
        duration: 2500,
        position: "top-center",
      });
    }
    setBtnLoading(true);
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-2 items-center  my-10 md:my-20 w-10/12 mx-auto">
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
        <h3 className="text-pink-700 mb-3 animate__animated animate__fadeInDown">
          Welcome Back <i className="fa-regular fa-house"></i>, We Have Missed
          You.
        </h3>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="space-y-5"
          >
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
            <h5>
              Don`t have an account!?{" "}
              <Link
                href="/register"
                className="hover:text-pink-700 hover:underline hover:underline-offset-2 ms-1"
              >
                Register
              </Link>
            </h5>
            <Link
              href="/forgetPassword"
              className="hover:text-pink-700 underline underline-offset-2"
            >
              Forgot your password!?
            </Link>
            {btnLoading ? (
              <Button className="w-10/12 hover:w-full transition-all duration-300 rounded-full hover:bg-blue-900 bg-blue-300 text-black hover:text-white text-center my-4 cursor-pointer">
                Login
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
