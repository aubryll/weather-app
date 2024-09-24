import express from 'express';
import cors from 'cors';
import {
  NotFoundError
} from './core/ApiError';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((_0, _1, next) => next(new NotFoundError()));


export default app;