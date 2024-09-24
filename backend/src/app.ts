import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import {
  ApiError,
  InternalError,
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


// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    ApiError.handle(new InternalError(), res);
  }
});
export default app;