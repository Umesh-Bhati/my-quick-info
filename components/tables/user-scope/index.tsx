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
import { fetchScopesByUserId } from "./action";
import MultiSelect from "react-select";
import makeAnimated from 'react-select/animated';

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function UsersScopeTable({ users, fundList }: any) {
  const form = useForm();
  const [deptList, setDeptList] = useState();
  const [scopes, setScopes] = useState<any>([]);

  const onSubmit = async () => {
    try {
    } catch (error) {}
  };

  const fundOnChange = async (val) => {
    try {
    } catch (error) {}
  };

  const userOnChange = async (user_id: any) => {
    try {
      const data: any[] = (await fetchScopesByUserId(user_id)) || [];
      setScopes(data);
    } catch (error) {
      console.error("errDuringUserOnChange ", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-3 w-full min-h-fit flex-wrap"
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users?.map((user: any) => (
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
                <Select onValueChange={fundOnChange} defaultValue={field.value}>
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
                <FormLabel>Fund</FormLabel>
                <MultiSelect options={options} />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DataTable columns={columns} data={scopes} fetchNextPage={() => {}} />
    </div>
  );
}
