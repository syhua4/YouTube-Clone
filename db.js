import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpenDb = () => console.log("😀 Connected to DB");
const handleError = (error) =>
  console.log(`😫 Error when connecting to DB: ${error}`);

db.once("open", handleOpenDb);
db.on("error", handleError);

export default db;
