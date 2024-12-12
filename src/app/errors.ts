export class AppError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UserExists extends AppError {}
export class PasswordNotEqual extends AppError {}
export class UserNotFound extends AppError {}
export class BookNotFound extends AppError {}
