import express from 'express';
import competitionController from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', competitionController.getAll);
router.get('/active', competitionController.getActive);
router.get('/:id', competitionController.getById);
router.get('/:id/standings', competitionController.getStandings);
router.post('/', competitionController.create);
router.put('/:id', competitionController.update);
router.delete('/:id', competitionController.delete);

export default router;
