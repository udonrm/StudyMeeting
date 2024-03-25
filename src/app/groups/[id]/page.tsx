import DeleteButton from "@/app/components/group/deleteButton";
import { fetchGroupData } from "@/app/functions/group/fetchGroupData";
import Image from "next/image";

const page = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id);
  const group = await fetchGroupData(id);
  return (
    <>
      <h1>name</h1>
      {group.name}
      <h1>image</h1>
      <Image
        src={group.image}
        alt="groupImage"
        width={100}
        height={100}
      ></Image>
      <h1>introduction</h1>
      {group.introduction}
      <DeleteButton id={id} />
    </>
  );
};

export default page;
