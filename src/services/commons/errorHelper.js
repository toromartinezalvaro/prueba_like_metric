function errorHandling (error) {
  const ErrorType = Object.freeze({
    BadRequest: {
      code: 400,
      status: "Bad Request",
      message: "Solicitud incorrecta, por favor intentelo de nuevo"
    },
  
    NotFound: {
      code: 404,
      status: "Not Found",
      message: "Pagina no encontrada"
    }, 
    UnAuthorized: {
      code: 401,
      status: "Unauthorized",
      message: "No tiene autorización para ingresar a esta pagina"
    },
    UnprocessableEntity: {
      code:422,
      status: "Unprocessable Entity",
      message: "No se puede procesar la informacion"
    }

  })
  
  
  switch(error.response.status) {
    case 400:
      return ErrorType.BadRequest;
    case 404:
      return ErrorType.NotFound;
    case 401:
      return ErrorType.UnAuthorized;
    case 422:
      return ErrorType.UnprocessableEntity;
    default:
      return "Error no controlado";
      
  }
}

export default  errorHandling ;