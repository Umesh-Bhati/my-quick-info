"use client"
import { Budget } from "@/app/(sections)/budget-table/columns";
import { getDepartments, getFunds } from "@/components/forms/action";
import { getGlDetailsTable } from "@/components/forms/on-demand-reports/GlForm/action";
import { GlDetail } from "@/components/tables/gl-details/columns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    fundNo: z.string(),
    departmentCode: z.string(),
    fundType: z.string(),
});

export default function useGlDetailTable() {
    const [glTableData, setGlTableData] = useState<GlDetail[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: "",
            endDate: "",
            fundNo: "",
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
            const response = await getGlDetailsTable(values);
            setGlTableData(response);
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
            const data: any[] = await getDepartments({
                fundNo: val,
                startDate: form.watch("startDate"),
                endDate: form.watch("endDate"),
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
        glTableData,
        isLoading,
        onSubmit,
        fundList,
        departmentList,
        form,
        fundTypeOnChange,
        fundSelectOnChange
    }

}