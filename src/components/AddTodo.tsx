"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const AddTodo = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleAddTask = (e: React.FormEvent, query: string) => {
    e.preventDefault();

    router.refresh();

    if (!query.trim()) {
      return;
    }

    // const max = tasks.reduce((max, cur) => {
    //   return cur.id > max ? cur.id : max;
    // }, 0);

    // const newTask = {
    //   id: max + 1,
    //   task: query,
    //   description: "",
    //   completed: false,
    // };

    // setTasks((prev) => [...prev, newTask]);
    setQuery("");
  };

  return (
    <form onSubmit={(e) => handleAddTask(e, query)}>
      <input
        className="border border-black w-full p-3"
        placeholder="Enter your task"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
