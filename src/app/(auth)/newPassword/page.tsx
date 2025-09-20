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
import { useForm } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPassword() {
    const [btnLoading, setBtnLoading] = useState<boolean>(true);
  const Route = useRouter();
  const schema = z.object({
    email: z.email("invalid Email Format").nonempty("Email is Required"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        "Password can't be less than six characters with at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .nonempty("Password is Required"),
  });
  const NewPasswordForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function handleNewPassword(values: z.infer<typeof schema>) {
    setBtnLoading(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBtnLoading(true);

    if (data.token) {
      toast.success("Password Changed Successfully", {
        duration: 2500,
        position: "top-center",
      });
      Route.push("/login");
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
          src="/images/Sign-up.svg"
          alt="register"
          width={500}
          height={500}
          className="w-10/12 px-10"
        />
      </div>
      <div className="text-center mx-7">
        <h3 className="text-pink-700 mb-3 animate__animated animate__fadeInDown">
          Almost there! Set your new password
        </h3>
        <Form {...NewPasswordForm}>
          <form
            onSubmit={NewPasswordForm.handleSubmit(handleNewPassword)}
            className="space-y-5"
          >
            <FormField
              control={NewPasswordForm.control}
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
              control={NewPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="relative group">
                  <FormControl>
                    <FloatingLabelInput
                      type="password"
                      label="New Password:"
                      id="newPassword"
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
                Reset your Password
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
