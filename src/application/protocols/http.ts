export interface IHttpRequest {
  body: Record<string, any>;
  params?: Record<string, string>;
  userId?: string;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
}
