import { RequiredFieldError } from '@/application/errors'

class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}

describe('RequiredStringValidator', () => {
  it('Should return RequiredFieldError if valid is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return RequiredFieldError if valid is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return RequiredFieldError if valid is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')

    const error = sut.validate()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
