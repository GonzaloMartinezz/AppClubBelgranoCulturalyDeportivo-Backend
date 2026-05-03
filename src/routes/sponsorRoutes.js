import express from 'express';
import sponsorController from '../controllers/sponsorController.js';

const router = express.Router();
const controller = sponsorController;

router.get('/', controller.getSponsors);
router.get('/home', controller.getForHome);
router.get('/:id', controller.getSponsorById);
router.post('/', controller.createSponsor);
router.put('/:id', controller.updateSponsor);
router.delete('/:id', controller.deleteSponsor);

export default router;