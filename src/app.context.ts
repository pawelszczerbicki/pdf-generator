import {Container, InjectionToken} from "@decorators/di";
import {RestClient} from "typed-rest-client/RestClient";
import {getProp} from "./config/config.service";
import {BACKEND_URL} from "./config/keys";
import * as generator from "html-pdf";

export const REST_CLIENT = new InjectionToken('RestClient');
export const PDF_GENERATOR = new InjectionToken('PdfGenerator');

Container.provide([
    {provide: REST_CLIENT, useValue: new RestClient('node', getProp(BACKEND_URL))},
    {provide: PDF_GENERATOR, useValue: generator}
]);