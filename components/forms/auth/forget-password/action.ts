"use server"
import { prisma } from "@/app/api/db";
import { hash } from "bcrypt";

type UpdatePasswordType = {
    email: string;
    password: string
}
export async function updatePassword({ email, password }: UpdatePasswordType) {
    try {
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) return { error: "User is not registerd" }
        const hashedPassword = await hash(password, 10);
        const updatedUser = await prisma.users.update({ where: { email }, data: { password: hashedPassword } })
        console.log("updatedUser ", updatedUser)
        return { success: "Password updated succfully" }
    } catch (error) {
        console.error("forgetPassErr ", error);
    }
}