"use client"
import { Budget } from "@/app/(sections)/budget-table/columns";
import { getBudgetTable, getDepartments, getFunds } from "@/components/forms/on-demand-reports/budget-vs-actual/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    date: z.string(),
    fund: z.string().min(2, {
        message: "Fund name must be at least 2 characters.",
    }),
    departmentCode: z.string().min(2, {
        message: "Fund name must be at least 2 characters.",
    }),
    fundType: z.string().min(2, {
        message: "Fund name must be at least 2 characters.",
    }),
});

export default function useBudgetTable() {
    const [budgetTableData, setBudgetTableData] = useState<Budget[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: "",
            fund: "",
            departmentCode: "",
            fundType: "",
        },
    });
    const [fundList, setFundList] = useState<any[]>([]);
    const [departmentList, setDapartmentList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState({
        submitLoading: false,
        departmentsLoading: false,
        fundsLoading: false,
    });

    const onSubmit = async (values: any) => {
        try {
            setIsLoading((old) => ({ ...old, submitLoading: true }));
            const response = await getBudgetTable({
                postingDate: values.date,
                deparmentCode: values.departmentCode,
                fundNo: values.fund,
            });
            setBudgetTableData(response);
        } catch (error) {
            console.error("errorSubmit ", error);
        } finally {
            setIsLoading((old) => ({ ...old, submitLoading: false }));
        }
    };

    const fundTypeOnChange = async (val: "General" | "Fedral", field: any) => {
        try {
            setIsLoading((old) => ({ ...old, fundsLoading: true }));
            field.onChange(val);
            const data = await getFunds(val);
            setFundList(data);
        } catch (error) {
        } finally {
            setIsLoading((old) => ({
                ...old,
                fundsLoading: false,
            }));
        }
    }


    const fundSelectOnChange = async (val: string, field: any) => {
        try {
            setIsLoading((old) => ({
                ...old,
                departmentsLoading: true,
            }));

            field.onChange(val);
            const endDate = form.watch("date")
            const data: any[] = await getDepartments({
                fundNo: val,
                startDate: format(endDate, 'yyyy-04-01'),
                endDate,
            });
            setDapartmentList(data);
        } catch (error) {
            console.error("FundSelectErr ", error);
        } finally {
            setIsLoading((old) => ({
                ...old,
                departmentsLoading: false,
            }));
        }
    }

    return {
        budgetTableData,
        isLoading,
        onSubmit,
        fundList,
        departmentList,
        form,
        fundTypeOnChange,
        fundSelectOnChange
    }

}