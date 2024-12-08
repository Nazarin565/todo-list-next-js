"use client";

import { Task } from "@/types/TaskType";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

const initTasks = [
  {
    id: 0,
    task: "do sport",
    description: "do sport every day is good for your health",
    completed: true,
  },
  {
    id: 1,
    task: "go to the shop",
    description: "buy some products",
    completed: false,
  },
  {
    id: 2,
    task: "become a millionaire",
    description: "get 1 million dollars",
    completed: false,
  },
  {
    id: 3,
    task: "buy a car",
    description: "choose a car and buy it",
    completed: true,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initTasks);
  const [query, setQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskQuery, setNewTaskQuery] = useState("");
  const [openedTasksId, setOpenedTasksId] = useState<number[]>([]);

  const handleAddTask = (e: React.FormEvent, query: string) => {
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
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setQuery("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (openedTasksId.includes(id)) {
      setOpenedTasksId((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleEditTask = (
    e: React.FormEvent,
    editedTask: string,
    id: number
  ) => {
    e.preventDefault();

    if (!editedTask.trim()) {
      handleDeleteTask(id);
      return;
    }

    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, task: newTaskQuery } : item
      )
    );
    setEditingTask(null);
  };

  const handleToogleOpenedTask = (id: number) => {
    if (openedTasksId.includes(id)) {
      setOpenedTasksId((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedTasksId((prev) => [...prev, id]);
    }
  };

  const handleToogleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <main className="max-w-96 w-full flex flex-col gap-2">
        <form onSubmit={(e) => handleAddTask(e, query)}>
          <input
            className="border border-black w-full p-3"
            placeholder="Enter your task"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {!!tasks.length ? (
          <ul className="border p-3 border-black flex flex-col gap-2">
            {tasks.map(({ id, task, description, completed }) => (
              <li key={id} className="flex gap-2 items-center">
                <button
                  aria-label="Toogle completed task"
                  onClick={() => handleToogleComplete(id)}
                  className="flex-shrink-0 border border-black rounded-full h-6 w-6"
                >
                  {completed && (
                    <Image
                      aria-hidden
                      src="/completed-icon.svg"
                      alt="complete or uncomplete task"
                      width={24}
                      height={24}
                    />
                  )}
                </button>
                <div
                  className="w-full border p-3 border-black flex flex-col gap-3 hover:bg-slate-100 cursor-pointer"
                  onClick={() => handleToogleOpenedTask(id)}
                >
                  <div className="w-full flex justify-between hover:bg-slate-100 cursor-pointer ">
                    {editingTask?.id === id ? (
                      <form
                        onSubmit={(e) => handleEditTask(e, newTaskQuery, id)}
                      >
                        <input
                          className="w-full"
                          placeholder="Edit your task"
                          value={newTaskQuery}
                          autoFocus
                          onChange={(e) => setNewTaskQuery(e.target.value)}
                          onBlur={(e) => handleEditTask(e, newTaskQuery, id)}
                        />
                      </form>
                    ) : (
                      <p
                        className={classNames({
                          "line-through text-gray-400": completed,
                        })}
                      >
                        {task}
                      </p>
                    )}
                    <div className="flex gap-1">
                      <button
                        aria-label="Edit task"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTask({ id, task, description, completed });
                          setNewTaskQuery(task);
                        }}
                        className="cursor-pointer hover:bg-gray-300"
                      >
                        <Image
                          aria-hidden
                          src="/edit-icon.svg"
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      </button>

                      <button
                        aria-label="Delete task"
                        onClick={() => handleDeleteTask(id)}
                        className="cursor-pointer hover:bg-gray-300"
                      >
                        <Image
                          aria-hidden
                          src="/close-icon.svg"
                          alt="close"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>

                  {openedTasksId.includes(id) && (
                    <p className="text-xs text-orange-600">{description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">Congratulate! You did all tasks</p>
        )}
      </main>
    </div>
  );
}
