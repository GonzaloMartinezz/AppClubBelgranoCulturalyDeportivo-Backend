import express from 'express';
import clubController from '../controllers/clubController.js';

const router = express.Router();

router.get('/', clubController.getAll);
router.get('/main', clubController.getMain);
router.get('/:id', clubController.getById);
router.post('/', clubController.create);
router.put('/:id', clubController.update);
router.delete('/:id', clubController.delete);

export default router;
