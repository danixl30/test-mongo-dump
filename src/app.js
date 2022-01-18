import express from "express"
import cors from "cors"
import  "./schedules/index.js";
import dumpRouter from "./controller/dump.controller.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(dumpRouter)

export default app;
