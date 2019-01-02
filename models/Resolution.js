const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const resolutionSchema = new Schema({
  day: { type: Date, set: dateFormat },
  food: { type: Boolean, default: false },
  heart: { type: Boolean, default: false },
  weight: { type: Boolean, default: false },
  book: { type: Boolean, default: false },
  startDate: { type: Date },
  thisMonth: { type: Date }
});

function dateFormat(d) {
  return moment(d).format('YYYY-MM-DD');
}

mongoose.model('resolutions', resolutionSchema);
