import { ErrorRequestHandler } from 'express';

const mwError: ErrorRequestHandler = (err, req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

export default mwError;
