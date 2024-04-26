"use client";
import { getOAuthToken } from "@/app/api/utils/getOAuthToken";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProfileMenu() {
  const router = useRouter();

  const getFundList = async () => {
    try {
      // const { access_token } = await getOAuthToken();
      const fundList = await axios.get(
        `https://api.businesscentral.dynamics.com/v2.0/9a3b820c-c73a-42e3-bb1f-e6029580103b/Production/ODataV4/Company('Cahuilla')/Fund_List?$top=5'`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOWEzYjgyMGMtYzczYS00MmUzLWJiMWYtZTYwMjk1ODAxMDNiLyIsImlhdCI6MTcxMzg3NzAyMCwibmJmIjoxNzEzODc3MDIwLCJleHAiOjE3MTM4ODA5MjAsImFpbyI6IkUyTmdZR0NaYmJOeTk4cHEyMm15SFIrdVA3VjVCQUE9IiwiYXBwaWQiOiI3YzYyYTc5MS00Y2RhLTRhYzEtODZjMC00ZDM1MGUxMzE5YjgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85YTNiODIwYy1jNzNhLTQyZTMtYmIxZi1lNjAyOTU4MDEwM2IvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI0ZWU1M2VjOS1kNjJlLTQ0YjMtYmIyYS05YzgyZDJmMTg2N2UiLCJyaCI6IjAuQVZBQURJSTdtanJINDBLN0gtWUNsWUFRT3ozdmJabHNzMU5CaGdlbV9Ud0J1Sl8tQUFBLiIsInJvbGVzIjpbImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI0ZWU1M2VjOS1kNjJlLTQ0YjMtYmIyYS05YzgyZDJmMTg2N2UiLCJ0aWQiOiI5YTNiODIwYy1jNzNhLTQyZTMtYmIxZi1lNjAyOTU4MDEwM2IiLCJ1dGkiOiJYdWszS19ydnUwR085TUlTbGQ2VkFBIiwidmVyIjoiMS4wIn0.IVAd23_CxJf5IXdjLgqdQ0C5pFIugPuTboQd6DvOpsDbaFATWJCKUmfqKDwIU-FcfySYC2Wx8a65i7RAIDU6DslprMXWYjJ9YtSuY0wngsOUc4Il0b54RpOq8_7NkZh-m_32tyZ2eL_Wc-_hIX3Aj6anCQZkbY2OTJB3GmsVYSfsEsGZO-8_nkZxv-6DWyUAQdb-xVAsvA0f64MR9QA377FGkCRkuHoeWbQYtnNkv7elyutdqGv_dAlMAxbgjPM4xOjx4mbAyr-vNF22wTFdQwCkY0h2-K6jSViJFcWX35-Kq-4txHnjFcUT4c1_aOvkljL7IgduG6NU3sR-_n0YaQ`,
          },
        }
      );

      console.log("fundListt ", fundList.data);
    } catch (error) {
      console.error("errorFund ", error);
    }
  };

  useEffect(() => {
    getFundList();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Image
          src={"/icons/profile.png"}
          alt="profile"
          width={40}
          height={40}
          className=" rounded-lg"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-[300px] mr-10 shadow-2xl"}>
        <DropdownMenuGroup className="flex-row items-center p-3 flex gap-3">
          <Image
            src={"/icons/profile.png"}
            alt="profile"
            width={40}
            height={40}
            className=" w-10 h-10   rounded-lg"
          />
          <div className="flex flex-[3]  flex-col">
            <h1 className="text-[1rem] font-semibold">
              Umesh Bhati{" "}
              <span className="text-muted px-1.5 font-semibold  py-[2px] bg-[#50cd89] text-[#e8fff3] text-xs rounded-[0.5rem]">
                Admin
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">
              umesh.bhati193@gmail.com
            </p>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => router.push("/create-user")}>
                Create
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>List</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Scope</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sync Bc</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sync Funds</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sync Deps</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Mode</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
