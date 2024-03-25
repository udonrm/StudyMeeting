const Form = () => {
  const createGroup = async (formData: FormData) => {
    "use server";
    const groupObject = {
      name: formData.get("name"),
      image: formData.get("image"),
      introduction: formData.get("introduction"),
    };

    const res = await fetch(`http://localhost:3000/api/group`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    });
  };

  return (
    <>
      <form action={createGroup}>
        <input type="text" name="name" />
        <input type="file" name="image" />
        <input type="text" name="introduction" />
        <button type="submit">送信</button>
      </form>
    </>
  );
};

export default Form;
