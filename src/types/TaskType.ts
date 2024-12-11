export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp: number;
  userUid: string;
}
