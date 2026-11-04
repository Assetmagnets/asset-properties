import { getLeadsStore } from "@/lib/prisma";

async function check() {
  const store = getLeadsStore();
  console.log("Memory leads length:", store.length);
}

check();
