"use server"

import { prisma } from "@/app/api/db";
import { getOAuthToken } from "@/app/api/utils/getOAuthToken";
import axios from "axios";
import { format, startOfMonth, endOfDay } from 'date-fns';
import { getServerSession } from "next-auth";


const axiosInterceptorInstance = axios.create({
    baseURL: "https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/", // Replace with your API base URL
});


axiosInterceptorInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getOAuthToken();

        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);





interface IDepartments {
    fundNo: string;
    startDate: string
    endDate: string
}




export const getDepartments = async ({ fundNo, startDate, endDate }: IDepartments) => {
    try {

        const response = await axiosInterceptorInstance.get(
            `General_Ledger_Entries_Excel?$filter=Posting_Date ge ${startDate} and Posting_Date le ${endDate} and Fund_No_NVG eq \'${fundNo}\'`,
        );

        return response?.data?.value?.reduce((accVal: any[], currVal: any) => {
            for (let accItem of accVal) {
                if (accItem?.["Global_Dimension_1_Code"] && accItem?.["Global_Dimension_1_Code"] === currVal["Global_Dimension_1_Code"]) {
                    return accVal
                }
            }
            return [...accVal, currVal]
        }, []) || []
    } catch (error) {
        console.error("errorDEPARAPI ", error);

    }
}




export const getFunds = async (fundType: "General" | "Fedral") => {
    try {
        let url
        if (fundType === 'General') {
            url = "Fund_List?$filter=No le '0500'"
        } else {
            url = "Fund_List?$filter=No ge '0500'"
        }
        const { data } = await axiosInterceptorInstance.get(url)
        return data?.value
    } catch (error) {
        console.error("getFundErr ", error);
    }
}




export const getBudgetTable = async ({ postingDate, fundNo, deparmentCode }: any) => {
    try {
        const startingDateOfFY = format(postingDate, "yyyy-04-01");
        const { data } = await axiosInterceptorInstance.get(
            `General_Ledger_Entries_Excel?$filter=Posting_Date ge ${startingDateOfFY} and Posting_Date le ${postingDate} and Fund_No_NVG eq \'${fundNo}\' and Global_Dimension_1_Code eq \'${deparmentCode}\'`,
        );

        const startOfPostingMonth = startOfMonth(postingDate);
        const endOfPostingDate = endOfDay(postingDate);

        const formatedOutPut = data.value.reduce((accVal: any[], currVal: any) => {
            let existingIndex = accVal.findIndex((item) => item['G_L_Account_No'] === currVal['G_L_Account_No']);
            if (existingIndex !== -1) {
                let accCurrVal = accVal[existingIndex];
                if (currVal.Transaction_Type_NVG === "Actual") {
                    accCurrVal["ytd"] += currVal["Amount"];
                    accCurrVal["mtd"] += new Date(currVal.Posting_Date) >= startOfPostingMonth && new Date(currVal.Posting_Date) <= endOfPostingDate ? currVal["Amount"] : 0;
                } else if (currVal.Transaction_Type_NVG === "Encumbrance") {
                    accCurrVal["openPurchOrd"] += currVal["Amount"];
                } else if (currVal.Transaction_Type_NVG === "Commitment") {
                    accCurrVal["openReq"] += currVal["Amount"];
                } else if (currVal.Transaction_Type_NVG === "Budget") {
                    accCurrVal["budget"] += currVal["Amount"];
                }
                accVal[existingIndex] = accCurrVal;
            } else {
                let newObj: any = { ...currVal, ytd: 0, mtd: 0, budget: 0, openReq: 0, openPurchOrd: 0 };
                if (currVal.Transaction_Type_NVG === "Actual") {
                    newObj["ytd"] = +currVal["Amount"];
                    if (new Date(currVal.Posting_Date) >= startOfPostingMonth && new Date(currVal.Posting_Date) <= endOfPostingDate) newObj["mtd"] = +currVal["Amount"];
                } else if (currVal.Transaction_Type_NVG === "Encumbrance") {
                    newObj["openPurchOrd"] = +currVal["Amount"];
                } else if (currVal.Transaction_Type_NVG === "Commitment") {
                    newObj["openReq"] = +currVal["Amount"];
                } else if (currVal.Transaction_Type_NVG === "Budget") {
                    newObj["budget"] = +currVal["Amount"];
                }
                accVal.push(newObj);
            }
            return accVal;
        }, []);


        formatedOutPut.forEach((item: any) => {
            if (item.mtd !== undefined) item.mtd = Math.round(item.mtd).toLocaleString('en-US',);
            if (item.ytd !== undefined) item.ytd = Math.round(item.ytd).toLocaleString('en-US',);
            if (item.openPurchOrd !== undefined) item.openPurchOrd = Math.round(item.openPurchOrd).toLocaleString('en-US',);
            if (item.openReq !== undefined) item.openReq = Math.round(item.openReq).toLocaleString('en-US',);
            if (item.budget !== undefined) item.budget = Math.round(item.budget).toLocaleString('en-US',);
        });

        return formatedOutPut;

    } catch (error) {
        console.error("getBudgetTable ", error);
    }
};
