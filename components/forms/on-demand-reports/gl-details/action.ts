"use server"

import { getOAuthToken } from "@/app/api/utils/getOAuthToken";
import axios from "axios";


const axiosInterceptorInstance = axios.create({
    baseURL: "https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/",
});

axiosInterceptorInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getOAuthToken();

        if (accessToken) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                config.headers["Prefer"] = "odata.maxpagesize=25"
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export const getGlDetailsTable = async ({ fundNo, departmentCode, startDate, endDate }: any) => {
    try {
        const { data } = await axiosInterceptorInstance.get(
            `General_Ledger_Entries_Excel?$filter=Posting_Date ge ${startDate} and Posting_Date le ${endDate} and Fund_No_NVG eq \'${fundNo}\' and Global_Dimension_1_Code eq \'${departmentCode}\'&$count=true`,
        );
        return data;
    } catch (error) {
        console.error("getBudgetTable ", error);
    }
};
export const fetchNextPageData = async (url: string) => {
    try {
        const { data } = await axiosInterceptorInstance.get(url);
        return data;

    } catch (error) {
        console.error("getBudgetTablePagination ", error);
    }
}