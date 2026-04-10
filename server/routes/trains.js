const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  addTrain, getAllTrains, searchTrains,
  deleteTrain
} = require('../controllers/trainController');

router.get('/', protect, getAllTrains);
router.get('/search', protect, searchTrains);
router.post('/', protect, adminOnly, addTrain);
router.delete('/:id', protect, adminOnly, deleteTrain);

module.exports = router;