import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
} // interface 사용도 괜찮다고 함.

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
