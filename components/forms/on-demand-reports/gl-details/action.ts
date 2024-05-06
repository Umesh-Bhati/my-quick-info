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
                config.headers["Prefer"] = "odata.maxpagesize=1000"
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




export const fetchNextPageData = async (url: string) => {
    try {
        const { data } = await axiosInterceptorInstance.get(url);
        return data;

    } catch (error) {
        console.error("fetchNext ", error);
    }
}