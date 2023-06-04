import {CreateAppointmentDto} from "@functions/origin/presentation/dtos/create-appointment.dto";
import {Validation} from "@libs/cursos-dev/Validation";
import {Response} from "@libs/cursos-dev/Response";
import {CreateAppointmentApplication} from "@functions/origin/application/create-appointment.application";
import {CreateAppointmentInfrastructure} from "@functions/origin/infrastructure/create-appointment.infrastructure";

const create = async (event) => {
  const {queryStringParameters, pathParameters, body, headers} = event

  const {doctor, clinica} = queryStringParameters;
  const {countryIso} = pathParameters
  const {origin, destination} = headers;
  const {date, specialtyId} = JSON.parse(body);

  const params = {doctor, clinica, countryIso, origin, destination, date, specialtyId};

  const dtoToValidate = Object.assign(new CreateAppointmentDto(), params);
  const errors = await Validation.parameters(dtoToValidate, params);

  if (errors) {
    return Response.errorsInput(errors);
  }

  const application = new CreateAppointmentApplication(new CreateAppointmentInfrastructure());
  const result = await application.redirect(params);

  return result ? Response.errorsServer(result) : Response.success(params);
};

export const main = create;
