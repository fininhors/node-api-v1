const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    create: async (data) => {
        return prisma.user.create({
            data,
        });
    },
    get: async (id) => {
        return prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
    },
    getByEmail: async (email) => {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },
};
