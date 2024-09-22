import express from "express";
import * as SwaggerUi from "swagger-ui-express";
import { router } from "./routes/routes";
const cors = require("cors");
const bodyParser = require("body-parser");
import swaggerDocs from "./swagger.json";


const app = express();

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs));


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


export { app };