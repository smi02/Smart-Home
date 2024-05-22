import express from 'express'
const router = express.Router()
import { History } from '../models/History.js'

// Show all history
router.get('/', async (req, res, next) => {
    try {
        const history = await History.find({})

        return res.status(200).json({
            count: history.length,
            data: history
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Create
// router.post('/', async (req, res) => {
//     try {
//         const newcategory = req.body.hcategory
//         const newname = req.body.hname
//         const newstatus = req.body.hstatus ? "on" : "off"

//         const newHistory = {
//             hcategory: newcategory,
//             hname: newname,
//             hstatus: req.body.hstatus,
//             hnotification: `The ${newcategory} ${newname} is ${newstatus}`
//         }
//         const history = await History.create(newHistory)
//         return res.status(201).send(history)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message })
//     }
// })

// Show one history
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const history = await History.findById(id)

        return res.status(200).json(history)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update one history
router.put('/:id', async (req, res, next) => {
    try {
        if (
            !req.body.hcategory ||
            !req.body.hname ||
            !req.body.hnotification 

        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params

        const result = await History.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'History not found' })
        }
        return res.status(200).send({ message: 'History update successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Delete one security
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await History.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'History not found' })
        }
        return res.status(200).send({ message: 'History delete successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router