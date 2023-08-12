import { Router } from "express";
import UserRepo from "../controllers/user.js";
import AuthUsers from "../middlewares/authenticate.js"
const route = Router();


route.get("/register", AuthUsers.unAuth, UserRepo.create_view);
route.post("/register", AuthUsers.unAuth, UserRepo.create_user);

route.post("/login", AuthUsers.unAuth, UserRepo.login_user)
route.get("/logout",  UserRepo.logout)


route.get("/", AuthUsers.verifyToken, UserRepo.get_users);
route.get("/:id", AuthUsers.verifyToken, UserRepo.get_user);

// route.delete("/:id", epo.delete_meeting)

export default route;