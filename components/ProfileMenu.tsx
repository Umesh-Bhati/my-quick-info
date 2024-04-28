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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProfileMenu({ isAdmin = false }: { isAdmin: boolean }) {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "unauthenticated") return <></>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Image
          src={"/icons/profile.png"}
          alt="profile"
          width={36}
          height={36}
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
              {data?.user?.name}
              {"  "}
              {isAdmin && (
                <span className="text-muted px-1.5 font-semibold  py-[1px] bg-[#50cd89] text-[#e8fff3] text-xs rounded-[0.5rem]">
                  Admin
                </span>
              )}
            </h1>
            <p className="text-xs text-muted-foreground">{data?.user?.email}</p>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          My Profile
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => router.push("/create-user")}>
                    Create
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/users-list")}>
                    List
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Scope</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
