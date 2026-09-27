import UsedCar from "../model/usedCar_model.js";
import User from "../model/user_model.js";

// Initial seed dataset if DB is empty
const INITIAL_USED_CARS = [
  {
    title: "2021 Maruti Suzuki Swift VXI",
    brand: "Maruti Suzuki",
    model: "Swift VXI",
    year: 2021,
    price: "₹6.12 Lakh",
    priceNum: 612000,
    km: "24,500 km",
    fuel: "Petrol",
    trans: "Manual",
    owner: "1st Owner",
    city: "Gurgaon",
    tag: "Certified",
    description: "Single owner hatchback in excellent condition. Full company service records.",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"],
    contact: { name: "AutoSyntax Verified Seller", phone: "9876543210" },
    sellerId: "seed_seller",
    status: "Approved"
  },
  {
    title: "2020 Hyundai Creta SX(O)",
    brand: "Hyundai",
    model: "Creta SX(O)",
    year: 2020,
    price: "₹13.45 Lakh",
    priceNum: 1345000,
    km: "38,200 km",
    fuel: "Diesel",
    trans: "Automatic",
    owner: "1st Owner",
    city: "Pune",
    tag: "Low KM",
    description: "Top model Creta with Panoramic Sunroof, Bose audio, and zero-dep insurance.",
    img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg",
    images: ["https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg"],
    contact: { name: "AutoSyntax Pune Hub", phone: "9812345678" },
    sellerId: "seed_seller",
    status: "Approved"
  },
  {
    title: "2022 Tata Nexon XZ+",
    brand: "Tata Motors",
    model: "Nexon XZ+",
    year: 2022,
    price: "₹8.95 Lakh",
    priceNum: 895000,
    km: "12,800 km",
    fuel: "Petrol",
    trans: "Manual",
    owner: "1st Owner",
    city: "Bengaluru",
    tag: "5-Star Safety",
    description: "5-star safety rated compact SUV in immaculate condition.",
    img: "https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp",
    images: ["https://static.caronphone.com/public/brands/32/53/3209/3209_1759154859.webp"],
    contact: { name: "AutoSyntax Direct Seller", phone: "9988776655" },
    sellerId: "seed_seller",
    status: "Approved"
  }
];

// Helper to seed initial dataset if DB is empty
const ensureSeedData = async () => {
  try {
    const count = await UsedCar.countDocuments();
    if (count === 0) {
      await UsedCar.insertMany(INITIAL_USED_CARS);
    }
  } catch (err) {
    console.error("Seed check failed:", err.message);
  }
};

// 1. Create a new Used Car Listing (POST /used-cars)
export const createUsedCar = async (req, res) => {
  try {
    const {
      title, brand, model, variant, year, price, km, fuel, trans, city,
      description, images, img, contact, sellerId, askingPrice, status
    } = req.body;

    const carTitle = title || `${year || 2023} ${brand || ''} ${model || ''} ${variant || ''}`.trim() || "Used Car";
    const rawPrice = price || (askingPrice ? `₹${askingPrice} Lakh` : "₹5.00 Lakh");
    const cleanPriceNum = parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 500000;
    const finalPriceNum = rawPrice.toLowerCase().includes("lakh") ? cleanPriceNum * 100000 : cleanPriceNum;
    const finalSellerId = sellerId || req.body.userId || "guest_seller";
    const mainImg = img || (images && images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop");

    const newCar = new UsedCar({
      title: carTitle,
      brand: brand || "Other",
      model: model || "Standard",
      variant: variant || "",
      year: Number(year) || 2023,
      price: rawPrice,
      priceNum: finalPriceNum,
      km: km ? (typeof km === 'number' ? `${km} km` : km) : "20,000 km",
      fuel: fuel || "Petrol",
      trans: trans || "Manual",
      city: city || "Gurgaon",
      description: description || "Well-maintained car for sale.",
      images: images && images.length > 0 ? images : [mainImg],
      img: mainImg,
      contact: contact || { name: req.body.name || "Seller", phone: req.body.phone || "" },
      sellerId: finalSellerId,
      status: status || "Approved", // Approved so it immediately displays on Used Cars publicly!
    });

    await newCar.save();

    // Also sync to User document if valid sellerId exists
    if (finalSellerId && finalSellerId !== "guest_seller") {
      try {
        const user = await User.findById(finalSellerId);
        if (user) {
          user.listings = [newCar.toObject(), ...(user.listings || [])];
          await user.save();
        }
      } catch (e) {
        console.error("User listing sync warning:", e.message);
      }
    }

    return res.status(201).json({
      status: true,
      msg: "Car submitted for review and published successfully!",
      data: newCar,
    });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

// 2. Get all public Approved Used Cars (GET /used-cars)
export const getPublicUsedCars = async (req, res) => {
  try {
    await ensureSeedData();

    const { brand, fuel, trans, city, search, status } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ["Approved", "Active"] };
    }

    if (brand && brand !== "All") query.brand = new RegExp(brand, "i");
    if (fuel && fuel !== "All") query.fuel = new RegExp(fuel, "i");
    if (trans && trans !== "All") query.trans = new RegExp(trans, "i");
    if (city && city !== "All") query.city = new RegExp(city, "i");

    if (search) {
      const q = new RegExp(search, "i");
      query.$or = [
        { title: q },
        { brand: q },
        { model: q },
        { city: q },
        { fuel: q },
      ];
    }

    const cars = await UsedCar.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ status: true, count: cars.length, data: cars });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

// 3. Get cars posted by logged-in user (GET /used-cars/my/:userId)
export const getUserUsedCars = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ status: false, msg: "User ID is required" });

    // Fetch from UsedCar collection first
    const dbCars = await UsedCar.find({ sellerId: userId }).sort({ createdAt: -1 });

    // Also check User.listings fallback
    let userListings = [];
    try {
      const user = await User.findById(userId);
      if (user && user.listings) {
        userListings = user.listings;
      }
    } catch (e) {}

    // Combine and deduplicate by ID/title
    const combined = [...dbCars];
    userListings.forEach((item) => {
      const exists = combined.some(
        (c) => (c._id && item._id && String(c._id) === String(item._id)) || (c.title === item.title)
      );
      if (!exists) {
        combined.push({
          ...item,
          status: item.status || "Approved",
        });
      }
    });

    return res.status(200).json({ status: true, count: combined.length, listings: combined, data: combined });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

// 4. Get Used Car by ID (GET /used-cars/:id)
export const getUsedCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await UsedCar.findById(id);
    if (!car) {
      return res.status(404).json({ status: false, msg: "Used car not found" });
    }
    return res.status(200).json({ status: true, data: car });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

// 5. Update Used Car Status (PUT /used-cars/:id/status)
export const updateUsedCarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ status: false, msg: "Status is required" });

    const car = await UsedCar.findByIdAndUpdate(id, { status }, { new: true });
    if (!car) return res.status(404).json({ status: false, msg: "Used car not found" });

    return res.status(200).json({ status: true, msg: `Status updated to ${status}`, data: car });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};

// 6. Delete Used Car (DELETE /used-cars/:id)
export const deleteUsedCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await UsedCar.findByIdAndDelete(id);

    // Also remove from User document if sellerId exists
    if (car && car.sellerId) {
      try {
        const user = await User.findById(car.sellerId);
        if (user && user.listings) {
          user.listings = user.listings.filter((item) => String(item.id || item._id) !== String(id));
          await user.save();
        }
      } catch (e) {}
    }

    return res.status(200).json({ status: true, msg: "Car listing deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};
