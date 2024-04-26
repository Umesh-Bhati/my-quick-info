// pages/api/register.js

import { hash } from 'bcrypt';
import { json, prisma } from '../../../db'
import { NextResponse } from 'next/server';

export async function POST(req: any) {

    if (req.method !== 'POST') {
        return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
    }

    const { name, last_name, email, password, is_admin } = await req.json();
    console.log("body ", { name, last_name, email, password, is_admin })

    try {
        if (!name || !last_name || !email || !password) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 422 })
        }

        const existingUser = await prisma.users.findUnique({ where: { email } });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: 'Email already exists' }), { status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                name,
                last_name,
                email,
                password: hashedPassword,
                is_admin: is_admin === '1' || is_admin === 'on',
            },
        });
        return new NextResponse(JSON.stringify({
            message: 'Successful Registration!',
            data: json(newUser),
        }), { status: 201 })

    } catch (error) {
        console.error('Error during registration:', error);
        return new NextResponse(JSON.stringify({
            message: 'Internal Server Error',
        }), { status: 500 })
    }
}
export async function PUT(req: any) {

    if (req.method !== 'PUT') {
        return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
    }

    try {
        const { email, ...restData } = await req.json();
        if (email) {
            return new NextResponse(JSON.stringify({ message: 'Email not sent' }), { status: 422 })
        }

        const isExistUser = await prisma.users.findUnique({ where: { email } });
        if (!isExistUser) return new NextResponse(JSON.stringify({ message: 'User is not register' }), { status: 404 })

        const updatedRes = await prisma.users.update({ data: restData, where: { email } })
        return new NextResponse(JSON.stringify({ message: 'success', data: updatedRes }), { status: 201 })

    } catch (error) {
        console.error('Error during registration:', error);
        return new NextResponse(JSON.stringify({
            message: 'Internal Server Error',
        }), { status: 500 })
    }
}
