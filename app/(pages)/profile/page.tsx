"use server";
import { prisma } from "@/app/api/db";
import { ProfileForm } from "@/components/forms/auth/profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
interface IPageProps {
  params: { your_dynamic_prop_here: string };
  searchParams: Record<string, string | undefined>;
}

export default async function ProfilePage(query:IPageProps) {
  let email:any = await query?.searchParams?.email;
  const isMe = !email;
  if (!email) {
    const res = await getServerSession();
    email = res?.user?.email;
  }
  const usersFormData = await prisma.users.findUnique({ where: { email } });
  if (!usersFormData) return redirect("/");

  return (
    <section className="min-h-screen min-w-screen flex justify-center items-center">
      <ProfileForm
        isMe={isMe}
        email={email}
        firstName={usersFormData?.name}
        lastName={usersFormData?.last_name}
      />
    </section>
  );
}
