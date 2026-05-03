import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: String,
  foundedYear: Number,
  colors: {
    primary: { type: String, default: '#0033A0' },
    secondary: { type: String, default: '#FFFFFF' }
  },
  location: {
    city: String,
    province: String,
    stadium: String,
    stadiumCapacity: Number
  },
  description: String,
  logo: String,
  social: {
    website: String,
    instagram: String,
    twitter: String,
    facebook: String
  },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Club', clubSchema);
