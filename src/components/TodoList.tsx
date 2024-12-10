import { Task } from "@/types/TaskType";
import React from "react";
import { TodoItem } from "./TodoItem";

type Props = {
  tasks: Task[];
};

export const TodoList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="border p-3 border-black flex flex-col gap-2">
      {tasks.map((task) => (
        <TodoItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
