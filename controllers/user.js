import { getUserByEmail, createUser, getUsers, getUserById } from '../models/user.js';
import JwtAuth from '../middlewares/jwtAuth.js';

const maxAge = 3 * 60 * 60 * 24;

class UserRepo extends JwtAuth {

    constructor() {
        super(process.env.JWT_SECRET_KEY);
    }

    create_user = async (req, res) => {
        const { email, password, username } = req.body;
        console.log(req.body)
        if (!(email && password && username))
            return res.status(400).render("pages/register", { message: "all field required" });
        try {
            // check for user existance
            const userExist = await getUserByEmail(email);
            if (userExist) return res.status(400).render("pages/register", { message: "User Exists" });

            //created user
            const created = await createUser({ username, password, email: email.toLowerCase() });
            if (!created) return res.status(400).render("pages/register", { message: "something went wrong" });

            return res.redirect("pages/dash")
        } catch (error) {
            return res.status(500).render("pages/register", { message: error.message })

        }
    }

    create_view = async (_, res) => res.render("pages/register")

    login_user = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).render("pages/index", { message: "all field required" });

        try {
            // check for user existance
            const user = await getUserByEmail(email);
            if (!user) return res.status(400).render("pages/index", { message: "user not found" });

            // check for user password match
            const checkpass = user.matchPassword(password);
            if (!checkpass) return res.status(400).render("pages/index", { message: "wrong user password" });

            //create user tokens
            const token = this.signJwt({ _id: user._id, email: user.email })
            user.token = token;

            res.cookie("authentication", token, {
                httpOnly: true,
                maxAge: 1000 * maxAge,
            });
            return res.redirect("/meets/dashboard");
        } catch (error) {
            console.log(error)
            return res.status(500).render("pages/index", { message: error.message })
        }

    }

    get_users = async (req, res) => {
        const users = await getUsers();
        return res.status(200).json({ users });
    }

    get_user = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await getUserById(id);
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    logout = (req, res) => {
        res.cookie("authentication", "", { maxAge: 1 });
        res.redirect("/");
    };
}


export default new UserRepo();