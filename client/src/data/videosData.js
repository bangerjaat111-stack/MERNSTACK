// 200 CAR VIDEOS FOR AUTOSYNTAX

const YOUTUBE_IDS = [
  // =========================
  // REVIEWS
  // =========================

  "nVwXxEmiOm4",

  // Add your real YouTube IDs here
  // "VIDEO_ID_2",
  // "VIDEO_ID_3",
  // "VIDEO_ID_4",

  // =========================
  // DRAG RACE
  // =========================

  // "VIDEO_ID_5",
  // "VIDEO_ID_6",

  // =========================
  // CAR KNOWLEDGE
  // =========================

  // "VIDEO_ID_7",
  // "VIDEO_ID_8",

  // =========================
  // COMPARISON
  // =========================

  // "VIDEO_ID_9",
  // "VIDEO_ID_10",

  // =========================
  // EV
  // =========================

  // "VIDEO_ID_11",
  // "VIDEO_ID_12",

  // =========================
  // OFFROAD
  // =========================

  // "VIDEO_ID_13",
  // "VIDEO_ID_14",

  // Continue until you have 200 REAL IDs
];


// =========================
// CAR VIDEO DATA
// =========================

const CAR_DATA = [

  // MARUTI
  {
    brand: "Maruti Suzuki",
    model: "Swift",
    category: "Reviews",
    title: "Maruti Suzuki Swift Detailed Review"
  },
  {
    brand: "Maruti Suzuki",
    model: "Dzire",
    category: "Reviews",
    title: "Maruti Suzuki Dzire Detailed Review"
  },
  {
    brand: "Maruti Suzuki",
    model: "Brezza",
    category: "Reviews",
    title: "Maruti Suzuki Brezza Detailed Review"
  },
  {
    brand: "Maruti Suzuki",
    model: "Fronx",
    category: "Reviews",
    title: "Maruti Suzuki Fronx Detailed Review"
  },
  {
    brand: "Maruti Suzuki",
    model: "Grand Vitara",
    category: "Reviews",
    title: "Maruti Suzuki Grand Vitara Review"
  },
  {
    brand: "Maruti Suzuki",
    model: "Jimny",
    category: "Offroad",
    title: "Maruti Suzuki Jimny Offroad Test"
  },
  {
    brand: "Maruti Suzuki",
    model: "Baleno",
    category: "Reviews",
    title: "Maruti Suzuki Baleno Detailed Review"
  },

  // TATA
  {
    brand: "Tata",
    model: "Nexon",
    category: "Reviews",
    title: "Tata Nexon Detailed Review"
  },
  {
    brand: "Tata",
    model: "Nexon EV",
    category: "EV Specials",
    title: "Tata Nexon EV Range Test"
  },
  {
    brand: "Tata",
    model: "Punch",
    category: "Reviews",
    title: "Tata Punch Detailed Review"
  },
  {
    brand: "Tata",
    model: "Punch EV",
    category: "EV Specials",
    title: "Tata Punch EV Detailed Review"
  },
  {
    brand: "Tata",
    model: "Curvv",
    category: "Reviews",
    title: "Tata Curvv Detailed Review"
  },
  {
    brand: "Tata",
    model: "Harrier",
    category: "Reviews",
    title: "Tata Harrier Detailed Review"
  },
  {
    brand: "Tata",
    model: "Safari",
    category: "Reviews",
    title: "Tata Safari Detailed Review"
  },

  // MAHINDRA
  {
    brand: "Mahindra",
    model: "Thar",
    category: "Offroad",
    title: "Mahindra Thar Offroad Test"
  },
  {
    brand: "Mahindra",
    model: "Thar Roxx",
    category: "Reviews",
    title: "Mahindra Thar Roxx Detailed Review"
  },
  {
    brand: "Mahindra",
    model: "Scorpio N",
    category: "Reviews",
    title: "Mahindra Scorpio N Detailed Review"
  },
  {
    brand: "Mahindra",
    model: "XUV700",
    category: "Reviews",
    title: "Mahindra XUV700 Detailed Review"
  },
  {
    brand: "Mahindra",
    model: "XUV 3XO",
    category: "Reviews",
    title: "Mahindra XUV 3XO Detailed Review"
  },
  {
    brand: "Mahindra",
    model: "Bolero",
    category: "Reviews",
    title: "Mahindra Bolero Detailed Review"
  },

  // HYUNDAI
  {
    brand: "Hyundai",
    model: "Creta",
    category: "Reviews",
    title: "Hyundai Creta Detailed Review"
  },
  {
    brand: "Hyundai",
    model: "Verna",
    category: "Performance",
    title: "Hyundai Verna Turbo Performance Test"
  },
  {
    brand: "Hyundai",
    model: "Venue",
    category: "Reviews",
    title: "Hyundai Venue Detailed Review"
  },
  {
    brand: "Hyundai",
    model: "Exter",
    category: "Reviews",
    title: "Hyundai Exter Detailed Review"
  },
  {
    brand: "Hyundai",
    model: "i20",
    category: "Reviews",
    title: "Hyundai i20 Detailed Review"
  },
  {
    brand: "Hyundai",
    model: "Ioniq 5",
    category: "EV Specials",
    title: "Hyundai Ioniq 5 EV Review"
  },

  // KIA
  {
    brand: "Kia",
    model: "Seltos",
    category: "Reviews",
    title: "Kia Seltos Detailed Review"
  },
  {
    brand: "Kia",
    model: "Sonet",
    category: "Reviews",
    title: "Kia Sonet Detailed Review"
  },
  {
    brand: "Kia",
    model: "Carens",
    category: "Reviews",
    title: "Kia Carens Detailed Review"
  },
  {
    brand: "Kia",
    model: "EV6",
    category: "EV Specials",
    title: "Kia EV6 Performance Test"
  },

  // TOYOTA
  {
    brand: "Toyota",
    model: "Fortuner",
    category: "Offroad",
    title: "Toyota Fortuner Offroad Test"
  },
  {
    brand: "Toyota",
    model: "Innova Hycross",
    category: "Reviews",
    title: "Toyota Innova Hycross Review"
  },
  {
    brand: "Toyota",
    model: "Hyryder",
    category: "Mileage",
    title: "Toyota Hyryder Mileage Test"
  },
  {
    brand: "Toyota",
    model: "Hilux",
    category: "Offroad",
    title: "Toyota Hilux Offroad Test"
  },

  // HONDA
  {
    brand: "Honda",
    model: "City",
    category: "Reviews",
    title: "Honda City Detailed Review"
  },
  {
    brand: "Honda",
    model: "City Hybrid",
    category: "Mileage",
    title: "Honda City Hybrid Mileage Test"
  },
  {
    brand: "Honda",
    model: "Elevate",
    category: "Reviews",
    title: "Honda Elevate Detailed Review"
  },

  // VOLKSWAGEN
  {
    brand: "Volkswagen",
    model: "Virtus",
    category: "Reviews",
    title: "Volkswagen Virtus Detailed Review"
  },
  {
    brand: "Volkswagen",
    model: "Taigun",
    category: "Reviews",
    title: "Volkswagen Taigun Detailed Review"
  },

  // SKODA
  {
    brand: "Skoda",
    model: "Slavia",
    category: "Reviews",
    title: "Skoda Slavia Detailed Review"
  },
  {
    brand: "Skoda",
    model: "Kushaq",
    category: "Reviews",
    title: "Skoda Kushaq Detailed Review"
  },

  // BMW
  {
    brand: "BMW",
    model: "3 Series",
    category: "Performance",
    title: "BMW 3 Series Performance Review"
  },
  {
    brand: "BMW",
    model: "M340i",
    category: "Performance",
    title: "BMW M340i Performance Test"
  },

  // MERCEDES
  {
    brand: "Mercedes-Benz",
    model: "C-Class",
    category: "Reviews",
    title: "Mercedes-Benz C-Class Review"
  },
  {
    brand: "Mercedes-Benz",
    model: "AMG C43",
    category: "Performance",
    title: "Mercedes AMG C43 Performance Test"
  },

  // AUDI
  {
    brand: "Audi",
    model: "A4",
    category: "Reviews",
    title: "Audi A4 Detailed Review"
  },
  {
    brand: "Audi",
    model: "Q5",
    category: "Reviews",
    title: "Audi Q5 Detailed Review"
  },

  // PORSCHE
  {
    brand: "Porsche",
    model: "911",
    category: "Performance",
    title: "Porsche 911 Performance Test"
  },
  {
    brand: "Porsche",
    model: "Cayenne",
    category: "Reviews",
    title: "Porsche Cayenne Detailed Review"
  }
];


// =========================
// CATEGORIES
// =========================

const CATEGORIES = [
  "All",
  "Reviews",
  "Drag Race",
  "Car Knowledge",
  "Comparisons",
  "EV Specials",
  "Offroad",
  "Mileage",
  "Performance"
];


// =========================
// GENERATE 200 VIDEOS
// =========================

export const GENERATED_200_VIDEOS = Array.from(
  { length: 200 },
  (_, index) => {

    const car =
      CAR_DATA[index % CAR_DATA.length];

    const videoId =
      YOUTUBE_IDS[index];

    return {

      id: index + 1,

      title:
        `${car.title} #${index + 1}`,

      brand:
        car.brand,

      model:
        car.model,

      category:
        car.category,

      channel:
        "YouTube Car Channel",

      views:
        `${100 + (index * 37) % 900}K`,

      duration:
        `${10 + (index % 20)}:${String(
          (index * 17) % 60
        ).padStart(2, "0")}`,

      rating:
        (4.5 + ((index % 5) * 0.1)).toFixed(1),

      thumbnail:
        videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : null,

      embedId:
        videoId || null,

      iframeSrc:
        videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : null,

      iframe:
        videoId
          ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="${car.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
          : null,

      description:
        `Watch ${car.title}. Learn about
        features, performance, engine,
        mileage and driving experience.`
    };
  }
);


export {
  CATEGORIES
};