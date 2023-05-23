import express from "express";
import recipeRouter from "./routes/recipeRouter.js"
import logger from 'morgan';
import 'dotenv/config';
import auth from './auth.js';
import expressSession from 'express-session';


const app = express();
const port = 3000;

const sessionConfig = {
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

// app.use(expressSession(sessionConfig));
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));
auth.configure(app);
app.use(recipeRouter);
app.use(logger('dev'));

app.use("/post", express.static("client/post"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});