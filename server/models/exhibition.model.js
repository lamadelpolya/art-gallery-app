const { Schema, model } = require("mongoose");

const exhibitionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Exhibition = model("Exhibition", exhibitionSchema);

module.exports = Exhibition;

