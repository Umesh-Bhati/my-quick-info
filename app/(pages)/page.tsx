import Footer from "@/components/Footer";
import Image from "next/image";
import TabSection from "../(sections)/TabSection";
import { ProfileMenu } from "@/components/ProfileMenu";
import { getOAuthToken } from "../api/utils/getOAuthToken";

export default async function HomePage(props) {
  await getOAuthToken();
  return (
    <div
      className={`relative w-screen overflow-scroll flex flex-grow  flex-col`}
    >
      <Image
        src="/images/background.png"
        alt="background"
        fill
        className="object-fill -z-10 flex flex-grow h-full w-full absolute "
      />
      <header className="p-5 flex z-20 bg-white items-center w-full justify-between">
        <Image
          src="/logos/images/blue-harshwal.svg"
          width={360}
          height={75}
          alt="logo"
          className="h-[75px]"
        />
        <ProfileMenu />
      </header>
      <Image
        src={"/images/header-like-strip.png"}
        alt="header"
        height={100}
        width={500}
        className="w-full flex z-10 "
      />
      <main className="flex  gap-5 py-5 px-[30px] flex-col flex-grow">
        <TabSection />
      </main>
      <Footer />
    </div>
  );
}
