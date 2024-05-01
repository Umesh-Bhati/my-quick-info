import { LoginForm } from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-screen flex-grow ">
      <div className="flex-1 bg-background flex-col justify-center items-center">
        <LoginForm />
      </div>
      <div className="flex-1 relative overflow-hidden flex-grow h-full w-full p-12 flex-col gap-3 items-center justify-center bg-primary">
        <Image
          src="/logos/images/harshwal.gif"
         width={459}
          alt="logo"
          height={500}
          className=" h-[500px] m-auto w-[500px] self-center"
        />
        <h1 className=" text-white font-semiBold text-4xl fw-bolder text-center my-7">
          Fast, Efficient and Productive
        </h1>
        <div className=" text-white  text-center">
          Harshwal &amp; Company, LLP is a leading provider in Accounting,
          <br />
          Financial, Compliance and IT audit, IT Consulting, Financial
          Management <br />
          and Forensic Audit Services.
        </div>
      </div>
    </div>
  );
}
