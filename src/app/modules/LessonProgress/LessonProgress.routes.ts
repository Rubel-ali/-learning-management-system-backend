import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LessonProgressController } from './LessonProgress.controller';
import { LessonProgressValidation } from './LessonProgress.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(LessonProgressValidation.createSchema),
LessonProgressController.createLessonProgress,
);

router.get('/', auth(), LessonProgressController.getLessonProgressList);

router.get('/:id', auth(), LessonProgressController.getLessonProgressById);

router.put(
'/:id',
auth(),
validateRequest(LessonProgressValidation.updateSchema),
LessonProgressController.updateLessonProgress,
);

router.delete('/:id', auth(), LessonProgressController.deleteLessonProgress);

export const LessonProgressRoutes = router;