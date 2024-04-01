import { PrismaClient } from "@prisma/client";
import { main } from "../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
    try{
        await main();
        const messages = await prisma.$transaction([
            prisma.message.findMany()
        ]);
        return NextResponse.json(
            { message: "success", messages: messages},
            { status : 200 }
        );
    } catch(e) {
        return NextResponse.json(
            { message: "error", e},
            { status : 500 }
        );
    } finally {
        await prisma.$disconnect;
    }
};

export const POST = async (request: Request) => {
    // const formData = await request.formData();
    // const userId = formData.get("userId") as string;
    // const room = Number(formData.get("roomId")); 
    const content = "StudyMeeting"
    const userId = "clu702ta30000kb72e4ivripm"
    const roomId = 3
    try{
        await main();
        const message = await prisma.$transaction([
            prisma.message.create({
                data: { userId : userId , roomId: roomId , content: content }
            }),
        ]);
        return NextResponse.json(
            { message: "success", chat: message },
            { status : 500 }
        );
    } catch(e){
        return NextResponse.json(
            { message: "error", e},
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect;
    }
}