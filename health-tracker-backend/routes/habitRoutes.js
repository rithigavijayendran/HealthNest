import express from 'express';
import {
  addHabit,
  getHabits,
  getHabitStats
} from '../controllers/habitController.js';
import  authenticate  from '../services/auth.js';

const router = express.Router();

router.post('/', authenticate, addHabit);
router.get('/', authenticate, getHabits);
router.get('/stats', authenticate, getHabitStats);

export default router;