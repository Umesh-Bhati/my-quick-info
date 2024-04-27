import { prisma } from "@/app/api/db";
import Header from "@/components/Header";
import UsersTable from "@/components/tables/users-list";

export default async function UsersList(props) {
  const users = await prisma.users.findMany();
  return (
    <section className="w-screen h-screen p-12 bg-background/30 ">
      <h1 className="text-xl text-foreground mb-5">Users List</h1>
      <UsersTable data={users || []} />
    </section>
  );
}
