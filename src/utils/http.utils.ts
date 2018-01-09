import {IRequestOptions} from "typed-rest-client/RestClient";

export class HttpUtils {
    static authHeader(token: string): IRequestOptions {
        return {additionalHeaders: {authorization: token}};
    }
}