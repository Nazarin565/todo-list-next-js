import { TodoList } from "@/components/TodoList";
import { DisplayUserName } from "@/components/DisplayUserName";
import { LogOutButton } from "@/components/LogoutButton";

export default async function Home() {
  return (
    <div className="p-12 flex justify-center">
      <main className="my-auto bg-white rounded-lg shadow-lg p-14 max-w-[800px] w-full flex flex-col gap-2">
        <h1>Hello</h1>
        <DisplayUserName />

        <TodoList />

        <LogOutButton />
      </main>
    </div>
  );
}
