// const url =  `https://login.microsoftonline.com/9a3b820c-c73a-42e3-bb1f-e6029580103b/oauth2/v2.0/authorize?grant_type=client_credentials&scope=http://api.businesscentral.dynamics.com/.default&client_id=7c62a791-4cda-4ac1-86c0-4d350e1319b8&client_secret=6LH8Q~aLJxq9nYqnyiCMy0M2I1ktBQe1_vLt6bBT`,
const { endOfDay, format, startOfMonth } = require("date-fns");

const postingDate = "2024-05-07";
const startOfPostingMonth = startOfMonth(postingDate);
const endOfPostingDate = endOfDay(postingDate);
const month = new Date(postingDate).getMonth();
const year = new Date(postingDate).getFullYear();

const check = new Date("2024-04-09") >= startOfPostingMonth;

console.log("check ", check);
const startFundDate =
  month >= 9
    ? format(postingDate, "yyyy-10-01")
    : format(postingDate, `${year - 1}-10-01`);

const axios = require("axios");
const getOAuthAceessToken = async () => {
  try {
    const res = await axios.post(
      `https://login.microsoftonline.com/9a3b820c-c73a-42e3-bb1f-e6029580103b/oauth2/v2.0/token`,

      {
        grant_type: "client_credentials",
        scope: "https://api.businesscentral.dynamics.com/.default",
        client_id: "7c62a791-4cda-4ac1-86c0-4d350e1319b8" || "",
        client_secret: "6LH8Q~aLJxq9nYqnyiCMy0M2I1ktBQe1_vLt6bBT" || "",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { data } = await axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/General_Ledger_Entries_Excel?$filter=G_L_Account_No ge '400000' and G_L_Account_No le '999999'   and Posting_Date le ${postingDate} and Fund_No_NVG eq '0140'`,
      {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      }
    );

    let total = 0;

    const finalRes = data.value
      .filter(
        (item) =>
          item["G_L_Account_No"] == "430000" &&
          item["Transaction_Type_NVG"] == "Actual"
      )
      .forEach((item, currItem) => {
        // console.log("item.postingDate ", item)
        if (
          new Date(item.Posting_Date).getTime() >=
          new Date(startFundDate).getTime()
        ) {
          total += +item["Amount"];
          // console.log
          console.log("inTotal ", total);
        }
      }, []);
    console.log("total ", total);

    // console.log("gl ", JSON.stringify(gl.data));
    // console.log("resOTH ", res.data);

    // return res.data;
  } catch (error) {
    console.error("error ", error);
  }
};

console.log("startFundDate ", startFundDate);

getOAuthAceessToken()
  .then((res) => res)
  .catch((err) => err);

let bottle = 99;

for (let i = 99; i >= 0; i--) {
  if (i === 0) {
    console.log(
      "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall."
    );
  } else {
    console.log(
      `${i} bottles of beer on the wall, ${i} bottles of beer.\nTake one down and pass it around, ${
        i - 1 === 0 ? "no more bottle" : `${i - 1} bottles`
      } of beer on the wall`
    );
  }
}


console.log(`${i} bottles of beer on the wall, ${i} bottles of beer.\nTake one down and pass it around, `${i-1 === 0 ? "no more bottle" : `${i-1} bottles`} of beer on the wall`)