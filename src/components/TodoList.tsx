"use client";

import { Task } from "@/types/TaskType";
import React, { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import {
  addTask,
  deleteTask,
  editTask,
  toogleCompleted,
} from "@/app/api/tasks/tasks";
import { AddTask } from "./AddTask";
import { useRouter } from "next/navigation";

type Props = {
  filteredData: Task[];
};

export const TodoList: React.FC<Props> = ({ filteredData }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openedTasksId, setOpenedTasksId] = useState<string[]>([]);
  const [queryTask, setQueryTask] = useState("");
  const [queryDescription, setQueryDescription] = useState("");
  const [userUid, setUserUid] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userUid = localStorage.getItem("userUID");

    if (!userUid) {
      router.replace("/login");
    }

    setUserUid(userUid);
    setTasks(filteredData.filter((item) => item.userUid === userUid));
  }, [filteredData, router]);

  const handleAddTask = async (
    e: React.FormEvent,
    queryTask: string,
    queryDescription: string
  ) => {
    e.preventDefault();

    if (!queryTask.trim() || !userUid) {
      return;
    }

    const newTask = {
      title: queryTask.trim(),
      description: queryDescription.trim(),
      completed: false,
      timestamp: Date.now(),
      userUid,
    };

    const response = await addTask(newTask);

    console.log(response);

    setTasks((prev) => [response, ...prev]);

    setQueryTask("");
    setQueryDescription("");
  };

  const handleChangeQueryTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryTask(e.target.value);
  };

  const handleChangeQueryDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryDescription(e.target.value);
  };

  const handleToogleOpenedTask = (id: string) => {
    if (openedTasksId.includes(id)) {
      setOpenedTasksId((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedTasksId((prev) => [...prev, id]);
    }
  };

  const handleToogleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    toogleCompleted(id);
  };

  const handleDeleteTask = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (openedTasksId.includes(id)) {
      setOpenedTasksId((prev) => prev.filter((item) => item !== id));
    }

    deleteTask(id);
  };

  const handleOpenEditing = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    setEditingTask(task);
  };

  const handleEditTask = (
    e: React.FormEvent,
    editedTask: string,
    id: string
  ) => {
    e.preventDefault();

    if (!editedTask.trim()) {
      handleDeleteTask(id);
      return;
    }

    editTask(id, editedTask);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editedTask } : task
      )
    );
    setEditingTask(null);
  };

  return (
    <>
      <AddTask
        queryTask={queryTask}
        queryDescription={queryDescription}
        handleAddTask={handleAddTask}
        handleChangeQueryTask={handleChangeQueryTask}
        handleChangeQueryDescription={handleChangeQueryDescription}
      />

      {!!tasks.length ? (
        <ul className="border p-3 border-black flex flex-col gap-2">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              openedTasksId={openedTasksId}
              handleToogleOpenedTask={handleToogleOpenedTask}
              handleToogleComplete={handleToogleComplete}
              handleDeleteTask={handleDeleteTask}
              handleOpenEditing={handleOpenEditing}
              handleEditTask={handleEditTask}
              editingTask={editingTask}
            />
          ))}
        </ul>
      ) : (
        <p className="text-green-600">
          You completed all your task! Congratulations!
        </p>
      )}
    </>
  );
};
