import express from 'express';
import matchController from '../controllers/matchController.js';

const router = express.Router();
const controller = matchController;

router.get('/', controller.getMatches);
router.get('/latest', controller.getLatest);
router.get('/next', controller.getNext);
router.get('/:id', controller.getMatchById);
router.post('/', controller.createMatch);
router.put('/:id', controller.updateMatch);
router.put('/:id/score', controller.updateScore);
router.put('/:id/finish', controller.finishMatch);
router.put('/:id/mvp', controller.setMVP);
router.delete('/:id', controller.deleteMatch);
router.get('/team/:teamId', controller.getMatchesByTeam);

export default router;