import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const options = new DocumentBuilder()
  .setTitle('CTRL Api')
  .setDescription('API descriptions for the CTRL system.')
  .setVersion('1.0.0-alpha-3')
  .addBasicAuth()
  .addBearerAuth()
  .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'master-key')
  .build();

const selectedConfig = new DocumentBuilder()
  .setTitle('Selected API')
  .setDescription('Only selected endpoints')
  .setVersion('1.0')
  .build();

export const createSwagger = (app: NestExpressApplication) => {
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document);

  // Pass an array of modules or controllers to limit the docs
//   const selectedDocument = SwaggerModule.createDocument(app, selectedConfig, {
//     include: [OrganizationModule], // Only this controller
//   });

//   const allowedPaths = [
//     '/api/v1/organization/pharmacies-transmissions-insights',
//   ];

//   selectedDocument.paths = Object.fromEntries(
//     Object.entries(selectedDocument.paths).filter(([path]) => {
//       // console.log(path, '>>>>');
//       return allowedPaths.includes(path);
//     }),
//   );

  SwaggerModule.setup('selected-api', app, document);
};
