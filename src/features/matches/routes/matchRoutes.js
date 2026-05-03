import express from 'express';
import matchController from '../controllers/matchController.js';

const router = express.Router();

router.get('/', matchController.getMatches);
router.get('/latest', matchController.getLatest);
router.get('/next', matchController.getNext);
router.get('/:id', matchController.getMatchById);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);
router.put('/:id/score', matchController.updateScore);
router.put('/:id/finish', matchController.finishMatch);
router.put('/:id/boxscore', matchController.updateBoxScore);
router.put('/:id/mvp', matchController.setMVP);
router.delete('/:id', matchController.deleteMatch);

router.get('/team/:teamId', matchController.getMatchesByTeam);

export default router;