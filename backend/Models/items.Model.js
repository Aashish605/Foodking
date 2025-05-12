import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const Item = mongoose.model("Item", ItemSchema);
export default Item;
