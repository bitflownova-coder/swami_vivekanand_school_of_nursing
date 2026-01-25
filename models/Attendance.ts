import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAttendance extends Document {
  workshopId: mongoose.Types.ObjectId;
  registrationId: mongoose.Types.ObjectId;
  mncUID: string;
  mncRegistrationNumber: string;
  studentName: string;
  qrToken: string;
  markedAt: Date;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema({
  workshopId: {
    type: Schema.Types.ObjectId,
    ref: 'Workshop',
    required: [true, 'Workshop ID is required']
  },
  registrationId: {
    type: Schema.Types.ObjectId,
    ref: 'Registration',
    required: [true, 'Registration ID is required']
  },
  mncUID: {
    type: String,
    required: [true, 'MNC UID is required'],
    trim: true,
    uppercase: true
  },
  mncRegistrationNumber: {
    type: String,
    trim: true,
    uppercase: true,
    default: ''
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  qrToken: {
    type: String,
    required: [true, 'QR Token is required']
  },
  markedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate attendance
AttendanceSchema.index({ workshopId: 1, registrationId: 1 }, { unique: true });
AttendanceSchema.index({ workshopId: 1 });
AttendanceSchema.index({ qrToken: 1 });

const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;
