const prisma = require('../prisma');
const { faker } = require('@faker-js/faker');

const seed = async (numTracks = 20, numPlaylists = 5) => {
  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.music.songName(),
  }));
  const track = await prisma.track.createMany({ data: tracks });
  console.log(track);
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
