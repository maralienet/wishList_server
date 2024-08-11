const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'https://localhost:3000'
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const usersRouter = require('./routes/Users');
app.use('/users', usersRouter);

const categsRouter = require('./routes/Categs');
app.use('/categories', categsRouter);

const wishesRouter = require('./routes/Wishes');
app.use('/wishes', wishesRouter);

const port = process.env.SERV_PORT || 5001;
app.listen(port, () => {
  console.log('server started');
});