import express from 'express';
import playerController from '../controllers/playerController.js';

const router = express.Router();
const controller = playerController;

router.get('/', controller.getPlayers);
router.get('/:id', controller.getPlayerById);
router.post('/', controller.createPlayer);
router.put('/:id', controller.updatePlayer);
router.delete('/:id', controller.deletePlayer);
router.get('/team/:teamId', controller.getPlayersByTeam);

export default router;