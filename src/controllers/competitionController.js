import competitionService from '../services/competitionService.js';

class CompetitionController {
  async getAll(req, res) {
    try {
      const competitions = await competitionService.getAll(req.query);
      res.json({ success: true, data: competitions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const competition = await competitionService.getById(req.params.id);
      res.json({ success: true, data: competition });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  async getActive(req, res) {
    try {
      const competition = await competitionService.getActive();
      res.json({ success: true, data: competition });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getStandings(req, res) {
    try {
      const standings = await competitionService.getStandings(req.params.id);
      res.json({ success: true, data: standings });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  async create(req, res) {
    try {
      const competition = await competitionService.create(req.body);
      res.status(201).json({ success: true, data: competition });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async update(req, res) {
    try {
      const competition = await competitionService.update(req.params.id, req.body);
      res.json({ success: true, data: competition });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await competitionService.delete(req.params.id);
      res.json({ success: true, message: 'Competición eliminada' });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }
}

export default new CompetitionController();
