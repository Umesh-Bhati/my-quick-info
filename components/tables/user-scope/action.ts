"use server"
import { prisma } from "@/app/api/db"
import { getServerSession } from "next-auth"

export const fetchScopesByUserId = async (user_id: number) => {
    try {
        const data = prisma.user_scopes.findMany({ where: { user_id: Number(user_id) } })
        return data
    } catch (error) {
        console.error("errrorDurringFetchScope ", error);
    }
}

type UpdateSaveType = {
    fund_no: string;
    dept_rel: string;
    user_id: number;
}

export const updateOrSaveScope = async (val: UpdateSaveType) => {
    try {
        const alreadyScopes = await prisma.user_scopes.findMany({ where: { fund_no: val.fund_no, user_id: val.user_id } })
        if (alreadyScopes.length > 0) {
            const { id } = alreadyScopes[0]
            return await prisma.user_scopes.update({ where: { id }, data: { dept_rel: val.dept_rel } })
        }
        const data = await getServerSession()
        const selfUsers = await prisma.users.findUnique({ where: { email: data?.user?.email || '' } })
        if (selfUsers?.id)
            return await prisma.user_scopes.create({ data: { user_id: val.user_id, fund_no: val.fund_no, dept_rel: val.dept_rel, made_by: Number(selfUsers.id) } })
    } catch (error) {
        console.error("errorUpdateSaveScope ", error);

    }
}

export const deleteScope = async (id: number) => {
    try {
        await prisma.user_scopes.delete({ where: { id } })
    } catch (error) {
        console.error("deleteScopeErr ", error);
    }
}