import { Params } from "@/types";
import { PrismaClient } from "@prisma/client";
import { main } from "../../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request, context: { params: Params }) => {
    try {
        const id = Number(context.params.id);
        await main();
        const room = await prisma.$transaction([
            prisma.room.findUniqueOrThrow({
                where: { id },
            }),
        ]);
        return NextResponse.json(
            { message: "success", room: room },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ message: "error", e }, { status: 500 });
    } finally {
        await prisma.$disconnect;
    }
}

export const PATCH = async (request: Request, context: { params: Params }) => {
    try {
        // const id = context.params.id;
        // const { name, groupId } = await request.json();
        const id = 1
        const name = "ddd"
        const groupId = 2
        await main();
        const room = await prisma.$transaction([
            prisma.room.update({
                data: { name: name, groupId: groupId },
                where: { id }
            }),
        ]);
        return NextResponse.json(
            { message: "success", room: room },
            { status: 200 }
        )
    } catch (e) {
        return NextResponse.json(
            { message: "error", e },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect;
    }
}

export const DELETE = async (request: Request, context: { params: Params }) => {
    try {
        // const id = context.params.id;
        const id = 1
        await main();
        const room = await prisma.$transaction([
            prisma.room.delete({
                where: { id },
            }),
        ]);
        return NextResponse.json(
            { message: "success", room },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { message: "error", e },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect;
    }
}