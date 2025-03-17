const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
 
app.post("/games", async (req, res) => {
  try {
    const { title, platform, releaseYear, condition } = req.body;
    const game = await prisma.game.create({
      data: { title, platform, releaseYear, condition },
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/games", async (req, res) => {
  const { title } = req.query;
  const games = title
    ? await prisma.game.findMany({ where: { title: { contains: title } } })
    : await prisma.game.findMany();
  res.json(games);
}); 
app.put("/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { condition } = req.body;
    const game = await prisma.game.update({
      where: { id: Number(id) },
      data: { condition },
    });
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.game.delete({ where: { id: Number(id) } });
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));
