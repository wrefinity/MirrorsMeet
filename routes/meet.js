import { Router } from "express";
import AuthUsers from "../middlewares/authenticate.js"
import MeetRepo from "../controllers/meet.js";
const route = Router();

route.get("/dashboard", AuthUsers.verifyToken, MeetRepo.dashboard)
route.get("/start/:id/:meetId", AuthUsers.verifyToken, MeetRepo.start_meet);
route.get("/starring/:meetId", MeetRepo.starring_meet);
route.get("/", AuthUsers.verifyToken, MeetRepo.get_meetings);
route.get("/:id", MeetRepo.get_meeting );
route.post("/", AuthUsers.verifyToken, MeetRepo.create_meeting);

route.delete("/:id", MeetRepo.delete_meeting)


export default route;