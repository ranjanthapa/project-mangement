export const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
