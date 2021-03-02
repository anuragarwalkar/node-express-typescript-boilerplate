import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../utils/asyncHandler';

export const demo = asyncHandler((req: Request, res: Response) => {
  res.status(httpStatus.OK).send('Hello World');
});
