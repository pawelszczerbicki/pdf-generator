import {Inject, Injectable} from "@decorators/di";
import {RestClient} from "typed-rest-client/RestClient";
import {REST_CLIENT} from "../app.context";
import {Talent} from "./talent";
import {HttpUtils} from "../utils/http.utils";

@Injectable()
export class TalentDao {

    constructor(@Inject(REST_CLIENT) private client: RestClient) {
    }

    async get(id: number, token: string): Promise<Talent> {
        return (await this.client.get<Talent>(`/talent/${id}`, HttpUtils.authHeader(token))).result;
    }
}