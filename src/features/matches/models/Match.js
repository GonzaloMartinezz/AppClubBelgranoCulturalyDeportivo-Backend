import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
  venue: { type: String, required: true },
  round: { type: Number },
  status: {
    type: String,
    enum: ['SCHEDULED', 'LIVE', 'FINAL', 'SUSPENDED', 'CANCELLED'],
    default: 'SCHEDULED'
  },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
    quarter: { type: Number, default: 0 },
    quarterTime: { type: String }
  },
  boxScore: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    team: { type: String, enum: ['HOME', 'AWAY'] },
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    fgMade: { type: Number, default: 0 },
    fgAttempts: { type: Number, default: 0 },
    ftMade: { type: Number, default: 0 },
    ftAttempts: { type: Number, default: 0 },
    threeMade: { type: Number, default: 0 },
    threeAttempts: { type: Number, default: 0 },
    plusMinus: { type: Number, default: 0 },
    turnovers: { type: Number, default: 0 }
  }],
  mvp: {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    reason: String
  },
  referees: [{ type: String }],
  observers: [{ type: String }]
}, { timestamps: true });

matchSchema.index({ date: 1 });
matchSchema.index({ homeTeam: 1, awayTeam: 1 });
matchSchema.index({ competition: 1, status: 1 });

export default mongoose.model('Match', matchSchema);