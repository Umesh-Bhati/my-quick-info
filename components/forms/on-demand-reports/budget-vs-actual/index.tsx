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

export interface IBugdet {
  isDepartmentLoading: boolean;
  isFundLoading: boolean;
  isReqLoading: boolean;
  onSubmit: HTMLFormElement["onsubmit"];
  form: any;
  fundList: any[];
  departmentList: any[];
}

export default function BugdetForm({
  form,
  isDepartmentLoading,
  isFundLoading,
  isReqLoading,
  fundList,
  departmentList,
  onSubmit,
}: IBugdet) {
  return (
    <div className="flex pb-5 flex-col p-1.5 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-3 w-full min-h-fit flex-wrap"
        >
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date</FormLabel>
                <FormControl className="w-full">
                  <DatePicker
                    onSelect={field.onChange}
                    selected={field.value}
                    defaultMonth={field.value}
                    defaultYear={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fundNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fund" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isFundLoading ? (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
                      </div>
                    ) : fundList.length > 0 ? (
                      fundList?.map((fund) => (
                        <SelectItem key={fund.No} value={fund.No}>
                          {`${fund.No} ${fund.Name ? fund.Name : ""}`}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <p className="text-sm">
                          {form.watch("endDate")
                            ? "Not Found"
                            : "Select first Date"}
                        </p>
                      </div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Codes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department Code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isDepartmentLoading ? (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
                      </div>
                    ) : departmentList?.length > 0 ? (
                      departmentList?.map((department) => (
                        <SelectItem
                          key={department?.Code}
                          value={department?.Code}
                        >
                          {`${department?.Code} ${
                            department?.Name ? department?.Name : ""
                          }`}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <p className="text-sm">
                          {form.watch("fundNo")
                            ? "Not Found"
                            : "Select first Fund"}
                        </p>
                      </div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
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
