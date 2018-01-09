import * as S3 from 'aws-sdk/clients/s3';
import {BUCKET, PDF_FOLDER} from "../config/keys";
import {getProp} from "../config/config.service";
import {Injectable} from "@decorators/di";
import {Stream} from "stream";
import * as S3Stream from 's3-upload-stream';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

@Injectable()
export class S3Service {
    private s3: S3;
    private s3Stream;

    constructor() {
        this.s3 = new S3();
        this.s3Stream = new S3Stream(this.s3);
    }

    upload(buffer: Buffer, extension: string): Promise<SendData> {
        return this.s3.upload({Body: buffer, ...this.uploadParams(extension)}).promise();
    }

    uploadStream(stream: Stream, extension: string): Promise<SendData> {
        let upload = this.s3Stream.upload(this.uploadParams(extension));
        let location = new Promise<SendData>(res => upload.on('uploaded', (details: SendData) => res(details)));
        stream.pipe(upload);
        return location;
    }

    private uploadParams(extension: string) {
        return {
            Bucket: getProp(BUCKET),
            Key: `${PDF_FOLDER}/${Math.random().toString(36).slice(2)}.${extension}`
        }
    }
}