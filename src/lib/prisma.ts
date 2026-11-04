import { PrismaClient } from "@prisma/client";
import { AdvisoryLeadRecord } from "@/types/property";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  inMemoryLeads: AdvisoryLeadRecord[] | undefined;
  scoreOverrides: Record<string, number> | undefined;
};

// Lazily initialize Prisma Client when accessed
function getPrismaInstance(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    return client;
  } catch (err) {
    console.warn("[Asset Properties Advisory] Prisma Client notice:", err);
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        throw new Error(
          `Prisma client could not be initialized for '${String(prop)}'. Run 'npm run prisma:generate' or verify DATABASE_URL.`
        );
      },
    });
  }
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const instance = getPrismaInstance();
    const value = Reflect.get(instance, prop);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

export function getLeadsStore(): AdvisoryLeadRecord[] {
  if (!globalForPrisma.inMemoryLeads) {
    globalForPrisma.inMemoryLeads = [];
  }
  return globalForPrisma.inMemoryLeads;
}

export function addLeadToStore(lead: AdvisoryLeadRecord): AdvisoryLeadRecord {
  const store = getLeadsStore();
  store.unshift(lead);
  return lead;
}

export function getScoreOverrides(): Record<string, number> {
  if (!globalForPrisma.scoreOverrides) {
    globalForPrisma.scoreOverrides = {};
  }
  return globalForPrisma.scoreOverrides;
}

export function setScoreOverride(propertyId: string, newScore: number) {
  const overrides = getScoreOverrides();
  overrides[propertyId] = newScore;
}
