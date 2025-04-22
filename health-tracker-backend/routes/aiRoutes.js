import express from 'express';
import {
  getHealthScore,
  getTrendPrediction,
  getRecommendations,
  getHabitStats
} from '../controllers/aiController.js';
import  authenticate  from '../services/auth.js';

const router = express.Router();
router.use(authenticate);
router.get('/health-score', getHealthScore);
router.get('/trend-prediction', getTrendPrediction);
router.get('/recommendations', getRecommendations);
router.get('/habit-stats', getHabitStats);

export default router;