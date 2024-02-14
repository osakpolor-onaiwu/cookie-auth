const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      minlength: 8,
    },
    role: {
      type: String,
      default: "owner",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    blacklisted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Make sure you don't hash the hash
  if (!this.isModified("password")) {
    return next(null);
  }

  //NB. salt rounds (also called cost)is a number that specifies how slow the hashing should be. the slower the harder it is for hackers
  //break. bcrypt will generate a salt based on the salt round. A salt is random text added to the string to be hashed. just stick with 10 for now
  this.password = await bcrypt.hash(
    String(this.password),
    parseInt(process.env.SALT_ROUNDS)
  );
  next(null);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
