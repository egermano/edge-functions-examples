
type Task = {
  id: string;
  title: string;
  completed: boolean;
};

let tasks: Task[] = [
  { id: '1', title: 'Buy milk', completed: false },
  { id: '2', title: 'Walk the dog', completed: true },
  { id: '3', title: 'Do laundry', completed: false },
];

export const getTasks = () => tasks;

export const getTask = (id: string) => tasks.find((task) => task.id === id);

export const createTask = (task: Omit<Task, 'id'>) => {
  const newTask = { ...task, id: String(tasks.length + 1) };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id: string, task: Partial<Omit<Task, 'id'>>) => {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return null;
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...task };
  return tasks[taskIndex];
};

export const deleteTask = (id: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return false;
  }
  tasks = tasks.filter((task) => task.id !== id);
  return true;
};
