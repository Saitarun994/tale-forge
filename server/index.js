import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import prodiaRoutes from "./routes/prodiaRoutes.js";

dotenv.config(); // Helps pull env variables from .env file

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/prodia",prodiaRoutes);


app.get("/", async (req, res) => {
    res.send("Hello from prodia");
})
const port = process.env.PORT || 8080;
const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(port, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };

startServer();