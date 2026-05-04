import Player from '../../players/models/Player.js';
import { successResponse, errorResponse } from '../../../core/utils/response.js';

export const getLeaderboard = async (req, res) => {
  try {
    const { stat = 'points', limit = 10 } = req.query;
    const validStats = ['points', 'rebounds', 'assists', 'steals', 'blocks', 'fouls', 'matchesPlayed'];
    const sortField = validStats.includes(stat) ? `careerStats.${stat}` : 'careerStats.points';
    const players = await Player.find({ status: 'ACTIVE' })
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));
    successResponse(res, players);
  } catch (err) { errorResponse(res, err.message, 500); }
};

export const getTopScorers = async (req, res) => {
  try {
    const players = await Player.find({ status: 'ACTIVE' })
      .sort({ 'careerStats.points': -1 })
      .limit(10);
    successResponse(res, players);
  } catch (err) { errorResponse(res, err.message, 500); }
};

export const getTopRebounds = async (req, res) => {
  try {
    const players = await Player.find({ status: 'ACTIVE' })
      .sort({ 'careerStats.rebounds': -1 })
      .limit(10);
    successResponse(res, players);
  } catch (err) { errorResponse(res, err.message, 500); }
};

export const getTopAssists = async (req, res) => {
  try {
    const players = await Player.find({ status: 'ACTIVE' })
      .sort({ 'careerStats.assists': -1 })
      .limit(10);
    successResponse(res, players);
  } catch (err) { errorResponse(res, err.message, 500); }
};
