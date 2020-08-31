import express from "express";
import cors from "cors"; //para conectarme a direcciones externas
import http from "http";

import apartment from "./libs/apartments/routes";

const app = express();

app.set("port", process.env.PORT || 1337); //Puerto usado por default
app.use(express.urlencoded({ extended: true })); //para mandar cosas pesadas por json
app.use(express.json()); //para poder usar objetoss json
app.use(cors());

const server = http.createServer(app); //uso app por ser de express

app.get("/", (req, res) => res.send("¡Aplicacion funcionando mi papá!"));
app.use("/api", apartment);

//para traer "port" desde app e iniciar el server
server.listen(app.get("port"), () =>
  console.log(`!Aplicacion corriendo en el puerto ${app.get("port")}! :'3`)
);
