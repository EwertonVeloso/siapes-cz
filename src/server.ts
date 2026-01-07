import express from 'express';
import employeeRoutes from './routes/employeeRoutes.ts';
import { globalErrorHandler } from './middlewares/globalErrorHandler.ts';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use('/employees', employeeRoutes);

server.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server
