const deleteGroup = async (id: number) => {
  "use server";
  const res = await fetch(`http://localhost:3000/api/group/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export default deleteGroup;
