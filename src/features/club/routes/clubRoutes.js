import express from 'express';
import clubController from '../controllers/clubController.js';

const router = express.Router();

router.get('/', clubController.getClubs);
router.get('/main', clubController.getMainClub);
router.get('/:id', clubController.getClubById);
router.post('/', clubController.createClub);
router.put('/:id', clubController.updateClub);

export default router;