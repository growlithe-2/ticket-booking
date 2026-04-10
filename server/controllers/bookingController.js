const Booking = require('../models/Booking');
const Train = require('../models/Train');

exports.createBooking = async (req, res) => {
  const { trainId, seats, passengerName, passengerPhone } = req.body;

  const train = await Train.findById(trainId);

  if (train.availableSeats < seats)
    return res.json({ error: 'Not enough seats' });

  const totalFare = train.fare * seats;

  const booking = await Booking.create({
    userId: req.user._id,
    trainId,
    seats,
    totalFare,
    passengerName,
    passengerPhone
  });

  train.availableSeats -= seats;
  await train.save();

  res.json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate('trainId');
  res.json(bookings);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  booking.status = 'cancelled';
  await booking.save();

  const train = await Train.findById(booking.trainId);
  train.availableSeats += booking.seats;
  await train.save();

  res.json({ message: 'Cancelled' });
};