const Train = require('../models/Train');

exports.addTrain = async (req, res) => {
  const train = await Train.create({
    ...req.body,
    availableSeats: req.body.totalSeats
  });
  res.json(train);
};

exports.getAllTrains = async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
};

exports.searchTrains = async (req, res) => {
  const { from, to, date } = req.query;

  const trains = await Train.find({
    from: new RegExp(from, 'i'),
    to: new RegExp(to, 'i'),
    date,
    availableSeats: { $gt: 0 }
  });

  res.json(trains);
};

exports.deleteTrain = async (req, res) => {
  await Train.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};