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
import ExportPdf from "@/components/exports/ExportPdf";
import BudgetVsActual from "@/components/exports/BudgetVsActual";

export interface IBugdet {
  isDepartmentLoading: boolean;
  isFundLoading: boolean;
  isReqLoading: boolean;
  onSubmit: HTMLFormElement["onsubmit"];
  form: any;
  fundList: any[];
  departmentList: any[];
  data: any;
  isFetchingNext: boolean;
  exportToPdf: () => void;
}

export default function BugdetForm({
  form,
  isDepartmentLoading,
  isFundLoading,
  isReqLoading,
  fundList,
  departmentList,
  onSubmit,
  data,
  isFetchingNext,
  exportToPdf,
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
                    ) : (
                      [
                        { Code: "All", Name: "Departments" },
                        ...departmentList,
                      ]?.map((department) => (
                        <SelectItem
                          key={department?.Code}
                          value={department?.Code}
                        >
                          {`${department?.Code} ${
                            department?.Name ? department?.Name : ""
                          }`}
                        </SelectItem>
                      ))
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
          {data.value.length !== 0 ? (
            data["@odata.count"] > data.value.length ? (
              <Button
                disabled={isFetchingNext}
                type="button"
                onClick={() => exportToPdf()}
                className="relative h-9 text-sm self-end overflow-hidden"
              >
                <div
                  className={`h-full max-w-full flex -z-10  justify-center items-center  absolute top-0 left-0 bg-green-300  transition-[width]`}
                  style={{
                    width: `${
                      (data.value.length / data["@odata.count"]) * 100
                    }%`,
                  }}
                />
                {isFetchingNext ? (
                  <h1 className="text-white z-10 text-sm mx-3 text-center font-bold ">
                    {
                      +Number(
                        (data.value.length / data["@odata.count"]) * 100
                      ).toFixed(2)
                    }
                    %
                  </h1>
                ) : (
                  "Fetch To Export"
                )}
              </Button>
            ) : (
              <ExportPdf
                fileName="Budget-Vs-Actual"
                document={
                  <BudgetVsActual
                    data={data.value}
                    reportType="Budget Vs Actual"
                    fundName={`${
                      fundList.find(
                        (item) => +item.No === +form.watch("fundNo")
                      )?.No
                    } ${
                      fundList.find(
                        (item) => +item.No === +form.watch("fundNo")
                      )?.Name
                    }`}
                    departmentName={
                      form.watch("departmentCode") === "All"
                        ? "All Departments"
                        : `${
                            departmentList.find(
                              (item) =>
                                +item.Code === +form.watch("departmentCode")
                            )?.Code
                          } " " ${
                            departmentList.find(
                              (item) =>
                                +item.Code === +form.watch("departmentCode")
                            )?.Name
                          }`
                    }
                    postingDate={form.watch("endDate")}
                  />
                }
              />
            )
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
}
