import { format, startOfMonth } from "date-fns";

export const fixedDecimal = (decimal: number): number =>
  Number.isInteger(decimal) ? decimal : +Number(decimal).toFixed(2);

const budgetTable = (data: any[], postingDate: string | Date = new Date(), fundNo: number | string) => {
  const startOfPostingMonth = startOfMonth(postingDate);
  const month = new Date(postingDate).getMonth()
  const year = new Date(postingDate).getFullYear()
  const startFundDate = month >= 9 ? format(postingDate, "yyyy-10-01") : format(postingDate, `${year - 1}-10-01`)
  let totalYtd = 0;
  let openPurchOrdTotal = 0
  let openReqTotal = 0
  let totalMtd = 0
  let totalBudget = 0
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
          finalResponse.push({ ytd: totalYtd, mtd: totalMtd, budget: totalBudget, openReq: openReqTotal, openPurchOrd: openPurchOrdTotal, desc: "Revenue" });
          isRevenueCal = true;
          totalYtd = 0;
          openPurchOrdTotal = 0
          openReqTotal = 0
          totalMtd = 0
          totalBudget = 0
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
        lastItem = item;
        switch (item.Transaction_Type_NVG) {
          case "Actual": {
            if (
              new Date(item.Posting_Date) >= startOfPostingMonth
            ) {
              formatedObj["mtd"] = fixedDecimal(+formatedObj["mtd"] + +Amount);
              totalMtd = fixedDecimal(+totalMtd + +Amount)
            }
            if (+fundNo < 500) {
              if (new Date(item.Posting_Date).getTime() >= new Date(startFundDate).getTime()) {
                formatedObj["ytd"] = fixedDecimal(+formatedObj["ytd"] + +Amount);
                totalYtd = fixedDecimal(+totalYtd + +Amount)
              }
            } else {
              formatedObj["ytd"] = fixedDecimal(+formatedObj["ytd"] + +Amount);
              totalYtd = fixedDecimal(+totalYtd + +Amount)
            }

            break;
          }
          case "Encumbrance": {
            formatedObj["openPurchOrd"] = fixedDecimal(
              +formatedObj["openPurchOrd"] + +Amount
            );
            openPurchOrdTotal = fixedDecimal(
              +openPurchOrdTotal + +Amount
            )
            break;
          }
          case "Commitment": {
            formatedObj["openReq"] = fixedDecimal(
              +formatedObj["openReq"] + +Amount
            );
            openReqTotal = fixedDecimal(
              +openReqTotal + +Amount
            );
            break;
          }
          case "Budget": {
            if (+fundNo < 500) {
              if (new Date(item.Posting_Date).getTime() >= new Date(startFundDate).getTime()) {
                formatedObj["budget"] = fixedDecimal(
                  +formatedObj["budget"] + +Amount
                );
                totalBudget = fixedDecimal(
                  +totalBudget + +Amount
                );
              }
            } else {
              formatedObj["budget"] = fixedDecimal(
                +formatedObj["budget"] + +Amount
              );
              totalBudget = fixedDecimal(
                +totalBudget + +Amount
              );
            }
            break;
          }
        }
        if (index === data.length - 1) {
          finalResponse.push(
            { ...item, ...formatedObj },
            { ytd: totalYtd, mtd: totalMtd, budget: totalBudget, openReq: openReqTotal, openPurchOrd: openPurchOrdTotal, desc: "Expenses" }
          );
        }
      }
    });

  return finalResponse;
};

export const bcTableFormatters = {
  budgetTable,
};
