import './envConfig.js';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { db } from './db.js';
import * as models from './models/models.js';
import { router } from './routes/index.js';
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';

// import path from 'path';
// import { fileURLToPath } from 'url';

// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static('static'));
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
