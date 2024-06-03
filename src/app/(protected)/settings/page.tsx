import { auth } from "@/auth";
import { json } from "stream/consumers";

export default async function SettingPages() {
  const session = await auth();
  return (
    <div>
      <div>settings</div>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
