import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { cookies } from "next/headers";
import Link from "next/link";

const initTasks = [
  {
    id: 0,
    title: "do sport",
    description: "do sport every day is good for your health",
    completed: true,
  },
  {
    id: 1,
    title: "go to the shop",
    description: "buy some products",
    completed: false,
  },
  {
    id: 2,
    title: "become a millionaire",
    description: "get 1 million dollars",
    completed: false,
  },
  {
    id: 3,
    title: "buy a car",
    description: "choose a car and buy it",
    completed: true,
  },
];

// export async function getServerSideProps() {
//   const cookieStore = await cookies();
//   const displayName = cookieStore.get("displayName")?.value || null;

//   return {
//     props: { displayName },
//   };
// }

export default async function Home() {
  const displayName = (await cookies()).get("displayName")?.value || null;
  // const [tasks, setTasks] = useState<Task[]>(initTasks);
  // const [query, setQuery] = useState("");
  // const [editingTask, setEditingTask] = useState<Task | null>(null);
  // const [newTaskQuery, setNewTaskQuery] = useState("");
  // const [openedTasksId, setOpenedTasksId] = useState<number[]>([]);

  // const handleAddTask = (e: React.FormEvent, query: string) => {
  //   e.preventDefault();

  //   if (!query.trim()) {
  //     return;
  //   }

  //   const max = tasks.reduce((max, cur) => {
  //     return cur.id > max ? cur.id : max;
  //   }, 0);

  //   const newTask = {
  //     id: max + 1,
  //     task: query,
  //     description: "",
  //     completed: false,
  //   };

  //   setTasks((prev) => [...prev, newTask]);
  //   setQuery("");
  // };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <main className="max-w-96 w-full flex flex-col gap-2">
        <h1>Hello, {displayName}</h1>
        <AddTodo />

        {!!initTasks.length ? (
          <TodoList tasks={initTasks} />
        ) : (
          <p className="text-green-600">Congratulate! You did all tasks</p>
        )}

        <Link href="/login">Log out</Link>
      </main>
    </div>
  );
}
