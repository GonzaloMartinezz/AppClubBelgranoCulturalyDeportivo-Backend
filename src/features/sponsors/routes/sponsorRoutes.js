import express from 'express';
import sponsorController from '../controllers/sponsorController.js';

const router = express.Router();

router.get('/', sponsorController.getSponsors);
router.get('/home', sponsorController.getForHome);
router.get('/:id', sponsorController.getSponsorById);
router.post('/', sponsorController.createSponsor);
router.put('/:id', sponsorController.updateSponsor);
router.delete('/:id', sponsorController.deleteSponsor);

export default router;