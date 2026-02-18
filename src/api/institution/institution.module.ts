import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from 'src/services/mongoose/schemas/institution.schema';
import { User, UserSchema } from 'src/services/mongoose/schemas/user.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
  exports: [InstitutionService],
})
export class InstitutionModule {}
