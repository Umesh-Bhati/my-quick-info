"use client";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { ProfileMenu } from "./ProfileMenu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header({ isAdmin }: { isAdmin: boolean }) {
  const { theme, systemTheme } = useTheme();
  const pathName = usePathname();

  if (pathName === "/sign-in") return <></>;
  return (
    <header className="p-5   shadow-md flex z-20 bg-background items-center w-full border-b justify-between">
      <Link href={"/"}>
        {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
          <Image
            src={"/logos/images/harshwal.svg"}
            width={150}
            height={50}
            alt="logo"
            className="w-[200px]"
          />
        ) : (
          <Image
            src={"/logos/images/blue-harshwal.svg"}
            width={150}
            height={50}
            alt="logo"
            className="w-[200px]"
          />
        )}
      </Link>
      <div className="flex gap-5 items-center justify-center">
        <ModeToggle />
        <ProfileMenu isAdmin={isAdmin} />
      </div>
    </header>
  );
}
