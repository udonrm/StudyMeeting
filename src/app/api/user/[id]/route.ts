import { Params } from "@/types";
import { PrismaClient } from "@prisma/client";
import { main } from "../../group/route"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request, context: { params: Params }) => {
    try{
        const id = String(context.params.id);
        await main();
        const user = await prisma.$transaction([
            prisma.user.findUnique({
                where: { id },
                include: {
                    groupUsers : true,
                }
            }),
        ]);
        return NextResponse.json(
            { message: "success", user : user },
            { status : 200 }
        );
    } catch (e) {
        return NextResponse.json({ message: "error", e}, { status : 500 })
    } finally {
        await prisma.$disconnect;
    }
}

export const PATCH = async (request: Request, context: { params: Params}) => {
    try{
        const id = String(context.params.id);
        const { name , introduction, email, image } = await request.json();
        await main();
        const user = await prisma.$transaction([
            prisma.user.update({
                data: { name, introduction, email, image},
                where: { id },
            }),
        ]);
        return NextResponse.json({ message:"success", user: user }, { status : 200 });
    } catch(e){
        return NextResponse.json({ message: "error", e}, { status: 500});
    } finally {
        await prisma.$disconnect;
    }
}

export const DELETE = async (request: Request, context: { params: Params }) => {
    try{
        const id = String(context.params.id);
        await main();
        const user = await prisma.$transaction([
            prisma.user.delete({
                where: { id },
            }),
        ]);
        return NextResponse.json({ message: "success", user}, { status : 200 });
    } catch (e) {
        return NextResponse.json({ message: "error", e}, { status : 500 });
    } finally {
        await prisma.$disconnect;
    }
}