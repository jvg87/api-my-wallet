export type IRequest = {
  headers: {
    authorization?: string;
  };
};

export type IResponse = {
  statusCode: number;
  body?: Record<string, any>;
};

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse>;
}
