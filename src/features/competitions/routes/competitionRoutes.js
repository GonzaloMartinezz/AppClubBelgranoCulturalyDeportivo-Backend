import express from 'express';
import competitionController from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', competitionController.getCompetitions);
router.get('/active', competitionController.getActive);
router.get('/:id', competitionController.getCompetitionById);
router.get('/:id/standings', competitionController.getStandings);
router.post('/', competitionController.createCompetition);
router.put('/:id', competitionController.updateCompetition);
router.put('/:id/standings', competitionController.updateStandings);
router.delete('/:id', competitionController.deleteCompetition);

export default router;