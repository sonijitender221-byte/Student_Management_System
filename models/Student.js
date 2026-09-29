import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true
      // TODO: Add validation and generation rules
    },
    firstName: {
      type: String
      // TODO: Add validation constraints
    },
    lastName: {
      type: String
      // TODO: Add validation constraints
    },
    email: {
      type: String
      // TODO: Add validation constraints
    },
    phone: {
      type: String
      // TODO: Add validation constraints
    },
    course: {
      type: String
      // TODO: Add course validation rules
    },
    year: {
      type: Number
      // TODO: Add acceptable range
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'graduated'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// TODO: Add schema methods/statics as needed
const Student = mongoose.model('Student', studentSchema);
export default Student;
