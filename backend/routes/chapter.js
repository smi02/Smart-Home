import express from 'express';
const router = express.Router();
import { Chapter } from '../models/Chapter.js';

// Tạo mới một chương
router.post('/', async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).send(chapter);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy tất cả các chương
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.status(200).send(chapters);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sửa một chương
router.put('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chapter) {
      return res.status(404).send();
    }
    res.send(chapter);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa một chương
router.delete('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).send();
    }
    res.send(chapter);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;