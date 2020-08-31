import express from "express";
import db from '../../../../models';            //importando el modelo
import { restart } from "nodemon";

const router = express.Router();
const {apartment} = db;                         //trayendo los modelos de la base de datos

router.get("/apartments", async (req, res, next) => {
    const response = await apartment.findAll();         //select * from apartment
    res.json(response);                                 //para que devuelva un json con la respuesta
});

router.post("/apartments", async(req, res, next) => {       //Ruta de creacion
    const body = req.body;                                  //parametros que vienen de la consulta
    const create = async (objecToCreate) => {               //Funcion para crear apartamentos
        return apartment.create(objecToCreate);             //insert into
    }
    const response = await create(body);                    
    res.json(response);
});

router.put("/apartments", async(req, res, next) =>{
    const body = req.body;
    const update = async (objectToUpdate) =>{
        return apartment.update(objectToUpdate, {where: {id: objectToUpdate.id}})     
    }
    const response = await update(body);
    res.json(response);
});

router.delete("/apartments", async(req, res, next) =>{
    const body = req.body;
    const del = async (objectToDelete) =>{
        return apartment.destroy({where: {id: objectToDelete.id}})
    }
    const response = await del(body);
    res.json(response);
});

module.exports = router;
