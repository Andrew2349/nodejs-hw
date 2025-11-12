import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDb } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from "../src/routes/notesRoutes.js";


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(logger);
app.use(express.json());
app.use(cors());


app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);


await connectMongoDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
