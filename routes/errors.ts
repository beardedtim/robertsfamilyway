export * from '../server/errors'

export class BadInput extends Error {
  code = 400
  constructor(errors: Error[]) {
    super()

    this.message = `Failed Validation: ${errors.map(({ message }) => message)}`
  }
}