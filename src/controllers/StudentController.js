const studentRepository = require("../repositories/StudentRepository");

module.exports = {
    create: async (req, res) => {
        const student = await studentRepository.create(req.body);

        return res.status(201).json(student);
    },
    index: async (_, res) => {
        const students = await studentRepository.getAll();

        return res.json(students);
    },
    show: async (req, res) => {
        const { id } = req.params;
        const student = await studentRepository.get(id);

        return res.json(student);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const student = await studentRepository.update(id, req.body);

        return res.json(student);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        await studentRepository.delete(id);

        return res.json({ message: "Estudante excluído!" });
    },
};
