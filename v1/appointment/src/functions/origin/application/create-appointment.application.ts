import {CreateAppointmentDto} from "@functions/origin/presentation/dtos/create-appointment.dto";
import {CreateAppointmentInfrastructure} from "@functions/origin/infrastructure/create-appointment.infrastructure";

const lambdaFunctionNameByCountry = {
  PE: 'appointment-pe-dev-create',
  CO: 'appointment-co-dev-create',
  MX: 'appointment-mx-dev-create',
};

export class CreateAppointmentApplication {
  /*private readonly infrastructure: CreateAppointmentInfrastructure;

  constructor(infrastructure: CreateAppointmentInfrastructure) {
    this.infrastructure = infrastructure;
  }*/

  constructor(private readonly infrastructure: CreateAppointmentInfrastructure) {
  }

  async redirect(params: CreateAppointmentDto) {
    const lambdaFunctionName = lambdaFunctionNameByCountry[params.countryIso];
    console.log("lambdaFunctionName", lambdaFunctionName)
    console.log("params", params);
    const result = await this.infrastructure.redirect(lambdaFunctionName, params);
    return result.isErr() ? result.error : null;
  }
}