"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { deleteScope, fetchScopesByUserId, updateOrSaveScope } from "./action";
import MultiSelect from "react-select";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function UsersScopeTable({ users, fundList, departments }: any) {
  const form = useForm();
  const [scopes, setScopes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | string>("");

  const onSubmit = async (val: any) => {
    try {
      setIsLoading(true);
      await updateOrSaveScope({
        fund_no: val.fundNo,
        dept_rel: val.deptNo.map((item: any) => item.value)?.join(","),
        user_id: +val.user_id,
      });
      await userOnChange(val.user_id);
    } catch (error) {
      console.error("errr ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fundOnChange = async (val: any) => {
    try {
      const scope = scopes.find((item: any) => item.fund_no == val);
      const dept = scope.dept_rel.split(",").map((item: any) => {
        const { Code, Name } =
          departments.find((deptItem: any) => deptItem.Code === item) || {};
        return { label: `${Code} ${Name}`, value: Code };
      });
      form.setValue("deptNo", dept);
    } catch (error) {
      console.error("error", error);
    }
  };

  const userOnChange = async (user_id: any) => {
    try {
      const data: any[] = (await fetchScopesByUserId(user_id)) || [];
      setScopes(data);
    } catch (error) {
      console.error("errDuringUserOnChange ", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteScope(id);
      setScopes((old: any) => old.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error("OndeleteScopeErr");
    } finally {
      setIsDeleting("");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 mb-5 gap-3 w-full min-h-fit flex-wrap"
        >
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <Select
                  onValueChange={(user_id) => {
                    userOnChange(user_id);
                    field.onChange(user_id);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select User">
                        {field.value
                          ? users.find((item: any) => item.id == field.value)
                              ?.name
                          : ""}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users?.map((user: any, key: number) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  onValueChange={(val) => {
                    field.onChange(val);
                    fundOnChange(val);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fund" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fundList?.map((fund: any) => (
                      <SelectItem key={fund.No} value={fund.No}>
                        {`${fund.No} ${fund.Name ? fund.Name : ""}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deptNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departments</FormLabel>
                <MultiSelect
                  isMulti
                  onChange={field.onChange}
                  value={field.value}
                  options={departments.map((item: any) => ({
                    label: `${item.Code} ${item.Name}`,
                    value: item.Code,
                  }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="max-h-9 text-sm self-end"
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </form>
      </Form>
      <DataTable
        columns={columns(onDelete, isDeleting)}
        data={scopes}
        fetchNextPage={() => {}}
      />
    </div>
  );
}
