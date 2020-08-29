import Axios from "axios"; //importando axios para usar API REST

const URL = "http://localhost:1337/api"; //Ruta base de API

export default async (path, method, data) => {
  try {
    return Axios({ url: URL + path, method, data });
  } catch (error) {
    console.log(error);
  }
};
