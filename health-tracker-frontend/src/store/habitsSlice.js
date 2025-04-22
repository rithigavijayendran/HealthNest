import { useSelector, useDispatch } from 'react-redux';  
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { useEffect } from 'react';  

// Async thunks
export const getHealthScore = createAsyncThunk(
  'habits/getHealthScore',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/ai/health-score');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get health score');
    }
  }
);

export const getTrendPrediction = createAsyncThunk(
  'habits/getTrendPrediction',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/ai/trend-prediction');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get trend prediction');
    }
  }
);

export const getHabits = createAsyncThunk(
  'habits/getHabits',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const { data } = await api.get('/habits', { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to get habits');
    }
  }
);

export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async (habitData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/habits', habitData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add habit');
    }
  }
);

// Slice
const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [],
    healthScore: null,
    trend: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHealthScore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHealthScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.healthScore = action.payload;
      })
      .addCase(getHealthScore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTrendPrediction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendPrediction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trend = action.payload;
      })
      .addCase(getTrendPrediction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addHabit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits.unshift(action.payload);
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Export selectors
export const selectHabits = (state) => state.habits.habits;
export const selectHealthScore = (state) => state.habits.healthScore;
export const selectTrendPrediction = (state) => state.habits.trend;
export const selectHabitsLoading = (state) => state.habits.isLoading;
export const selectHabitsError = (state) => state.habits.error;

// Export hooks
export const useGetHabitsQuery = (params) => {
  const habits = useSelector(selectHabits);
  const isLoading = useSelector(selectHabitsLoading);
  const error = useSelector(selectHabitsError);
  const dispatch = useDispatch();  

  useEffect(() => {
    // Effect cleanup in case component is unmounted
    let mounted = true;
    if (mounted) dispatch(getHabits(params));
    return () => {
      mounted = false;
    };
  }, [dispatch, params?.startDate, params?.endDate]);

  return { data: habits, isLoading, error };
};

export default habitsSlice.reducer;
