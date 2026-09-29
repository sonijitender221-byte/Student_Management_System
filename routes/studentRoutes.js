import { Router } from 'express';
import {
  getStudentListPage,
  getAddStudentPage,
  createStudent,
  getViewStudentPage,
  getEditStudentPage,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', isAuthenticated, getStudentListPage);
router.get('/add', isAuthenticated, getAddStudentPage);
router.post('/add', isAuthenticated, createStudent);

router.get('/:id', isAuthenticated, getViewStudentPage);
router.get('/:id/edit', isAuthenticated, getEditStudentPage);
router.post('/:id/edit', isAuthenticated, updateStudent);
router.post('/:id/delete', isAuthenticated, deleteStudent);

export default router;
