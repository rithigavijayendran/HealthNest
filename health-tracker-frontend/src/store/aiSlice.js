import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchHealthScore,
  fetchTrendPrediction,
  fetchRecommendations,
  fetchHabitStats
} from '../services/aiService';

export const getHealthScore = createAsyncThunk('ai/healthScore', fetchHealthScore);
export const getTrendPrediction = createAsyncThunk('ai/trendPrediction', fetchTrendPrediction);
export const getRecommendations = createAsyncThunk('ai/recommendations', fetchRecommendations);
export const getHabitStats = createAsyncThunk('ai/habitStats', fetchHabitStats);

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    healthScore: null,
    trend: null,
    recommendations: [],
    stats: null,
    loading: {
      health: false,
      trend: false,
      recommendations: false,
      stats: false
    },
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHealthScore.pending, (state) => {
        state.loading.health = true;
      })
      .addCase(getHealthScore.fulfilled, (state, action) => {
        state.loading.health = false;
        state.healthScore = action.payload;
      })
      .addCase(getHealthScore.rejected, (state, action) => {
        state.loading.health = false;
        state.error = action.error.message;
      })

      .addCase(getTrendPrediction.pending, (state) => {
        state.loading.trend = true;
      })
      .addCase(getTrendPrediction.fulfilled, (state, action) => {
        state.loading.trend = false;
        state.trend = action.payload;
      })
      .addCase(getTrendPrediction.rejected, (state, action) => {
        state.loading.trend = false;
        state.error = action.error.message;
      })

      .addCase(getRecommendations.pending, (state) => {
        state.loading.recommendations = true;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.loading.recommendations = false;
        state.recommendations = action.payload;
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.loading.recommendations = false;
        state.error = action.error.message;
      })

      .addCase(getHabitStats.pending, (state) => {
        state.loading.stats = true;
      })
      .addCase(getHabitStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(getHabitStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error = action.error.message;
      });
  }
});

export default aiSlice.reducer;
