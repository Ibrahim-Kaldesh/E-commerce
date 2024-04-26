import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "A book must have a title"],
    },
    description: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
      enum: {
        values: [true, false],
        message: "Invalid type must be boolean",
      },
    },
    author: {
      type: String,
      trim: true,
      required: [true, "A book must have an author"],
    },
    category: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, "A book must have a published date"],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual("ratings", {
  ref: "Rating",
  localField: "_id",
  foreignField: "book",
});

// bookSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "users",
//     select: "userName books",
//   });

//   next();
// });

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;
