// const url =  `https://login.microsoftonline.com/9a3b820c-c73a-42e3-bb1f-e6029580103b/oauth2/v2.0/authorize?grant_type=client_credentials&scope=http://api.businesscentral.dynamics.com/.default&client_id=7c62a791-4cda-4ac1-86c0-4d350e1319b8&client_secret=6LH8Q~aLJxq9nYqnyiCMy0M2I1ktBQe1_vLt6bBT`,
const { endOfDay, format, startOfMonth } = require("date-fns");

const  postingDate =  "2024-05-09"
const startOfPostingMonth = startOfMonth(postingDate);
  const endOfPostingDate = endOfDay(postingDate);
  const month = new Date(postingDate).getMonth()
  const year = new Date(postingDate).getFullYear()


  const check = new Date("2024-04-09") >= startOfPostingMonth

  console.log("check ", check)