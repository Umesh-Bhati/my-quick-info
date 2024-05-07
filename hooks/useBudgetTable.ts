"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetchGl } from "./business-central";

const formSchema = z.object({
    endDate: z.date(),
    fundNo: z.string(),
    departmentCode: z.string(),
});

export default function useBudgetTable() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fundNo: "",
            departmentCode: "All",
        },
    });
    const { fetchGls, ...others } = useFetchGl()
    const onSubmit = async (values: any) => {
        fetchGls('on-submit', { ...values, isBudgetVsActual: true });
    };

    const exportToPdf = async () => {
        try {
            if (others.hasNextPage) {
                const hasNext = await fetchGls('fetch-next')
                if (hasNext) await exportToPdf()
                return
            }

        } catch (error) {
            console.error("while generating pdf", error)
        }
    }

    return {
        onSubmit,
        form,
        fetchNextPage: () => fetchGls('fetch-next'),
        exportToPdf,
        ...others
    }

}