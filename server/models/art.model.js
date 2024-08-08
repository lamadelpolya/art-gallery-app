const { Schema, model } = require("mongoose");

const artSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    imageUrl: String, 
    uploadImage: String, 
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tags: [String],
    collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    },
    exhibition: {
        type: Schema.Types.ObjectId,
        ref: 'Exhibition'
      }
    },
    {
      timestamps: true
    }
  );
  
  const Art = model("Art", artSchema);
  
  module.exports = Art;
     
