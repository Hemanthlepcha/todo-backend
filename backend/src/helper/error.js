import { GraphQLError } from "graphql";

export const AUTH_ERROR = {
    AUTH_REQUIRED: "AUTH_REQUIRED",
    ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
    UN_AUTHORIZED_ACCESS: "UN_AUHTORIZED_ACCESS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    AUTHORIZATION_REQUIRED: "AUTHORIZATION_REQUIRED",
    INVALID_TOKEN: "INVALID_TOKEN",
    INVALID_PASSWORD: "INVALID_PASSWORD",
  };

export class AuthenticationError extends GraphQLError {
  constructor(
    code = 'AUTH_REQUIRED',
    message = 'Authentication is required for this resource.'
  ) {
    super(message);
    this.code = code;
  }
}

