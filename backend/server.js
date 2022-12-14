import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import swaggerUI from "swagger-ui-express";
import connectDB from './Config/DB.js'
import UserRoutes from './Routes/User.Routes.js'
import { createRequire } from "module";
//Swagger Doc
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
const require = createRequire(import.meta.url); // construct the require method
const swaggerJSDocs = require("./swaggerApi.json") // use the require method}

//configure env variables
dotenv.config()

//create express app
const app= express()

//DB CONNECTION
connectDB()

//apply middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

//documentation route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

//api routes
app.use('/api/user', UserRoutes)

//test-route
app.get("/test", async (req, res) => {
    try {
        let data = {"Test":"API RUNNING..."};
        return res.json(data);
    } catch (e) {
        //console.log(e)
        return res.json(e.message);
    }
});

//error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT||5001,()=>console.log(`Server started in Port ${process.env.PORT}`))