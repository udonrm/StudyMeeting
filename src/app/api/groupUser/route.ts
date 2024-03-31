import { PrismaClient } from "@prisma/client";
import { main } from "../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        await main();
        const groupUsers = await prisma.$transaction([
            prisma.groupUser.findMany(),
        ]);
        return NextResponse.json(
            { message: "success", groupUsers: groupUsers },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 })
    } finally {
        await prisma.$disconnect;
    }
};

export const POST = async (request: Request) => {
    // const formData = await request.formData();
    // const userId = formData.get("userId") as string;
    // const groupId = Number(formData.get("groupId"));
    const userId = "clu702ta30000kb72e4ivripm";
    const groupId = 2
    try {
        await main();
        const groupUser = await prisma.$transaction([
            prisma.groupUser.create({
                data: { userId: userId, groupId: groupId }
            }),
        ]);
        return NextResponse.json({ message: "success", groupUser: groupUser }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 });
    } finally {
        await prisma.$disconnect;
    }
}