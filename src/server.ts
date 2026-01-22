import path from 'path';
import express from 'express';
import employeeRoutes from './routes/employeeRoutes.ts';
import { requestRoutes } from './routes/requestRoutes.ts';
import { globalErrorHandler } from './middlewares/globalErrorHandler.ts';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use('/employee', employeeRoutes);
server.use('/request', requestRoutes);
server.use('/files', express.static(path.resolve('src','uploads')));
server.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server
