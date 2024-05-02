"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Button } from "../../../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { DatePicker } from "../../../DatePicker";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

export interface IApInquiryForm {
  isReqLoading?: boolean;
  onSubmit?: HTMLFormElement["onsubmit"];
  form?: any;
}

export default function ApInquiryForm({
  form,
  isReqLoading,
  onSubmit,
}: IApInquiryForm) {
  return (
    <div className="flex pb-5 flex-col p-1.5 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-3 w-full min-h-fit flex-wrap"
        >
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>From</FormLabel>
                <FormControl className="w-full">
                  <DatePicker
                    onSelect={field.onChange}
                    selected={form.watch("startDate")}
                    fromYear={2015}
                    toYear={new Date().getFullYear()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>To</FormLabel>
                <FormControl className="w-full">
                  <DatePicker
                    onSelect={field.onChange}
                    selected={form.watch("endDate")}
                    fromDate={form.watch("startDate")}
                    defaultMonth={form.watch("startDate")}
                    defaultYear={form.watch("startDate")}
                    fromYear={new Date(form.watch("startDate")).getFullYear()}
                    toYear={new Date().getFullYear()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Document_Type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Payment", "Invoice", "Credit Memo", "Refund"]?.map(
                      (item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Document_No"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document No</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Document No"
                    {...field}
                    className="max-h-9 text-sm self-end"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Vendor_No"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor No</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vendor No"
                    {...field}
                    className="max-h-9 text-sm self-end"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Vendor_Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vendor Name"
                    {...field}
                    className="max-h-9 text-sm self-end"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    className="max-h-9 text-sm self-end"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={isReqLoading}
            type="submit"
            className="max-h-9 text-sm self-end"
          >
            {isReqLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Request
          </Button>
        </form>
      </Form>
    </div>
  );
}
