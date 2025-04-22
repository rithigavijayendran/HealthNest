import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  sleep: { type: Number, min: 0, max: 12 },
  water: { type: Number, min: 0, max: 10 },
  meals: [{
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    healthy: Boolean,
    time: String
  }],
  exercise: {
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'other'] },
    duration: Number, // in minutes
    intensity: { type: Number, min: 1, max: 10 }
  },
  notes: String,
  mood: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model('Habit', HabitSchema);