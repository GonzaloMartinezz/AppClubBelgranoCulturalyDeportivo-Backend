import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  shortName: { type: String, required: true, maxlength: 20 },
  logo: { type: String },
  primaryColor: { type: String, default: '#0033A0' },
  secondaryColor: { type: String, default: '#FFFFFF' },
  foundedYear: { type: Number, min: 1800, max: 2030 },
  description: { type: String, maxlength: 1000 },
  location: {
    city: { type: String, required: true },
    province: { type: String, required: true },
    address: { type: String },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String
  },
  contact: {
    email: String,
    phone: String,
    whatsapp: String
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Club', clubSchema);