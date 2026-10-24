import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {errorHandler} from './common/middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./common/swagger.js";

import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/hr", routes);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get(
  "/api-docs-json",
  (req, res) => {
    res.json(swaggerSpec);
  }
);

app.use(errorHandler);

export default app;