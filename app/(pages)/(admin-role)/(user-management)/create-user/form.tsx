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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  is_admin: z.boolean().default(false),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function CreateUserForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      is_admin: false,
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const serverResponse = await fetch("/api/auth/user-management", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (serverResponse.status === 409)
        return form.setError("root", {
          type: "custom",
          message: "User already exist!",
        });
      if (serverResponse.status === 201)
        toast({
          description: "User created successfully!",
        });
      return setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (error) {
      console.error("signup formerr ", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 max-w-2xl  m-auto border rounded-2xl py-12 p-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

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
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input
                  autoComplete="current-password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_admin"
          render={({ field }) => (
            <FormItem className="flex flex-row w-fit items-center space-y-0 gap-5">
              <FormControl className="border items-center w-fit justify-center">
                <Input
                  type="checkbox"
                  className="border"
                  {...field}
                  value={"isAdmin"}
                />
              </FormControl>
              <FormLabel className="w-fit">isAdmin</FormLabel>
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {"User already exist!"}
          </p>
        )}
        <Button disabled={isLoading} type="submit" size="lg">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Create New User
        </Button>
      </form>
    </Form>
  );
}
