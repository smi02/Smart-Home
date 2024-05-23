import express from 'express'
const router = express.Router()
import { Temp } from '../models/Temp.js'

// Show all temp
router.get('/', async (req, res, next) => {
    try {
        const temps = await Temp.find({})

        return res.status(200).json({
            count: temps.length,
            data: temps
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for save new temp
router.post('/', async (req, res, next) => {
    try {
        if (
            !req.body.topicdevice ||
            !req.body.statusdevice ||
            !req.body.notificationdevice
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }
        const newTemp = {
            topicdevice: req.body.topicdevice,
            statusdevice: req.body.statusdevice,
            notificationdevice: req.body.notificationdevice
        }

        const temp = await Temp.create(newTemp)
        return res.status(201).send(temp)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show one temp
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const temp = await Temp.findById(id)

        return res.status(200).json(temp)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update one temp
router.put('/:id', async (req, res, next) => {
    try {
        if (
            !req.body.topicdevice ||
            !req.body.statusdevice ||
            !req.body.notificationdevice

        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params

        const result = await Temp.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Temp not found' })
        }
        return res.status(200).send({ message: 'Temp update successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Delete one temp
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Temp.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Temp not found' })
        }
        return res.status(200).send({ message: 'Temp delete successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router