## PDF generator
Node Pdf generator using `Typescript`, `AWS Lambda` and `Serverless` plugin.
Bitbucket pipeline configuration included.<br/>
App has preconfigured local deployment using `serverless-offline` and `PhantomJS` for Mac and Linux <br/>
Based on [serhiisol/node-decorators](https://github.com/serhiisol/node-decorators). Thanks @serhiisol
#### Before deploy add your domain in `serverless.yml` file changing `DOMAIN` placeholder
#### Before deploy export `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID`
### Deploy
In order to deploy:
`npm run deploy:test`
Other phases are: `preprod` and `prod`

### Usage
Use path `/talent?id=1&id=2` to generate PDF file for talents with given ids
Remember to add `Authorization` header to each request

### Local run
Run `npm install`
##### On mac machine use:
`npm run dev:mac`
##### On linux machine use:
`npm run dev:linux`
Server will be listening for requests on `http://localhost:3000` using `test` environment