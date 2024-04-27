"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  if (pathName === "/sign-in") return <></>;

  return (
    <div className="w-screen px-[30px] flex border-t border-t-muted/70 self-end justify-between items-center py-[30px]   text-sm text-foreground font-medium  ">
      <span className="">{new Date().getFullYear()}©harshwal.com</span>
      <div className="flex gap-3">
        <Link href={"#"} className="hover:text-[rgb(53,149,246)]">
          About Harshwal
        </Link>
        <Link href={"#"} className="hover:text-[rgb(53,149,246)]">
          Team
        </Link>
        <Link href={"#"} className="hover:text-[rgb(53,149,246)]">
          Support
        </Link>
      </div>
    </div>
  );
}
