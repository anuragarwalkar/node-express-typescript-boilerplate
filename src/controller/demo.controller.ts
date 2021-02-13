import asyncHandler from '../utils/asyncHandler';
import httpStatus from 'http-status';

export const demo = asyncHandler((req, res, next) => {
  res.status(httpStatus.OK).send('Hello World');
});
