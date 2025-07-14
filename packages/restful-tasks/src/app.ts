import { Hono } from 'hono';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './db';

const app = new Hono();

app.get('/tasks', (c) => {
  return c.json(getTasks());
});

app.get('/tasks/:id', (c) => {
  const { id } = c.req.param();
  const task = getTask(id);
  if (!task) {
    return c.json({ error: 'Task not found' }, 404);
  }
  return c.json(task);
});

app.post('/tasks', async (c) => {
  const { title, completed } = await c.req.json();
  const newTask = createTask({ title, completed: completed || false });
  return c.json(newTask, 201);
});

app.put('/tasks/:id', async (c) => {
  const { id } = c.req.param();
  const { title, completed } = await c.req.json();
  const updatedTask = updateTask(id, { title, completed });
  if (!updatedTask) {
    return c.json({ error: 'Task not found' }, 404);
  }
  return c.json(updatedTask);
});

app.delete('/tasks/:id', (c) => {
  const { id } = c.req.param();
  const success = deleteTask(id);
  if (!success) {
    return c.json({ error: 'Task not found' }, 404);
  }
  return c.json({ message: 'Task deleted' });
});

export default app;
