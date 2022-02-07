const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers.authorization;

    if (!token) {
        return res
            .status(401)
            .send({ auth: false, message: "Nenhum token fornecido." });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        const { id } = jwt.verify(token, process.env.APP_SECRET);
        req.userId = id;
        return next();
    } catch (error) {
        return res
            .status(401)
            .send({ auth: false, message: "Token inválido." });
    }
};

module.exports = verifyToken;
