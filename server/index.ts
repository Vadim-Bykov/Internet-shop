import './envConfig';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
// import * as modals from './models/models';
import { db } from './db';
import { router } from './routes';
import { errorMiddleware } from './middlewares/ErrorMiddleware';

const modals = require('./models/models');

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/files', express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorMiddleware);

(async function () {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
