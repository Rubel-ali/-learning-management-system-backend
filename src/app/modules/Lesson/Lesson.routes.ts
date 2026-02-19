import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LessonController } from './Lesson.controller';
import { LessonValidation } from './Lesson.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(LessonValidation.createSchema),
LessonController.createLesson,
);

router.get('/', auth(), LessonController.getLessonList);

router.get('/:id', auth(), LessonController.getLessonById);

router.put(
'/:id',
auth(),
validateRequest(LessonValidation.updateSchema),
LessonController.updateLesson,
);

router.delete('/:id', auth(), LessonController.deleteLesson);

export const LessonRoutes = router;