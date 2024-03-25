import deleteGroup from "@/app/functions/group/deleteGroup";

const DeleteButton = async ({ id }: { id: number }) => {
  const handleAction = async () => {
    "use server";
    const res = await deleteGroup(id);
  };
  return (
    <>
      <form action={handleAction}>
        <button>delete</button>
      </form>
    </>
  );
};

export default DeleteButton;
