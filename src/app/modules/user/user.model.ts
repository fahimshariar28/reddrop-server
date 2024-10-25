import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.interface";
import { ROLE, BloodGroup } from "../../enums/userEnum";
import { hashPasswordHelper } from "../../helpers/hashPasswordHelper";

// Mongoose Schema for Address
const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  homeAddress: { type: String, required: false }, // Optional home address
});

const socialLinkSchema = new Schema({
  provider: { type: String, required: true },
  id: { type: String, required: false },
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
    password: { type: String, required: true }, // Assuming hashed password
    needPasswordReset: { type: Boolean, default: false },
    oldPasswords: { type: [String], required: false }, // Array of hashed passwords
    socialLogin: { type: Boolean, default: false },
    socialLink: { type: [socialLinkSchema], required: false }, // Array of Social login links
    number: { type: String, required: true, minlength: 10, maxlength: 15 },
    bloodGroup: {
      type: String,
      enum: [...Object.values(BloodGroup)],
      required: true,
    },
    plasma: { type: Boolean, required: true },
    permanentAddress: { type: addressSchema, required: true },
    presentAddress: { type: addressSchema, required: true },
    isActivate: { type: Boolean, default: true },
    userBadges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
    requestRequested: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    requestReceived: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    donated: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
    donationReceived: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
    outsideDonation: [{ type: outsideDonationSchema, required: true }], // Date of last donation only for new users to track the last donation date
    reference: { type: String, required: false }, // Optional referrer (username)
    refereed: [{ type: Schema.Types.ObjectId, ref: "User" }], // Referrer User
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
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
