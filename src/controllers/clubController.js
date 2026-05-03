import clubService from '../services/clubService.js';

class ClubController {
  async getAll(req, res) {
    try {
      const clubs = await clubService.getAll();
      res.json({ success: true, data: clubs });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const club = await clubService.getById(req.params.id);
      res.json({ success: true, data: club });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  async getMain(req, res) {
    try {
      const club = await clubService.getMain();
      res.json({ success: true, data: club });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async create(req, res) {
    try {
      const club = await clubService.create(req.body);
      res.status(201).json({ success: true, data: club });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  async update(req, res) {
    try {
      const club = await clubService.update(req.params.id, req.body);
      res.json({ success: true, data: club });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await clubService.delete(req.params.id);
      res.json({ success: true, message: 'Club eliminado' });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  }
}

export default new ClubController();
