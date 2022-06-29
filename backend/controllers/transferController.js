const asyncHandler = require('express-async-handler')

const Transfer = require('../models/transferModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Pivate

const getTransfers = asyncHandler(async (req, res) => {
    const transfer = await Transfer.find({ user: req.user.id })

    res.status(200).json(transfer)
})

// @desc Set goal
// @route POST /api/goals
// @access Pivate

const setTransfer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please input a number')
    }
    
    // if(isNaN(req.body.value)) {
    //     res.status(400)
    //     throw new Error('Input must be a number value')
    // }
    

    const transfer = await Transfer.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(transfer)
})

// @desc Update goal
// @route GET /api/goals/:id
// @access Pivate

// const updateGoal = asyncHandler(async (req, res) => {
//     const goal = await Goal.findById(req.params.id)

//     if(!goal) {
//         res.status(400)
//         throw new Error('Goal not found')
//     }


//     // Check for user
//     if(!req.user) {
//         res.status(401)
//         throw new Error('User not found')
//     }

//     // Make sure logged in user matches the goal user
//     if(goal.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error('User not authorized')
//     }

//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
//         {
//             new: true,
//         })

//     res.status(200).json(updatedGoal)
// })

// @desc Get goals
// @route GET /api/goals/:id
// @access Pivate

const deleteTransfer = asyncHandler(async (req, res) => {
    const transfer = await Transfer.findById(req.params.id)

    if(!transfer) {
        res.status(400)
        throw new Error('Goal not found')
    }



    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the goal user
    if(transfer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await transfer.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTransfers,
    setTransfer,
    deleteTransfer
}