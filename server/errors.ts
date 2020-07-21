export class NotFound extends Error {
  code = 404
  message = `Resource Not Found`
}

export class TeaPot extends Error {
  code = 418
  message = `I cannot brew coffee! I am only a teapot`
}

export class NotAuthorized extends Error {
  code = 403
  message = `You are not authorized to perform this request.`
}
