import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.use(express.json());

router.get('/', (req: Request, res: Response) => {
  res.send('Server');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
