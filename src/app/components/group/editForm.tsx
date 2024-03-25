"use client";
import { EditGroup } from "@/app/functions/group/editGroup";
import { group, groupObjType } from "@/types";
import Image from "next/image";
import { useFormState } from "react-dom";

export function EditForm({ groupObj }: groupObjType) {
  const initialState: group = {
    id: groupObj.id,
    name: groupObj.name,
    image: groupObj.image,
    introduction: groupObj.introduction,
  };

  const [FormState, formAction] = useFormState(EditGroup, initialState);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={FormState.id} />
        <input type="text" name="name" defaultValue={FormState.name} />
        <Image
          src={FormState.image}
          alt="groupImage"
          width={100}
          height={100}
        />
        <input type="file" name="image" />
        <input
          type="text"
          name="introduction"
          defaultValue={FormState.introduction}
        />
        <button type="submit">送信</button>
      </form>
    </>
  );
}
