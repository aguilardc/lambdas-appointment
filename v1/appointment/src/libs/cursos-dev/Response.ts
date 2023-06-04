import {IError} from "@libs/cursos-dev/Error";

export abstract class Response {
  static errorsInput(errors: unknown) {
    return {
      statusCode: 411,
      body: JSON.stringify(errors)
    }
  }

  static errorsServer(result: IError) {
    return {
      statusCode: result.status,
      body: JSON.stringify(result)
    }
  }

  static success(result: Record<string, any>) {
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }
}