"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { responses } from "@/libs/api";
import { KeyIcon, MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import AuthBox from "./Layouts/AuthBox";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoading) {
      try {
        setIsLoading(true);
        const body = values;

        signIn("credentials", { ...body, redirect: false }).then((res) => {
          if (res?.error) {
            toast.error(res.error);
            form.reset();
            setIsLoading(false);
          }

          if (res?.ok) {
            toast.success("Logged in successfully");
            const callbackUrl = searchParams.get("callbackUrl");
            const redirectUrl = callbackUrl ? callbackUrl : "/";
            window.location.href = redirectUrl;
          }
        });
      } catch (error) {
        responses.catchError(error);
      }
    }
  }

  return (
    <AuthBox>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: john@example.com"
                      iconLeft={<MailIcon className="h-5 w-5" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="************"
                      iconLeft={<KeyIcon className="h-5 w-5" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              isFullWidth
              disabled={isLoading}
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary underline-offset-2 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </AuthBox>
  );
}
