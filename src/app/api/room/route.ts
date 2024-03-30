import { PrismaClient } from "@prisma/client";
import { main } from "../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        await main();
        const rooms = await prisma.$transaction([
            prisma.room.findMany()
        ]);
        return NextResponse.json(
            { message: "success", rooms: rooms },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 });
    } finally {
        await prisma.$disconnect;
    }
};

export const POST = async (request: Request) => {
    // const formData = await request.formData();
    // const name = formData.get("name") as string;
    // const groupId = Number(formData.get("groupId")); 
    const name = "tttt"
    const groupId = 2
    try {
        await main();
        const room = await prisma.$transaction([
            prisma.room.create({
                data: { name: name, groupId: groupId }
            }),
        ]);
        return NextResponse.json({ message: "success", room: room }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 });
    } finally {
        await prisma.$disconnect;
    }
}