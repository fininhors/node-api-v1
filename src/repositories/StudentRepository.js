const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    create: async (data) => {
        return prisma.student.create({
            data,
        });
    },
    getAll: async () => {
        return prisma.student.findMany();
    },
    get: async (id) => {
        return prisma.student.findUnique({
            where: {
                id: Number(id),
            },
        });
    },
    update: async (id, data) => {
        return prisma.student.update({
            where: {
                id: Number(id),
            },
            data,
        });
    },
    delete: async (id) => {
        return prisma.student.delete({
            where: {
                id: Number(id),
            },
        });
    },
};
