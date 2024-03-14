import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (e) {
    return Error("DB接続に失敗しました");
  }
};

export const GET = async () => {
  try {
    await main();
    const groups = await prisma.group.findMany();
    return NextResponse.json(
      { message: "success", groups: groups },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

export const POST = async (request: Request) => {
  try {
    const { name, image, introduction } = await request.json();
    await main();
    const group = await prisma.group.create({
      data: { name, image, introduction },
    });
    return NextResponse.json({ message: "success", group }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
