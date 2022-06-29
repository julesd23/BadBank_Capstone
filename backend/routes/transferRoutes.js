const express = require('express')
const router = express.Router()
const { getTransfers, setTransfer, deleteTransfer } = require('../controllers/transferController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTransfers).post(protect, setTransfer)

router.route('/:id').delete(protect, deleteTransfer)

// router.route('/:id').delete(protect, deleteTransfer).put(protect, updateGoal)

module.exports = router 