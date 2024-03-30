import { PrismaClient } from "@prisma/client";
import { main } from "../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        await main();
        const users = await prisma.$transaction([
            prisma.user.findMany(),
        ]);
        return NextResponse.json(
            { message: "success", users: users },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 });
    } finally {
        await prisma.$disconnect;
    }
};