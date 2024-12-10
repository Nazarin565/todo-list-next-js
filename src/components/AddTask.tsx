"use client";

type Props = {
  query: string;
  handleAddTask: (e: React.FormEvent, query: string) => Promise<void>;
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddTask: React.FC<Props> = ({
  query,
  handleAddTask,
  handleChangeQuery,
}) => {
  return (
    <form onSubmit={(e) => handleAddTask(e, query)}>
      <input
        className="border border-black w-full p-3"
        placeholder="Enter your task"
        value={query}
        onChange={handleChangeQuery}
      />
    </form>
  );
};
