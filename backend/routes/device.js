import express from 'express';
const router = express.Router();
import { Device } from '../models/Device.js';


// Route for save new sensor
router.post('/', async (req, res, next) => {
    try {
        if (
            !req.body.name ||
            !req.body.topic ||
            !req.body.status ||
            !req.body.category ||
            !req.body.color ||
            !req.body.notification 
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }
        const newDevice = {
            name: req.body.name,
            topic: req.body.topic,
            status: req.body.status,
            category: req.body.category,
            color: req.body.color,
            notification: req.body.notification
        }
        const device = await Device.create(newDevice)
        return res.status(201).send(device)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show all device
router.get('/', async (req, res, next) => {
    try {
        const devices = await Device.find({})

        return res.status(200).json({
            count: devices.length,
            data: devices
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show one device
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const device = await Device.findById(id)

        return res.status(200).json(device)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update one device
router.put('/:id', async (req, res, next) => {
    try {
        if (
            !req.body.name ||
            !req.body.topic ||
            !req.body.status ||
            !req.body.category ||
            !req.body.color ||
            !req.body.notification
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params
        const result = await Device.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Device not found' })
        }
        return res.status(200).send({ message: 'Device update successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Delete one device
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Device.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Device not found' })
        }
        return res.status(200).send({ message: 'Device delete successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;