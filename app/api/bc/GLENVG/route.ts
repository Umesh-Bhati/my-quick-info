import { NextRequest, NextResponse } from "next/server";
import { json, prisma } from "../../db";
import { getServerSession } from "next-auth";
export const dynamic = 'force-dynamic'



async function getMTD(filters, startDate:) {
    const data = await prisma.$transaction.findMany({
        where: {
            date: { gte: startDate },
            ...filters
        }
    })
    return data
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        const { Fund_No_NVG } = await request.json()
        const user = session?.user || {}

        const storedUser = await prisma.bc_general_ledger_entries.findMany({
            select: {
                Amount
            },


        })
        if (!storedUser?.is_admin) return NextResponse.json({ message: "Access denied", data: [] })

        const funds = await prisma.bc_funds.findMany();

        console.log("fundss ", funds)
        return NextResponse.json({ message: "successs", data: json(funds) })
    } catch (error) {
        console.error("fundGet ", error);
        return NextResponse.json({ message: "something went wrong" })
    }
}
