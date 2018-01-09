import * as ejs from "ejs";
import {Inject, Injectable} from "@decorators/di";
import {Talent} from "../talent/talent";
import {PDF_GENERATOR} from "../app.context";
import {getProp} from "../config/config.service";
import {PHANTOM_DEFAULT, PHANTOM_ENV} from "../config/keys";

const phantomDir = './src/utils/phantom/phantomjs';

@Injectable()
export class PdfService {

    constructor(@Inject(PDF_GENERATOR) private generator) {
    }

    public generate(html: string, bindings: Talent) {
        const phantomPath = `${phantomDir}_${getProp(PHANTOM_ENV, PHANTOM_DEFAULT)}`;
        return this.generator.create(ejs.render(html, bindings), {phantomPath});
    }
}