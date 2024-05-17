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


import { DatePicker } from "../../../DatePicker";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import ExportPdf from "@/components/exports/ExportPdf";
import APInquiryDocument from "@/components/exports/APInquiryDocument";
import MultiSelect from "react-select";

const documentTypeOptions = [
  {
    label: "Payment",
    value: "Payment",
  },
  {
    label: "Invoice",
    value: "Invoice",
  },
  {
    label: "Credit Memo",
    value: "Credit Memo",
  },
  {
    label: "Refund",
    value: "Refund",
  },
];
export interface IApInquiryForm {
  isReqLoading?: boolean;
  onSubmit?: HTMLFormElement["onsubmit"];
  form?: any;
  exportToPdf: () => void;
  isFetchingNext?: boolean;
  data: any;
}

export default function ApInquiryForm({
  form,
  isReqLoading,
  onSubmit,
  exportToPdf,
  isFetchingNext,
  data,
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
                <MultiSelect
                  onChange={field.onChange}
                  value={field.value}
                  options={documentTypeOptions}
                  isMulti
                />
                {/* <FormControl>
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
                </MultiSelect> */}

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
          {data.value.length !== 0 ? (
            data["@odata.count"] > data.value.length ? (
              <Button
                disabled={isFetchingNext}
                type="button"
                onClick={() => exportToPdf()}
                className="relative h-9 text-sm self-end overflow-hidden"
              >
                <div
                  className={`h-full max-w-full flex -z-10 justify-center items-center  absolute top-0 left-0 bg-green-300  transition-[width]`}
                  style={{
                    width: `${
                      (data.value.length / data["@odata.count"]) * 100
                    }%`,
                  }}
                ></div>
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
                  "Download To Export"
                )}
              </Button>
            ) : (
              <ExportPdf
                fileName="Ap-Inquiry"
                document={
                  <APInquiryDocument
                    data={data.value}
                    reportType="Ap Inquiry"
                    toDate={form.watch("endDate")}
                    fromDate={form.watch("startDate")}
                    documentType={
                      Array.isArray(form.watch("Document_Type")) &&
                      form.watch("Document_Type")?.length > 0
                        ? form
                            .watch("Document_Type")
                            .map((item: any) => item.value)
                            .join(",")
                        : "All"
                    }
                    vendorNo={form.watch("Vendor_No")}
                    vendorName={form.watch("Vendor_Name")}
                    description={form.watch("Description")}
                    documentNo={form.watch("Document_No")}
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
