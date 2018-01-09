import {PdfService} from "../pdf/pdf.service";
import {Injectable} from "@decorators/di";
import {TalentDao} from "./talent.dao";
import {Talent} from "./talent";
import {S3Service} from "../utils/s3.service";
import * as archiver from "archiver";

import {PDF, ZIP} from "../config/keys";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {TalentBuffer} from "./talent.buffer";
import fs = require('fs');
import path = require('path');
import SendData = ManagedUpload.SendData;

const TEMPLATE: string = "./../templates/talent.ejs";
const ENCODING: string = "utf8";
const NO_COMPRESSION: number = 0;

@Injectable()
export class TalentService {
    private template: string;

    constructor(private pdfService: PdfService, private talentDao: TalentDao, private s3: S3Service) {
        this.template = fs.readFileSync(path.join(__dirname, TEMPLATE), ENCODING);
    }

    async generate(id: number, token: string): Promise<SendData> {
        return this.s3.upload((await this.generatePdf(id, token)).buffer, PDF);
    }

    async generateZip(ids: number[], token: string): Promise<SendData> {
        let files: TalentBuffer[] = await Promise.all(ids.map(id => this.generatePdf(id, token)));
        let archive = archiver('zip', {zlib: {level: NO_COMPRESSION}});

        files.forEach(pdf => archive.append(pdf.buffer, {name: `${pdf.id}.${PDF}`}));

        archive.finalize();
        return this.s3.uploadStream(archive, ZIP);

    }

    private async generatePdf(id: number, token: string): Promise<TalentBuffer> {
        let talent: Talent = await this.talentDao.get(id, token);
        return new Promise<TalentBuffer>((res, rej) => this.pdfService.generate(this.template, talent)
            .toBuffer((err: any, buffer: Buffer) => err ? rej(err) : res({buffer, id: talent.id})));
    }
}
