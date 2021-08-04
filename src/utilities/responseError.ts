/** Extension of the Error class that allows to attach status code to the error. */
export default class ResponseError extends Error {
  status?: number;

  public constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}
