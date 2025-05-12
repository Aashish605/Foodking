import mongoose from "mongoose";

const orderitemSchema = new mongoose.Schema(
  {
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    OrderDate: { type: Date, default: Date.now(), required: true },
    tableId: { type: String, required: true }, // Added tableId field
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Orderitem = mongoose.model("Orderitem", orderitemSchema);

export default Orderitem;
