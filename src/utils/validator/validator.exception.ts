export class ValidatorFieldException extends Error {
  constructor(e: string | undefined) {
    super(e);
  }
}
