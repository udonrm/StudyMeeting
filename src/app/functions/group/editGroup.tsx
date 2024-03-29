"use server";

import { revalidateTag } from "next/cache";

export async function EditGroup(prevState: any, formData: FormData) {
  const group = {
    id: formData.get("id"),
    name: formData.get("name"),
    image: formData.get("image"),
    introduction: formData.get("introduction"),
  };
  const res = await fetch(`http://localhost:3000/api/group/${group.id}`, {
    method: "PATCH",
    body: formData,
  });
  const data = await res.json();
  revalidateTag('groups/${group.id}/edit')
  return data;
}
