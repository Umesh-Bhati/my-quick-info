"use server"
import { prisma } from "@/app/api/db"

export const fetchScopesByUserId = async (user_id: number) => {
    try {
        const data = prisma.user_scopes.findMany({ where: { user_id : Number(user_id)} })
        return data
    } catch (error) {
        console.error("errrorDurringFetchScope ", error);
    }
}