import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json()
        console.log("POSTSINF ", { email, password, name })
        if (!email) return NextResponse.json({ message: "email not have" })
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });
        if (user) return NextResponse.json({ message: "user already have", code: 409 })
        const hashedPassword = await hash(password, 10);
        await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
        return NextResponse.json({ message: "user successfully register", code: 201 })
    } catch (error) {
        console.error("nextAPI sign-up error ", error);
        // return NextResponse.json({ message: "user already have" })
    }
}