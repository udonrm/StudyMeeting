import { auth, signIn, signOut } from "@/app/utils/auth";

const Auth = async () => {
  const session = await auth();

  const logIn = async () => {
    "use server";
    await signIn("github", {
      redirectTo: "/",
    });
  };
  const logOut = async () => {
    "use server";
    await signOut();
  };
  return (
    <>
      {session ? (
        <>
          <form action={logOut}>
            <button>Sign out</button>
          </form>
        </>
      ) : (
        <form action={logIn}>
          <button>Sign in with GitHub</button>
        </form>
      )}
    </>
  );
};

export default Auth;
