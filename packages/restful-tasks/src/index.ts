import { fire } from 'hono/service-worker';
import app from './app';

fire(app);
