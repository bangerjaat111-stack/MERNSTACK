import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    embedId: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeUrl: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    channel: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Reviews',
        'Offroad & Drag',
        'Electric & Hybrid',
        'Supercars & Luxury',
        'Deliveries & Ownership',
        'Modifications & Tuning',
      ],
      default: 'Reviews',
    },
    duration: {
      type: String,
      default: '15:00',
    },
    views: {
      type: String,
      default: '100K',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    blurb: {
      type: String,
      default: '',
    },
    specs: {
      engine: { type: String, default: 'N/A' },
      power: { type: String, default: 'N/A' },
      torque: { type: String, default: 'N/A' },
      price: { type: String, default: 'N/A' },
      transmission: { type: String, default: 'N/A' },
      fuelType: { type: String, default: 'N/A' },
      topSpeed: { type: String, default: 'N/A' },
      zeroToHundred: { type: String, default: 'N/A' },
    },
    highlights: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
