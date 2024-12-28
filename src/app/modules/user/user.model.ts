import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.interface";
import { ROLE, BloodGroup } from "../../enums/userEnum";
import { hashPasswordHelper } from "../../helpers/hashPasswordHelper";

// Mongoose Schema for Address
const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  address: { type: String, required: false }, // Optional home address
});

const outsideDonationSchema = new Schema({
  address: { type: String, required: true },
  date: { type: Date, required: true },
});

// Mongoose Schema for User
const userSchema = new Schema<IUser & Document>(
  {
    username: { type: String, required: true, unique: true, maxlength: 50 },
    role: {
      type: String,
      enum: [...Object.values(ROLE)],
      required: true,
      default: ROLE.USER,
    },
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    dob: { type: Date, required: true },
    profilePicture: { type: String, required: false },
    password: { type: String, required: true }, // Assuming hashed password
    needPasswordReset: { type: Boolean, default: false },
    oldPasswords: { type: [String], required: false }, // Array of hashed passwords
    number: { type: String, required: true, minlength: 10, maxlength: 15 },
    bloodGroup: {
      type: String,
      enum: [...Object.values(BloodGroup)],
      required: true,
    },
    plasma: { type: Boolean, required: true },
    address: { type: addressSchema, required: true },
    isActive: { type: Boolean, default: false },
    userBadges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
    requestRequested: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    requestReceived: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    donated: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
    donationReceived: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
    outsideDonation: [{ type: outsideDonationSchema, required: true }], // Date of last donation only for new users to track the last donation date
    reference: { type: Schema.Types.ObjectId, ref: "User" }, // Referrer User
    refereed: [{ type: Schema.Types.ObjectId, ref: "User" }], // Referrer User
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPasswordHelper(this.password);
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
