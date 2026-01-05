import express from 'express';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default server
