import express from 'express';
import auth from '../middleware/auth.js';
import { addKeyword, deleteKeyword, getKeyword, getKeywords, refreshKeyword, toggleTracking } from '../controllers/rankController.js';

const rankRouter = express.Router();

rankRouter.post('/add', auth, addKeyword);
rankRouter.post('/list', auth, getKeywords);
rankRouter.post('/:id', auth, getKeyword);
rankRouter.post('/:id/refresh', auth, refreshKeyword);
rankRouter.put('/:id/toggle', auth, toggleTracking);
rankRouter.delete('/:id', auth, deleteKeyword);

export default rankRouter;