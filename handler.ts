import {TalentService} from "./src/talent/talent.service";
import {Container} from "@decorators/di";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {Callback, Context} from 'aws-lambda';
import SendData = ManagedUpload.SendData;

export const generatePdf = (event: any, context: Context, callback: Callback) => {
    let provider;
    if (!event.queryStringParameters || !event.queryStringParameters.id)
        return callback(new Error("No id provided. Add id to query string, ex. ?id=1&id=2"));

    if (event.queryStringParameters.id.length === 1)
        provider = () => Container.get<TalentService>(TalentService)
            .generate(event.queryStringParameters.id[0], event.headers.Authorization);
    else
        provider = () => Container.get<TalentService>(TalentService)
            .generateZip(event.queryStringParameters.id, event.headers.Authorization);

    return handleResponse(provider, callback);
};

const handleResponse = async (provider: () => Promise<SendData>, callback: Callback) => {
    try {
        callback(null, {
            statusCode: 301,
            headers: {'Location': (await provider()).Location},
            body: null,
            isBase64Encoded: false
        });
    } catch (exception) {
        console.log(exception);
        callback(exception);
    }
};

