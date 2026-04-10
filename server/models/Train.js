const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true },
  from:        { type: String, required: true },
  to:          { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime:   { type: String, required: true },
  date:        { type: String, required: true },
  totalSeats:  { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare:        { type: Number, required: true },
  classType:   { type: String, enum: ['Sleeper', 'AC', 'General'], default: 'Sleeper' },
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);