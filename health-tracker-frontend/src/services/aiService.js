import api from './api';

export const fetchHealthScore = async () => {
  const response = await api.get('/ai/health-score');
  return response.data;
};

export const fetchTrendPrediction = async () => {
  const response = await api.get('/ai/trend-prediction');
  return response.data;
};

export const fetchRecommendations = async () => {
  const response = await api.get('/ai/recommendations');
  return response.data;
};

// services/aiService.js
export async function fetchHabitStats() {
  const response = await fetch('/ai/habit-stats'); // or your actual API endpoint
  if (!response.ok) throw new Error('Failed to fetch habit stats');
  return response.json();
}

