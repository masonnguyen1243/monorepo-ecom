import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return reply.send({ message: "Not authorized!" });
  }

  request.userId = userId;
};

export const shouldBeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const auth = getAuth(request);
  if (!auth.userId) {
    return reply.status(403).send({ message: "Not authorized!" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "Not authorized!" });
  }

  request.userId = auth.userId;
};
