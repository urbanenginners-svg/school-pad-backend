import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { users } from './users';
import { User, UserSchema } from '../schemas/user.schema';
import { Role, RoleSchema } from '../schemas/role.schema';

const UserModel = mongoose.model(User.name, UserSchema);
const RoleModel = mongoose.model(Role.name, RoleSchema);

export async function up(): Promise<void> {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

  // Process all users in parallel
  const userPromises = users.map(async (user) => {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Get role IDs from role names in parallel
    const rolePromises = user.roles.map(async (roleName) => {
      const role = await RoleModel.findOne({ name: roleName });
      if (role) {
        return role._id;
      } else {
        console.warn(
          `Role with name '${roleName}' not found for user '${user.email}'`,
        );
        return null;
      }
    });

    const roleResults = await Promise.all(rolePromises);
    const roleIds = roleResults.filter((id) => id !== null);

    // Prepare user data with role IDs instead of role names
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: hashedPassword,
      role: roleIds,
    };

    const existingUser = await UserModel.findOne({ email: user.email });
    if (!existingUser) {
      await UserModel.create(userData);
      console.log(
        `Created user: ${user.email} with ${roleIds.length} role(s)`,
      );
    } else {
      await UserModel.updateOne({ email: user.email }, userData);
      console.log(
        `Updated user: ${user.email} with ${roleIds.length} role(s)`,
      );
    }
  });

  await Promise.all(userPromises);
}

export async function down(): Promise<void> {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  await UserModel.deleteMany({});
}
