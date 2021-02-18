import mongoose from 'mongoose';
import httpStatus from 'http-status';
import httpMocks from 'node-mocks-http';
import { errorConverter, errorHandler } from '../../../src/middlewares/error';
import ErrorResponse from '../../../src/utils/ErrorResponse';
import config from '../../../src/config/config';
import logger from '../../../src/config/logger';

describe('Error middlewares', () => {
  describe('Error', () => {
    test('should return the same ErrorResponse object', () => {
      const error = new ErrorResponse(httpStatus.BAD_REQUEST, 'Any error');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should convert an Error to ErrorResponse and should have status and message', () => {
      let error: any = new Error('Any error');
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an Error without status to ErrorResponse with status 500', () => {
      let error: any = new Error('Any error');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert an Error without message to ErrorResponse with default message of that http status', () => {
      let error: any = new Error();
      error.statusCode = httpStatus.BAD_REQUEST;
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      );
    });

    test('should convert a Mongoose error to ApiError with status 400 and preserve its message', () => {
      let error = new mongoose.Error('Any mongoose error');
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.BAD_REQUEST,
          message: error.message,
          isOperational: false,
        })
      );
    });

    test('should convert any other object to ApiError with status 500 and its message', () => {
      const error = {};
      const next = jest.fn();

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      );
    });
  });

  describe('Error handler', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation((): any => {});
    });

    test('should send proper error response and put the error message in res.locals', () => {
      const error = new ErrorResponse(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');
      const next = jest.fn();

      errorHandler(error, httpMocks.createRequest(), res, next);

      expect(sendSpy).toHaveBeenCalledWith(expect.objectContaining({ code: error.statusCode, message: error.message }));
      expect(res.locals.errorMessage).toBe(error.message);
    });

    test('should put the error stack in the response if in development mode', () => {
      config.env = 'development';
      const error = new ErrorResponse(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');
      const next = jest.fn();

      errorHandler(error, httpMocks.createRequest(), res, next);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({ code: error.statusCode, message: error.message, stack: error.stack })
      );
      config.env = process.env.NODE_ENV as any;
    });

    test('should send internal server error status and message if in production mode and error is not operational', () => {
      config.env = 'production';
      const error = new ErrorResponse(httpStatus.BAD_REQUEST, 'Any error', false);
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');
      const next = jest.fn();

      errorHandler(error, httpMocks.createRequest(), res, next);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        })
      );
      expect(res.locals.errorMessage).toBe(error.message);
      config.env = process.env.NODE_ENV as any;
    });

    test('should preserve original error status and message if in production mode and error is operational', () => {
      config.env = 'production';
      const error = new ErrorResponse(httpStatus.BAD_REQUEST, 'Any error');
      const res = httpMocks.createResponse();
      const sendSpy = jest.spyOn(res, 'send');
      const next = jest.fn();

      errorHandler(error, httpMocks.createRequest(), res, next);

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
        })
      );
      config.env = process.env.NODE_ENV as any;
    });
  });
});
