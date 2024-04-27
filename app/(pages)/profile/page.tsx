"use server";
import { prisma } from "@/app/api/db";
import { ProfileForm } from "@/components/forms/auth/profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage(query) {
  let email = await query?.searchParams?.email;
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
