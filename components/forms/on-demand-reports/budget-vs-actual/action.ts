"use server";

import { prisma } from "@/app/api/db";
import { getOAuthToken } from "@/app/api/utils/getOAuthToken";
import axios from "axios";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

const axiosInterceptorInstance = axios.create({
  baseURL:
    "https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/",
});

axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getOAuthToken();

    if (accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers["Prefer"] = "odata.maxpagesize=100";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDepartments = async () => {
  try {
    const serverSession = await getServerSession();
    const user = await prisma.users.findUnique({
      where: { email: serverSession?.user?.email || "" },
    });
    // const scops = user?.id
    //   ? await prisma.user_scopes.findUnique({ where: { user_id: user?.id } })
    //   : {};

    if (user?.is_admin) {
      let { data = { value: [], "@odata.count": 0, "@odata.nextLink": "" } } =
        (await axiosInterceptorInstance.get("dept_code?$count=true")) || {};
      return data;
    }
  } catch (error) {
    console.error("errorDEPARAPI ", error);
  }
};

export const fetchFunds = async () => {
  try {
    const { data = { value: [], "@odata.count": 0, "@odata.nextLink": "" } } =
      await axiosInterceptorInstance.get("Fund_List?$count=true");
    return data;
  } catch (error) {
    console.error("getFundErr ", error);
  }
};

export const fetchGl = async ({
  startDate,
  endDate,
  fundNo,
  departmentCode,
  transactionType,
}: any) => {
  try {
    const { data } = await axiosInterceptorInstance.get(
      `General_Ledger_Entries_Excel?$filter=G_L_Account_No ge '400000' and G_L_Account_No le '90000' and Posting_Date ge  ${
        startDate
          ? format(startDate, "yyyy-MM-dd")
          : format(endDate, "yyyy-04-01")
      } and Posting_Date le ${format(
        endDate,
        "yyyy-MM-dd"
      )} and Fund_No_NVG eq \'${fundNo}\' and Global_Dimension_1_Code eq \'${departmentCode}\' ${
        transactionType ? `and Transaction_Type_NVG eq \'${transactionType}\'` : ""
      } &$count=true`
    );
    
    return data;
  } catch (error) {
    console.error("getBudgetTable ", error);
  }
};
