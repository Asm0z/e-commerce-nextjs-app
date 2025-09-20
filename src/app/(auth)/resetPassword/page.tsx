"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetPassword() {
  const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const schema = z.object({
    resetCode: z.string().nonempty("Reset Code Required"),
  });
  const resetPassword = useForm<z.infer<typeof schema>>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function handleResetPassword(values: z.infer<typeof schema>) {
    setBtnLoading(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
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

    if (data.status === "Success") {
      toast.success("Password reset successfully!", {
        duration: 2500,
        position: "top-center",
      });
      Route.push("/newPassword");
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
      <div className="text-center mx-7 ">
        <Form {...resetPassword}>
          <form
            onSubmit={resetPassword.handleSubmit(handleResetPassword)}
            className="space-y-5 text-center flex flex-col items-center justify-center"
          >
            <FormField
              control={resetPassword.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mx-auto text-pink-700">
                    Enter Reset Code
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                      className="mx-auto"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnLoading ? 
              <Button className="w-10/12 hover:w-full transition-all duration-300 rounded-full hover:bg-blue-900 bg-blue-300 text-black hover:text-white text-center my-4 cursor-pointer">
                Reset Your Password
              </Button>
             : 
              <Button
                disabled
                type="button"
                className="w-full rounded-full bg-blue-900 text-center my-4"
              >
                Processing...
              </Button>
            }
          </form>
        </Form>
      </div>
    </div>
  );
}
