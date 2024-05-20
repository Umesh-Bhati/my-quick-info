import { format, startOfMonth } from "date-fns";

export const fixedDecimal = (decimal: number): number =>
  Number.isInteger(decimal) ? decimal : +Number(decimal).toFixed(2);

const budgetTable = (data: any[], postingDate = new Date(), fundNo: number | string) => {
  const startOfPostingMonth = startOfMonth(postingDate);
  const month = new Date(postingDate).getMonth();
  const year = new Date(postingDate).getFullYear();
  const startFundDate = month >= 9 ? format(postingDate, "yyyy-10-01") : format(postingDate, `${year - 1}-10-01`);

  let totalYtd = 0;
  let openPurchOrdTotal = 0;
  let openReqTotal = 0;
  let totalMtd = 0;
  let totalBudget = 0;
  let lastItemOccurence: string;
  let isRevenueCal = false;
  const finalResponse: any[] = [];

  let formatedObj = {
    mtd: 0,
    ytd: 0,
    openPurchOrd: 0,
    openReq: 0,
    budget: 0,
  };

  const isNonZeroItem = (item: any) =>
    item.mtd !== 0 || item.ytd !== 0 || item.openPurchOrd !== 0 || item.openReq !== 0 || item.budget !== 0;

  data.sort((a: any, b: any) => +a.G_L_Account_No - +b.G_L_Account_No).forEach((item: any, index: number) => {
    const isNewAccount = lastItemOccurence !== item.G_L_Account_No;
    if (isNewAccount && index > 0) {
      if (isNonZeroItem(formatedObj)) {
        finalResponse.push({ ...data[index - 1], ...formatedObj });
      }
      if (!isRevenueCal && +lastItemOccurence.toString()[0] === 4 && +item.G_L_Account_No.toString()[0] !== 4) {
        finalResponse.push({
          ytd: totalYtd,
          mtd: totalMtd,
          budget: totalBudget,
          openReq: openReqTotal,
          openPurchOrd: openPurchOrdTotal,
          desc: "Revenue"
        });
        isRevenueCal = true;
        totalYtd = totalMtd = totalBudget = openReqTotal = openPurchOrdTotal = 0;
      }
      formatedObj = { mtd: 0, ytd: 0, openPurchOrd: 0, openReq: 0, budget: 0 };
    }
    lastItemOccurence = item.G_L_Account_No;

    const { Amount = 0 } = item;
    switch (item.Transaction_Type_NVG) {
      case "Actual":
        if (item.Source_Code !== "CLSINCOME") {
          if (new Date(item.Posting_Date) >= startOfPostingMonth) {
            formatedObj.mtd = fixedDecimal(formatedObj.mtd + +Amount);
            totalMtd = fixedDecimal(totalMtd + +Amount);
          }
          if (+fundNo < 500 && new Date(item.Posting_Date) >= new Date(startFundDate) || +fundNo >= 500) {
            formatedObj.ytd = fixedDecimal(formatedObj.ytd + +Amount);
            totalYtd = fixedDecimal(totalYtd + +Amount);
          }
        }
        break;
      case "Encumbrance":
        formatedObj.openPurchOrd = fixedDecimal(formatedObj.openPurchOrd + +Amount);
        openPurchOrdTotal = fixedDecimal(openPurchOrdTotal + +Amount);
        break;
      case "Commitment":
        formatedObj.openReq = fixedDecimal(formatedObj.openReq + +Amount);
        openReqTotal = fixedDecimal(openReqTotal + +Amount);
        break;
      case "Budget":
        if (+fundNo < 500 && new Date(item.Posting_Date) >= new Date(startFundDate) || +fundNo >= 500) {
          formatedObj.budget = fixedDecimal(formatedObj.budget + +Amount);
          totalBudget = fixedDecimal(totalBudget + +Amount);
        }
        break;
    }

    if (index === data.length - 1) {
      if (isNonZeroItem(formatedObj)) {
        finalResponse.push({ ...item, ...formatedObj });
      }
      finalResponse.push({
        ytd: totalYtd,
        mtd: totalMtd,
        budget: totalBudget,
        openReq: openReqTotal,
        openPurchOrd: openPurchOrdTotal,
        desc: +item.G_L_Account_No.toString()[0] === 4 ? "Revenue" : "Expenses"
      });
    }
  });

  return finalResponse;
};

export const bcTableFormatters = {
  budgetTable,
};
