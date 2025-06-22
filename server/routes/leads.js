const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  console.log("GET /api/leads hit"); //debug line
  const leads = await prisma.lead.findMany();
  res.json(leads);
});

router.post("/", async (req, res) => {
  const { name, email, budget, notes } = req.body;
  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      budget: isNaN(parseInt(budget)) ? null : parseInt(budget, 10),
      notes,
    },
  });
  res.json(lead);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params; //use the id from the url

  try {
    await prisma.lead.delete({
      where: { id: parseInt(id) }, //make sure it's an interger
    });
    res.status(200).send({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Delete error", err);
    res.status(500).send({ error: "Failed to delete lead" });
  }
});

module.exports = router;
