import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import AuthUsers from "./middlewares/authenticate.js";

// user defined libs
import UserRoute from "./routes/user.js";
import MeetRepo from "./routes/meet.js";
import db_conns from "./utils/database.js";

dotenv.config();
const app = express();

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);
// Get the current directory name
const __dirname = dirname(__filename);

// connect to database
db_conns();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(`${__dirname}/public`));



app.use("/users", UserRoute);
app.use("/meets", MeetRepo)
app.use("/", AuthUsers.unAuth, (req, res)=> res.render('pages/index'));


app.listen(process.env.PORT, ()=> console.log(`server connected on port ${process.env.PORT}`))