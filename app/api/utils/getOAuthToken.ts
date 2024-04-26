"use  server"
import axios from "axios";
import { cookies } from "next/headers";

export async function getOAuthToken() {
    try {
        const storedCookies = cookies().get('BC_OAUTH');
        let token = storedCookies?.value
        if (!token) {
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
            cookies().set('BC_OAUTH', res.data.access_token, {
                maxAge: res.data.expires_in - 10
            });
            token = res.data.access_token
        }
        return token
    } catch (error) {
        console.error("error ", error);
    }
}

// export async function get