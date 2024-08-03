import express from 'express'
const router = express.Router()
import { Semester } from '../models/Semester.js'

// Create a new semester
router.post('/', async (req, res) => {
    try {
        const semester = new Semester(req.body);
        await semester.save();
        res.status(201).send(semester);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all semesters
router.get('/', async (req, res) => {
    try {
        const semesters = await Semester.find();
        res.status(200).send(semesters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Edit a semester
router.put('/:id', async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!semester) {
            return res.status(404).send();
        }
        res.send(semester);
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete a semester
router.delete('/:id', async (req, res) => {
    try {
        const semester = await Semester.findByIdAndDelete(req.params.id);
        if (!semester) {
            return res.status(404).send();
        }
        res.send(semester);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;