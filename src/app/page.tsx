"use client";

import Image from "next/image";
import { useState } from "react";

const initTasks = [
  {
    id: 0,
    task: "do sport",
    description: "do sport every day is good for your health",
  },
  {
    id: 1,
    task: "go to the shop",
    description: "buy some products",
  },
  {
    id: 2,
    task: "become a millionaire",
    description: "get 1 million dollars",
  },
  {
    id: 3,
    task: "buy a car",
    description: "choose a car and buy it",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState(initTasks);
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent, query: string) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    const max = tasks.reduce((max, cur) => {
      return cur.id > max ? cur.id : max;
    }, 0);

    const newTask = {
      id: max + 1,
      task: query,
      description: "",
    };

    setTasks((prev) => [...prev, newTask]);
    setQuery("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <main className="max-w-96 w-full flex flex-col gap-2">
        <form onSubmit={(e) => handleSubmit(e, query)}>
          <input
            className="border border-black w-full p-3"
            placeholder="Enter your task"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {!!tasks.length ? (
          <ul className="border p-3 border-black flex flex-col gap-2">
            {tasks.map(({ id, task }) => (
              <li
                key={id}
                className="border p-3 border-black flex justify-between"
              >
                {task}{" "}
                <Image
                  aria-hidden
                  src="/close-icon.svg"
                  alt="close icon"
                  width={24}
                  height={24}
                  onClick={() => handleDeleteTask(id)}
                  className="cursor-pointer"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">Congratulate! You do all tasks</p>
        )}
      </main>
    </div>
  );
}
