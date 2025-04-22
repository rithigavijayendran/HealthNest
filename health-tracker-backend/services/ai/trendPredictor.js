import { HealthScoreCalculator } from './healthScoreCalculator.js';
export class TrendPredictor {
  constructor(user, habits, currentScore) {
    this.user = user;
    this.habits = habits;
    this.currentScore = currentScore;
    this.predictionDays = 7;
  }

  predict() {
    if (this.habits.length < 3) {
      return this._defaultPrediction();
    }

    const scores = this._calculateHistoricalScores();
    const trend = this._analyzeTrend(scores);

    return this._generateProjection(trend);
  }

  _calculateHistoricalScores() {
    const dailyHabits = {};

    this.habits.forEach(habit => {
      const dateStr = habit.date.toISOString().split('T')[0];
      if (!dailyHabits[dateStr]) {
        dailyHabits[dateStr] = [];
      }
      dailyHabits[dateStr].push(habit);
    });

    return Object.entries(dailyHabits).map(([date, habits]) => {
      const calculator = new HealthScoreCalculator(this.user, habits);
      return calculator.calculate();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  _analyzeTrend(scores) {
    const x = scores.map((_, i) => i);
    const y = scores.map(s => s.score);

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    const sumXX = x.map(xi => xi * xi).reduce((a, b) => a + b, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  }

  _generateProjection(trend) {
    const projections = [];
    const { slope, intercept } = trend;

    for (let i = 1; i <= this.predictionDays; i++) {
      const projectedScore = intercept + slope * (this.habits.length + i);
      projections.push({
        day: i,
        score: Math.max(0, Math.min(100, Math.round(projectedScore))),
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
      });
    }

    return projections;
  }

  _defaultPrediction() {
    return Array.from({ length: this.predictionDays }, (_, i) => ({
      day: i + 1,
      score: this.currentScore,
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000)
    }));
  }
}
