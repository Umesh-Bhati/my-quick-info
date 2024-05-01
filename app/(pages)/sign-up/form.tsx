"use client";

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
import {useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const serverResponse = await fetch("/api/auth/create-user", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const response = await serverResponse.json();

      response?.code === 409
        ? form.setError("root", {
            type: "custome",
            message: response?.message,
          })
        : response?.code === 201
        ? (router.push("/"), router.refresh())
        : form.setError("root", {
            type: "custome",
            message: "please check your valid input values and try again",
          });
    } catch (error) {
      console.error("signup formerr ", error);
    }
  }

  return (
    <div className="flex  p-10 h-full w-full justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col gap-6 max-w-lg p-10 justify-center self-center flex-grow  h-full w-full"
        >
          <div className="flex flex-col gap-2 ">
            <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
              Sign Up
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    autoComplete="current-password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <Link
                  href="#"
                  className="text-right self-end transition-all ease-linear duration-250 text-sm font-medium text-[#0e4884] hover:text-[rgb(0, 158, 247)] "
                >
                  Forgot Password ?
                </Link>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
