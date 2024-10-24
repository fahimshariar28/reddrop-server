import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import config from "../../config";
import { ROLE, STATUS, BloodGroup } from "./user.constant";

// Mongoose Schema for Address
const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  homeAddress: { type: String, required: false }, // Optional home address
});

// Mongoose Schema for User
const userSchema = new Schema<IUser & Document>(
  {
    username: { type: String, required: true, unique: true, maxlength: 50 },
    userType: {
      type: String,
      enum: [...Object.values(ROLE)],
      required: true,
      default: ROLE.USER,
    },
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Assuming hashed password
    number: { type: String, required: true, minlength: 10, maxlength: 15 },
    bloodGroup: {
      type: String,
      enum: [...Object.values(BloodGroup)],
      required: true,
    },
    plasma: { type: Boolean, required: true },
    permanentAddress: { type: addressSchema, required: true },
    presentAddress: { type: addressSchema, required: true },
    availability: {
      type: String,
      enum: [...Object.values(STATUS)],
      required: true,
      default: STATUS.ACTIVE,
    },
    userBadges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
    donationHistory: [{ type: Schema.Types.ObjectId, ref: "DonationHistory" }],
    referrer: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.password_salt)
    );
  }
  next();
});

// Middleware to modify the saved document after saving
userSchema.post("save", async function (doc, next) {
  const user = await UserModel.findById(doc._id).select("-password -__v");
  if (user) {
    Object.assign(doc, user);
  }
  next();
});

// Model definition
const UserModel = model<IUser & Document>("User", userSchema);

export default UserModel;
