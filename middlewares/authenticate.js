import { getUserById } from "../models/user.js";
import JwtAuth from "./jwtAuth.js";

class AuthUsers extends JwtAuth {
    verifyToken = async (req, res, next) => {
        const token = req.cookies.authentication;

        if (!token) {
            return res.status(403).redirect("/");

        }
        try {
            const decoded = this.verifyJwt(token);
            if (!decoded) {
                res.locals.user = null
                res.redirect('/')
                next()
            }


            let user = await getUserById(decoded._id);


            if (!user) {
                res.locals.user = null
                res.redirect('/')
                next()
            }

            res.locals.user = user
            req.user = user
            next();

            
        } catch (err) {
            res.locals.user = null;
            return res.redirect('/')
        }
        
    };


    unAuth = async (req, res, next) => {
        const token = req.cookies.authentication;
        if (token)
            return res.status(403).redirect("/meets/dashboard");
        next()
    }


}

export default new AuthUsers();