import Habit from '../models/Habit.js';
import User from '../models/User.js';
import { HealthScoreCalculator } from '../services/ai/healthScoreCalculator.js';

// Add or update a habit entry
export const addHabit = async (req, res) => {
  try {
    const { date, sleep, water, meals, exercise } = req.body;
    const userId = req.user?.id;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingEntry = await Habit.findOne({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay }
    });
    

    if (existingEntry) {
      if (sleep !== undefined) existingEntry.sleep = sleep;
      if (water !== undefined) existingEntry.water = water;
      if (meals !== undefined) existingEntry.meals = meals;
      if (exercise !== undefined) existingEntry.exercise = exercise;

      await existingEntry.save();
      await updateHealthScore(userId);
      return res.json(existingEntry);
    }

    const habit = new Habit({
      user: userId,
      date,
      sleep,
      water,
      meals,
      exercise
    });

    await habit.save();
    await updateHealthScore(userId);
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all habits or within a date range
export const getHabits = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    const query = { user: userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const habits = await Habit.find(query).sort({ date: -1 });
    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get habit stats (weekly average)
export const getHabitStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const habits = await Habit.find({
      user: userId,
      date: { $gte: last7Days }
    });

    const total = habits.length;
    if (total === 0) {
      return res.json({ message: 'No habits logged in the last 7 days' });
    }

    const totals = habits.reduce(
      (acc, habit) => {
        acc.sleep += habit.sleep || 0;
        acc.water += habit.water || 0;
        acc.meals += habit.meals || 0;
        acc.exercise += habit.exercise || 0;
        return acc;
      },
      { sleep: 0, water: 0, meals: 0, exercise: 0 }
    );

    const averages = {
      sleep: +(totals.sleep / total).toFixed(1),
      water: +(totals.water / total).toFixed(1),
      meals: +(totals.meals / total).toFixed(1),
      exercise: +(totals.exercise / total).toFixed(1)
    };

    res.json({ totalDays: total, averages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Private helper to recalculate health score
async function updateHealthScore(userId) {
  const habits = await Habit.find({ user: userId }).sort({ date: -1 }).limit(30);
  const user = await User.findById(userId);

  const calculator = new HealthScoreCalculator(user, habits);
  const score = calculator.calculate();

  user.healthScore = score.score;
  await user.save();

  return score;
}
