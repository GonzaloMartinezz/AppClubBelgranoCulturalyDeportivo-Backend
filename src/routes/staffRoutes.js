import express from 'express';
import staffController from '../controllers/staffController.js';

const router = express.Router();
const controller = staffController;

router.get('/', controller.getStaff);
router.get('/:id', controller.getStaffById);
router.get('/team/:teamId', controller.getStaffByTeam);
router.post('/', controller.createStaff);
router.put('/:id', controller.updateStaff);
router.delete('/:id', controller.deleteStaff);

export default router;