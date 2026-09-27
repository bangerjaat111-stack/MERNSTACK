import mongoose from "mongoose";

const UsedCarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    variant: { type: String, trim: true, default: '' },
    year: { type: Number, required: true },
    price: { type: String, required: true },
    priceNum: { type: Number, required: true },
    km: { type: String, required: true },
    fuel: { type: String, required: true },
    trans: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    img: { type: String },
    contact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    sellerId: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Sold", "Rejected"],
      default: "Approved",
    },
    inspectionScore: { type: String, default: "9.2 / 10" },
    tag: { type: String, default: "Verified" },
  },
  { timestamps: true }
);

export default mongoose.model("UsedCar", UsedCarSchema);
