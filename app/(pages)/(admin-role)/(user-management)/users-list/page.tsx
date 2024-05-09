import { prisma } from "@/app/api/db";
import UsersTable from "@/components/tables/users-list";

export default async function UsersList() {
  const users = await prisma.users.findMany();
  // const scope = await prisma.user_scopes.findMany()

  // console.log("scope ", scope)
  return (
    <section className="w-screen h-screen p-12 bg-background/30 ">
      <h1 className="text-xl text-foreground mb-5">Users List</h1>
      <UsersTable data={users || []} />
    </section>
  );
}
