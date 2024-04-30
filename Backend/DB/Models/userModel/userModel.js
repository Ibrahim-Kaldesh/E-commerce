import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, "A user must have a user_name"],
      unique: true,
      validate: {
        validator(val) {
          /*
          [a-zA-Z0-9]{2,49}: This part defines the allowed characters and their repetition.
          [a-zA-Z0-9]: Matches a single character that's either a letter 
          (a-z or A-Z) or a digit (0-9).
          {3,50}: This quantifier specifies the number of repetitions for 
          the preceding character class.
          3: Minimum number of repetitions (ensures at least 3 characters).
          50: Maximum number of repetitions (ensures no more than 50 characters).
          */
          const regex = /^[a-zA-Z][a-zA-Z0-9]{3,50}$/;
          return regex.test(val);
        },
        message: "Invalid user_name",
      },
    },
    email: {
      type: String,
      trim: true,
      required: [true, "A user must have an email"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "A user must have a password"],
      validate: {
        validator(val) {
          /*
          ^: Matches the beginning of the string.
            (?=.*[a-z]): Positive lookahead assertion that ensures at 
            least one lowercase letter (a-z) exists anywhere in the string.
            (?=.*[A-Z]): Positive lookahead assertion that ensures 
            at least one uppercase letter (A-Z) exists anywhere in the string.
            (?=.*[0-9]): Positive lookahead assertion that ensures 
            at least one digit (0-9) exists anywhere in the string.
            (?=.*[!@#$%^&*-]): Positive lookahead assertion that ensures 
            at least one special character from the defined set (!@#$%^&*-) exists anywhere in the string.
            [a-zA-Z0-9!@#$%^&*-]: Character class that allows letters (a-z or A-Z), digits (0-9), 
            and the defined special characters.
            {8,}: Quantifier that specifies the minimum length of the password. 
            Here, it requires at least 8 characters.
          */
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])[a-zA-Z0-9!@#$%^&*-]{8,}$/;
          return regex.test(val);
        },
        message: "Invalid password !!",
      },
    },
    passwordConfirm: {
      type: String,
      trim: true,
      required: [true, "A user must have a password_confirm"],
      validate: {
        validator(val) {
          return this.password === val;
        },
        message: "Two Passwords don't match",
      },
    },
    profilePhoto: {
      type: String,
      trim: true,
      unique: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    role: {
      type: String,
      trim: true,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "Invalid role !!",
      },
    },
    tokens: [String],
    changedPasswordAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.passwordChangedAfter = function (jwtTimeStamp) {
  if (this.changedPasswordAt) {
    const changedPasswordTime = Math.floor(
      this.changedPasswordAt.getTime() / 1000
    );
    return jwtTimeStamp < changedPasswordTime;
  }
  return false;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = this.password;

    // change the last time the user has changed his password if it's old DOC
    if (!this.isNew) {
      this.tokens = [];
      this.changedPasswordAt = new Date();
    }
  }
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "books",
//     select: "-users",
//   });

//   next();
// });

userSchema.virtual("ratings", {
  ref: "Rating",
  localField: "_id",
  foreignField: "user",
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
