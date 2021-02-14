import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ErrorResponse from '../utils/ErrorResponse';

export default (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorResponse(httpStatus.NOT_FOUND, 'Not found'));
};
