const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  chats: [
    {
      messagesWith: {
        type: Schema.Types.ObjectID,
        ref: "User",
      },
      messages: [
        {
          msg: {
            type: String,
            required: true,
          },
          sender: {
            type: Schema.Types.ObjectID,
            ref: "User",
          },
          receiver: {
            type: Schema.Types.ObjectID,
            ref: "User",
          },
          date: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Chat", ChatSchema);
