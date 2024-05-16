import { prisma } from "@/app/api/db";
import {
  fetchDepartments,
  fetchFunds,
} from "@/components/forms/on-demand-reports/budget-vs-actual/action";
import UsersScopeTable from "@/components/tables/user-scope";

export default async function UsersScopePage() {
  const [users, funds, departments] = await Promise.all([
    prisma.users.findMany(),
    fetchFunds(),
    fetchDepartments(),
  ]);

  return (
    <section className="min-w-screen min-h-screen p-12 bg-background/30 ">
      <h1 className="text-xl text-foreground mb-5">Users Scope</h1>
      <UsersScopeTable
        users={users || []}
        fundList={funds.value}
        departments={departments?.value || []}
      />
    </section>
  );
}
