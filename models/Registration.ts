import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRegistration extends Document {
  workshopId: mongoose.Types.ObjectId;
  formNumber: number;
  fullName: string;
  mncUID: string;
  mncRegistrationNumber: string;
  mobileNumber: string;
  paymentUTR: string;
  paymentScreenshot: string;
  registrationType: 'online' | 'spot';
  attendanceStatus: 'applied' | 'present';
  downloadCount: number;
  submittedAt: Date;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema: Schema = new Schema({
  workshopId: {
    type: Schema.Types.ObjectId,
    ref: 'Workshop',
    required: [true, 'Workshop ID is required']
  },
  formNumber: {
    type: Number,
    required: [true, 'Form number is required']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  mncUID: {
    type: String,
    required: [true, 'MNC UID is required'],
    trim: true,
    uppercase: true
  },
  mncRegistrationNumber: {
    type: String,
    required: [true, 'MNC Registration Number is required'],
    trim: true,
    uppercase: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Mobile number must be 10 digits']
  },
  paymentUTR: {
    type: String,
    required: [true, 'Payment UTR is required'],
    trim: true
  },
  paymentScreenshot: {
    type: String,
    required: [true, 'Payment screenshot is required']
  },
  registrationType: {
    type: String,
    enum: ['online', 'spot'],
    default: 'online'
  },
  attendanceStatus: {
    type: String,
    enum: ['applied', 'present'],
    default: 'applied'
  },
  downloadCount: {
    type: Number,
    default: 0,
    max: [2, 'Maximum downloads reached']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Compound index for unique registration per workshop
RegistrationSchema.index({ workshopId: 1, mncUID: 1 }, { unique: true });
RegistrationSchema.index({ workshopId: 1, formNumber: 1 }, { unique: true });
RegistrationSchema.index({ mncUID: 1 });
RegistrationSchema.index({ mobileNumber: 1 });

const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
