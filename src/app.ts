import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { db } from "./models";
import userRoutes from './routes/userRoutes';
import blurpRoutes from './routes/blurpRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

//Routes Go Below:
app.use('/api/blurps', blurpRoutes)
app.use('/api/users', userRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

//Database Sync
db.sync().then(() => {
    console.info("DB connection success!")
});

app.listen(3000);