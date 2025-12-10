import { getAuth } from "@clerk/express";
import { Response, Request, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated!" });
  }

  req.userId = auth.userId;

  return next();
};
