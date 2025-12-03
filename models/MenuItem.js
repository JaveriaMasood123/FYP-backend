import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  catererId: { type: mongoose.Schema.Types.ObjectId, ref: 'Caterer', required: true },
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
