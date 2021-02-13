import asyncHandler from '../utils/asyncHandler';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

export const demo = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).send('Hello World');
});
