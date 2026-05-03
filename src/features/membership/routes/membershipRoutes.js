import express from 'express';
import membershipController from '../controllers/membershipController.js';

const router = express.Router();

router.get('/', membershipController.getMemberships);
router.get('/:id', membershipController.getMembershipById);
router.get('/match/:matchId/attendance', membershipController.getAttendance);
router.post('/validate-qr', membershipController.validateQR);
router.post('/', membershipController.createMembership);
router.put('/:id', membershipController.updateMembership);
router.delete('/:id', membershipController.deleteMembership);

export default router;