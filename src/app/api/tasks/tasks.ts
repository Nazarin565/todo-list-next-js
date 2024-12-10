import { db } from "@/app/firebase";
import { Task } from "@/types/TaskType";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);

  const sortedData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      completed: doc.data().completed,
      description: doc.data().description,
      timestamp: doc.data().timestamp,
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  return sortedData;
};

export const addTask = async (task: Omit<Task, "id">) => {
  const newTask = await addDoc(tasksCollection, task);
  return { id: newTask.id, timestamp: Date.now(), ...task };
};

export const deleteTask = async (id: string) => {
  const deletedTask = doc(db, "tasks", id);
  await deleteDoc(deletedTask);
};

export const editTask = async (id: string, newTitle: string) => {
  const updatedTask = doc(db, "tasks", id);
  await updateDoc(updatedTask, { title: newTitle });
};

export const toogleCompleted = async (id: string) => {
  const updatedTask = doc(db, "tasks", id);
  const docSnapshot = await getDoc(updatedTask);

  if (docSnapshot.exists()) {
    const isCompleted = docSnapshot.data().completed;
    await updateDoc(updatedTask, { completed: !isCompleted });
  }
};
