const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  seats:   Number,
  totalFare: Number,
  status: { type: String, default: 'confirmed' },
  passengerName: String,
  passengerPhone: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
