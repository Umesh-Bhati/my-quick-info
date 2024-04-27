"use client";
import { FormProps } from "react-hook-form";
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
  isLoading: {
    submitLoading: boolean;
    departmentsLoading: boolean;
    fundsLoading: boolean;
  };
  onSubmit: HTMLFormElement["onsubmit"];
  form: FormProps;
  fundTypeOnChange: () => void;
  fundSelectOnChange: () => void;
  fundList: any[];
  departmentList: any[];
}

export default function BugdetForm({
  form,
  isLoading,
  fundList,
  departmentList,
  fundTypeOnChange,
  fundSelectOnChange,
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
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date</FormLabel>
                <FormControl className="w-full">
                  <DatePicker
                    onSelect={field.onChange}
                    date={form.watch("date")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fundType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund Type</FormLabel>
                <Select
                  onValueChange={(val) => fundTypeOnChange(val, field)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fund Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"General"}>General</SelectItem>
                    <SelectItem value={"Fedral"}>Fedral</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fund"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund</FormLabel>
                <Select
                  onValueChange={(val: string) =>
                    fundSelectOnChange(val, field)
                  }
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fund" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading.fundsLoading ? (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
                      </div>
                    ) : fundList.length > 0 ? (
                      fundList?.map((fund) => (
                        <SelectItem key={fund.No} value={fund.No}>
                          {`${fund.No} ${fund.Name}`}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <p className="text-sm">
                          {form.watch("fundType")
                            ? "Not Found"
                            : "Select first Fundy Type"}
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
                  onValueChange={async (val) => {
                    field.onChange(val);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department Code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading.departmentsLoading ? (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
                      </div>
                    ) : departmentList?.length > 0 ? (
                      departmentList?.map((department) => (
                        <SelectItem
                          key={department?.Global_Dimension_1_Code}
                          value={department?.Global_Dimension_1_Code}
                        >
                          {`${department?.Global_Dimension_1_Code} ${department?.G_L_Account_Name}`}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="w-full h-72 flex justify-center items-center m-auto">
                        <p className="text-sm">
                          {form.watch("fund")
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
            disabled={isLoading.submitLoading}
            type="submit"
            className="max-h-9 text-sm self-end"
          >
            {isLoading.submitLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Request
          </Button>
        </form>
      </Form>
    </div>
  );
}
