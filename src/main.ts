import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as Sentry from "@sentry/node";
import { createSwagger } from "src/services/swagger";
import { AppConfigService } from "./services/env/env.service";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  const configService = app.get(AppConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api", {
    exclude: ["/"], // Exclude root path from global prefix
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  Sentry.init({
    environment: configService.get("NODE_ENV"),
    dsn: configService.get("SENTRY_DSN"),
    tracesSampleRate: 1.0,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  createSwagger(app);

  await app.listen(process.env.PORT ?? 6009);
}
bootstrap();
