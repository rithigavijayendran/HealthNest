export class HealthScoreCalculator {
    constructor(user, habits) {
      this.user = user;
      this.habits = habits;
      this.baseScores = {
        sleep: 0,
        water: 0,
        nutrition: 0,
        exercise: 0,
        consistency: 0
      };
    }
  
    calculate() {
      this._calculateSleepScore();
      this._calculateWaterScore();
      this._calculateNutritionScore();
      this._calculateExerciseScore();
      this._calculateConsistencyBonus();
      
      return this._finalScore();
    }
  
    _calculateSleepScore() {
      const { sleep } = this.user.goals;
      const recentSleep = this.habits.map(h => h.sleep).filter(Boolean);
      
      if (recentSleep.length === 0) return 0;
      
      const avgSleep = recentSleep.reduce((a, b) => a + b, 0) / recentSleep.length;
      const sleepDiff = Math.abs(avgSleep - sleep);
      
      // Unique scoring: More penalty for undersleeping than oversleeping
      this.baseScores.sleep = sleepDiff <= 1 ? 100 :
        sleepDiff <= 2 ? 80 :
        avgSleep < sleep ? 60 - (sleep - avgSleep) * 10 :
        80 - (avgSleep - sleep) * 5;
    }
  
    _calculateWaterScore() {
      const { water } = this.user.goals;
      const recentWater = this.habits.map(h => h.water).filter(Boolean);
      
      if (recentWater.length === 0) return 0;
      
      const avgWater = recentWater.reduce((a, b) => a + b, 0) / recentWater.length;
      const waterRatio = avgWater / water;
      
      // Unique hydration curve based on weight
      const weightFactor = this.user.weight / 70; // Normalized to 70kg
      const adjustedGoal = water * weightFactor;
      
      this.baseScores.water = Math.min(100, (avgWater / adjustedGoal) * 100);
    }
  
    _calculateNutritionScore() {
      const recentMeals = this.habits.flatMap(h => h.meals).filter(Boolean);
      
      if (recentMeals.length === 0) return 0;
      
      const healthyCount = recentMeals.filter(m => m.healthy).length;
      const mealScore = (healthyCount / recentMeals.length) * 100;
      
      // Unique timing bonus for regular meals
      const mealTimes = recentMeals.map(m => {
        const [hours] = m.time.split(':').map(Number);
        return hours;
      });
      
      const timeVariance = this._calculateVariance(mealTimes);
      const timingBonus = timeVariance < 2 ? 15 : 0;
      
      this.baseScores.nutrition = Math.min(100, mealScore + timingBonus);
    }
  
    _calculateExerciseScore() {
      const { exercise } = this.user.goals;
      const recentExercise = this.habits.map(h => h.exercise?.duration || 0);
      
      if (recentExercise.length === 0) return 0;
      
      const totalExercise = recentExercise.reduce((a, b) => a + b, 0);
      const avgExercise = totalExercise / recentExercise.length;
      
      // Unique scoring considering intensity
      const avgIntensity = this.habits.reduce((sum, h) => 
        sum + (h.exercise?.intensity || 0), 0) / this.habits.length;
      
      const intensityFactor = 1 + (avgIntensity - 5) * 0.1;
      const adjustedExercise = avgExercise * intensityFactor;
      
      this.baseScores.exercise = Math.min(100, (adjustedExercise / exercise) * 100);
    }
  
    _calculateConsistencyBonus() {
      // Unique streak algorithm with decay for missed days
      const dates = this.habits.map(h => h.date.toISOString().split('T')[0]);
      const uniqueDays = [...new Set(dates)].sort();
      
      let currentStreak = 0;
      let maxStreak = 0;
      let prevDate = null;
      
      for (const day of uniqueDays) {
        const currentDate = new Date(day);
        
        if (prevDate && (currentDate - prevDate) / (1000 * 60 * 60 * 24) === 1) {
          currentStreak++;
        } else if (prevDate) {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 1;
        } else {
          currentStreak = 1;
        }
        
        prevDate = currentDate;
      }
      
      maxStreak = Math.max(maxStreak, currentStreak);
      this.baseScores.consistency = Math.min(50, maxStreak * 5); // Max 50 bonus points
    }
  
    _finalScore() {
      const weights = {
        sleep: 0.3,
        water: 0.2,
        nutrition: 0.25,
        exercise: 0.25
      };
      
      let weightedSum = 0;
      for (const [key, weight] of Object.entries(weights)) {
        weightedSum += this.baseScores[key] * weight;
      }
      
      // Add consistency bonus
      weightedSum += this.baseScores.consistency;
      
      return {
        score: Math.round(weightedSum),
        breakdown: this.baseScores,
        date: new Date()
      };
    }
  
    _calculateVariance(values) {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      return Math.sqrt(
        values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / values.length
      );
    }
  }