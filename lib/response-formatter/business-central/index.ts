import { endOfDay, startOfMonth } from "date-fns";

const fixedDecimal = (decimal: number): number =>
  Number.isInteger(decimal) ? decimal : +Number(decimal).toFixed(2);

const budgetTable = (data: any[], postingDate: string | Date) => {
  const startOfPostingMonth = startOfMonth(postingDate);
  const endOfPostingDate = endOfDay(postingDate);
  let total = 0;
  let lastItemOccurence: any;
  let formatedObj = {
    mtd: 0,
    ytd: 0,
    openPurchOrd: 0,
    openReq: 0,
    budget: 0,
  };
  let lastItem: any = {};
  let isRevenueCal = false;
  const finalResponse: any[] = [];
  data
    .sort(
      (firstItem, secItem) =>
        +firstItem["G_L_Account_No"] - secItem["G_L_Account_No"]
    )
    .forEach((item, index) => {
      if (index === 0) {
        lastItemOccurence = item["G_L_Account_No"];
      }
      if (lastItemOccurence !== item["G_L_Account_No"]) {
        finalResponse.push({ ...lastItem, ...formatedObj });
        if (!isRevenueCal && +lastItemOccurence?.toString()[0] === 4 && +item["G_L_Account_No"]?.toString()[0] !== 4) {
          finalResponse.push({ ytd: total, desc: "Revenue" });
          isRevenueCal = true;
          total = 0;
        }
        lastItemOccurence = item["G_L_Account_No"];
        formatedObj = {
          mtd: 0,
          ytd: 0,
          openPurchOrd: 0,
          openReq: 0,
          budget: 0,
        };
      }
      if (lastItemOccurence === item["G_L_Account_No"]) {
        const { Amount = 0 } = item;
        total = fixedDecimal(total + Amount);
        lastItem = item;
        switch (item.Transaction_Type_NVG) {
          case "Actual": {
            if (
              new Date(item.Posting_Date) >= startOfPostingMonth &&
              new Date(item.Posting_Date) <= endOfPostingDate
            ) {
              formatedObj["mtd"] = fixedDecimal(+formatedObj["mtd"] + +Amount);
            }
            formatedObj["ytd"] = fixedDecimal(+formatedObj["ytd"] + +Amount);
            break;
          }
          case "Encumbrance": {
            formatedObj["openPurchOrd"] = fixedDecimal(
              +formatedObj["openPurchOrd"] + +Amount
            );
            break;
          }
          case "Commitment": {
            formatedObj["openReq"] = fixedDecimal(
              +formatedObj["openReq"] + +Amount
            );
            break;
          }
          case "Budget": {
            formatedObj["budget"] = fixedDecimal(
              +formatedObj["budget"] + +Amount
            );
            break;
          }
        }
        if (index === data.length - 1) {
          finalResponse.push(
            { ...item, ...formatedObj },
            { ytd: total, desc: "Expense" }
          );
        }
      }
    });

  return finalResponse;
};

export const bcTableFormatters = {
  budgetTable,
};
