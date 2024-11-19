import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential: true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extends:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes

import userRouter from './routes/user.routes.js';
import routerSportEvents from "./routes/sportEventData.routes.js";
import adminRouter from "./routes/admin.routes.js";

// routes declaration
app.use("/api/v1/users",userRouter)
app.use("/sports",routerSportEvents)
app.use("/api/v1/admin",adminRouter)



export {app}