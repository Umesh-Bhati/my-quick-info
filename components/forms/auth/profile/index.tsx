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
import { ScopeManagmentBtn } from "./ScopeManagmentBtn";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  name: z.string().min(2, {
    message: "minimum two characters required",
  }),
  last_name: z.string().min(2, {
    message: "minimum two characters required",
  }),
  is_admin: z.boolean(),
});

export function ProfileForm({ isMe = false, ...defaultValues }: any) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await updateProfile(values);

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
          <CardHeader className="flex flex-row justify-between" >
            <div>
              <CardTitle>{isMe ? "My" : defaultValues.name} Profile</CardTitle>
              <CardDescription>
                Update {isMe ? "your" : defaultValues.name} profile information.
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-profile"
                  onCheckedChange={() => setdisabled((old) => !old)}
                />
                <Label htmlFor="edit-profile">Edit</Label>
              </div>
            </div>
            {/* <ScopeManagmentBtn /> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
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
                name="last_name"
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

              <FormField
                control={form.control}
                name="is_admin"
                disabled={disabled}
                render={({ field }) => (
                  <FormItem className="flex mt-8 flex-row  w-fit items-center space-y-0 gap-5">
                    <FormControl className="items-center w-fit justify-center">
                      <Input
                        type="checkbox"
                        className="border w-4 h-4"
                        {...field}
                        checked={field.value}
                        value={"isAdmin"}
                      />
                    </FormControl>
                    <FormLabel className="w-fit">isAdmin</FormLabel>
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
