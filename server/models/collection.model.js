const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    artworks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Art'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
