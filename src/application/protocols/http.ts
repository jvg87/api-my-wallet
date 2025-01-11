export interface IHttpRequest {
  body: Record<string, any>;
  userId?: string;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
}
