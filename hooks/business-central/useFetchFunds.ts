"use client"
import { fetchFunds as fetchServerFunds } from "@/components/forms/on-demand-reports/budget-vs-actual/action";
import { fetchNextPageData } from "@/components/forms/on-demand-reports/gl-details/action";
import { useMemo, useState } from "react"



interface IData {
    "@odata.count": number;
    "@odata.nextLink": string;
    value: any[]
}

export default function useFetchFunds() {
    const [data, setData] = useState<IData>({ value: [], "@odata.count": 0, "@odata.nextLink": "" })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingNext, setIsFetchingNext] = useState(false)
    const hasNext: boolean = useMemo(() => data?.["@odata.count"] > data.value.length, [data])

    async function fetchFunds(type: 'on-submit' | 'fetch-next') {
        try {
            if (type === 'fetch-next') {
                setIsFetchingNext(true)
                if (hasNext) {
                    const { data: responseNextPageData } = await fetchNextPageData(data["@odata.nextLink"])
                    setData(old => ({ ...responseNextPageData, value: [...old.value, ...responseNextPageData?.["value"] || []] }))
                }
            } else if (type === 'on-submit') {
                setIsLoading(true)
                const responseData = await fetchServerFunds()
                setData(responseData)
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
        fetchFunds
    }
}