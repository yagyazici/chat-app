import { Response } from "../base/response";

export class CustomResponse<TResponse> extends Response {
    ResponseText: string;
    Status: boolean;
    Response: TResponse;
}
