import { Router } from 'express';
import { registerRequestController } from '../controllers/Request/registerRequestController.ts';
import { getAllRequestController } from '../controllers/Request/getAllRequestController.ts';
import { getRequestByIdController } from '../controllers/Request/getRequestByIdController.ts';
import { updateRequestController } from '../controllers/Request/updateRequestController.ts';
import { deleteRequestController } from '../controllers/Request/deleteRequestController.ts';
import multer from 'multer';
import { multerConfig } from '../config/multer.ts';
import { uploadArchiveController } from '../controllers/Request/uploadArchiveController.ts';
import {updateStatusRequestController} from '../controllers/Request/updateStatusRequestController.ts';

const requestRoutes = Router();
const upload = multer(multerConfig);

requestRoutes.post('/', registerRequestController);
requestRoutes.get('/', getAllRequestController);
requestRoutes.get('/:id', getRequestByIdController);
requestRoutes.put('/:id', updateRequestController);
requestRoutes.delete('/:id', deleteRequestController);
requestRoutes.post('/:id/archive', upload.single('file'), uploadArchiveController);
requestRoutes.patch('/:id/status', updateStatusRequestController);


export { requestRoutes };