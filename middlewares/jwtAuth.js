import jwt from "jsonwebtoken";


export default class JwtAuth {

    signJwt = (user) => {
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        return token;
    }

    verifyJwt = (token) => {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
}