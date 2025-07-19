/**
 * Global error handler middleware.
 * Catches and formats thrown errors consistently.
 * Should be used after all route declarations.
 */

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal error";

  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(err.details && {details:err.details}),
    ...(process.env.NODE_ENV == "development" && {stack:err.stack})
  });
};
