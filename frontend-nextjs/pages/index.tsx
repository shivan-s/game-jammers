import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <>Loading...</>;
  if (error) return <>Error!</>;
  if (user)
    return (
      <>
        <h1>Home</h1>
        {isLoading && <>Loading...</>}
        {error && <>Error</>}
        {user ? (
          <>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
          </>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </>
    );
}
