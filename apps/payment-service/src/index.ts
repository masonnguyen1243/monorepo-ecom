import { serve } from "@hono/node-server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono();
app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.get("/test", (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Not authorized!",
    });
  }

  return c.json({
    message: "Payment service is authorized!",
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(
          `Payment service is running on http://localhost:${info.port}`
        );
      }
    );
  } catch (error) {
    console.log("Error starting the server:", error);
    process.exit(1);
  }
};

start();
