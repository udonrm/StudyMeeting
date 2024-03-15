"use client";
import { EditGroup } from "@/app/functions/group/editGroup";
import { groupObjType } from "@/types";
import { useFormState } from "react-dom";

export function EditForm({ groupObj }: groupObjType) {
  const initialState = {
    id: groupObj.id,
    name: groupObj.name,
    image: groupObj.image,
    introduction: groupObj.introduction,
  };
  const [state, formAction] = useFormState(EditGroup, initialState);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" />
        <input type="text" name="name" />
        <input type="file" name="image" />
        <input type="text" name="introduction" />
        <button type="submit">送信</button>
      </form>
    </>
  );
}
