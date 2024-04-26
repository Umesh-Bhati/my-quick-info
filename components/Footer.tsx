import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-screen px-[30px] flex border-t border-t-muted/70 self-end justify-between items-center py-[30px]   text-sm text-[#7E8299] font-medium  ">
      <span className="">{new Date().getFullYear()}©</span>
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
