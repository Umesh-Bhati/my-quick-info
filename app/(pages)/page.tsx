import Footer from "@/components/Footer";
import Image from "next/image";
import TabSection from "../(sections)/TabSection";
import { getOAuthToken } from "../api/utils/getOAuthToken";
import Header from "@/components/Header";

export default async function HomePage(props) {
  await getOAuthToken();
  return (
    <div
      className={`relative w-screen overflow-scroll flex flex-grow  flex-col`}
    >
      {/* <Image
        src="/images/background.png"
        alt="background"
        fill
        className="object-fill -z-10 flex flex-grow h-full w-full absolute "
      /> */}

      <Image
        src={"/images/header-like-strip.png"}
        alt="header"
        height={100}
        width={500}
        className="w-full flex z-10 h-[100px]"
      />
      <main className="flex  gap-5 py-5 px-[30px] flex-col flex-grow">
        <TabSection />
      </main>
    </div>
  );
}
