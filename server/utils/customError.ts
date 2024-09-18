interface ICustomError {
  status: string;
  statusCode: number;
}

class CustomError extends Error implements ICustomError {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = 400 <= statusCode && statusCode < 500 ? "fail" : "error";

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
