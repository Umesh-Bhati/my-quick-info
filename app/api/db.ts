import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic'

export const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

export const json = (param: any): any => {
    return JSON.stringify(
        param,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
};