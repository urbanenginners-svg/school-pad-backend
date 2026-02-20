import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AcademicProgram,
  AcademicProgramDocument,
} from 'src/services/mongoose/schemas/academic-program.schema';
import {
  AcademicClass,
  AcademicClassDocument,
} from 'src/services/mongoose/schemas/academic-class.schema';
import {
  Section,
  SectionDocument,
} from 'src/services/mongoose/schemas/section.schema';
import {
  StudentEnrollment,
  StudentEnrollmentDocument,
} from 'src/services/mongoose/schemas/student-enrollment.schema';
import {
  Institution,
  InstitutionDocument,
} from 'src/services/mongoose/schemas/institution.schema';
import {
  InstitutionUser,
  InstitutionUserDocument,
} from 'src/services/mongoose/schemas/institution-user.schema';
import {
  CreateAcademicProgramDto,
  UpdateAcademicProgramDto,
  CreateAcademicClassDto,
  UpdateAcademicClassDto,
  CreateSectionDto,
  UpdateSectionDto,
  EnrollStudentDto,
  UpdateStudentEnrollmentDto,
} from './dto';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { getPaginatedDataWithAggregation } from 'src/utils/services/get-paginated-data-aggregation.service';

@Injectable()
export class AcademicService {
  constructor(
    @InjectModel(AcademicProgram.name)
    private academicProgramModel: Model<AcademicProgramDocument>,
    @InjectModel(AcademicClass.name)
    private academicClassModel: Model<AcademicClassDocument>,
    @InjectModel(Section.name)
    private sectionModel: Model<SectionDocument>,
    @InjectModel(StudentEnrollment.name)
    private studentEnrollmentModel: Model<StudentEnrollmentDocument>,
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
    @InjectModel(InstitutionUser.name)
    private institutionUserModel: Model<InstitutionUserDocument>,
  ) {}

  // ============================================
  // ACADEMIC PROGRAM METHODS
  // ============================================

  async createProgram(
    createProgramDto: CreateAcademicProgramDto,
    userId?: string,
  ): Promise<AcademicProgram> {
    // Validate institution exists
    await this.validateInstitution(createProgramDto.institutionId);

    const programData = {
      ...createProgramDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    try {
      const program = new this.academicProgramModel(programData);
      return await program.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Program with name "${createProgramDto.name}" already exists for this institution`,
        );
      }
      throw error;
    }
  }

  async findAllPrograms(
    institutionId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: AcademicProgramDocument[]; meta: any }> {
    const matchStage = {
      $match: {
        institutionId,
        deletedAt: null,
      },
    };

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.academicProgramModel,
      query,
      [matchStage],
    );

    return { data, meta };
  }

  async findOneProgram(
    id: string,
    institutionId: string,
  ): Promise<AcademicProgramDocument> {
    const program = await this.academicProgramModel
      .findOne({ _id: id, institutionId, deletedAt: null })
      .exec();

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${id} not found for this institution`,
      );
    }

    return program;
  }

  async updateProgram(
    id: string,
    institutionId: string,
    updateProgramDto: UpdateAcademicProgramDto,
    userId?: string,
  ): Promise<AcademicProgram> {
    const program = await this.academicProgramModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${id} not found for this institution`,
      );
    }

    const updateData = {
      ...updateProgramDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    try {
      Object.assign(program, updateData);
      return await program.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Program with name "${updateProgramDto.name}" already exists for this institution`,
        );
      }
      throw error;
    }
  }

  async removeProgram(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicProgram> {
    const program = await this.academicProgramModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${id} not found for this institution`,
      );
    }

    program.deletedAt = new Date();
    if (userId) {
      program.deletedBy = userId;
    }

    return await program.save();
  }

  async activateProgram(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicProgram> {
    const program = await this.academicProgramModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${id} not found for this institution`,
      );
    }

    if (program.isActive) {
      throw new BadRequestException(
        `Academic Program with ID ${id} is already active`,
      );
    }

    program.isActive = true;
    if (userId) {
      program.lastUpdatedBy = userId;
    }

    return await program.save();
  }

  async deactivateProgram(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicProgram> {
    const program = await this.academicProgramModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${id} not found for this institution`,
      );
    }

    if (!program.isActive) {
      throw new BadRequestException(
        `Academic Program with ID ${id} is already inactive`,
      );
    }

    program.isActive = false;
    if (userId) {
      program.lastUpdatedBy = userId;
    }

    return await program.save();
  }

  // ============================================
  // ACADEMIC CLASS METHODS
  // ============================================

  async createClass(
    createClassDto: CreateAcademicClassDto,
    userId?: string,
  ): Promise<AcademicClass> {
    // Validate institution exists
    await this.validateInstitution(createClassDto.institutionId);

    // Validate program belongs to same institution if programId provided
    if (createClassDto.programId) {
      await this.validateProgramBelongsToInstitution(
        createClassDto.programId,
        createClassDto.institutionId,
      );
    }

    const classData = {
      ...createClassDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    try {
      const academicClass = new this.academicClassModel(classData);
      return await academicClass.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Class with name "${createClassDto.name}" already exists for academic year "${createClassDto.academicYear}" in this institution`,
        );
      }
      throw error;
    }
  }

  async findAllClasses(
    institutionId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: AcademicClassDocument[]; meta: any }> {
    const matchStage = {
      $match: {
        institutionId,
        deletedAt: null,
      },
    };

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.academicClassModel,
      query,
      [matchStage],
    );

    return { data, meta };
  }

  async findOneClass(
    id: string,
    institutionId: string,
  ): Promise<AcademicClassDocument> {
    const academicClass = await this.academicClassModel
      .findOne({ _id: id, institutionId, deletedAt: null })
      .exec();

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${id} not found for this institution`,
      );
    }

    return academicClass;
  }

  async updateClass(
    id: string,
    institutionId: string,
    updateClassDto: UpdateAcademicClassDto,
    userId?: string,
  ): Promise<AcademicClass> {
    const academicClass = await this.academicClassModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${id} not found for this institution`,
      );
    }

    // Validate program belongs to same institution if programId provided
    if (updateClassDto.programId) {
      await this.validateProgramBelongsToInstitution(
        updateClassDto.programId,
        institutionId,
      );
    }

    const updateData = {
      ...updateClassDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    try {
      Object.assign(academicClass, updateData);
      return await academicClass.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Class with name "${updateClassDto.name}" already exists for academic year "${updateClassDto.academicYear}" in this institution`,
        );
      }
      throw error;
    }
  }

  async removeClass(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicClass> {
    const academicClass = await this.academicClassModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${id} not found for this institution`,
      );
    }

    academicClass.deletedAt = new Date();
    if (userId) {
      academicClass.deletedBy = userId;
    }

    return await academicClass.save();
  }

  async activateClass(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicClass> {
    const academicClass = await this.academicClassModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${id} not found for this institution`,
      );
    }

    if (academicClass.isActive) {
      throw new BadRequestException(
        `Academic Class with ID ${id} is already active`,
      );
    }

    academicClass.isActive = true;
    if (userId) {
      academicClass.lastUpdatedBy = userId;
    }

    return await academicClass.save();
  }

  async deactivateClass(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<AcademicClass> {
    const academicClass = await this.academicClassModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${id} not found for this institution`,
      );
    }

    if (!academicClass.isActive) {
      throw new BadRequestException(
        `Academic Class with ID ${id} is already inactive`,
      );
    }

    academicClass.isActive = false;
    if (userId) {
      academicClass.lastUpdatedBy = userId;
    }

    return await academicClass.save();
  }

  // ============================================
  // SECTION METHODS
  // ============================================

  async createSection(
    createSectionDto: CreateSectionDto,
    userId?: string,
  ): Promise<Section> {
    // Validate institution exists
    await this.validateInstitution(createSectionDto.institutionId);

    // Validate class belongs to same institution
    await this.validateClassBelongsToInstitution(
      createSectionDto.classId,
      createSectionDto.institutionId,
    );

    // Validate class teacher if provided
    if (createSectionDto.classTeacherId) {
      await this.validateInstitutionUser(
        createSectionDto.classTeacherId,
        createSectionDto.institutionId,
      );
    }

    const sectionData = {
      ...createSectionDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    try {
      const section = new this.sectionModel(sectionData);
      return await section.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Section with name "${createSectionDto.name}" already exists for this class`,
        );
      }
      throw error;
    }
  }

  async findAllSections(
    institutionId: string,
    classId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: SectionDocument[]; meta: any }> {
    const matchStage = {
      $match: {
        institutionId,
        classId,
        deletedAt: null,
      },
    };

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.sectionModel,
      query,
      [matchStage],
    );

    return { data, meta };
  }

  async findOneSection(
    id: string,
    institutionId: string,
  ): Promise<SectionDocument> {
    const section = await this.sectionModel
      .findOne({ _id: id, institutionId, deletedAt: null })
      .exec();

    if (!section) {
      throw new NotFoundException(
        `Section with ID ${id} not found for this institution`,
      );
    }

    return section;
  }

  async updateSection(
    id: string,
    institutionId: string,
    updateSectionDto: UpdateSectionDto,
    userId?: string,
  ): Promise<Section> {
    const section = await this.sectionModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!section) {
      throw new NotFoundException(
        `Section with ID ${id} not found for this institution`,
      );
    }

    // Validate class teacher if provided
    if (updateSectionDto.classTeacherId) {
      await this.validateInstitutionUser(
        updateSectionDto.classTeacherId,
        institutionId,
      );
    }

    const updateData = {
      ...updateSectionDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    try {
      Object.assign(section, updateData);
      return await section.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Section with name "${updateSectionDto.name}" already exists for this class`,
        );
      }
      throw error;
    }
  }

  async removeSection(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<Section> {
    const section = await this.sectionModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!section) {
      throw new NotFoundException(
        `Section with ID ${id} not found for this institution`,
      );
    }

    section.deletedAt = new Date();
    if (userId) {
      section.deletedBy = userId;
    }

    return await section.save();
  }

  async activateSection(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<Section> {
    const section = await this.sectionModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!section) {
      throw new NotFoundException(
        `Section with ID ${id} not found for this institution`,
      );
    }

    if (section.isActive) {
      throw new BadRequestException(
        `Section with ID ${id} is already active`,
      );
    }

    section.isActive = true;
    if (userId) {
      section.lastUpdatedBy = userId;
    }

    return await section.save();
  }

  async deactivateSection(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<Section> {
    const section = await this.sectionModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!section) {
      throw new NotFoundException(
        `Section with ID ${id} not found for this institution`,
      );
    }

    if (!section.isActive) {
      throw new BadRequestException(
        `Section with ID ${id} is already inactive`,
      );
    }

    section.isActive = false;
    if (userId) {
      section.lastUpdatedBy = userId;
    }

    return await section.save();
  }

  // ============================================
  // STUDENT ENROLLMENT METHODS
  // ============================================

  async enrollStudent(
    enrollDto: EnrollStudentDto,
    userId?: string,
  ): Promise<StudentEnrollment> {
    // Validate institution exists
    await this.validateInstitution(enrollDto.institutionId);

    // Validate student exists in institution
    await this.validateInstitutionUser(
      enrollDto.studentId,
      enrollDto.institutionId,
    );

    // Validate class belongs to same institution
    await this.validateClassBelongsToInstitution(
      enrollDto.classId,
      enrollDto.institutionId,
    );

    // Validate section belongs to same institution and class if provided
    if (enrollDto.sectionId) {
      await this.validateSectionBelongsToClass(
        enrollDto.sectionId,
        enrollDto.classId,
        enrollDto.institutionId,
      );
    }

    const enrollmentData = {
      ...enrollDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    try {
      const enrollment = new this.studentEnrollmentModel(enrollmentData);
      return await enrollment.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Student is already enrolled for academic year "${enrollDto.academicYear}" in this institution`,
        );
      }
      throw error;
    }
  }

  async findAllEnrollments(
    institutionId: string,
    classId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: StudentEnrollmentDocument[]; meta: any }> {
    const matchStage = {
      $match: {
        institutionId,
        classId,
        deletedAt: null,
      },
    };

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.studentEnrollmentModel,
      query,
      [matchStage],
    );

    return { data, meta };
  }

  async findOneEnrollment(
    id: string,
    institutionId: string,
  ): Promise<StudentEnrollmentDocument> {
    const enrollment = await this.studentEnrollmentModel
      .findOne({ _id: id, institutionId, deletedAt: null })
      .exec();

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${id} not found for this institution`,
      );
    }

    return enrollment;
  }

  async updateEnrollment(
    id: string,
    institutionId: string,
    updateEnrollmentDto: UpdateStudentEnrollmentDto,
    userId?: string,
  ): Promise<StudentEnrollment> {
    const enrollment = await this.studentEnrollmentModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${id} not found for this institution`,
      );
    }

    // Validate class belongs to same institution if classId provided
    if (updateEnrollmentDto.classId) {
      await this.validateClassBelongsToInstitution(
        updateEnrollmentDto.classId,
        institutionId,
      );
    }

    // Validate section belongs to class if provided
    if (updateEnrollmentDto.sectionId) {
      const classId = updateEnrollmentDto.classId || enrollment.classId;
      await this.validateSectionBelongsToClass(
        updateEnrollmentDto.sectionId,
        classId,
        institutionId,
      );
    }

    const updateData = {
      ...updateEnrollmentDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    try {
      Object.assign(enrollment, updateData);
      return await enrollment.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `Student is already enrolled for academic year "${updateEnrollmentDto.academicYear}" in this institution`,
        );
      }
      throw error;
    }
  }

  async removeEnrollment(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<StudentEnrollment> {
    const enrollment = await this.studentEnrollmentModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${id} not found for this institution`,
      );
    }

    enrollment.deletedAt = new Date();
    if (userId) {
      enrollment.deletedBy = userId;
    }

    return await enrollment.save();
  }

  async activateEnrollment(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<StudentEnrollment> {
    const enrollment = await this.studentEnrollmentModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${id} not found for this institution`,
      );
    }

    if (enrollment.isActive) {
      throw new BadRequestException(
        `Enrollment with ID ${id} is already active`,
      );
    }

    enrollment.isActive = true;
    if (userId) {
      enrollment.lastUpdatedBy = userId;
    }

    return await enrollment.save();
  }

  async deactivateEnrollment(
    id: string,
    institutionId: string,
    userId?: string,
  ): Promise<StudentEnrollment> {
    const enrollment = await this.studentEnrollmentModel.findOne({
      _id: id,
      institutionId,
      deletedAt: null,
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${id} not found for this institution`,
      );
    }

    if (!enrollment.isActive) {
      throw new BadRequestException(
        `Enrollment with ID ${id} is already inactive`,
      );
    }

    enrollment.isActive = false;
    if (userId) {
      enrollment.lastUpdatedBy = userId;
    }

    return await enrollment.save();
  }

  // ============================================
  // VALIDATION HELPER METHODS
  // ============================================

  private async validateInstitution(institutionId: string): Promise<void> {
    const institution = await this.institutionModel
      .findOne({ _id: institutionId, deletedAt: null })
      .lean()
      .exec();

    if (!institution) {
      throw new NotFoundException(
        `Institution with ID ${institutionId} not found`,
      );
    }

    if (!institution.isActive) {
      throw new BadRequestException(
        `Institution with ID ${institutionId} is not active`,
      );
    }
  }

  private async validateInstitutionUser(
    userId: string,
    institutionId: string,
  ): Promise<void> {
    const institutionUser = await this.institutionUserModel
      .findOne({ userId, institutionId, deletedAt: null })
      .lean()
      .exec();

    if (!institutionUser) {
      throw new NotFoundException(
        `User with ID ${userId} not found in institution ${institutionId}`,
      );
    }
  }

  private async validateProgramBelongsToInstitution(
    programId: string,
    institutionId: string,
  ): Promise<void> {
    const program = await this.academicProgramModel
      .findOne({ _id: programId, deletedAt: null })
      .lean()
      .exec();

    if (!program) {
      throw new NotFoundException(
        `Academic Program with ID ${programId} not found`,
      );
    }

    if (program.institutionId !== institutionId) {
      throw new BadRequestException(
        `Program does not belong to the specified institution`,
      );
    }
  }

  private async validateClassBelongsToInstitution(
    classId: string,
    institutionId: string,
  ): Promise<void> {
    const academicClass = await this.academicClassModel
      .findOne({ _id: classId, deletedAt: null })
      .lean()
      .exec();

    if (!academicClass) {
      throw new NotFoundException(
        `Academic Class with ID ${classId} not found`,
      );
    }

    if (academicClass.institutionId !== institutionId) {
      throw new BadRequestException(
        `Class does not belong to the specified institution`,
      );
    }
  }

  private async validateSectionBelongsToClass(
    sectionId: string,
    classId: string,
    institutionId: string,
  ): Promise<void> {
    const section = await this.sectionModel
      .findOne({ _id: sectionId, deletedAt: null })
      .lean()
      .exec();

    if (!section) {
      throw new NotFoundException(`Section with ID ${sectionId} not found`);
    }

    if (section.institutionId !== institutionId) {
      throw new BadRequestException(
        `Section does not belong to the specified institution`,
      );
    }

    if (section.classId !== classId) {
      throw new BadRequestException(
        `Section does not belong to the specified class`,
      );
    }
  }
}
