import { config } from 'dotenv';
import mongoose from 'mongoose';
import * as seedPermission from './seedPermission';
import * as seedRoles from './seedRoles';
import * as seedUsers from './seedUsers';

// Load environment variables from .env file
config();

async function runSeeds() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    const mongoUri = process.env.MONGO_CONNECTION_STRING;
    if (!mongoUri) {
      throw new Error('MONGO_CONNECTION_STRING is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB\n');

    // Run permission seeding first
    console.log('═══════════════════════════════════════');
    console.log('📋 Seeding Permissions...');
    console.log('═══════════════════════════════════════');
    await seedPermission.up(mongoose.connection);
    console.log('');

    // Run role seeding
    console.log('═══════════════════════════════════════');
    console.log('👥 Seeding Roles...');
    console.log('═══════════════════════════════════════');
    await seedRoles.up();
    console.log('');

    // Run user seeding
    console.log('═══════════════════════════════════════');
    console.log('👤 Seeding Users...');
    console.log('═══════════════════════════════════════');
    await seedUsers.up();
    console.log('');

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n✓ MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seeds
runSeeds();
