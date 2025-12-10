import { clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "Ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

fastify.get("/test", (request, reply) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return reply.send({ message: "Not authorized!" });
  }
  return reply.send({ message: "Order service is authorized!" });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001!");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
