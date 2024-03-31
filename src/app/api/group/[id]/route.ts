import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
import { main } from "../route";
import { Params } from "@/types";

const prisma = new PrismaClient();

export const GET = async (request: Request, context: { params: Params }) => {
  try {
    const id = Number(context.params.id);
    await main();
    const group = await prisma.group.findUniqueOrThrow({
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const introduction = (formData.get("introduction") as string) || null;
  const image = (formData.get("image") as File) || null;
  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("ja-JP", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const id: number = Number(params.id);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    await main();
    const group = await prisma.group.update({
      data: { name, image: fileUrl, introduction },
      where: { id },
    });
    return NextResponse.json({ message: "Success", group }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

export const DELETE = async (request: Request, context: { params: Params }) => {
  try {
    const id = Number(context.params.id);
    await main();
    const group = await prisma.$transaction([
      prisma.group.delete({
        where: { id },
      }),
    ]);
    return NextResponse.json({ message: "Success", group }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
