"use client"
import { useForm } from "react-hook-form";
import useFetchVendors from "./business-central/useFetchVendors";


export default function useApVendorTable() {
    const form = useForm();
    const { fetchVendors, ...others } = useFetchVendors()
    const onSubmit = async (values: any) => {
        try {
            await fetchVendors('on-submit', values)
        } catch (error) {
            console.error("errFetchSubmit ", error);
        }
    };

    return {
        onSubmit,
        form,
        fetchNextPage: () => fetchVendors('fetch-next'),
        ...others
    }

}