import matchRepository from '../repositories/matchRepository.js';
import { ApiError } from '../../../core/utils/ApiError.js';
import { getFilters } from '../../../core/utils/pagination.js';

export class MatchService {
  async getMatches(query) {
    const { page, limit } = query;
    
    const filters = getFilters({
      team: query.team,
      competition: query.competition,
      status: query.status
    });
    
    if (query.dateFrom || query.dateTo) {
      filters.date = {};
      if (query.dateFrom) filters.date.$gte = new Date(query.dateFrom);
      if (query.dateTo) filters.date.$lte = new Date(query.dateTo);
    }
    
    const result = await matchRepository.findAll(filters, { page, limit });
    
    return {
      matches: result.matches,
      meta: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        total: result.total,
        totalPages: Math.ceil(result.total / (parseInt(limit) || 20))
      }
    };
  }

  async getMatchById(id) {
    const match = await matchRepository.findById(id);
    if (!match) {
      throw ApiError.notFound('Match not found');
    }
    return match;
  }

  async getLatestMatch() {
    const match = await matchRepository.findLatest();
    if (!match) {
      throw ApiError.notFound('No matches found');
    }
    return match;
  }

  async getNextMatch() {
    const match = await matchRepository.findNext();
    if (!match) {
      throw ApiError.notFound('No upcoming matches');
    }
    return match;
  }

  async createMatch(data) {
    const { homeTeam, awayTeam, date, time } = data;
    
    const existingMatch = await import('../models/Match.js').default.findOne({
      $or: [
        { homeTeam, awayTeam, date },
        { homeTeam: awayTeam, awayTeam: homeTeam, date }
      ]
    });
    
    if (existingMatch) {
      throw ApiError.conflict('Match already exists between these teams on this date');
    }
    
    return matchRepository.create(data);
  }

  async updateMatch(id, data) {
    await this.getMatchById(id);
    return matchRepository.update(id, data);
  }

  async updateScore(id, scoreData, userId) {
    const match = await this.getMatchById(id);
    
    if (match.status === 'FINAL') {
      throw ApiError.badRequest('Cannot update score of a finished match');
    }
    
    if (match.status === 'SCHEDULED') {
      await matchRepository.update(id, { status: 'LIVE' });
    }
    
    return matchRepository.updateScore(id, {
      home: scoreData.home,
      away: scoreData.away,
      quarter: scoreData.quarter || match.score.quarter,
      quarterTime: scoreData.quarterTime
    });
  }

  async finishMatch(id, finalScore) {
    const match = await this.getMatchById(id);
    
    if (match.status !== 'LIVE') {
      throw ApiError.badRequest('Match must be LIVE to finish');
    }
    
    return matchRepository.update(id, {
      status: 'FINAL',
      score: {
        home: finalScore.home,
        away: finalScore.away,
        quarter: 4,
        quarterTime: '00:00'
      }
    });
  }

  async updateBoxScore(id, boxScoreData) {
    await this.getMatchById(id);
    return matchRepository.updateBoxScore(id, boxScoreData);
  }

  async setMVP(id, mvpData) {
    await this.getMatchById(id);
    return matchRepository.setMVP(id, mvpData);
  }

  async deleteMatch(id) {
    await this.getMatchById(id);
    return matchRepository.delete(id);
  }

  async getMatchesByTeam(teamId, query) {
    const { page, limit } = query;
    const result = await matchRepository.findByTeam(teamId, {}, { page, limit });
    
    return {
      matches: result.matches,
      meta: {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        total: result.total,
        totalPages: Math.ceil(result.total / (parseInt(limit) || 20))
      }
    };
  }
}

export default new MatchService();