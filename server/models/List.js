const { model, Schema } = require('mongoose');

const listSchema = new Schema({
  name: String,
  type: String,
  username: String,
  createdAt: String,
  items: [
    {
      id: String,
      addedAt: String
    }
  ],
  comments: [
    {
      id: String,
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      id: String,
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
