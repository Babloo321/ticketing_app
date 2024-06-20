import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number;
  constructor(public message: string){
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{message: this.message}];
  }
}