import { TodoList } from "@/components/TodoList";
import { cookies } from "next/headers";
import Link from "next/link";
import { getTasks } from "./api/tasks/tasks";

export default async function Home() {
  const displayName = (await cookies()).get("displayName")?.value || null;

  const filteredData = await getTasks();

  console.log(filteredData);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <main className="max-w-96 w-full flex flex-col gap-2">
        <h1>Hello, {displayName}</h1>

        <TodoList filteredData={filteredData} />

        <Link href="/login">Log out</Link>
      </main>
    </div>
  );
}
