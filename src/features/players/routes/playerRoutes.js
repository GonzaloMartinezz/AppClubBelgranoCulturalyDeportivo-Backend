import express from 'express';
import playerController from '../controllers/playerController.js';

const router = express.Router();

router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/', playerController.createPlayer);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

router.get('/team/:teamId', playerController.getPlayersByTeam);
router.get('/category/:categoryId', playerController.getPlayersByCategory);

export default router;