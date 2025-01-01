export interface IHttpRequest {
  body: Record<string, any>;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
}
