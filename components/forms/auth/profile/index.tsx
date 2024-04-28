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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { updateProfile } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  firstName: z.string().min(2, {
    message: "minimum two characters required",
  }),
  lastName: z.string().min(2, {
    message: "minimum two characters required",
  }),
});

export function ProfileForm({ email, firstName, lastName, isMe = false }: any) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      firstName,
      lastName,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await updateProfile({
        ...values,
        name: values.firstName,
        last_name: lastName,
      });

      if (response?.error)
        return form.setError("root", {
          type: "custome",
          message: response?.error,
        });
      if (response?.success)
        toast({
          description: response?.success,
        });
    } catch (error) {
      console.error("errowhielloginsubmit ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full min-w-[75vw] m-auto max-w-3xl">
          <CardHeader>
            <CardTitle>{isMe ? "My" : firstName} Profile</CardTitle>
            <CardDescription>
              Update {isMe ? "your" : firstName} profile information.
            </CardDescription>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-profile"
                onCheckedChange={() => setdisabled((old) => !old)}
              />
              <Label htmlFor="edit-profile">Edit</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                disabled={disabled}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                disabled={disabled}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                disabled={disabled}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.root && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disabled} className="ml-auto">
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
