import express from 'express'
const router = express.Router()
import { Security } from '../models/Security.js'

// Show all security
router.get('/', async (req, res, next) => {
    try {
        const securitys = await Security.find({})

        return res.status(200).json({
            count: securitys.length,
            data: securitys
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route for save new security
router.post('/', async (req, res, next) => {
    try {
        if (
            !req.body.name ||
            !req.body.topic ||
            !req.body.password ||
            !req.body.primaryPassword 
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }
        const newSecurity = {
            name: req.body.name,
            topic: req.body.topic,
            notification: req.body.notification,
            password: req.body.password,
            primaryPassword: req.body.primaryPassword
        }

        const security = await Security.create(newSecurity)
        return res.status(201).send(security)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show one security
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const security = await Security.findById(id)

        return res.status(200).json(security)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update one security
router.put('/:id', async (req, res, next) => {
    try {
        if (
            !req.body.name ||
            !req.body.topic ||
            !req.body.password ||
            !req.body.primaryPassword 

        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params

        const result = await Security.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Security not found' })
        }
        return res.status(200).send({ message: 'Security update successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Delete one security
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Security.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Security not found' })
        }
        return res.status(200).send({ message: 'Security delete successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router