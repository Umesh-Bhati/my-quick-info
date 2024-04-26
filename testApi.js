// const url =  `https://login.microsoftonline.com/9a3b820c-c73a-42e3-bb1f-e6029580103b/oauth2/v2.0/authorize?grant_type=client_credentials&scope=http://api.businesscentral.dynamics.com/.default&client_id=7c62a791-4cda-4ac1-86c0-4d350e1319b8&client_secret=6LH8Q~aLJxq9nYqnyiCMy0M2I1ktBQe1_vLt6bBT`,
const axios = require("axios");
const getOAuthAceessToken = async () => {
  try {
    // const res = await axios.post(
    //   `https://login.microsoftonline.com/9a3b820c-c73a-42e3-bb1f-e6029580103b/oauth2/v2.0/token`,

    //   {
    //     grant_type: "client_credentials",
    //     scope: "https://api.businesscentral.dynamics.com/.default",
    //     client_id: "7c62a791-4cda-4ac1-86c0-4d350e1319b8" || "",
    //     client_secret: "6LH8Q~aLJxq9nYqnyiCMy0M2I1ktBQe1_vLt6bBT" || "",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    // console.log("token ", res.data.access_token);

    // console.log(
    //   "process.env.BUSINESS_CENTER_URL ",
    //   process.env.BUSINESS_CENTER_URL
    // );

    const gl = await axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/$metadata'`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOWEzYjgyMGMtYzczYS00MmUzLWJiMWYtZTYwMjk1ODAxMDNiLyIsImlhdCI6MTcxMzQzNzQzNSwibmJmIjoxNzEzNDM3NDM1LCJleHAiOjE3MTM0NDEzMzUsImFpbyI6IkUyTmdZRWlhWEo5K3NscS92T1h0ajdqMzY3enVBUUE9IiwiYXBwaWQiOiI3YzYyYTc5MS00Y2RhLTRhYzEtODZjMC00ZDM1MGUxMzE5YjgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85YTNiODIwYy1jNzNhLTQyZTMtYmIxZi1lNjAyOTU4MDEwM2IvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI0ZWU1M2VjOS1kNjJlLTQ0YjMtYmIyYS05YzgyZDJmMTg2N2UiLCJyaCI6IjAuQVZBQURJSTdtanJINDBLN0gtWUNsWUFRT3ozdmJabHNzMU5CaGdlbV9Ud0J1Sl8tQUFBLiIsInJvbGVzIjpbImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI0ZWU1M2VjOS1kNjJlLTQ0YjMtYmIyYS05YzgyZDJmMTg2N2UiLCJ0aWQiOiI5YTNiODIwYy1jNzNhLTQyZTMtYmIxZi1lNjAyOTU4MDEwM2IiLCJ1dGkiOiIzeS1lUkkxcUNrQzgzVzctbmUxYkFBIiwidmVyIjoiMS4wIn0.57cOdOzhnfeYtQi87kSS6PxZ5BhhsTyGRqBJD7FUft_DEMTEnOLsdGrpL9xufn6gGjFOOZPupi4wlxMtJC_7P9HeTKiAwtNjQZ69h-FcJrEemoLhLK5-TBRj-GHzCxQjhj_Ilm3gIQzcPUEPnZy-iMURdLGJQ3ccO-gptPRkYWo-lSP5_G020e9fBWtFB6uDcUs2BiUzufJjBIhMBO6tsl7OYINFMeiEiXjQb0WShghHS8Dd_EFezfoHd67QMdmAZuoYizuSIBM8DpIqrjQXAGJq9nzTPIZ7X1ooCJwt2kWvQTX4j6hm935ugOGb35tl6BjBr15JKJkYCeyomUQbeA`,
        },
      }
    );

    console.log("RESPONSE ", gl)

    // console.log("gl ", JSON.stringify(gl.data));
    // console.log("resOTH ", res.data);

    // return res.data;
  } catch (error) {
    console.error("error ", error);
  }
};

getOAuthAceessToken()
  .then((res) => res)
  .catch((err) => err);
