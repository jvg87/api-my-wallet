import { IHttpResponse } from "../protocols";

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message,
  },
});

export const conflict = (error: Error): IHttpResponse => ({
  statusCode: 409,
  body: {
    error: error.message,
  },
});

export const created = (): IHttpResponse => {
  return {
    statusCode: 201,
  };
};
