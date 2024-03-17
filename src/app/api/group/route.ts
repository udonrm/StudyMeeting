import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
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
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const introduction = (formData.get("introduction") as string) || null;
  const image = (formData.get("image") as File) || null;
  console.log(image);

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
    // Math.random()で出力される0から1未満の数と1e9(1 * 10の9乗)の積でMath.round()で四捨五入
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    await main();
    const group = await prisma.group.create({
      data: { name, image: fileUrl, introduction },
    });
    return NextResponse.json({ message: "success", group }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
