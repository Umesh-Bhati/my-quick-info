import { prisma } from "@/app/api/db"

export const updateProfile = async ({ email, ...updateData }: any) => {
    try {
        const user = await prisma.users.update({ where: { email }, data: updateData })
        if (!user) return { error: "User is not registered" }
        return { success: "User updated successfully" }
    } catch (error) {
        console.error("error ", error);
    }
}