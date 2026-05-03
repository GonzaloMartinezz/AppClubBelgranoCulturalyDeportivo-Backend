import express from 'express';
import staffController from '../controllers/staffController.js';

const router = express.Router();

router.get('/', staffController.getStaff);
router.get('/:id', staffController.getStaffById);
router.get('/team/:teamId', staffController.getStaffByTeam);
router.post('/', staffController.createStaff);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

export default router;