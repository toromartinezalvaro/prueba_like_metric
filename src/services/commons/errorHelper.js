function errorHandling(error) {
  const ErrorType = Object.freeze({
    BadRequest: {
      code: 400,
      status: "Bad Request",
      message: "Solicitud incorrecta, por favor intentelo de nuevo"
    },
    Unauthorized: {
      code: 401,
      status: "Unauthorized",
      message: "No tiene autorización para realizar esta acción"
    },
    NotFound: {
      code: 404,
      status: "Not Found",
      message: "Pagina no encontrada"
    },
    RequestTimeOut: {
      code: 408,
      status: "Request Time Out",
      message: "El servidor ha tardado demasiado tiempo en responder"
    },
    UnprocessableEntity: {
      code: 422,
      status: "Unprocessable Entity",
      message: "No se puede procesar la informacion"
    },
    ServiceTemporarilyUnavailable: {
      code: 503,
      status: "Service Temporarily Unavailable",
      message: "El servidor no se encuentra disponible de momento"
    },
    Error: {
      code: 0,
      status: "Error",
      message: "Ha ocurrido un error"
    }
  });

  let status;
  if (error.code === "ECONNABORTED") {
    status = 0;
  } else {
    status = error.response.status;
  }

  console.log(status);

  switch (status) {
    case 400:
      return ErrorType.BadRequest;
    case 401:
      return ErrorType.Unauthorized;
    case 404:
      return ErrorType.NotFound;
    case 408:
      return ErrorType.RequestTimeOut;
    case 422:
      return ErrorType.UnprocessableEntity;
    case 500:
      return ErrorType.InternalServerError;
    case 503:
      return ErrorType.ServiceTemporarilyUnavailable;
    case 0:
      return ErrorType.Error;
    default:
      return ErrorType.Error;
  }
}

export default errorHandling;
