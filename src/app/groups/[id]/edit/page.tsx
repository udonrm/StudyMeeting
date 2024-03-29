import { fetchGroupData } from "@/app/functions/group/fetchGroupData";
import { EditForm } from "@/app/components/group/editForm";

const page = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id);
  const group = await fetchGroupData( id );
  return (
    <EditForm
      groupObj={{
        id: group.id,
        name: group.name,
        image: group.image,
        introduction: group.introduction,
      }}
    />
  );
};

export default page;
