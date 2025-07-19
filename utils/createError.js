import createHttpError from "http-errors";

const createError = {
  BadRequest: (msg = "Bad Request") => createHttpError(400, msg),
  Unauthorized: (msg = "Unauthorized") => createHttpError(401, msg),
  Forbidden: (msg = "Forbidden") => createHttpError(403, msg),
  NotFound: (msg = "Not Found") => createHttpError(404, msg),
  Conflict: (msg = "Conflict") => createHttpError(409, msg),
  Unprocessable: (msg = "Unprocessable Entity") => createHttpError(422, msg),
  TooManyRequests: (msg = "Too Many Requests") => createHttpError(429, msg),
  Internal: (msg = "Server Error") => createHttpError(500, msg),
};

export default createError;
