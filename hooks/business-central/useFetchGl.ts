"use client"
import { fetchGl } from "@/components/forms/on-demand-reports/budget-vs-actual/action";
import { fetchNextPageData } from "@/components/forms/on-demand-reports/gl-details/action";
import { useMemo, useState } from "react"


interface IGlArgs {
    startDate?: number | string;
    endDate: number | string;
    fundNo: number | string;
    departmentCode: number | string
}

interface IData {
    "@odata.count": number;
    "@odata.nextLink": string;
    value: any[]
}

export default function useFetchGl() {
    const [data, setData] = useState<IData>({ value: [], "@odata.count": 0, "@odata.nextLink": "" })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetchingNext, setIsFetchingNext] = useState(false)
    const hasNextPage: boolean = useMemo(() => data["@odata.count"] > data.value.length, [data])
    async function fetchGls(type: 'on-submit' | 'fetch-next', glFilters?: IGlArgs) {
        try {
            if (type === 'fetch-next') {
                setIsFetchingNext(true)
                if (hasNextPage) {
                    const responseNextPageData = await fetchNextPageData(data["@odata.nextLink"])
                    setData(old => ({ ...responseNextPageData, value: [...old.value, ...responseNextPageData?.["value"] || []] }))
                }
            } else if (type === 'on-submit') {
                setIsLoading(true)
                const responseData = await fetchGl(glFilters)
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
        fetchGls,
        hasNextPage
    }
}