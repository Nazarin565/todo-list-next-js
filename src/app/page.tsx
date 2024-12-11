import { TodoList } from "@/components/TodoList";
import { getTasks } from "./api/tasks/tasks";
import { DisplayUserName } from "@/components/DisplayUserName";
import { LogOutButton } from "@/components/LogoutButton";

export default async function Home() {
  const filteredData = await getTasks();

  console.log(filteredData);

  return (
    <div className="p-12 flex justify-center">
      <main className="my-auto bg-white rounded-lg shadow-lg p-14 max-w-[800px] w-full flex flex-col gap-2">
        <DisplayUserName />

        <TodoList filteredData={filteredData} />

        <LogOutButton />
      </main>
    </div>
  );
}
