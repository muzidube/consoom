const { model, Schema } = require('mongoose');

const listSchema = new Schema({
  name: String,
  type: String,
  username: String,
  createdAt: String,
  items: [
    {
      id: Number,
      addedAt: String
    }
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('List', listSchema);
