import { auth } from "@/auth";
import { LoggedIn, LoggedOut } from "@/components/Home";

export default async function Home() {
  const session = await auth();
  const userId = session?.user.id;
  return <>{userId ? <LoggedIn /> : <LoggedOut />}</>;
}
