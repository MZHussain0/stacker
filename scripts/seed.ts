const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          name: "Computer Science",
        },
        {
          name: "Artificial Intelligence",
        },
        {
          name: "Music",
        },
        {
          name: "Fitness",
        },
        {
          name: "Programming",
        },
        {
          name: "Photography",
        },
        {
          name: "Accounting",
        },
        {
          name: "Engineering",
        },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}
main();
