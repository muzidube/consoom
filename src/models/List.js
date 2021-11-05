const { model, Schema } = require('mongoose');

const listSchema = new Schema({
  name: String,
  type: String,
  items: [
    {
      id: Number,
      addedAt: String
    }
  ]
});

module.exports = model('List', listSchema);
