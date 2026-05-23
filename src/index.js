const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRouter = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'RE Deal Analyzer API is running' });
});

app.use('/api/analyze', analyzeRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});