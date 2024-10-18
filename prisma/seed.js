const prisma = require('../prisma');
const { faker } = require('@faker-js/faker');

const seed = async (userId, numTracks = 20, numPlaylists = 5) => {
  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.music.songName(),
  }));
  await prisma.track.createMany({ data: tracks });

  /* Couldn't get this to work

  const playlists = Array.from({ length: numPlaylists }, () => ({
    name: faker.music.songName(),
    description: faker.lorem.sentence(),
    ownerId: userId,
  }));
  await prisma.playlist.createMany({ data: playlists });

  const allTracks = await prisma.track.findMany();

  for (let i = 0; i < numPlaylists; i++) {
    const trackIds = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map((track) => ({ if: track.id }));
    await prisma.playlist.update({
      where: { id: i + 1 },
      data: {
        tracks: { connect: trackIds },
      },
    });
  }
  */
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
