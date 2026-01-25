import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkshop extends Document {
  title: string;
  description: string;
  date: Date;
  dayOfWeek: string;
  venue: string;
  venueLink: string;
  fee: number;
  credits: number;
  maxSeats: number;
  currentRegistrations: number;
  status: 'draft' | 'upcoming' | 'active' | 'full' | 'completed' | 'cancelled' | 'spot';
  spotRegistrationEnabled: boolean;
  spotRegistrationLimit: number;
  currentSpotRegistrations: number;
  spotRegistrationQRToken: string;
  paymentQRCode: string;
  upiId: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Workshop title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Workshop description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Workshop date is required']
  },
  dayOfWeek: {
    type: String,
    enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    required: [true, 'Day of week is required']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true
  },
  venueLink: {
    type: String,
    trim: true,
    default: ''
  },
  fee: {
    type: Number,
    required: [true, 'Fee is required'],
    min: [0, 'Fee cannot be negative']
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [0, 'Credits cannot be negative']
  },
  maxSeats: {
    type: Number,
    default: 500,
    min: [1, 'Maximum seats must be at least 1']
  },
  currentRegistrations: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'upcoming', 'active', 'full', 'completed', 'cancelled', 'spot'],
    default: 'draft'
  },
  spotRegistrationEnabled: {
    type: Boolean,
    default: false
  },
  spotRegistrationLimit: {
    type: Number,
    default: 50
  },
  currentSpotRegistrations: {
    type: Number,
    default: 0
  },
  spotRegistrationQRToken: {
    type: String,
    default: ''
  },
  paymentQRCode: {
    type: String,
    default: ''
  },
  upiId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Virtual for remaining seats
WorkshopSchema.virtual('remainingSeats').get(function(this: IWorkshop) {
  return this.maxSeats - this.currentRegistrations;
});

// Virtual for remaining spot seats
WorkshopSchema.virtual('remainingSpotSeats').get(function(this: IWorkshop) {
  return this.spotRegistrationLimit - this.currentSpotRegistrations;
});

// Ensure virtuals are included in JSON
WorkshopSchema.set('toJSON', { virtuals: true });
WorkshopSchema.set('toObject', { virtuals: true });

const Workshop: Model<IWorkshop> = mongoose.models.Workshop || mongoose.model<IWorkshop>('Workshop', WorkshopSchema);

export default Workshop;
