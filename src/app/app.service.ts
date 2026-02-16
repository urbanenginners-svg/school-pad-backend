import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  private readonly encryptionKey: string;
    constructor(private readonly configService: ConfigService) {
        this.encryptionKey = this.configService.get<string>('CTRL_REST_BUILD');
    }
    
    getHello(): string {
        return `Hello World!  Deployment check 4200${this.encryptionKey}`;
    }
}