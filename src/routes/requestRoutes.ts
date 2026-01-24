import { Router } from 'express';
import RegisterRequestController from '../controllers/Request/registerRequestController.ts';
import GetAllRequestController from '../controllers/Request/getAllRequestController.ts';
import GetRequestByIdController from '../controllers/Request/getRequestByIdController.ts';
import UpdateRequestController  from '../controllers/Request/updateRequestController.ts';
import DeleteRequestController  from '../controllers/Request/deleteRequestController.ts';
import multer from 'multer';
import { multerConfig } from '../config/multer.ts';
import UploadArchiveController from '../controllers/Request/uploadArchiveController.ts';
import UpdateStatusRequestController from '../controllers/Request/updateStatusRequestController.ts';
import { verifyToken } from '../middlewares/verifyToken.ts';

const requestRoutes = Router();
const upload = multer(multerConfig);
requestRoutes.use(verifyToken); 

requestRoutes.post('/', RegisterRequestController.handle);
requestRoutes.get('/', GetAllRequestController.handle);
requestRoutes.get('/:id', GetRequestByIdController.handle);
requestRoutes.put('/:id', UpdateRequestController.handle);
requestRoutes.delete('/:id', DeleteRequestController.handle);
requestRoutes.post('/:id/archive', upload.single('file'), UploadArchiveController.handle);
requestRoutes.patch('/:id/status', UpdateStatusRequestController.handle);


export { requestRoutes };