import { Router } from 'express';
import { getLeaderboard, getTopScorers, getTopRebounds, getTopAssists } from '../controllers/statController.js';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.get('/top-scorers', getTopScorers);
router.get('/top-rebounds', getTopRebounds);
router.get('/top-assists', getTopAssists);

export default router;
