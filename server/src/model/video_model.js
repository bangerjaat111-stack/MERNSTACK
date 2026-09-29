import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    embedId: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    channel: { type: String, default: 'AutoCar' },
    brand: { type: String, required: true, trim: true },
    model: { type: String, default: '' },

    // ✅ used by frontend filter
    bodyType: { type: String, default: 'SUV' },

    category: {
      type: String,
      default: 'Reviews',
      enum: [
        'Reviews',
        'Offroad & Drag',
        'Electric & Hybrid',
        'Supercars & Luxury',
        'Deliveries & Ownership',
        'Modifications & Tuning',
      ],
    },
    duration: { type: String, default: '15:00' },
    views: { type: String, default: '100K' },
    rating: { type: Number, default: 4.8 },

    description: { type: String, default: '' },
    blurb: { type: String, default: '' },

    // ✅ flat engine object used by frontend (video.engine?.type, .maxPower, etc.)
    engine: {
      type: { type: String, default: '' },
      fuelType: { type: String, default: '' },
      displacement: { type: String, default: '' },
      maxPower: { type: String, default: '' },
      maxTorque: { type: String, default: '' },
      transmission: { type: String, default: '' },
      drivetrain: { type: String, default: 'FWD' },
    },

    // ✅ variants used by frontend (video.variants[0].price)
    variants: [
      {
        name: { type: String, default: 'Base' },
        price: { type: String, default: '' },
      },
    ],

    // ✅ flat price/topSpeed used by frontend too
    price: { type: String, default: '' },
    topSpeed: { type: String, default: '' },

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

    highlights: [{ type: String }],
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;