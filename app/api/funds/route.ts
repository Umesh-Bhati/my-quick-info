import { NextResponse } from "next/server";
import { json, prisma } from "../db";
import { getServerSession } from "next-auth";
import {getOAuthToken} from "../utils/getOAuthToken";


export async function GET() {
    try {
        const session = await getServerSession();
        const user = session?.user || {}

        // const token = await getOAuthToken()
        // console.log("token ", token)

        // const storedUser = await prisma.users.findUnique({
        //     where: {
        //         email: user.email || ''
        //     }
        // })
        // if (!storedUser?.is_admin) return NextResponse.json({ message: "Access denied", data: [] })

        const funds = await prisma.bc_funds.findMany();

        return NextResponse.json({ message: "successs", data: json(funds) })
    } catch (error) {
        return NextResponse.json({ message: "something went wrong" })
    }
}

