const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        const { name, email, ra, cpf } = req.body;
        const student = await prisma.student.create({
            data: {
                name,
                email,
                ra,
                cpf,
            },
        });
        return res.status(201).json(student);
    },
    index: async (req, res) => {
        const students = await prisma.student.findMany();
        return res.json(students);
    },
    show: async (req, res) => {
        const { id } = req.params;
        const student = await prisma.student.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.json(student);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        const student = await prisma.student.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                email,
            },
        });
        return res.json(student);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        await prisma.student.delete({
            where: {
                id: Number(id),
            },
        });
        return res.json({ message: "Estudante excluído!" });
    },
};
