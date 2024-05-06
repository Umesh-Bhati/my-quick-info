"use client"
import { fetchVendors as fetchApi } from "@/components/forms/on-demand-reports/ap-inquiry/action";
import { fetchNextPageData } from "@/components/forms/on-demand-reports/gl-details/action";
import { useRef, useState } from "react"


interface IVendorArgs {
    startDate?: number | string;
    endDate: number | string;
    Vendor_Name?: string;
    Vendor_Code?: string;
    Document_Type?: string;
    Document_No?: string
}

interface IData {
    "@odata.count": number;
    "@odata.nextLink": string;
    value: any[]
}



export default function useFetchVendors() {
    const [data, setData] = useState<IData>({ value: [], "@odata.count": 0, "@odata.nextLink": "" })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingNext, setIsFetchingNext] = useState(false)
    const hasNextPage = useRef({ lastLength: 0, totalCount: 0 })
    async function fetchVendors(type: 'on-submit' | 'fetch-next', vendorFilters?: IVendorArgs) {
        try {
            if (type === 'fetch-next') {
                setIsFetchingNext(true)
                if (hasNextPage.current.totalCount > hasNextPage.current.lastLength) {
                    const responseNextPageData = await fetchNextPageData(data["@odata.nextLink"])
                    hasNextPage.current.lastLength += responseNextPageData.value.length
                    setData(old => ({ ...responseNextPageData, value: [...old.value, ...responseNextPageData?.["value"]] }))
                    return hasNextPage.current.totalCount > hasNextPage.current.lastLength
                }
            } else if (type === 'on-submit') {
                setIsLoading(true)
                const responseData = await fetchApi(vendorFilters)
                if (responseData?.value && responseData.value.length > 0) {
                    hasNextPage.current.lastLength = responseData.value.length
                    hasNextPage.current.totalCount = responseData["@odata.count"]
                    return setData(responseData)
                }
                setData({ value: [], "@odata.count": 0, "@odata.nextLink": '' })
            }
        } catch (error) {
            console.error("errorFetchNextHook ", error);
        } finally {
            setIsFetchingNext(false)
            setIsLoading(false)
        }
    }

    return {
        data,
        isLoading,
        isFetchingNext,
        fetchVendors,
        hasNextPage: hasNextPage.current.totalCount > hasNextPage.current.lastLength
    }
}