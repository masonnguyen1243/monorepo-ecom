import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: ["http:localhost:3002", "http:localhost:3003"],
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  const userId = req.userId;
  return res
    .status(200)
    .json({ message: "Product service authenticated!", userId: userId });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000!");
});
