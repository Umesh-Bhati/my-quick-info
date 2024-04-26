import { LoginForm } from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/on-demand");
  }
  return (
    <div className="flex h-screen flex-grow ">
      <div className="flex-1 bg-background justify-center items-center">
        <LoginForm />
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-[16.239999771118164px]">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pb-[0.75px]">
            <p className="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left text-[#009ef7]">
              Terms
            </p>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pb-[0.75px]">
            <p className="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left text-[#009ef7]">
              Contact Us
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex-grow h-full w-full p-12 flex-col gap-3 items-center justify-center bg-primary">
        <Image
          src="/logos/images/harshwal.svg"
          width={360}
          height={75}
          alt="logo"
          className=" h-[75px] m-auto w-[360px] self-center"
        />
        <Image
          src="/images/auth-screens.png"
          alt="auth-screens"
          width={500}
          height={300}
          className=" m-auto max-w-[500px] "
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
