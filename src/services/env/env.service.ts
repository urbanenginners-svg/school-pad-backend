import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsString, IsEnum, IsOptional } from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

export class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  MONGO_CONNECTION_STRING: string;

  @IsString()
  MASTER_KEY: string;

  @IsString()
  JWT_SECRET: string;

//   @IsString()
//   CTRL_SENDGRID_KEY: string;

  // @IsString()
  // AUTH_NET_LOGIN_ID: string;

  // @IsString()
  // AUTH_NET_TRANSACTION_KEY: string;

  // @IsString()
  // AUTH_NET_ENVIRONMENT: string;

  @IsString()
  SENTRY_DSN: string;

//   @IsString()
//   CTRL_FRONTEND_URL: string;
}

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === Environment.development;
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === Environment.production;
  }

  get(variable: keyof EnvironmentVariables) {
    return this.configService.get(variable, { infer: true });
  }
}
