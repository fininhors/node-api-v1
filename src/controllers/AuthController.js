const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

module.exports = {
    create: async (req, res) => {
        const { name, email, password } = req.body;
        let params = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await UserRepository.create(params);

        return res
            .status(201)
            .json({ message: "Usuário cadastrado com sucesso!" });
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
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken: token,
        });
    },
};
