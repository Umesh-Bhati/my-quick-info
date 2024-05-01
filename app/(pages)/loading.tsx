import Image from "next/image";

export default function LoadingPage() {
  return (
    <main className="w-screen h-screen bg-black m-auto">
      <Image
        fill
        src="/logos/images/harshwal.gif"
        alt="loader"
        className="object-contain"
      />
    </main>
  );
}
