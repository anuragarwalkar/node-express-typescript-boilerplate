import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ErrorResponse from '../utils/ErrorResponse';

const anyErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(new ErrorResponse(httpStatus.NOT_FOUND, 'Not found'));
};

export default anyErrorHandler;
