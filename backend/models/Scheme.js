const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  benefits:  { type: String, required: true },
  application_process: { type: String, required: true },
});

const Scheme = mongoose.model('Scheme', schemeSchema);
module.exports = Scheme;