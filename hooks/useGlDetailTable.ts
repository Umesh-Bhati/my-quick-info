"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetchGl } from "./business-central";
import { useState } from "react";

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
            departmentCode: "All",
        },
    });
    const { fetchGls, ...others } = useFetchGl()
    const [isGenerate, setIsGenerate] = useState(false);

    const onSubmit = async (values: any) => {
        setIsGenerate(false)
        fetchGls('on-submit', { ...values, transactionType: 'Actual' });
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
        isGenerate,
        setIsGenerate,
        ...others
    }

}