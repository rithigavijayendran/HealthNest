import User from '../models/User.js';
import Habit from '../models/Habit.js';
import { HealthScoreCalculator } from '../services/ai/healthScoreCalculator.js';
import { TrendPredictor } from '../services/ai/trendPredictor.js';
import { RecommendationEngine } from '../services/ai/recommendationEngine.js';

export const getHealthScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId }).sort({ date: -1 }).limit(30);
    const user = await User.findById(userId);

    const calculator = new HealthScoreCalculator(user, habits);
    const score = calculator.calculate();

    res.json(score);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getTrendPrediction = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId }).sort({ date: 1 });
    const user = await User.findById(userId);

    const calculator = new HealthScoreCalculator(user, habits);
    const currentScore = calculator.calculate();

    if (!currentScore || currentScore.score === undefined) {
      return res.status(400).json({ message: 'Unable to calculate health score' });
    }

    const predictor = new TrendPredictor(user, habits, currentScore.score);
    const trend = predictor.predict();

    res.json(trend);
  } catch (error) {
    console.error("Trend Prediction Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId }).sort({ date: -1 }).limit(7);
    const user = await User.findById(userId);

    const calculator = new HealthScoreCalculator(user, habits);
    const score = calculator.calculate();

    const engine = new RecommendationEngine(user, habits, score.breakdown);
    const recommendations = engine.generateRecommendations();

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getHabitStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await Habit.find({ user: userId }).sort({ date: -1 }).limit(30);

    const weeklyScores = habits.map(h => ({
      date: h.date,
      score: h.score,
    }));

    const avg = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    const avgSleep = avg(habits.map(h => h.sleep || 0));
    const avgWater = avg(habits.map(h => h.water || 0));
    const avgExercise = avg(habits.map(h => h.exercise || 0));
    const avgNutrition = avg(habits.map(h => h.nutrition || 0));

    res.json({
      weeklyScores,
      avgSleep,
      avgWater,
      avgExercise,
      avgNutrition
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};