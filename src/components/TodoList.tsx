"use client";

import { Task } from "@/types/TaskType";
import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import {
  addTask,
  deleteTask,
  editTask,
  toogleCompleted,
} from "@/app/api/tasks/tasks";
import { AddTask } from "./AddTask";

type Props = {
  filteredData: Task[];
};

export const TodoList: React.FC<Props> = ({ filteredData }) => {
  const [tasks, setTasks] = useState<Task[]>(filteredData);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openedTasksId, setOpenedTasksId] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const handleAddTask = async (e: React.FormEvent, query: string) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    const newTask = {
      title: query,
      description: "",
      completed: false,
      timestamp: Date.now(),
    };

    const response = await addTask(newTask);

    console.log(response);

    setTasks((prev) => [response, ...prev]);

    setQuery("");
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
    setEditingTask(null);
  };

  return (
    <>
      <AddTask
        query={query}
        handleAddTask={handleAddTask}
        handleChangeQuery={handleChangeQuery}
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
