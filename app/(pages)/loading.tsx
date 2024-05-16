import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function LoadingPage({ className }: { className?: string }) {
  return (
    <main className={twMerge("w-screen h-screen bg-black m-auto", className)}>
      <Image
        fill
        src="/logos/images/harshwal.gif"
        alt="loader"
        className="object-contain"
      />
    </main>
  );
}
