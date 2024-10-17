const prisma = require('../prisma');
const seed = async () => {
  // Write something impactful here
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
