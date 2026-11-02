/* ==========================================================================
   RESTAURANT SETTINGS  —  edit this file to change details across the site
   ========================================================================== */
window.RESTAURANT = {
  name: "Khori Special Kabab Restaurant",
  shortName: "Khori",
  nameAr: "مطعم كباب خوري الخاص",
  tagline: "Kabab, Persian stews, sandwiches and fresh juices, cooked to order and delivered free to your door.",
  logo: "images/logo.png",

  /* ---- WhatsApp ordering ----
     Country code + number, digits only (no +, spaces or dashes).
     +971 54 320 5664  ->  "971543205664"                                  */
  whatsappNumber: "971543205664",

  /* ---- Currency ---- */
  currency: "AED",

  /* ---- Delivery ---- */
  deliveryFee: 0,                       // 0 = free home delivery
  deliveryNote: "Free home delivery",
  minOrder: 0,                          // minimum subtotal, 0 = no minimum

  /* ---- Opening hours (24h format, restaurant's local time) ----
     close earlier than open means "closes the next day".                  */
  hours: {
    open: "11:00",
    close: "07:30",
    timezone: "Asia/Dubai",
    text: "11:00 AM to 7:30 AM (next day)"
  },

  /* ---- Contact ---- */
  phones: [
    { label: "04 26 66 322",  tel: "+97142666322" },
    { label: "054 320 5664",  tel: "+971543205664", whatsapp: true },
    { label: "050 762 6297",  tel: "+971507626297" }
  ],
  address: "Al Mamzar Beach, Al Khaleej Street, Beside the Union Society, Dubai",
  addressAr: "دبي، شاطئ الممزر، شارع الخليج، خلف جمعية الاتحاد",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Khori+Special+Kabab+Al+Mamzar+Beach+Al+Khaleej+Street+Dubai",
  instagram: "khorispecialkabab",
  cateringNote: "Catering for all corporate and private events",

  /* ---- Menu categories (order = order shown on the site) ---- */
  categories: [
    { id: "kabab",      name: "Kabab",                  ar: "كباب" },
    { id: "rice",       name: "Kabab with Rice",        ar: "مع الرز" },
    { id: "platters",   name: "Family Platters",        ar: "مشاوي عائلية" },
    { id: "mains",      name: "Persian Mains & Stews",  ar: "أطباق رئيسية" },
    { id: "sandwiches", name: "Sandwiches & Burgers",   ar: "ساندويج" },
    { id: "pizza",      name: "Pizza",                  ar: "بيتزا" },
    { id: "bakery",     name: "Bakery",                 ar: "مخبوزات" },
    { id: "starters",   name: "Starters & Dips",        ar: "مقبلات" },
    { id: "salads",     name: "Salads",                 ar: "سلطات" },
    { id: "sides",      name: "Soups & Sides",          ar: "شوربة وجانبية" },
    { id: "drinks",     name: "Drinks & Dessert",       ar: "مشروبات" },
    { id: "raw",        name: "Raw Meat (per kg)",      ar: "لحوم نية بالكيلو" }
  ],

  /* Dishes shown under "Popular picks" on the home page (item ids from menu-data.js) */
  featuredIds: ["kabab-koobideh", "soltani", "lamb-chops", "mix-kabab", "chicken-saffron", "special-mix-3"]
};
