import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Institution, InstitutionDocument } from 'src/services/mongoose/schemas/institution.schema';
import { CreateInstitutionDto, UpdateInstitutionDto } from './dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name) private institutionModel: Model<InstitutionDocument>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto, userId?: string): Promise<Institution> {
    const institutionData = {
      ...createInstitutionDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    const institution = new this.institutionModel(institutionData);
    return institution.save();
  }

  async findAll(): Promise<Institution[]> {
    return this.institutionModel
      .find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<InstitutionDocument> {
    const institution = await this.institutionModel
      .findOne({ _id: id, deletedAt: null })
      .exec();

    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }

    return institution;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
    userId?: string,
  ): Promise<Institution> {
    const institution = await this.findOne(id);

    const updateData = {
      ...updateInstitutionDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    Object.assign(institution, updateData);
    return institution.save();
  }

  async remove(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    institution.deletedAt = new Date();
    if (userId) {
      institution.deletedBy = userId;
    }

    return institution.save();
  }

  async activate(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    if (institution.isActive) {
      throw new BadRequestException(`Institution with ID ${id} is already active`);
    }

    institution.isActive = true;
    if (userId) {
      institution.lastUpdatedBy = userId;
    }

    return institution.save();
  }

  async deactivate(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    if (!institution.isActive) {
      throw new BadRequestException(`Institution with ID ${id} is already inactive`);
    }

    institution.isActive = false;
    if (userId) {
      institution.lastUpdatedBy = userId;
    }

    return institution.save();
  }
}
