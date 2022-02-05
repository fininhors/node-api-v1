const { PrismaClient } = require("@prisma/client");

const prismClient = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        const { name, email, ra, cpf } = req.body;
        const student = await prismClient.student.create({
            data: {
                name,
                email,
                ra,
                cpf,
            },
        });
        res.status(201).json(student);
    },
};
