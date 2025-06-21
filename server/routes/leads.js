const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req,res) => {
console.log('GET /api/leads hit'); //debug line
const leads = await prisma.lead.findMany();
res.json(leads);
});

router.post('/', async (req,res) => {
const { name, email, budget, notes } = req.body;
const lead = await prisma.lead.create({
data: {name,email,budget,notes},
});
res.json(lead);
});

module.exports = router;


