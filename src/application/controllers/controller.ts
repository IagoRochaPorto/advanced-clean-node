import { badRequest, HttpResponse, serverError } from '../helpers'
import { ValidationComposite, Validator } from '../validation'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }

      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  private validate (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    const validator = new ValidationComposite(validators)
    return validator.validate()
  }
}
