"use server";
export async function EditGroup(formData: FormData) {
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
  return <div>editGroup</div>;
}
