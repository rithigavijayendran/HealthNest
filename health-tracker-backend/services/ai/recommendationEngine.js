export class RecommendationEngine {
    constructor(user, habits, scoreBreakdown) {
      this.user = user;
      this.habits = habits;
      this.scoreBreakdown = scoreBreakdown;
    }
  
    generateRecommendations() {
      const recommendations = [];
      
      // Sleep recommendations
      if (this.scoreBreakdown.sleep < 80) {
        recommendations.push(this._getSleepRecommendation());
      }
      
      // Water recommendations
      if (this.scoreBreakdown.water < 80) {
        recommendations.push(this._getWaterRecommendation());
      }
      
      // Nutrition recommendations
      if (this.scoreBreakdown.nutrition < 80) {
        recommendations.push(this._getNutritionRecommendation());
      }
      
      // Exercise recommendations
      if (this.scoreBreakdown.exercise < 80) {
        recommendations.push(this._getExerciseRecommendation());
      }
      
      // Consistency recommendations
      if (this.scoreBreakdown.consistency < 30) {
        recommendations.push(this._getConsistencyRecommendation());
      }
      
      return this._prioritizeRecommendations(recommendations);
    }
  
    _getSleepRecommendation() {
      const avgSleep = this.habits.reduce((sum, h) => sum + (h.sleep || 0), 0) / 
        this.habits.filter(h => h.sleep).length;
      
      const sleepDeficit = this.user.goals.sleep - avgSleep;
      
      if (sleepDeficit > 1) {
        return {
          category: 'sleep',
          priority: 'high',
          message: `Increase sleep by ${Math.round(sleepDeficit)} hours to reach your goal.`,
          tips: [
            'Try going to bed 15 minutes earlier each night',
            'Reduce screen time before bed',
            'Keep a consistent sleep schedule'
          ]
        };
      } else {
        return {
          category: 'sleep',
          priority: 'medium',
          message: 'Maintain your good sleep habits!',
          tips: [
            'Track your sleep quality, not just quantity',
            'Consider a sleep meditation routine'
          ]
        };
      }
    }
  
    _getWaterRecommendation() {
      const avgWater = this.habits.reduce((sum, h) => sum + (h.water || 0), 0) / 
        this.habits.filter(h => h.water).length;
      
      const waterRatio = avgWater / this.user.goals.water;
      
      if (waterRatio < 0.8) {
        return {
          category: 'water',
          priority: 'high',
          message: `You're drinking ${Math.round((1 - waterRatio) * 100)}% less water than your goal.`,
          tips: [
            'Start your day with a glass of water',
            'Set hourly reminders to drink water',
            'Carry a water bottle with you'
          ]
        };
      } else {
        return {
          category: 'water',
          priority: 'low',
          message: 'Good hydration habits!',
          tips: [
            'Try adding lemon for variety',
            'Monitor urine color for hydration check'
          ]
        };
      }
    }
  
    _getNutritionRecommendation() {
      const meals = this.habits.flatMap(h => h.meals || []);
      const healthyMeals = meals.filter(m => m.healthy).length;
      const healthyRatio = healthyMeals / meals.length;
      
      if (healthyRatio < 0.7) {
        return {
          category: 'nutrition',
          priority: 'high',
          message: `${Math.round((1 - healthyRatio) * 100)}% of your meals could be healthier.`,
          tips: [
            'Add one more serving of vegetables per meal',
            'Plan meals ahead to avoid unhealthy choices',
            'Choose whole grains over refined carbs'
          ]
        };
      } else {
        return {
          category: 'nutrition',
          priority: 'medium',
          message: 'Great job with healthy eating!',
          tips: [
            'Try a new healthy recipe this week',
            'Consider tracking macronutrients for balance'
          ]
        };
      }
    }
  
    _getExerciseRecommendation() {
      const avgExercise = this.habits.reduce((sum, h) => sum + (h.exercise?.duration || 0), 0) / 
        this.habits.filter(h => h.exercise).length;
      
      const exerciseRatio = avgExercise / this.user.goals.exercise;
      
      if (exerciseRatio < 0.8) {
        return {
          category: 'exercise',
          priority: 'high',
          message: `You're ${Math.round((1 - exerciseRatio) * 100)}% short of your exercise goal.`,
          tips: [
            'Break workouts into smaller sessions throughout the day',
            'Try a new activity to stay motivated',
            'Schedule exercise like an important meeting'
          ]
        };
      } else {
        return {
          category: 'exercise',
          priority: 'low',
          message: 'Excellent exercise routine!',
          tips: [
            'Consider cross-training to prevent plateaus',
            'Track your progress to see improvements'
          ]
        };
      }
    }
  
    _getConsistencyRecommendation() {
      const dates = [...new Set(this.habits.map(h => h.date.toISOString().split('T')[0]))];
      const streak = this._calculateCurrentStreak(dates);
      
      if (streak < 3) {
        return {
          category: 'consistency',
          priority: 'high',
          message: `Your current streak is ${streak} days. Let's build it up!`,
          tips: [
            'Set small daily goals to build momentum',
            'Track your streak visually for motivation',
            'Celebrate small wins along the way'
          ]
        };
      } else {
        return {
          category: 'consistency',
          priority: 'medium',
          message: `Great job with your ${streak}-day streak!`,
          tips: [
            'Aim for 7 days to build a habit',
            'Plan for obstacles to maintain your streak'
          ]
        };
      }
    }
  
    _prioritizeRecommendations(recommendations) {
      // Sort by priority (high first) then by score impact
      return recommendations.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority];
        const bPriority = priorityOrder[b.priority];
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        return (this.scoreBreakdown[b.category] || 0) - (this.scoreBreakdown[a.category] || 0);
      });
    }
  
    _calculateCurrentStreak(dates) {
      const sortedDates = dates.map(d => new Date(d)).sort((a, b) => b - a);
      let streak = 0;
      
      for (let i = 0; i < sortedDates.length; i++) {
        const diff = i === 0 ? 0 : 
          (sortedDates[i-1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
        
        if (i === 0 || diff === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      return streak;
    }
  }