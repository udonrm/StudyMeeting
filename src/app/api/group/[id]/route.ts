import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { main } from "../route";

const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const id = Number(params.id);
    await main();
    const group = await prisma.group.findUnique({
      where: { id },
    });
    return NextResponse.json(
      { message: "success", group: group },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

export const PATCH = async (request: Request) => {};
