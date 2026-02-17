export class DataResponse<T> {
  readonly data: T;

  readonly message?: string;

  readonly code?: string;

  constructor(data: T, message?: string, code?: string) {
    this.data = data;
    this.message = message;
    this.code = code;
  }
}
