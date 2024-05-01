"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.error)
        return form.setError("root", {
          type: "custome",
          message: "Email or Password is incorrect",
        });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("errowhielloginsubmit ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-1 p-10 h-[90%] flex-grow w-full justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col gap-6 max-w-lg p-10 justify-center self-center flex-grow  h-full w-full"
        >
          <div className="flex flex-col gap-2 ">
            <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
              Sign In
            </h4>
            <p className="text-sm text-center text-muted-foreground">
              Welcome!
            </p>
          </div>
          {form.formState.errors.root && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoComplete="email" placeholder="Email" {...field} />
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
                <FormControl>
                  <Input
                    variant="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/forget-password"
            className="text-right self-end transition-all ease-linear duration-250 text-sm font-medium text-[#0e4884] hover:text-[rgb(0, 158, 247)] "
          >
            Forgot Password ?
          </Link>
          <Button type="submit" size="lg">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
