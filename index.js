import express from "express";
import cors from "cors";
import env from "./src/conf/env.js";
import routes from "./src/routes/routes.js";

const app = express();
const port = env.PORT || 3000;

app.use(express.static(process.cwd() + '/pages'));
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port,'0.0.0.0', () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
  });