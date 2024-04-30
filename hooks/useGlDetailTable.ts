"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetchGl } from "./business-central";

const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    fundNo: z.string(),
    departmentCode: z.string(),
});

export default function useGlDetailTable() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fundNo: "",
            departmentCode: "",
        },
    });
    const { fetchGls, ...others } = useFetchGl()
    const onSubmit = async (values: any) => {
        fetchGls('on-submit', { ...values, transactionType: 'Actual' });
    };

    return {
        onSubmit,
        form,
        fetchNextPage: () => fetchGls('fetch-next'),
        ...others
    }

}