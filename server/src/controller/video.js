import Video from "../model/video_model.js";

/* ============================================================
   RAW DATA (your 33 cars — keep this exactly as you had it)
   ============================================================ */
export const allinformation = [

  {
    "statusCode": 200,
    "data": {
      "page": 1,
      "limit": 10,
      "totalPages": 20,
      "previousPage": false,
      "nextPage": true,
      "totalItems": 200,
      "currentPageItems": 10,
      "data": [

        {
          "id": 1,
          "title": "Land Rover Defender",
          "thumbnail": "https://cdn-s3.autocarindia.com/Land-Rover/defender/Z62_7431%20copy.jpg?w=728&q=75&fm=auto",
          "video": "https://youtu.be/gxRQ7iXmtnw?si=nVbjI-xddBi5A9Im",
          "description": "Land Rover Defender is a rugged and premium SUV built to combine legendary off-road capability with modern luxury and technology.",
          "brand": "Land Rover",
          "category": "Reviews",
          "price": "₹1.05 Crore - ₹1.50 Crore",
          "engine": "2.0L Turbocharged Petrol / 3.0L Turbocharged Petrol / 5.0L Supercharged V8",
          "topSpeed": "191 km/h",
          "maxPower": "296 bhp - 518 bhp",
          "power": "296 bhp - 518 bhp",
          "torque": "400 Nm - 625 Nm",
          "acceleration": "6.7s - 8.3s (0-100 km/h)",
          "transmission": "8-Speed Automatic"
        },

        {
          "id": 1,
          "title": "new tata tiago 2026",
          "thumbnail": "https://cdn-s3.autocarindia.com/Tata/tiago/Tata_Tiago_Facelift_Front_Quarter_Tracking.jpg",
          "video": "https://youtu.be/h32rbzHEi58?si=DWApGQTnGEjhnsXG",
          "description": "The Tata Tiago is a stylish and practical hatchback designed for everyday city driving.",
          "brand": "tata",
          "category": "Reviews",
          "price": "₹5.65 Lakh - ₹8.90 Lakh",
          "engine": "1.2L Revotron Petrol / 1.2L Revotron CNG",
          "topSpeed": "150 km/h",
          "maxPower": "85 bhp",
          "power": "85 bhp",
          "torque": "113 Nm",
          "acceleration": "16.29s (0-100 km/h)",
          "transmission": "5-Speed Manual / 5-Speed AMT"
        },
        {
          "id": 2,
          "title": "curv",
          "thumbnail": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/139651/curvv-exterior-right-front-three-quarter-16.png?isig=0&q=80&q=80",
          "video": "https://youtu.be/a95JcDr8-NE?si=6wWnIe57Qe5F0SPp",
          "description": "The Tata Curvv is a modern SUV-coupe that combines a sporty, aerodynamic design with the practicality of an SUV.",
          "brand": "tata",
          "category": "",
          "price": "₹10.00 Lakh - ₹19.00 Lakh",
          "engine": "1.2L Turbo Petrol / 1.5L Diesel / 1.5L Turbo Petrol (GDi)",
          "topSpeed": "180 km/h",
          "maxPower": "118 bhp - 167 bhp",
          "power": "118 bhp - 167 bhp",
          "torque": "170 Nm - 260 Nm",
          "acceleration": "8.6s - 9.0s (0-100 km/h)",
          "transmission": "6-Speed Manual / 7-Speed DCA"
        },
        {
          "id": 3,
          "title": "nexon",
          "thumbnail": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/141867/nexon-facelift-exterior-right-front-three-quarter-69.jpeg?isig=0&q=80&q=80",
          "video": "https://youtu.be/U7XbOEss6LE?si=8GktM2U7TB4jWY5E",
          "description": "Tata Nexon is a stylish and feature-packed compact SUV designed for both city driving and highway journeys",
          "brand": "tata",
          "category": "reviews",
          "price": "₹8.00 Lakh - ₹15.80 Lakh",
          "engine": "1.2L Turbo Petrol / 1.5L Turbo Diesel / 1.2L Turbo CNG",
          "topSpeed": "180 km/h",
          "maxPower": "118 bhp - 113 bhp",
          "power": "118 bhp - 113 bhp",
          "torque": "170 Nm - 260 Nm",
          "acceleration": "9.14s (0-100 km/h)",
          "transmission": "5-Speed Manual / 6-Speed Manual / 6-Speed AMT / 7-Speed DCA"
        },

        {
          "id": 4,
          "title": "sierra dark edition",
          "thumbnail": "https://cdn-s3.autocarindia.com/Tata/sierra/500_6533.JPG?w=728&q=75&fm=auto",
          "video": "https://youtu.be/nptYq_81d2w?si=ajZyIgfbVQ9KBPv5",
          "description": "Tata Sierra is a premium SUV that combines a bold, distinctive design with a spacious and modern cabin",
          "brand": "tata",
          "category": "reviews",
          "price": "₹11.50 Lakh - ₹17.50 Lakh",
          "engine": "1.5L Turbo Petrol / 1.5L Turbo Diesel",
          "topSpeed": "190 km/h (limited)",
          "maxPower": "160 bhp - 167 bhp",
          "power": "160 bhp - 167 bhp",
          "torque": "255 Nm - 260 Nm",
          "acceleration": "10.09s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },

        {
          "id": 5,
          "title": "Harrier dark edition",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxpQf-uge3I8-vRIznAiJXUcqmuHgBiQ6aPvrrcsbFVtCbB9ZBVEz7SYPCmg7YCqYV68zR0-qYcr-bRbZjKfeaD_k1RbXnTWh-H5vMgd5&s=10",
          "video": "https://youtu.be/xPXTID8--R0?si=ueEGrcqOJG6LexJi",
          "description": "Tata Harrier is a premium mid-size SUV known for its bold design, spacious cabin, and confident road presence.",
          "brand": "tata",
          "category": "reviews",
          "price": "₹15.49 Lakh - ₹26.44 Lakh",
          "engine": "2.0L Kryotec Turbo Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "170 bhp",
          "power": "170 bhp",
          "torque": "350 Nm",
          "acceleration": "10.5s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },

        {
          "id": 6,
          "title": "saffari dark edition",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdwpnnyeBvSJVvUT4owXLHl03e8unGLDo7ZLDOElWC_g&s=10",
          "video": "https://youtu.be/4VJjichjljM?si=GN06m2F3KxEtCe9i",
          "description": "Tata Safari is a premium 7-seater SUV designed for families who want a spacious, comfortable, and feature-rich driving experience.",
          "brand": "tata",
          "category": "reviews",
          "price": "₹15.49 Lakh - ₹27.34 Lakh",
          "engine": "2.0L Kryotec Turbo Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "170 bhp",
          "power": "170 bhp",
          "torque": "350 Nm",
          "acceleration": "10.8s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },
        {
          "id": 7,
          "title": "creta 2026",
          "thumbnail": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80&q=80",
          "video": "https://youtu.be/cRUY2YQhY0s?si=gsU_pZ_nbD44v-j8",
          "description": "Hyundai Creta is a popular mid-size SUV that combines stylish design, a comfortable cabin, modern technology, and a confident road presence",
          "brand": "hyundai",
          "category": "reviews",
          "price": "₹11.00 Lakh - ₹20.30 Lakh",
          "engine": "1.5L MPi Petrol / 1.5L Turbo Petrol / 1.5L CRDi Diesel",
          "topSpeed": "179 km/h - 190 km/h",
          "maxPower": "115 bhp - 160 bhp",
          "power": "115 bhp - 160 bhp",
          "torque": "144 Nm - 253 Nm",
          "acceleration": "11.3s (0-100 km/h)",
          "transmission": "6-Speed Manual / IVT / 7-Speed DCT / 6-Speed Automatic"
        },
        {
          "id": 8,
          "title": "Hyundai Venue",
          "thumbnail": "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Venue/12999/1771931633886/front-left-side-47.jpg",
          "video": "https://youtu.be/HFNOyjssa3s?si=HmR5ncDlOTWm2O4a",
          "description": "Hyundai Venue is a compact SUV that combines a stylish exterior, practical dimensions, modern technology, and a comfortable cabin.",
          "brand": "hyundai",
          "category": "reviews",
          "price": "₹7.94 Lakh - ₹13.48 Lakh",
          "engine": "1.2L MPi Petrol / 1.0L Turbo Petrol / 1.5L CRDi Diesel",
          "topSpeed": "180 km/h",
          "maxPower": "83 bhp - 120 bhp",
          "power": "83 bhp - 120 bhp",
          "torque": "114 Nm - 172 Nm",
          "acceleration": "11.4s (0-100 km/h)",
          "transmission": "6-Speed Manual / 7-Speed DCT / 6-Speed Automatic"
        }, {
          "id": 9,
          "title": "Hyundai Alcazar",
          "thumbnail": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/157825/alcazar-facelift-exterior-right-side-view.jpeg?isig=0&q=80&q=80",
          "video": "https://youtu.be/hTPo65HBZz4?si=cp8jM8HYHOp9SLCD",
          "description": "Hyundai Alcazar is a premium 7-seater SUV designed for families seeking spacious interiors, modern features, and a comfortable driving experience.",
          "brand": "hyundai",
          "category": "reviews",
          "price": "₹14.99 Lakh - ₹21.55 Lakh",
          "engine": "1.5L Turbo Petrol / 1.5L CRDi Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "160 bhp - 116 bhp",
          "power": "160 bhp - 116 bhp",
          "torque": "253 Nm - 250 Nm",
          "acceleration": "10.4s (0-100 km/h)",
          "transmission": "6-Speed Manual / 7-Speed DCT / 6-Speed Automatic"
        }, {
          "id": 10,
          "title": "Hyundai i20",
          "thumbnail": "https://www.team-bhp.com/news/my-hyundai-i20-petrol-cvt-how-its-going-year-and-12000-km-later",
          "video": "https://youtu.be/uQEQgJ9S31o?si=huixupuhDwjQvrDJ",
          "description": "Hyundai i20 is a stylish premium hatchback that combines sporty design, a comfortable interior, modern technology, and practical everyday usability.",
          "brand": "hyundai",
          "category": "reviews",
          "price": "₹7.04 Lakh - ₹11.21 Lakh",
          "engine": "1.2L Kappa Petrol / 1.0L Turbo GDi Petrol",
          "topSpeed": "185 km/h",
          "maxPower": "83 bhp - 120 bhp",
          "power": "83 bhp - 120 bhp",
          "torque": "115 Nm - 172 Nm",
          "acceleration": "10.4s (0-100 km/h)",
          "transmission": "5-Speed Manual / IVT / 7-Speed DCT"
        },
        {
          "id": 11,
          "title": "Hyundai Verna",
          "thumbnail": "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Verna-Facelift/13312/1773040519044/front-left-side-47.jpg?imwidth=420&impolicy=resize",
          "video": "https://youtu.be/vkRRiNTNl0c?si=ur3UXmFtU2m-cDEo",
          "description": "Hyundai Verna is a premium mid-size sedan that combines a sleek, modern design with a spacious and technology-rich cabin.",
          "brand": "hyundai",
          "category": "reviews",
          "price": "₹11.00 Lakh - ₹17.42 Lakh",
          "engine": "1.5L MPi Petrol / 1.5L Turbo GDi Petrol / 1.5L CRDi Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "115 bhp - 160 bhp",
          "power": "115 bhp - 160 bhp",
          "torque": "144 Nm - 253 Nm",
          "acceleration": "8.1s - 10.5s (0-100 km/h)",
          "transmission": "6-Speed Manual / IVT / 7-Speed DCT / 6-Speed Automatic"
        },
        {
          "id": 12,
          "title": "Mahindra Thar",
          "thumbnail": "https://imgd.aeplcdn.com/664x374/n/cw/ec/219824/thar-facelift-exterior-left-rear-three-quarter.png?isig=0&q=80&q=80",
          "video": "https://youtu.be/jAFcqkC551Y?si=duBc_pU7sFYDDL1K",
          "description": "Mahindra Thar is a rugged lifestyle SUV known for its iconic design, strong road presence, and off-road capability.",
          "brand": "Mahindra",
          "category": "reviews",
          "price": "₹11.35 Lakh - ₹17.60 Lakh",
          "engine": "2.0L Turbo Petrol / 2.2L Turbo Diesel",
          "topSpeed": "145 km/h - 180 km/h",
          "maxPower": "150 bhp - 175 bhp",
          "power": "150 bhp - 175 bhp",
          "torque": "300 Nm - 350 Nm",
          "acceleration": "13.2s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },
        {
          "id": 13,
          "title": "Mahindra Scorpio",
          "thumbnail": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/128413/scorpio-exterior-right-front-three-quarter-2.png?isig=0&q=80&q=80",
          "video": "https://youtu.be/Ap6Mg7Slieo?si=RzvAvcIC1stjRe1k",
          "description": "Mahindra Scorpio is a rugged and spacious SUV known for its bold design, strong road presence, and versatile performance.",
          "brand": "Mahindra",
          "category": "reviews",
          "price": "₹13.62 Lakh - ₹17.42 Lakh",
          "engine": "2.0L Turbo Petrol / 2.2L Turbo Diesel",
          "topSpeed": "160 km/h - 180 km/h",
          "maxPower": "150 bhp - 175 bhp",
          "power": "150 bhp - 175 bhp",
          "torque": "300 Nm - 350 Nm",
          "acceleration": "12.0s - 14.5s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },
        {
          "id": 14,
          "title": "Mahindra Bolero",
          "thumbnail": "https://img.gaadicdn.com/images/car-images/large/Mahindra/Bolero/10754/1760013521659/STEALTH-BLACK_282828.jpg",
          "video": "https://youtu.be/e-O_rr4Ihi0?si=UFzHq9U9AMZDtDy7",
          "description": "Mahindra Bolero is a rugged and practical SUV known for its strong build, spacious cabin, and dependable performance",
          "brand": "Mahindra",
          "category": "reviews",
          "price": "₹9.79 Lakh - ₹10.91 Lakh",
          "engine": "1.5L mHawk Turbo Diesel",
          "topSpeed": "117 km/h",
          "maxPower": "75 bhp",
          "power": "75 bhp",
          "torque": "210 Nm",
          "acceleration": "30.3s (0-100 km/h)",
          "transmission": "5-Speed Manual"
        },
        {
          "id": 15,
          "title": "Maruti Swift",
          "thumbnail": "https://dvps8uz7lyvra.cloudfront.net/wp-content/uploads/Maruti-Swift-Specifications-653x435.jpg",
          "video": "https://youtu.be/CAXW999109o?si=sGBZravodv4fWAEz",
          "description": "Maruti Suzuki Swift is a popular hatchback known for its sporty design, compact dimensions, and easy-to-drive character.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹6.49 Lakh - ₹9.64 Lakh",
          "engine": "1.2L Z-Series Petrol / 1.2L Z-Series CNG",
          "topSpeed": "180 km/h",
          "maxPower": "82 bhp - 90 bhp",
          "power": "82 bhp - 90 bhp",
          "torque": "112 Nm - 113 Nm",
          "acceleration": "12.6s (0-100 km/h)",
          "transmission": "5-Speed Manual / CVT / 5-Speed AMT"
        },
        {
          "id": 16,
          "title": "Maruti Baleno",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dj0yUqqtfgg_ZjLpayLU9ds_U3mCfDkidayZjIlP6ULZutVGAlA4U5xDQlRuC4wK-bQfEJBP-9jPsH4UEzuVRbBWSCEIa3oqO3kMOA&s=10",
          "video": "https://youtu.be/7RRNKUVS7JI?si=YbCPNkA0RugA5uit",
          "description": "Maruti Suzuki Baleno is a premium hatchback that combines stylish design, a spacious cabin, modern features, and practical everyday usability.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹6.66 Lakh - ₹9.88 Lakh",
          "engine": "1.2L DualJet Petrol / 1.2L DualJet CNG",
          "topSpeed": "175 km/h",
          "maxPower": "89 bhp",
          "power": "89 bhp",
          "torque": "113 Nm",
          "acceleration": "12.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / 5-Speed AMT"
        },
        {
          "id": 17,
          "title": "Maruti Wagon R",
          "thumbnail": "https://cdn-s3.autocarindia.com/legacy/cdni/Galleries/20190131113636_2019-Maruti-Wagon-R-front-a.jpg?w=728&q=75&fm=auto",
          "video": "https://youtu.be/uEVaX_0PRwc?si=rdiyuTFN2zLy2TeO",
          "description": "Maruti Suzuki WagonR is a practical and spacious hatchback designed for comfortable everyday driving.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹5.54 Lakh - ₹7.51 Lakh",
          "engine": "1.0L K-Series Petrol / 1.2L K-Series Petrol / 1.0L CNG",
          "topSpeed": "160 km/h",
          "maxPower": "67 bhp - 89 bhp",
          "power": "67 bhp - 89 bhp",
          "torque": "89 Nm - 113 Nm",
          "acceleration": "13.5s - 14.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / 5-Speed AMT"
        },
        {
          "id": 18,
          "title": "Maruti Baleno",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dj0yUqqtfgg_ZjLpayLU9ds_U3mCfDkidayZjIlP6ULZutVGAlA4U5xDQlRuC4wK-bQfEJBP-9jPsH4UEzuVRbBWSCEIa3oqO3kMOA&s=10",
          "video": "https://youtu.be/7RRNKUVS7JI?si=YbCPNkA0RugA5uit",
          "description": "Maruti Suzuki Baleno is a premium hatchback that combines stylish design, a spacious cabin, modern features, and practical everyday usability.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹6.66 Lakh - ₹9.88 Lakh",
          "engine": "1.2L DualJet Petrol / 1.2L DualJet CNG",
          "topSpeed": "175 km/h",
          "maxPower": "89 bhp",
          "power": "89 bhp",
          "torque": "113 Nm",
          "acceleration": "12.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / 5-Speed AMT"
        },
        {
          "id": 19,
          "title": "Toyota Fortuner",
          "thumbnail": "https://images.carexpert.com.au/crop/1398/930/cms/v1/media/2025-05-2025-toyota-fortuner-gxlhero-3x2-1.jpg",
          "video": "https://youtu.be/jwqAjgAxfhM?si=xnb4KPKlLrH2HLZi",
          "description": "Toyota Fortuner is a premium full-size SUV known for its bold design, commanding road presence, spacious cabin, and rugged character.",
          "brand": "Toyota",
          "category": "reviews",
          "price": "₹33.43 Lakh - ₹51.44 Lakh",
          "engine": "2.7L Petrol / 2.8L Turbo Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "166 bhp - 204 bhp",
          "power": "166 bhp - 204 bhp",
          "torque": "245 Nm - 500 Nm",
          "acceleration": "10.0s - 12.0s (0-100 km/h)",
          "transmission": "6-Speed Manual / 6-Speed Automatic"
        },
        {
          "id": 20,
          "title": "Toyota Legender",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefom-IThrsgVSNHrM1fZ2vranj8CikJe0hcC-hHt8BpkrwZoaAtlgHNs&s=10",
          "video": "https://youtu.be/JnXLuiqjCLc?si=e3ziKl_TVRKXeIS_",
          "description": "Toyota Fortuner Legender is a premium SUV that combines the rugged character of the Fortuner with a more distinctive and sophisticated design.",
          "brand": "Toyota",
          "category": "reviews",
          "price": "₹43.00 Lakh - ₹47.00 Lakh",
          "engine": "2.8L Turbo Diesel",
          "topSpeed": "190 km/h",
          "maxPower": "204 bhp",
          "power": "204 bhp",
          "torque": "500 Nm",
          "acceleration": "10.0s (0-100 km/h)",
          "transmission": "6-Speed Automatic"
        },
        {
          "id": 21,
          "title": "Maruti Baleno",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dj0yUqqtfgg_ZjLpayLU9ds_U3mCfDkidayZjIlP6ULZutVGAlA4U5xDQlRuC4wK-bQfEJBP-9jPsH4UEzuVRbBWSCEIa3oqO3kMOA&s=10",
          "video": "https://youtu.be/7RRNKUVS7JI?si=YbCPNkA0RugA5uit",
          "description": "Maruti Suzuki Baleno is a premium hatchback that combines stylish design, a spacious cabin, modern features, and practical everyday usability.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹6.66 Lakh - ₹9.88 Lakh",
          "engine": "1.2L DualJet Petrol / 1.2L DualJet CNG",
          "topSpeed": "175 km/h",
          "maxPower": "89 bhp",
          "power": "89 bhp",
          "torque": "113 Nm",
          "acceleration": "12.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / 5-Speed AMT"
        },

        {
          "id": 22,
          "title": "Maruti Suzuki Grand Vitara",
          "thumbnail": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134801/maruti-suzuki-grand-vitara-right-front-three-quarter0.jpeg?isig=0&wm=0",
          "video": "https://youtu.be/YsqphzqUwks?si=FxW1RkP871rBAebB",
          "description": "Maruti Suzuki Grand Vitara is a stylish mid-size SUV that combines a premium design, comfortable cabin, modern features, and practical everyday usability.",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹10.99 Lakh - ₹19.99 Lakh",
          "engine": "1.5L K-Series Petrol / 1.5L Strong Hybrid Petrol / 1.5L CNG",
          "topSpeed": "180 km/h",
          "maxPower": "103 bhp - 116 bhp",
          "power": "103 bhp - 116 bhp",
          "torque": "137 Nm - 141 Nm",
          "acceleration": "11.0s - 12.0s (0-100 km/h)",
          "transmission": "5-Speed Manual / 6-Speed Automatic / e-CVT"
        },
        {
          "id": 23,
          "title": "Maruti Suzuki Fronx",
          "thumbnail": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134801/maruti-suzuki-grand-vitara-right-front-three-quarter0.jpeg?isig=0&wm=0",
          "video": "https://youtu.be/Xm4EAFIL7LY?si=5mbZdmhZrAMt9ItY",
          "description": "Maruti Suzuki Fronx is a stylish crossover SUV that combines sporty coupe-inspired design with the practicality of a compact SUV",
          "brand": "Maruti",
          "category": "reviews",
          "price": "₹7.51 Lakh - ₹12.88 Lakh",
          "engine": "1.2L K-Series Petrol / 1.0L Turbo Boosterjet Petrol / 1.2L CNG",
          "topSpeed": "180 km/h",
          "maxPower": "89 bhp - 100 bhp",
          "power": "89 bhp - 100 bhp",
          "torque": "113 Nm - 148 Nm",
          "acceleration": "11.5s - 12.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / 6-Speed Automatic / 5-Speed AMT"
        },
        {
          "id": 24,
          "title": "Honda Amaze",
          "thumbnail": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134801/maruti-suzuki-grand-vitara-right-front-three-quarter0.jpeg?isig=0&wm=0",
          "video": "https://youtu.be/qBZSUvXNbgo?si=D7ExXlf2cHIPdO3w",
          "description": "Honda Amaze is a compact sedan designed for comfortable and practical everyday driving.",
          "brand": "Honda",
          "category": "reviews",
          "price": "₹6.79 Lakh - ₹9.95 Lakh",
          "engine": "1.2L i-VTEC Petrol / 1.2L i-VTEC CNG",
          "topSpeed": "160 km/h",
          "maxPower": "90 bhp",
          "power": "90 bhp",
          "torque": "110 Nm",
          "acceleration": "12.5s (0-100 km/h)",
          "transmission": "5-Speed Manual / CVT"
        },
        {
          "id": 25,
          "title": "Mercedes-Benz C-Class",
          "thumbnail": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134801/maruti-suzuki-grand-vitara-right-front-three-quarter0.jpeg?isig=0&wm=0",
          "video": "https://youtu.be/x9xSEOqF6iI?si=vtVD_GT2DAQ04a8Q",
          "description": "Premium luxury sedan with elegant styling, refined performance, and advanced technology.",
          "brand": "Mercedes-Benz",
          "category": "reviews",
          "price": "₹61.85 Lakh - ₹69.00 Lakh",
          "engine": "1.5L Turbo Petrol (Mild Hybrid) / 2.0L Turbo Petrol / 2.0L Turbo Diesel",
          "topSpeed": "240 km/h",
          "maxPower": "204 bhp - 258 bhp",
          "power": "204 bhp - 258 bhp",
          "torque": "300 Nm - 400 Nm",
          "acceleration": "5.9s - 7.3s (0-100 km/h)",
          "transmission": "9-Speed Automatic"
        },

        {
          "id": 26,
          "title": "Ford Endeavour",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRl2Le8mUPCx_qSl5EOHiVA2qoZJz1JJ8e9Uu5zwYMk7WSP9UrxrzSQhIuKxbYWSvj5Gn_pwvyfYoIpYMg7NJXubpnqGf-crkYyV9NLiNS&s=10",
          "video": "https://youtu.be/wryOEnCho8k?si=RDijXU4ZrDBSQ7hd",
          "description": "Ford Endeavour is a premium full-size SUV known for its powerful performance, spacious cabin, rugged design, and strong road presence.",
          "brand": "Ford",
          "category": "Offroad & Drag",
          "price": "₹35.00 Lakh - ₹45.00 Lakh (approx.)",
          "engine": "2.0L EcoBlue Turbo Diesel / 3.0L V6 Turbo Diesel",
          "topSpeed": "180 km/h",
          "maxPower": "210 bhp - 250 bhp",
          "power": "210 bhp - 250 bhp",
          "torque": "500 Nm - 600 Nm",
          "acceleration": "8.5s - 10.0s (0-100 km/h)",
          "transmission": "10-Speed Automatic"
        },
        {
          "id": 27,
          "title": "Mercedes-Benz E-Class",
          "thumbnail": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/134801/maruti-suzuki-grand-vitara-right-front-three-quarter0.jpeg?isig=0&wm=0",
          "video": "https://youtu.be/3BT5U9amiqM?si=lT9VQeghUlb0DUvu",
          "description": "Executive luxury sedan offering a spacious cabin, sophisticated design, and comfortable driving.",
          "brand": "Mercedes-Benz",
          "category": "reviews",
          "price": "₹76.00 Lakh - ₹89.00 Lakh",
          "engine": "2.0L Turbo Petrol / 2.0L Turbo Diesel / 3.0L Turbo Petrol (AMG)",
          "topSpeed": "250 km/h",
          "maxPower": "197 bhp - 435 bhp",
          "power": "197 bhp - 435 bhp",
          "torque": "320 Nm - 520 Nm",
          "acceleration": "5.0s - 7.5s (0-100 km/h)",
          "transmission": "9-Speed Automatic"
        },
        {
          "id": 28,
          "title": "Mercedes-Benz A-Class Limousine",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0QESholDp0xiIrzbR0twfjY_Fp3hLWQ5PJ49D6PpoA&s=10",
          "video": "https://youtu.be/1PRgjuOh03k?si=MNGyWZS2SSciN6Kx",
          "description": "Compact luxury sedan with sporty styling, modern features, and premium interiors.",
          "brand": "Mercedes-Benz",
          "category": "reviews",
          "price": "₹45.80 Lakh - ₹48.50 Lakh",
          "engine": "1.3L Turbo Petrol / 2.0L Turbo Diesel",
          "topSpeed": "230 km/h",
          "maxPower": "163 bhp - 150 bhp",
          "power": "163 bhp - 150 bhp",
          "torque": "250 Nm - 320 Nm",
          "acceleration": "7.5s - 8.0s (0-100 km/h)",
          "transmission": "7-Speed DCT / 8-Speed DCT"
        },
        {
          "id": 29,
          "title": "Mercedes-AMG G 63",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0QESholDp0xiIrzbR0twfjY_Fp3hLWQ5PJ49D6PpoA&s=10",
          "video": "https://youtu.be/3HZs-2AU8Dw?si=5Mxd44p-ztBm3AUy",
          "description": "High-performance version of the G-Class with powerful performance and distinctive AMG styling.",
          "brand": "Mercedes-Benz",
          "category": "reviews",
          "price": "₹3.30 Crore - ₹3.80 Crore",
          "engine": "4.0L V8 Bi-Turbo Petrol",
          "topSpeed": "220 km/h (limited)",
          "maxPower": "585 bhp",
          "power": "585 bhp",
          "torque": "850 Nm",
          "acceleration": "4.5s (0-100 km/h)",
          "transmission": "9-Speed Automatic"
        },
        {
          "id": 30,
          "title": "Mercedes-Benz EQE",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0QESholDp0xiIrzbR0twfjY_Fp3hLWQ5PJ49D6PpoA&s=10",
          "video": "https://youtu.be/7haBnctHecM?si=UO4RkHAUB3lStwBc",
          "description": "Premium electric sedan featuring a futuristic design, advanced technology, and electric performance.",
          "brand": "Mercedes-Benz",
          "category": "reviews",
          "price": "₹1.20 Crore - ₹1.50 Crore",
          "engine": "Electric Motor (90.6 kWh Battery) / Dual Motor AWD",
          "topSpeed": "210 km/h",
          "maxPower": "288 bhp - 402 bhp",
          "power": "288 bhp - 402 bhp",
          "torque": "530 Nm - 858 Nm",
          "acceleration": "5.6s - 6.7s (0-100 km/h)",
          "transmission": "Single-Speed Automatic"
        },
        {
          "id": 31,
          "title": "Range Rover Sport",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0QESholDp0xiIrzbR0twfjY_Fp3hLWQ5PJ49D6PpoA&s=10",
          "video": "https://youtu.be/ufl4PmP5usk?si=u1Tui-F-NyB_b8yM",
          "description": "Sportier luxury SUV offering dynamic performance, premium interiors, and strong all-terrain capability.",
          "brand": "Range Rover",
          "category": "reviews",
          "price": "₹1.45 Crore - ₹2.20 Crore",
          "engine": "3.0L Turbo Petrol / 3.0L Turbo Diesel / 4.4L V8 Twin-Turbo Petrol",
          "topSpeed": "242 km/h",
          "maxPower": "355 bhp - 523 bhp",
          "power": "355 bhp - 523 bhp",
          "torque": "500 Nm - 750 Nm",
          "acceleration": "4.5s - 6.2s (0-100 km/h)",
          "transmission": "8-Speed Automatic"
        },
        {
          "id": 32,
          "title": "Range Rover Velar",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0QESholDp0xiIrzbR0twfjY_Fp3hLWQ5PJ49D6PpoA&s=10",
          "video": "https://youtu.be/U1fvyakdbdg?si=36P3T9OnUNydlrvl",
          "description": "Stylish mid-size luxury SUV with a minimalist design, sophisticated cabin, and advanced technology.",
          "brand": "Range Rover",
          "category": "reviews",
          "price": "₹94.00 Lakh - ₹1.30 Crore",
          "engine": "2.0L Turbo Petrol / 3.0L Turbo Petrol / 3.0L Turbo Diesel",
          "topSpeed": "217 km/h - 250 km/h",
          "maxPower": "247 bhp - 395 bhp",
          "power": "247 bhp - 395 bhp",
          "torque": "365 Nm - 550 Nm",
          "acceleration": "5.2s - 7.5s (0-100 km/h)",
          "transmission": "8-Speed Automatic"
        },
        {
          "id": 33,
          "title": "Range Rover Autobiography",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSQjn1sKqyPdgts0L0bbW0ieDs0v4f6W0X3kQUPYLcg&s=10",
          "video": "https://youtu.be/wky7IWyqPZM?si=PaX1qY39f7By78Vo",
          "description": "The Range Rover Autobiography represents the perfect combination of luxury, performance, comfort, and advanced technology. Designed for those who appreciate refined motoring, it features an elegant exterior, a sophisticated and spacious cabin, premium materials, and a wide range of modern technologies.",
          "brand": "Range Rover",
          "category": "reviews",
          "price": "₹2.20 Crore - ₹2.80 Crore",
          "engine": "3.0L Turbo Petrol / 3.0L Turbo Diesel / 4.4L V8 Twin-Turbo Petrol",
          "topSpeed": "242 km/h - 250 km/h",
          "maxPower": "395 bhp - 523 bhp",
          "power": "395 bhp - 523 bhp",
          "torque": "550 Nm - 750 Nm",
          "acceleration": "4.6s - 6.1s (0-100 km/h)",
          "transmission": "8-Speed Automatic"
        },

        {
          "id": 33,
          "title": "Range Rover Autobiography",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSQjn1sKqyPdgts0L0bbW0ieDs0v4f6W0X3kQUPYLcg&s=10",
          "video": "https://youtu.be/wky7IWyqPZM?si=PaX1qY39f7By78Vo",
          "description": "The Range Rover Autobiography represents the perfect combination of luxury, performance, comfort, and advanced technology. Designed for those who appreciate refined motoring, it features an elegant exterior, a sophisticated and spacious cabin, premium materials, and a wide range of modern technologies.",
          "brand": "Range Rover",
          "category": "reviews",
          "price": "₹2.20 Crore - ₹2.80 Crore",
          "engine": "3.0L Turbo Petrol / 3.0L Turbo Diesel / 4.4L V8 Twin-Turbo Petrol",
          "topSpeed": "242 km/h - 250 km/h",
          "maxPower": "395 bhp - 523 bhp",
          "power": "395 bhp - 523 bhp",
          "torque": "550 Nm - 750 Nm",
          "acceleration": "4.6s - 6.1s (0-100 km/h)",
          "transmission": "8-Speed Automatic"
        },

        {
          "id": 34,
          "title": "Audi A4",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFGt95rFOHYcefH8wp9ofIqX1C4Orm1uVoogVJoMHHjg&s=10",
          "video": "https://youtu.be/1qoHpIWDxCA?si=pfFSF9o0DBAIfm88",
          "description": "The Audi A4 is a premium mid-size sedan that blends understated elegance with refined performance, a tech-rich cabin, and everyday usability. It is one of the most well-rounded luxury sedans in its class.",
          "brand": "Audi",
          "category": "reviews",
          "price": "₹46.99 Lakh - ₹54.00 Lakh",
          "engine": "2.0L TFSI Turbo Petrol",
          "topSpeed": "241 km/h",
          "maxPower": "190 bhp",
          "power": "190 bhp",
          "torque": "320 Nm",
          "acceleration": "7.3s (0-100 km/h)",
          "transmission": "7-Speed S-Tronic DCT"
        },
        {
          "id": 35,
          "title": "Audi Q7",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5KC7ZDseoBtrUVTCOc5jKv8wFroO1bajzeVrvx73Uw&s=10",
          "video": "https://youtu.be/mc8NkIDf6rU?si=kaBfjoGJ0wURiLWQ",
          "description": "The Audi Q7 is a premium 7-seater luxury SUV offering a commanding road presence, plush interiors, quattro all-wheel drive, and a refined driving experience perfect for families and long journeys.",
          "brand": "Audi",
          "category": "reviews",
          "price": "₹88.66 Lakh - ₹97.84 Lakh",
          "engine": "3.0L TFSI V6 Turbo Petrol / 3.0L TDI V6 Turbo Diesel",
          "topSpeed": "250 km/h",
          "maxPower": "340 bhp (Petrol) / 286 bhp (Diesel)",
          "power": "286 bhp - 340 bhp",
          "torque": "500 Nm - 600 Nm",
          "acceleration": "5.6s - 6.1s (0-100 km/h)",
          "transmission": "8-Speed Tiptronic Automatic"
        },
        {
          "id": 36,
          "title": "Audi Q8",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTstvfWC-7pgQ2QYy_yojGYHPIeq120-ccAwetbJ_kglw&s=10",
          "video": "https://youtu.be/TKKkY-Ly-m0?si=skW8yrsN3UfJbarA",
          "description": "The Audi Q8 is the flagship coupe-SUV from Audi, combining striking design, a luxurious cabin, quattro AWD, and powerful V6/V8 engine options. It is a statement of style and performance.",
          "brand": "Audi",
          "category": "reviews",
          "price": "₹1.17 Crore - ₹1.45 Crore",
          "engine": "3.0L TFSI V6 Turbo Petrol / 4.0L TFSI V8 Twin-Turbo",
          "topSpeed": "250 km/h (limited)",
          "maxPower": "340 bhp - 507 bhp",
          "power": "340 bhp - 507 bhp",
          "torque": "500 Nm - 770 Nm",
          "acceleration": "4.1s - 5.6s (0-100 km/h)",
          "transmission": "8-Speed Tiptronic Automatic"
        },
        {
          "id": 37,
          "title": "Audi RS5 Sportback",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppp1hC421U-xnqEUmbP_OsNqKK0k575qrDQy5Yub0_g&s=10",
          "video": "https://youtu.be/EEeuSRb23Vw?si=Q9m9tXLocMCN5VeQ",
          "description": "The Audi RS5 Sportback is a high-performance four-door coupe powered by a 2.9L twin-turbo V6, delivering blistering acceleration, quattro AWD grip, and everyday practicality with RS-badged aggression.",
          "brand": "Audi",
          "category": "reviews",
          "price": "₹1.15 Crore - ₹1.25 Crore",
          "engine": "2.9L TFSI V6 Bi-Turbo Petrol",
          "topSpeed": "280 km/h (limited)",
          "maxPower": "444 bhp",
          "power": "444 bhp",
          "torque": "600 Nm",
          "acceleration": "3.9s (0-100 km/h)",
          "transmission": "8-Speed Tiptronic Automatic"
        },
        {
          "id": 38,
          "title": "Audi e-tron GT",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHd1v9ERi2-PI6goJw_yg3YecrExyGK0-JmbC284rXpA&s=10",
          "video": "https://youtu.be/Xmi7SORna7A?si=HnEXxMNDqvyditkq",
          "description": "The Audi e-tron GT is a stunning all-electric grand tourer built on the Porsche Taycan platform. It combines dual-motor AWD, ultra-fast 800V charging, and 0-100 km/h in under 4 seconds with zero emissions.",
          "brand": "Audi",
          "category": "Electric & Hybrid",
          "price": "₹1.80 Crore - ₹2.10 Crore",
          "engine": "Dual Electric Motor AWD (93.4 kWh Battery)",
          "topSpeed": "250 km/h (limited)",
          "maxPower": "476 bhp - 646 bhp",
          "power": "476 bhp - 646 bhp",
          "torque": "630 Nm - 830 Nm",
          "acceleration": "3.3s - 4.5s (0-100 km/h)",
          "transmission": "2-Speed Automatic (Rear) / Single-Speed (Front)"
        }




      ]
    },
    "message": "Cars fetched successfully",
    "success": true
  }
]

/* ============================================================
   HELPERS
   ============================================================ */
const RAW_CARS = allinformation[0]?.data?.data || [];

const extractEmbedId = (url = "") => {
  if (!url) return "";
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /[?&]v=([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return "";
};

const detectFuelType = (engineStr = "") => {
  const e = engineStr.toLowerCase();
  const hasPetrol = e.includes("petrol") || e.includes("mpi") || e.includes("gdi") || e.includes("vtec") || e.includes("boosterjet");
  const hasDiesel = e.includes("diesel") || e.includes("crdi") || e.includes("kryotec") || e.includes("mhawk") || e.includes("ecoblue");
  const hasCNG = e.includes("cng");
  const hasElectric = e.includes("electric") || e.includes("battery");
  if (hasElectric) return "Electric";
  if (hasCNG && !hasPetrol && !hasDiesel) return "CNG";
  if (hasPetrol && hasDiesel) return "Petrol / Diesel";
  if (hasPetrol) return "Petrol";
  if (hasDiesel) return "Diesel";
  return "Petrol / Diesel";
};

const detectBodyType = (title = "") => {
  const t = title.toLowerCase();
  if (/(defender|thar|endeavour|fortuner|scorpio|bolero|safari|alcazar|g 63|g-class)/.test(t)) return "SUV";
  if (/(nexon|venue|creta|harrier|sierra|curv|fronx|grand vitara|seltos)/.test(t)) return "SUV";
  if (/(tiago|swift|baleno|i20|wagon r|altroz|punch)/.test(t)) return "Hatchback";
  if (/(verna|amaze|city|c-class|e-class|a-class|eqe)/.test(t)) return "Sedan";
  if (/(range rover|velar|sport|autobiography)/.test(t)) return "SUV";
  return "SUV";
};

// ✅ Convert frontend-friendly car object → Mongo schema shape
const normalizeCar = (c, idx = 0) => ({
  title: c.title || "Untitled",
  embedId: extractEmbedId(c.video),
  youtubeUrl: c.video || "",
  thumbnailUrl: c.thumbnail || "",
  channel: c.brand || "AutoCar",
  brand: c.brand || "Unknown",
  model: c.title || "",
  bodyType: detectBodyType(c.title || ""),
  category: c.category && c.category.trim() ? c.category : "Reviews",
  duration: "15:00",
  views: "100K",
  rating: 4.8,
  description: c.description || "",
  blurb: c.description || "",
  engine: {
    type: c.engine || "",
    fuelType: detectFuelType(c.engine || ""),
    displacement: "",
    maxPower: c.maxPower || c.power || "",
    maxTorque: c.torque || "",
    transmission: c.transmission || "",
    drivetrain: "FWD",
  },
  variants: [{ name: "Base", price: c.price || "Price on request" }],
  price: c.price || "",
  topSpeed: c.topSpeed || "",
  specs: {
    engine: c.engine || "N/A",
    power: c.power || "N/A",
    torque: c.torque || "N/A",
    price: c.price || "N/A",
    transmission: c.transmission || "N/A",
    fuelType: detectFuelType(c.engine || ""),
    topSpeed: c.topSpeed || "N/A",
    zeroToHundred: c.acceleration || "N/A",
  },
  highlights: [],
  tags: [c.brand, c.category].filter(Boolean),
  featured: idx < 6,
});

/* ============================================================
   SEED (only if collection is empty)
   ============================================================ */
const ensureSeedVideos = async () => {
  try {
    const count = await Video.countDocuments();
    if (count === 0) {
      const normalized = RAW_CARS.map((c, i) => normalizeCar(c, i));
      await Video.insertMany(normalized);
      console.log(`✅ Seeded ${normalized.length} videos into MongoDB`);
    }
  } catch (err) {
    console.error("⚠️  Video seed warning:", err.message);
  }
};

/* ============================================================
   CONTROLLER — GET /video
   ============================================================ */
export const video = async (req, res) => {
  try {
    let videos = [];
    let dbError = null;

    try {
      await ensureSeedVideos();
      videos = await Video.find().sort({ createdAt: -1 }).lean();
    } catch (dbErr) {
      dbError = dbErr.message;
      console.warn("⚠️  MongoDB read failed, using fallback:", dbErr.message);
    }

    // fallback to in-memory list if DB returned nothing
    if (!videos || videos.length === 0) {
      videos = RAW_CARS.map((c, i) => normalizeCar(c, i));
    }

    return res.status(200).json({
      status: true,
      msg: "Video API fetched successfully",
      message: "Success",
      count: videos.length,
      dbConnected: !dbError,
      data: videos,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: error.message,
      message: error.message,
      data: RAW_CARS.map((c, i) => normalizeCar(c, i)),
    });
  }
};