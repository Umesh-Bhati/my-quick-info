import { endOfDay, startOfMonth } from "date-fns";


const budgetTable = (data: any[], postingDate: string | Date) => {
    const startOfPostingMonth = startOfMonth(postingDate);
    const endOfPostingDate = endOfDay(postingDate);
    const formatedOutPut = data.reduce((accVal: any[], currVal: any) => {
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
}

export const bcTableFormatters = {
    budgetTable
}