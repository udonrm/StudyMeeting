export const fetchGroupData = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/group/${id}`, {
    // cache: "no-store",
    next: { tags : ['groups/${id}'] },
  });
  const data = await res.json();
  return data.group;
};
