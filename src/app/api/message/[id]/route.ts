import { PrismaClient } from "@prisma/client"
import { main } from "../../group/route"
import { Params } from "@/types";
import { NextResponse } from "next/server";
import { request } from "http";

const prisma = new PrismaClient();

export const GET = async(request: Request, context: { params: Params }) => {
    try{
        const id = Number(context.params.id)
        await main();
        const message = await prisma.$transaction([
            prisma.message.findUniqueOrThrow({
                where: { id },
            }),
        ]);
        return NextResponse.json(
            { message: "success", chat: message },
            { status : 500 }
        )
    } catch(e) {
        return NextResponse.json(
            { message: "error", e},
            { status : 500 }
        );
    } finally {
        await prisma.$disconnect;
    }
}

export const PATCH = async (request: Request, context: { params: Params}) => {
    // const formData = await request.formData();
    // const userId = formData.get("userId") as string;
    // const room = Number(formData.get("roomId")); 
    const content = "updata"
    const userId = "clu702ta30000kb72e4ivripm"
    const roomId = 3
    try{
        const id = Number(context.params.id)
        await main();
        const message = await prisma.$transaction([
            prisma.message.update({
                data: { content : content, userId: userId, roomId: roomId },
                where: { id }
            }),
        ]);
        return NextResponse.json(
            { message: "success", chat: message },
            { status : 200 }
        )
    } catch(e){
        return NextResponse.json(
            { message: "error", e },
            { status : 500 }
        )
    } finally {
        await prisma.$disconnect;
    }
}

export const DELETE = async (request: Request, context: { params: Params }) => {
    try{
        const id = 3
        await main();
        const message = await prisma.$transaction([
            prisma.message.delete({
                where: { id },
            }),
        ]);
        return NextResponse.json(
            { message: "success"},
            { status : 200 }
        );
    } catch(e){
        return NextResponse.json(
            { message: "error", e },
            { status : 500 }
        );
    } finally {
        await prisma.$disconnect;
    }
}