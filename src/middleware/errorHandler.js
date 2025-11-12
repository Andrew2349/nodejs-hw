import { HttpError } from "http-errors";

export function errorHandler(err, req, res, next) {
console.error("Error Middleware:", err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const is_Prod = process.env.NODE_ENV === "production";
  res.status(500).json({ message: is_Prod ? "Something went wrong" : err.message });
};
