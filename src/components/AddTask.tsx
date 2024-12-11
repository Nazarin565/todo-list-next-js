"use client";

type Props = {
  queryTask: string;
  queryDescription: string;
  handleAddTask: (
    e: React.FormEvent,
    queryTask: string,
    queryDescription: string
  ) => Promise<void>;
  handleChangeQueryTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeQueryDescription: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export const AddTask: React.FC<Props> = ({
  queryTask,
  queryDescription,
  handleAddTask,
  handleChangeQueryTask,
  handleChangeQueryDescription,
}) => {
  return (
    <form
      onSubmit={(e) => handleAddTask(e, queryTask, queryDescription)}
      className="flex flex-col gap-1"
    >
      <input
        className="border border-black w-full p-3"
        placeholder="Enter your task*"
        value={queryTask}
        onChange={handleChangeQueryTask}
        required
      />
      <input
        className="border border-black w-full p-2"
        placeholder="Small description (optional)"
        value={queryDescription}
        onChange={handleChangeQueryDescription}
      />
      <button></button>
    </form>
  );
};
