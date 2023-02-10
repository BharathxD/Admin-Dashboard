// Importing necessary packages for the application
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";

/* IMPORT ROUTES */

import clientRoutes from "./routes/clientRoutes";
import generalRoutes from "./routes/generalRoutes";
import managementRoutes from "./routes/managementRoutes";
import salesRoutes from "./routes/salesRoutes";

/* MIDDLEWARE */

const app = express();

const PORT: number = parseInt(`${process.env.PORT}`) || 9000;

/!* Setting up MongoDB query parameters */;
mongoose.set("strictQuery", false);

/!* Using Express.js to parse JSON data */;
app.use(express.json());

/!* Using Helmet to secure HTTP headers */;
app.use(helmet());

/!* This will allow cross-origin share requests */;
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/!* Using Morgan to log HTTP requests in console */;
app.use(morgan("common"));

/!* Using Body Parser to parse JSON data */;
app.use(bodyParser.json());

/!* Setting up Body Parser parameters */;
app.use(bodyParser.urlencoded({ extended: false }));

/!* Using CORS to enable cross-origin requests */;
app.use(cors<Request>());

/* ROUTES */

app.use("/client", clientRoutes);

app.use("/general", generalRoutes);

app.use("/management", managementRoutes);

app.use("/sales", salesRoutes);

/* ERROR HANDLER */

app.get("/", (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

/* MONGODB & PORT */

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Listening on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });

