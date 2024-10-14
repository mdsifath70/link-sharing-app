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
import { userActions } from "@/redux/features/user/userSlice";
import { UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import formSchema from "./formSchema";
import Profile from "./Profile";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function FormFields({ form }: Props) {
  const dispatch = useDispatch();

  const handleChange = () => {
    const values = form.getValues();
    dispatch(userActions.handleChangeProfile(values));
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <Profile />

        <div className="space-y-4 rounded-lg bg-background p-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="md:w-2/5">
                    <FormLabel required>Username</FormLabel>
                  </div>
                  <div className="md:w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        onChange={(e) => {
                          onChange(e);
                          handleChange();
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="ml-auto w-3/5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="md:w-2/5">
                    <FormLabel required>First Name</FormLabel>
                  </div>
                  <div className="md:w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        onChange={(e) => {
                          onChange(e);
                          handleChange();
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="ml-auto w-3/5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="md:w-2/5">
                    <FormLabel required>Last Name</FormLabel>
                  </div>
                  <div className="md:w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        onChange={(e) => {
                          onChange(e);
                          handleChange();
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="ml-auto w-3/5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="md:w-2/5">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <div className="md:w-3/5">
                    <FormControl>
                      <Input
                        placeholder="eg: john@example.com"
                        onChange={(e) => {
                          onChange(e);
                          handleChange();
                        }}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="ml-auto w-3/5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
