function errorHandling(error) {
  const ErrorType = Object.freeze({
    BadRequest: {
      code: 400,
      status: 'Bad Request',
      message: 'Solicitud incorrecta, por favor intentelo de nuevo',
    },
    UniqueConstraint: {
      code: 400,
      status: 'UniqueConstraintError',
      message: 'Un usuario ya ha sido creado con este correo',
    },
    Unauthorized: {
      code: 401,
      status: 'Unauthorized',
      message: 'No tiene autorización para realizar esta acción',
    },
    NotFound: {
      code: 404,
      status: 'Not Found',
      message: 'Pagina no encontrada',
    },
    RequestTimeOut: {
      code: 408,
      status: 'Request Time Out',
      message: 'El servidor ha tardado demasiado tiempo en responder',
    },
    UnprocessableEntity: {
      code: 422,
      status: 'Unprocessable Entity',
      message: 'No se puede procesar la informacion',
    },
    ServiceTemporarilyUnavailable: {
      code: 503,
      status: 'Service Temporarily Unavailable',
      message: 'El servidor no se encuentra disponible de momento',
    },
    InternalServerError: {
      code: 500,
      status: 'Internal Server Error',
      message: 'Ha ocurrido un error interno',
    },
    Error: {
      code: 0,
      status: 'Error',
      message: 'Ha ocurrido un error',
    },
  });

  let status;
  if (error.response) {
    status = error.response.status;
  } else {
    status = 0;
  }

  console.log("error O.o ", error);

  switch (status) {
    case 400:
      if (error.response.data.message === 'SequelizeUniqueConstraintError') {
        return ErrorType.UniqueConstraint;
      }
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
