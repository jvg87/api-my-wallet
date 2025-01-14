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

export const created = (): IHttpResponse => ({
  statusCode: 201,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: {
    error: error.message,
  },
});

export const unauthorized = (error: Error): IHttpResponse => {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
};

export const ok = (data: any) => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const notFound = (error: Error): IHttpResponse => {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
};
