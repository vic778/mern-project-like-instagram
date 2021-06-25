const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const connectDB = require('./config/db');

// require('dotenv').config({ path: './config/.env' });
// require('./config/db');

connectDB();

const { ckeckUser, requireAuth, checkUser } = require('./middleware/auth.middleware');
const cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  prefFlightContinue: false,
};

app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cookieParser());

//jtw
app.get('*', checkUser);
app.get('/jtwid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
