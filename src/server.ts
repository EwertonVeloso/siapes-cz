import path from 'path';
import express from 'express';
import employeeRoutes from './routes/employeeRoutes.ts';
import { requestRoutes } from './routes/requestRoutes.ts';
import { globalErrorHandler } from './middlewares/globalErrorHandler.ts';
import authRoutes from './routes/authRoutes.ts';
import profileRoutes from './routes/profileRoutes.ts';
import coordinatorRoutes from './routes/coordinatorRoutes.ts';
import { ensureAccessControl } from './middlewares/ensureAccessControl.ts';
import { verifyToken } from './middlewares/verifyToken.ts';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use('/files', express.static(path.resolve('src','uploads')));

server.use('/auth', authRoutes);
server.use('/profile', profileRoutes);

server.use(verifyToken);
server.use(ensureAccessControl)

server.use('/coordinator', coordinatorRoutes);
server.use('/employee', employeeRoutes);
server.use('/request', requestRoutes);


server.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server
