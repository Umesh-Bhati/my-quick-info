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



export const fetchVendors = async ({ startDate, endDate, Vendor_No, Document_Type, Vendor_Name, Description }: any) => {
    console.log("{ startDate, endDate, Vendor_No, Document_Type, Vendor_Name, Description }", { startDate, endDate, Vendor_No, Document_Type, Vendor_Name, Description })
    try {
        let query = "Vendor_Ledger_Entries_Excel?$filter="
        if (startDate) {
            query += `Posting_Date ge ${format(startDate, "yyyy-MM-dd")} and `
        }
        if (endDate) {
            query += `Posting_Date le ${format(endDate, "yyyy-MM-dd")} and `
        }
        if (Vendor_Name) {
            query += `Vendor_Name eq \`${Vendor_Name}\` and `
        }
        if (Vendor_No) {
            query += `Vendor_No eq \'${Vendor_No}\' and `
        }
        if (Document_Type) {
            query += `Document_Type eq \'${Document_Type}\' and `
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
