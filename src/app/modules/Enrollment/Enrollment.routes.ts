import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EnrollmentController } from './Enrollment.controller';
import { EnrollmentValidation } from './Enrollment.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(EnrollmentValidation.createSchema),
EnrollmentController.createEnrollment,
);

router.get('/', auth(), EnrollmentController.getEnrollmentList);

router.get('/:id', auth(), EnrollmentController.getEnrollmentById);

router.put(
'/:id',
auth(),
validateRequest(EnrollmentValidation.updateSchema),
EnrollmentController.updateEnrollment,
);

router.delete('/:id', auth(), EnrollmentController.deleteEnrollment);

export const EnrollmentRoutes = router;