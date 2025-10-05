const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: { type: String, required: [true, 'Please add a password'] },
    role: {
      type: String,
      required: true,
      enum: ['user', 'agent', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);