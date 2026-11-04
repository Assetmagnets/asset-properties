import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking current records in database...");

  const adminUsersCount = await prisma.adminUser.count();
  const advisoryLeadsCount = await prisma.advisoryLead.count();
  const propertiesCount = await prisma.property.count();
  const blogPostsCount = await prisma.blogPost.count();

  console.log(`Current counts:
- AdminUser: ${adminUsersCount}
- AdvisoryLead: ${advisoryLeadsCount}
- Property: ${propertiesCount}
- BlogPost: ${blogPostsCount}
`);

  // Deleting records
  console.log("Deleting AdvisoryLead records...");
  const deletedLeads = await prisma.advisoryLead.deleteMany({});
  console.log(`Deleted ${deletedLeads.count} leads.`);

  console.log("Deleting Property records...");
  const deletedProperties = await prisma.property.deleteMany({});
  console.log(`Deleted ${deletedProperties.count} properties.`);

  console.log("Deleting BlogPost records...");
  const deletedBlogs = await prisma.blogPost.deleteMany({});
  console.log(`Deleted ${deletedBlogs.count} blog posts.`);

  const remainingAdmins = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  console.log("\nPreserved Admin Users:", JSON.stringify(remainingAdmins, null, 2));
  console.log("\nDatabase cleanup completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during cleanup:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
