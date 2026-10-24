const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(400).json({
    success: false,
    message: err.message,
  });
};

export class AppError extends Error {
  constructor(
    message,
    statusCode = 400
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}

export default errorHandler;