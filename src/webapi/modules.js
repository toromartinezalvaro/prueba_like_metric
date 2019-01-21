import request from 'superagent'
import { API_PATH } from './config'

export const getSales = query => {
  return request.get(`${API_PATH}/modules/sales`).query(query)
}

export const getAll = data => {
  return request.post(`${API_PATH}/modules/all`).send(data)
}

export const getBuildings = () => {
  const some = request.post(`${API_PATH}/modules/indirect-expenses`)
  console.log("testing --- "+some)
  return []
  // return [
  //   { name: "Torre 1", floors: [ 
  //                                 { floor: "Piso 1", properties: ["Salon", "Apto 102", "Apto 103", "bodega", "Apto 104"] },
  //                                 { floor: "Piso 2", properties: ["Apto 201", "Apto 202", "Apto 203", "Apto 204", "cuarto útil"] },
  //                                 { floor: "Piso 3", properties: ["Apto 301", "Apto 302", "Apto 303", "Apto 313", "Apto 310"] },
  //                                 { floor: "Piso 4", properties: ["Apto 401", "Apto 402", "Apto 403", "Apto 313", "Apto 414"] } 
  //                               ] },
  //   { name: "Torre 2", floors: [ 
  //                                 { floor: "Piso 1", properties: ["Salon", "Apto 102", "Apto 103", "bodega", "Apto 104"] },
  //                                 { floor: "Piso 2", properties: ["Apto 201", "Apto 202", "Apto 203", "Apto 204", "cuarto útil"] },
  //                                 { floor: "Piso 3", properties: ["Apto 301", "Apto 302", "Apto 303", "Apto 313", "Apto 310"] },
  //                                 { floor: "Piso 4", properties: ["Apto 401", "Apto 402", "Apto 403", "Apto 313", "Apto 414"] } 
  //                               ] },
  //   { name: "Torre 3", floors: [ 
  //                                 { floor: "Piso 1", properties: ["Salon", "Apto 102", "Apto 103", "bodega", "Apto 104"] },
  //                                 { floor: "Piso 2", properties: ["Apto 201", "Apto 202", "Apto 203", "Apto 204", "cuarto útil"] },
  //                                 { floor: "Piso 3", properties: ["Apto 301", "Apto 302", "Apto 303", "Apto 313", "Apto 310"] },
  //                                 { floor: "Piso 4", properties: ["Apto 401", "Apto 402", "Apto 403", "Apto 313", "Apto 414"] } 
  //                               ] },
  //   { name: "Torre 4", floors: [ 
  //                                 { floor: "Piso 1", properties: ["Salon", "Apto 102", "Apto 103", "bodega", "Apto 104"] },
  //                                 { floor: "Piso 2", properties: ["Apto 201", "Apto 202", "Apto 203", "Apto 204", "cuarto útil"] },
  //                                 { floor: "Piso 3", properties: ["Apto 301", "Apto 302", "Apto 303", "Apto 313", "Apto 310"] },
  //                                 { floor: "Piso 4", properties: ["Apto 401", "Apto 402", "Apto 403", "Apto 313", "Apto 414"] } 
  //                               ] },

  // ]
}