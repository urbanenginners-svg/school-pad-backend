import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from 'src/services/mongoose/schemas/institution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
