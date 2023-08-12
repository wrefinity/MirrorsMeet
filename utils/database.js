import { connect } from "mongoose";


const db_conns = function () {
    const mongo_uri = process.env.MONGO_URI
    connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
}


export default db_conns;