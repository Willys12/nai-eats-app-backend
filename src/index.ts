// most of the server configurations done here
import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoute from "./routes/MyUserRoute";

//DB connection
mongoose
.connect(process.env.MONGODB_CONNECTION_STR as string)
.then(() => console.log("Connected to database"));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health Ok!"});
});

app.use("/api/my/user", myUserRoute)
app.listen(7000, () => {
    console.log("Server started successfully on port 7000!");
})