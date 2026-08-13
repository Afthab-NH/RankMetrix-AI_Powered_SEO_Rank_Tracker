import express from 'express';
import auth from '../middleware/auth.js';
import { analyseUrl, deleteAnalysis, getAnalyses } from '../controllers/analysisController.js';

const analysisRouter = express.Router();

analysisRouter.post('/analyze', auth, analyseUrl);
analysisRouter.get('/list', auth, getAnalyses);
analysisRouter.get('/:id', auth, getAnalyses);
analysisRouter.delete('/:id', auth, deleteAnalysis);

export default analysisRouter;