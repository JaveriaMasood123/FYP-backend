import express from 'express';
import { addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/add', upload.single('image'), addMenuItem);
router.put('/update/:id', upload.single('image'), updateMenuItem);
router.delete('/delete/:id', deleteMenuItem);

export default router;

