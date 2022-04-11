const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const { sequelize } = require('./models');
dotenv.config();

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

const app = express();

const corsOption = {
  origin: 'http://localhost:3000',
  // optionsSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
  
};

// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({
}));
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('dev'));

app.use('/', indexRouter);

// 지원하지 않는 api
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log(`8080번 포트에서 대기중`);
});
