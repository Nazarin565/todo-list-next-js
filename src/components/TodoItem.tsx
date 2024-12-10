"use client";

import { Task } from "@/types/TaskType";
import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  task: Task;
};

export const TodoItem: React.FC<Props> = ({ task }) => {
  const { id, completed, description, title } = task;
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskQuery, setNewTaskQuery] = useState("");
  const [openedTasksId, setOpenedTasksId] = useState<number[]>([]);

  const handleToogleOpenedTask = (id: number) => {
    if (openedTasksId.includes(id)) {
      setOpenedTasksId((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedTasksId((prev) => [...prev, id]);
    }
  };

  // const handleToogleComplete = (id: number) => {
  //   setTasks((prev) =>
  //     prev.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  // const handleDeleteTask = (id: number) => {
  //   setTasks((prev) => prev.filter((task) => task.id !== id));
  //   if (openedTasksId.includes(id)) {
  //     setOpenedTasksId((prev) => prev.filter((item) => item !== id));
  //   }
  // };

  // const handleEditTask = (
  //   e: React.FormEvent,
  //   editedTask: string,
  //   id: number
  // ) => {
  //   e.preventDefault();

  //   if (!editedTask.trim()) {
  //     handleDeleteTask(id);
  //     return;
  //   }

  //   setTasks((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, task: newTaskQuery } : item
  //     )
  //   );
  //   setEditingTask(null);
  // };

  return (
    <li className="flex gap-2 items-center">
      <button
        aria-label="Toogle completed task"
        // onClick={() => handleToogleComplete(id)}
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
            // onSubmit={(e) => handleEditTask(e, newTaskQuery, id)}
            >
              <input
                className="w-full"
                placeholder="Edit your task"
                value={newTaskQuery}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setNewTaskQuery(e.target.value)}
                // onBlur={(e) => handleEditTask(e, newTaskQuery, id)}
              />
            </form>
          ) : (
            <p
              className={classNames({
                "line-through text-gray-400": completed,
              })}
            >
              {title}
            </p>
          )}
          <div className="flex gap-1">
            <button
              aria-label="Edit task"
              onClick={(e) => {
                e.stopPropagation();
                setEditingTask({ id, title, description, completed });
                setNewTaskQuery(title);
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
              // onClick={() => handleDeleteTask(id)}
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
  );
};
