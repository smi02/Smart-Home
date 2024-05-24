import express from 'express';
const router = express.Router();
import { Device } from '../models/Device.js';
import { History } from '../models/History.js';


// Route for save new sensor
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        if (
            !req.body.namecategory ||
            !req.body.colorcategory ||
            !req.body.name ||
            !req.body.topic ||
            !req.body.color ||
            !req.body.voice ||
            !req.body.time ||
            !req.body.icon
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }
        const newDevice = {
            namecategory: req.body.namecategory,
            colorcategory: req.body.colorcategory,
            name: req.body.name,
            topic: req.body.topic,  
            status: req.body.status,
            color: req.body.color,
            voice: req.body.voice,
            notification: req.body.notification,
            time: req.body.time,
            icon: req.body.icon

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
            !req.body.namecategory ||
            !req.body.colorcategory ||
            !req.body.name ||
            !req.body.topic ||
            !req.body.color ||
            !req.body.voice ||
            !req.body.time ||
            !req.body.icon

        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params

        const newcategory = req.body.namecategory
        const newname = req.body.name
        var checktf = false

        if (req.body.status == "true" || req.body.status == true) {
            checktf = true
        }

        const newstatus = checktf ? "on" : "off"

        const newHistory = {
            hcategory: newcategory,
            hname: newname,
            hstatus: req.body.status,
            hnotification: `The ${newcategory} ${newname} is ${newstatus}`
        }

        const hresult = await History.create(newHistory)

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