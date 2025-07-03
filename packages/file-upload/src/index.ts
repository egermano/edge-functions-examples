
import { Hono } from 'hono';

const app = new Hono();

app.post('/upload', async (c) => {
  const data = await c.req.formData();
  const file = data.get('file');

  if (!file) {
    return c.json({ message: 'File not found' }, 400);
  }

  // @ts-ignore
  const buffer = await file.arrayBuffer();

  return c.json({ message: 'File uploaded successfully' });
});

export default app;
