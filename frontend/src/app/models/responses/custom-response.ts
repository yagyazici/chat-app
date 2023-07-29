import { Response } from "../base/response";

export class CustomResponse<TResponse> extends Response {
    responseText: string;
    status: boolean;
    response: TResponse;
}
