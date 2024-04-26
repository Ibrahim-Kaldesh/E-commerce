import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: [true, "A rating must have a value"],
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ratingSchema.pre(/^find/, function (next) {
//   this.populate({ path: "user" }).populate({ path: "book" });
//   next();
// });

const ratingModel = mongoose.model("Rating", ratingSchema);

export default ratingModel;
