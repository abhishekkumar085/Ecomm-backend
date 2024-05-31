import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default:0
    },
    quantity_on_stock: {
      type: Number,
      required: true,
      default:0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    attributes: {
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      brand: {
        type: String,
      },
      model: {
        type: String,
      },
    },
    images: [
      {
        image_url: {
          type: String,
        },
        alt_text: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        user_id: {
          type: String,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
