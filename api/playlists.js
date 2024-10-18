const express = require('express');
const router = express.Router();
module.exports = router;

const { authenticate } = require('./auth');
const prisma = require('../prisma');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { ownerId: req.user.id },
    });
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  const { name, description, trackIds } = req.body;

  if (!name || !description) {
    return next({
      status: 400,
      message: 'Must provide a proper name and description to proceed.',
    });
  }
  try {
    const track = trackIds.map((id) => ({ id: +id }));
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: req.user.id,
        track: { connect: track },
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  const { id } = req.params;
  const getTracks = req.user ? { where: { userId: req.user.id } } : false;
  try {
    const playlist = await prisma.playlist.findUniqueOrThrow({
      where: { id: +id },
      include: { tracks: getTracks },
    });

    if (playlist.ownerId !== req.user.id) {
      next({
        status: 403,
        message: "You don't have permission to view this playlist.",
      });
    }
    res.json(playlist);
  } catch (e) {
    next(e);
  }
});
