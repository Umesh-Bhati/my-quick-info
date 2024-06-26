"use server"

import { getOAuthToken } from "@/app/api/utils/getOAuthToken";
import axios from "axios";
import { format } from "date-fns";


const axiosInterceptorInstance = axios.create({
    baseURL: "https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/",

});

axiosInterceptorInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getOAuthToken();

        if (accessToken) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                config.headers["Prefer"] = "odata.maxpagesize=1000"
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export const fetchVendors = async ({ startDate, endDate, Vendor_No, Document_Type, Vendor_Name, Description, Document_No }: any) => {
    try {
        let query = "Vendor_Ledger_Entries_Excel?$filter="
        if (startDate) {
            query += `Posting_Date ge ${format(startDate, "yyyy-MM-dd")} and `
        }
        if (endDate) {
            query += `Posting_Date le ${format(endDate, "yyyy-MM-dd")} and `
        }
        if (Vendor_Name) {
            query += `Description eq \'${Vendor_Name}\' and `
        }
        if (Vendor_No) {
            query += `Vendor_No eq \'${Vendor_No}\' and `
        }
        if (Array.isArray(Document_Type) && Document_Type.length > 0) {
            for (let i = 0; i < Document_Type.length; i++) {
                const item: any = Document_Type[i]
                query += `${i == 0 ? "(" : ""} Document_Type eq \'${item.value}\' ${Document_Type.length - 1 == i ? ") and " : " or "} `
            }
        }
        if (Document_No) {
            query += `Document_No eq \'${Document_No}\' and `
        }
        if (Description) {
            query += `Description eq \'${Description}\' and `
        }
        if (query.trim().endsWith("and")) {
            query = query.trim().slice(0, -3);
        }

        const { data } = await axiosInterceptorInstance.get(
            `${query}&$count=true`,
        );
        if (data?.value && data.value.length > 0) {
            return data;
        }
        return { value: [], "@odata.count": 0, "@odata.nextLink": '' }
    } catch (error) {
        console.error("fetchVenderoErro server ", error);
    }
};

export const fetchNextPageData = async (url: string) => {
    try {
        const { data } = await axiosInterceptorInstance.get(url);
        return data;
    } catch (error) {
        console.error("getBudgetTablePagination ", error);
    }
};
