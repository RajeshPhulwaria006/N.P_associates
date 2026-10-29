import bcrypt from 'bcryptjs';
import { AdminUser } from './models/AdminUser.js';
import { connectDB, disconnectDB } from './config/database.js';

async function bootstrapAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    console.error('Usage: ADMIN_BOOTSTRAP_EMAIL=... ADMIN_BOOTSTRAP_PASSWORD=... node src/bootstrapAdmin.js');
    console.error('Both ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD are required environment variables.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password must be at least 8 characters long for administrative security.');
    process.exit(1);
  }

  console.log('[Bootstrap] Connecting to database...');
  await connectDB();

  try {
    const existing = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (existing) {
      existing.passwordHash = passwordHash;
      existing.active = true;
      await existing.save();
      console.log(`[Bootstrap] Successfully updated password for existing admin: ${email}`);
    } else {
      await AdminUser.create({
        email: email.toLowerCase().trim(),
        passwordHash,
        role: 'admin',
        active: true,
      });
      console.log(`[Bootstrap] Successfully created initial admin account: ${email}`);
    }
  } catch (err) {
    console.error('[Bootstrap] Failed to bootstrap admin user:', err.message);
    process.exit(1);
  } finally {
    await disconnectDB();
    console.log('[Bootstrap] Finished and disconnected.');
  }
}

bootstrapAdmin();
