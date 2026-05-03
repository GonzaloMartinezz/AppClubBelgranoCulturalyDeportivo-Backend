import mongoose from 'mongoose';
import crypto from 'crypto';

const membershipSchema = new mongoose.Schema({
  member: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  type: {
    type: String,
    enum: ['SOCIO_ACTIVO', 'SOCIO_ADHERENTE', 'ABONADO', 'VIP'],
    required: true
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  qrToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  accessHistory: [{
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    entryTime: { type: Date },
    validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  status: {
    type: String,
    enum: ['ACTIVE', 'SUSPENDED', 'EXPIRED', 'CANCELLED'],
    default: 'ACTIVE'
  },
  maxEntriesPerMatch: { type: Number, default: 1 }
}, { timestamps: true });

membershipSchema.index({ 'member.dni': 1 });
membershipSchema.index({ qrToken: 1 });
membershipSchema.index({ endDate: 1 });

export default mongoose.model('Membership', membershipSchema);