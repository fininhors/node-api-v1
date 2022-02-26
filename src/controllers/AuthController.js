const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

module.exports = {
    register: async (req, res) => {
        const { name, email, password } = req.body;
        const user = await UserRepository.getByEmail(email);

        if (!user) {
            let params = {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            };
            const user = await UserRepository.create(params);

            return res
                .status(201)
                .json({ message: "Usuário cadastrado com sucesso!" });
        }

        return res.status(400).json({ message: "Usuário já cadastrado!" });
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        const user = await UserRepository.getByEmail(email);

        if (!user) {
            return res.status(401).json({
                message:
                    "Dados de acesso incorretos. Por favor verifique-os e tente novamente!",
            });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message:
                    "Dados de acesso incorretos. Por favor verifique-os e tente novamente!",
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
            expiresIn: process.env.EXPIRES_IN,
        });

        return res.json({
            name: user.name,
            email: user.email,
            accessToken: token,
        });
    },
};
