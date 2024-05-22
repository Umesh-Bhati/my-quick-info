"use client"
import { useForm } from "react-hook-form";
import useFetchVendors from "./business-central/useFetchVendors";
import { useState } from "react";


export default function useApVendorTable() {
    const form = useForm();
    const { fetchVendors, ...others } = useFetchVendors()
    const [isGenerate, setIsGenerate] = useState(false);
    const onSubmit = async (values: any) => {
        try {
            await fetchVendors('on-submit', values)
        } catch (error) {
            console.error("errFetchSubmit ", error);
        } finally {
            setIsGenerate(false)
        }
    };

    const exportToPdf = async () => {
        try {
            if (others.hasNextPage) {
                const hasNext: any = await fetchVendors('fetch-next')
                if (!!hasNext) await exportToPdf()
                return
            }

        } catch (error) {
            console.error("while generating pdf", error)
        }
    }

    return {
        onSubmit,
        form,
        fetchNextPage: () => fetchVendors('fetch-next'),
        exportToPdf,
        isGenerate,
        setIsGenerate,
        ...others
    }

}