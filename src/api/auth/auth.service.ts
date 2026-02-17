import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/services/mongoose/schemas/user.schema';
import { Role } from 'src/services/mongoose/schemas/role.schema';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwtService: JwtService,
  ) {}

  async superAdminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email and populate roles
    const user = await this.userModel
      .findOne({ email })
      .populate('role')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user has Super Admin role
    const roles = user.role as any[];
    const isSuperAdmin = roles.some(
      (role) => role.name === 'Super Admin'
    );

    if (!isSuperAdmin) {
      throw new UnauthorizedException('Access denied. Super Admin privileges required.');
    }

    // Generate JWT token
    const payload = {
      sub: user._id,
      email: user.email,
      roles: roles.map((role) => role.name),
    };

    const access_token = this.jwtService.sign(payload);

    // Return user info with token
    return {
      access_token,
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: roles.map((role) => role.name),
    };
  }
}
