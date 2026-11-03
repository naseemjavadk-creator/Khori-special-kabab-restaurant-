/* ==========================================================================
   MENU DATA  —  edit, add or remove dishes here
   --------------------------------------------------------------------------
   Each dish:
     id        unique, lowercase-with-dashes
     cat       a category id from config.js
     name      English name            ar   Arabic name (optional)
     desc      short description
     price     number                  — OR —
     variants  [{label:"Sandwich", price:39}, {label:"Plate", price:49}]
     img       photo. Use I("file") for images/menu/file.jpg, or paste any web URL
     tag       small badge (optional)  e.g. "Lamb"
   ========================================================================== */
(function () {
  const I = (n) => "images/menu/" + n + ".jpg";
  const plate = "Served with flatbread, grilled tomato and green pepper.";

  window.MENU_ITEMS = [
    /* ---------------------------- KABAB ---------------------------- */
    { id: "kabab-koobideh", cat: "kabab", name: "Kabab Koobideh", ar: "كباب مفروم لحم (كباب كوبيده)", price: 53, img: I("kabab-koobideh"),
      desc: "Minced meat kabab grilled on the skewer. " + plate },
    { id: "mutton-tikka", cat: "kabab", name: "Mutton Tikka", ar: "تكة لحم بالروب (گوشت ماستی)", price: 49, img: I("mutton-tikka"),
      desc: "Yogurt-marinated mutton tikka. " + plate },
    { id: "chicken-yogurt", cat: "kabab", name: "Chicken Yogurt", ar: "تكة دجاج بالروب (مرغ ماستی)", price: 49, img: I("chicken-yogurt"),
      desc: "Chicken tikka marinated in yogurt. " + plate },
    { id: "tikka-lemon-meat", cat: "kabab", name: "Tikkah Lemon Meat", ar: "تكة لحم ليمون (بحريني)", price: 49, img: I("tikka-lemon-meat"),
      desc: "Lemon-marinated meat tikka, Bahraini style. " + plate },
    { id: "tikka-lamb", cat: "kabab", name: "Tikkah Lamb", ar: "تكة خروف (چنجه)", price: 59, img: I("tikka-lamb"), tag: "Lamb",
      desc: "Tender lamb tikka (chenjeh). " + plate },
    { id: "chicken-bone", cat: "kabab", name: "Chicken With Bone", ar: "دجاج مع عظم (جوجه با استخوان)", price: 49, img: I("chicken-bone"),
      desc: "Bone-in chicken pieces grilled on the skewer. " + plate },
    { id: "lamb-chops", cat: "kabab", name: "Lamb Chops", ar: "ريش (شيشليك)", price: 69, img: I("lamb-chops"), tag: "Lamb",
      desc: "Grilled lamb chops (shishlik). " + plate },
    { id: "chicken-saffron", cat: "kabab", name: "Chicken with Saffron", ar: "تكة دجاج بالزعفران (مرغ زعفرانی)", price: 49, img: I("chicken-saffron"),
      desc: "Saffron-marinated chicken tikka. " + plate },
    { id: "chicken-koobideh", cat: "kabab", name: "Chicken Kabab Koobideh", ar: "كباب مفروم دجاج (كوبيده مرغ)", price: 53, img: I("chicken-koobideh"),
      desc: "Minced chicken kabab grilled on the skewer. " + plate },
    { id: "soltani", cat: "kabab", name: "Soltani", ar: "كباب سلطاني (كباب سلطانی)", price: 69, img: I("soltani"),
      desc: "The classic royal combination: barg and koobideh. " + plate },
    { id: "chicken-wings", cat: "kabab", name: "Chicken Wings", ar: "جوانح (كتف وبال كباب)", price: 49, img: I("chicken-wings"),
      desc: "Marinated chicken wings grilled on the skewer. " + plate },
    { id: "barg", cat: "kabab", name: "Barg Kebab", ar: "فيلة (برگ)", price: 53, img: I("barg"),
      desc: "Thinly sliced marinated fillet kabab. " + plate },
    { id: "camel-tikka", cat: "kabab", name: "Camel Tikka", ar: "تكة جمل (گوشت شتر)", price: 59, img: I("camel-tikka"), tag: "Camel",
      desc: "Camel meat tikka. " + plate },
    { id: "quail", cat: "kabab", name: "Quail", ar: "طائر السمان (بلدرچين)", price: 49, img: I("quail"), tag: "Quail",
      desc: "Whole grilled quail with grilled tomato, pepper and lemon." },
    { id: "mix-kabab", cat: "kabab", name: "Mix Kabab (1 person)", ar: "مشاوي مشكل شخص واحد", price: 59, img: I("mix-kabab"),
      desc: "A mix of kabab skewers for one person. " + plate },
    { id: "lamb-parts", cat: "kabab", name: "Grilled Lamb Parts", ar: "قلب/كبدة/كلاوي/دنبلان", img: I("lamb-parts"), tag: "Lamb",
      desc: "Heart, liver, kidney (khoshgosht) and more, grilled on the skewer.",
      variants: [{ label: "4 skewers", price: 49 }, { label: "Full", price: 98 }] },

    /* ------------------------ KABAB WITH RICE ------------------------ */
    { id: "koobideh-rice", cat: "rice", name: "Kabab Koobideh w Rice", ar: "كباب مفروم لحم مع الرز", price: 53, img: I("koobideh-rice"),
      desc: "Minced meat kabab on saffron rice with butter, grilled tomato, pepper and fresh herbs." },
    { id: "chicken-rice", cat: "rice", name: "Kabab Chicken w Rice", ar: "كباب مفروم دجاج مع الرز", price: 53, img: I("chicken-rice"),
      desc: "Minced chicken kabab on saffron rice with butter, grilled tomato, pepper and fresh herbs." },
    { id: "barg-rice", cat: "rice", name: "Kabab Barg w Rice", ar: "كباب فيلة مع الرز", price: 59, img: I("barg-rice"),
      desc: "Barg fillet kabab on saffron rice with butter, grilled tomato, pepper and fresh herbs." },
    { id: "soltani-rice", cat: "rice", name: "Kabab Soltani w Rice", ar: "كباب سلطاني مع الرز", price: 69, img: I("soltani-rice"),
      desc: "Barg and koobideh on saffron rice with butter, grilled tomato, pepper and fresh herbs." },
    { id: "mix-rice", cat: "rice", name: "Mix Kabab w Rice", ar: "مشكل مع الرز", price: 59, img: I("mix-rice"),
      desc: "A mix of kabab skewers on saffron rice with butter, grilled tomato, pepper and fresh herbs." },
    { id: "barberry-rice", cat: "rice", name: "Barberry Rice w/ Chicken", ar: "رز رمان مع دجاج (زرشك پلو با مرغ)", price: 53, img: I("barberry-rice"),
      desc: "Zereshk polo: saffron rice with barberries, served with chicken and tomato sauce." },

    /* ------------------------ FAMILY PLATTERS ------------------------ */
    { id: "special-mix-3", cat: "platters", name: "Special Mix Kebab (3 persons)", ar: "مشاوي مشكل (٣ اشخاص)", price: 190, img: I("special-mix-3"), tag: "Sharing",
      desc: "A large mixed kabab platter that feeds three." },
    { id: "special-mix-24", cat: "platters", name: "Special Mix Kebab (24 skewers)", ar: "مشاوي مشكل عائلي (٢٤ سيخ)", price: 390, img: I("special-mix-24"), tag: "Family",
      desc: "24 skewers with 2 hummus, 5 rice, bread and salad. Made for a family table." },

    /* ------------------- PERSIAN MAINS & STEWS ------------------- */
    { id: "seabream", cat: "mains", name: "Grilled Seabream", ar: "سمك سيبريم مشوي", price: 59, img: I("seabream"),
      desc: "Whole seabream grilled with spices, served with saffron rice and lemon." },
    { id: "lamb-ribs", cat: "mains", name: "Lamb Ribs", ar: "ظلع لحم الضان (كف دنده)", price: 60, img: I("lamb-ribs"), tag: "Lamb",
      desc: "Grilled lamb ribs (kaf dandeh) with grilled tomato, pepper and flatbread." },
    { id: "shrimp", cat: "mains", name: "Grilled Shrimp", ar: "روبيان مشوي", price: 69, img: I("shrimp"),
      desc: "Large shrimp marinated and grilled, served with lemon and fresh herbs." },
    { id: "kase-khoori", cat: "mains", name: "Kase Kabab Khoori", ar: "كاسه كباب خوري", price: 59, img: I("kase-khoori"),
      desc: "Our house kabab bowl with rice, grilled vegetables, mushrooms and pickles." },
    { id: "lamb-neck", cat: "mains", name: "Lamb Neck with Rice", ar: "رقبة الخروف مع الرز", price: 79, img: I("lamb-neck"), tag: "Lamb",
      desc: "Slow-cooked lamb neck in rich sauce, served with herb rice and saffron rice." },
    { id: "lamb-shank", cat: "mains", name: "Lamb Shank with Rice", ar: "موزة الخروف مع الرز", price: 79, img: I("lamb-shank"), tag: "Lamb",
      desc: "Slow-cooked lamb shank in tomato sauce, served with herb rice and saffron rice." },
    { id: "dizy", cat: "mains", name: "Dizy", ar: "ديزي", price: 79, img: I("dizy"),
      desc: "Traditional Persian lamb stew served in its own pot, with flatbread and herbs." },
    { id: "kalah-pache", cat: "mains", name: "Kalah Pache", ar: "راس الخروف والكوارع (كله پاچه)", price: 79, img: I("kalah-pache"), tag: "Lamb",
      desc: "Lamb head and trotters with broth, flatbread, onion and lemon." },
    { id: "eggplant-stew", cat: "mains", name: "Eggplant Stew", ar: "قيمة باذنجان", price: 49, img: I("eggplant-stew"),
      desc: "Persian ghormeh stew with split peas, tomato and grilled eggplant." },
    { id: "ghelie-mahi", cat: "mains", name: "Ghelie Mahi Stew", ar: "قلية ماهي", price: 59, img: I("ghelie-mahi"),
      desc: "Southern Persian fish stew with herbs and tamarind." },
    { id: "okra-stew", cat: "mains", name: "Okra Stew", ar: "البامية", price: 49, img: I("okra-stew"),
      desc: "Okra simmered in a tomato-based sauce." },
    { id: "ghorme-sabzi", cat: "mains", name: "Ghorme Sabzi Stew", ar: "قورمة سبزي", price: 49, img: I("ghorme-sabzi"),
      desc: "Herb stew with red beans, the classic Persian ghormeh sabzi." },

    /* ---------------------- SANDWICHES & BURGERS ---------------------- */
    { id: "pinota", cat: "sandwiches", name: "Pinota", ar: "بينوتا", price: 39, img: I("pinota"),
      desc: "Beef burger + pepperoni sausage + mushroom + cheese. Served with potato wedges." },
    { id: "charkol-burger", cat: "sandwiches", name: "Charkol Burger", ar: "برجر ذغالي", price: 39, img: I("charkol-burger"),
      desc: "Charcoal-grilled beef burger with pickles, tomato and sauce. Served with potato wedges." },
    { id: "manilco", cat: "sandwiches", name: "Manilco", ar: "مانيلكو", price: 39, img: I("manilco"),
      desc: "Beef burger + chicken and meat mortadella + toasted bread with mushrooms and cheese. Served with potato wedges." },
    { id: "panapa", cat: "sandwiches", name: "Panapa", ar: "بانابا", price: 39, img: I("panapa"),
      desc: "Beef burger + cheese sausage + cheese + mushroom. Served with potato wedges." },
    { id: "hot-dog", cat: "sandwiches", name: "Hot Dog", ar: "هوت دوغ", price: 39, img: I("hot-dog"),
      desc: "High quality sausage in a fresh roll. Served with potato wedges." },
    { id: "sausage-bendari", cat: "sandwiches", name: "Sausage Bendari", ar: "نقانق بندري", img: I("sausage-bendari"),
      desc: "Spicy hot dog slices with our special hot sauce. Does not contain mushroom or cheese.",
      variants: [{ label: "Sandwich", price: 39 }, { label: "Plate", price: 49 }] },
    { id: "hayoola", cat: "sandwiches", name: "Hayoola Special Feri Kasif", ar: "هايولا اسبيشل", price: 39, img: I("manilco"),
      desc: "Beef steak + roast beef + brain + tongue + mushrooms + cheese." },
    { id: "hot-food", cat: "sandwiches", name: "Hot Food", ar: "هات فود", price: 39, img: I("pinota"),
      desc: "Beef steak + chicken breast + hot sauce." },
    { id: "top-food", cat: "sandwiches", name: "Top Food", ar: "تاب فود", price: 39, img: I("manilco"),
      desc: "Beef steak + chicken and meat mortadella." },
    { id: "godzilla", cat: "sandwiches", name: "Godzilla", ar: "جودزيلا", price: 39, img: I("sausage-bendari"),
      desc: "Hot dog + chicken breast + pepperoni sausage + hot sauce." },
    { id: "kokoli", cat: "sandwiches", name: "Kokoli", ar: "كوكولي", price: 39, img: I("hot-dog"),
      desc: "Cheese sausage + chicken and meat mortadella." },
    { id: "marcopolo", cat: "sandwiches", name: "Marcopolo", ar: "ماركوبولو", price: 39, img: I("panapa"),
      desc: "Fillet beef + beef and chicken mortadella + chicken breast." },
    { id: "beef-steak", cat: "sandwiches", name: "Beef Steak", ar: "ستيك بقري", price: 39, img: I("charkol-burger"),
      desc: "Thinly sliced grilled beef steak fillet." },
    { id: "roast-beef", cat: "sandwiches", name: "Roast Beef", ar: "روست بيف", price: 39, img: I("manilco"),
      desc: "Rich roasted beef, marinated with healthy herbs, lemon and garlic." },
    { id: "chicken-fillet", cat: "sandwiches", name: "Chicken Fillet", ar: "دجاج فيلية", price: 39, img: I("sausage-bendari"),
      desc: "Sliced grilled chicken fillet breast." },
    { id: "fadat-sham", cat: "sandwiches", name: "Fadat Sham", ar: "فدات شم", price: 39, img: I("pinota"),
      desc: "Beef burger + hot sauce + bacon + onion + cheese + mushroom." },
    { id: "kapola", cat: "sandwiches", name: "Kapola", ar: "كابولا", price: 39, img: I("hot-dog"),
      desc: "Cheese sausage + hot dog + pepperoni sausage." },
    { id: "bari-bakh", cat: "sandwiches", name: "Bari Bakh", ar: "باري باخ", price: 39, img: I("panapa"),
      desc: "Beef steak + roast beef + meat mortadella + sausage + cheese + parsley + mayonnaise. Does not contain lettuce." },
    { id: "troy", cat: "sandwiches", name: "Troy", ar: "تروى", price: 39, img: I("charkol-burger"),
      desc: "Beef burger + hot dog + pepperoni + sausage + mayonnaise." },
    { id: "daffi", cat: "sandwiches", name: "Daffi", ar: "دافى", price: 39, img: I("hot-dog"),
      desc: "Mortadella + chicken and meat + potato chips + mayonnaise + toasted bread. Does not contain lettuce." },
    { id: "brain-tongue", cat: "sandwiches", name: "Brain & Tongue", ar: "ساندويج المخ و اللسان", img: I("sausage-bendari"),
      desc: "A mixture of tongue and brain.",
      variants: [{ label: "Sandwich", price: 39 }, { label: "Plate", price: 49 }] },
    { id: "alfredo", cat: "sandwiches", name: "Alfredo", ar: "الفريدو", price: 39, img: I("pinota"),
      desc: "Beef burger + sausage + pandri + cheese + mushroom." },
    { id: "tandoori-martadella", cat: "sandwiches", name: "Tandoori Martadella", ar: "تندورى مرتديلا", price: 39, img: I("manilco"),
      desc: "Tandoori-style mortadella sandwich." },

    /* ------------------------------ PIZZA ------------------------------
       The menu shows one price range (39 – 49) for every pizza. "Regular"
       and "Large" are assumed size names: change the labels if different. */
    ...[
      ["special-pizza", "Special Pizza", "البيتزا الخاصة", "Hot dog + beef mortadella + chicken mortadella.", "pizza-round"],
      ["red-pizza", "Red Pizza", "أحمر بيتزا", "Beef mortadella + grilled beef steak + pepperoni sausage.", "pizza-square"],
      ["mamali-pizza", "Mamali Pizza", "بيتزا مامالي", "Hot dog + minced beef + onion + beef mortadella + potato.", "pizza-round"],
      ["mishnaz-pizza", "Mishnaz Pizza", "بيتزا ميشناز", "Steak + garlic + mushroom + tomato + paprika.", "pizza-square"],
      ["dantes-pizza", "Dantes Pizza", "بيتزا دانتس", "Beef burger + pepperoni sausage + pickles.", "pizza-round"],
      ["white-pizza", "White Pizza", "بيتزا بيضاء", "Chicken mortadella + chicken fillet + toppings with mayo sauce.", "pizza-square"],
      ["vegetable-pizza", "Vegetable Pizza", "بيتزا الخضروات", "Paprika + onion + corn + tomato + corn and peas.", "pizza-round"],
      ["beef-mushroom-pizza", "Beef & Mushroom Pizza", "بيتزا لحم و مشروم", "Beef + mushroom.", "pizza-square"],
      ["pepperoni-pizza", "Pepperoni Pizza", "بيتزا البيبروني", "Pepperoni sausage.", "pizza-round"],
      ["margarita-pizza", "Margarita", "بيتزا مارجريتا", "Cheese + tomato.", "pizza-square"],
      ["chicken-pizza", "Chicken Pizza", "بيتزا دجاج", "Chicken pizza with cheese.", "pizza-round"],
      ["sausage-bandari-pizza", "Sausage Bandari Pizza", "بيتزا نقانق بندري", "Bandari sausage pizza with cheese.", "pizza-square"]
    ].map(([id, name, ar, desc, img]) => ({
      id, cat: "pizza", name, ar, desc, img: I(img),
      variants: [{ label: "Regular", price: 39 }, { label: "Large", price: 49 }]
    })),

    /* ------------------------------ BAKERY ------------------------------
       The PDF menu has no bakery prices. This is a SAMPLE item: edit the
       price, or delete it, then add your own bakery items.                */
    { id: "sangak-bread", cat: "bakery", name: "Sangak Bread", ar: "خبز سنگك", price: 7, img: I("hero-bakers"),
      desc: "Traditional Persian flatbread baked fresh in the oven." },
    { id: "sangak-bread-special", cat: "bakery", name: "Sangak Bread Special", ar: "خبز سنگك سبيشل", price: 10, img: I("hero-bakers"),
      desc: "Traditional Persian flatbread baked fresh in the oven." },

    /* --------------------------- STARTERS & DIPS --------------------------- */
    { id: "moutabal", cat: "starters", name: "Moutabal", ar: "متبل", price: 18, img: I("moutabal"), desc: "Smoked eggplant and tahini dip with olive oil." },
    { id: "hummus", cat: "starters", name: "Hummus", ar: "حمص", price: 13, img: I("hummus"), desc: "Creamy chickpea and tahini dip with olive oil." },
    { id: "labneh", cat: "starters", name: "Labneh", ar: "لبنة", price: 10, img: I("labneh"), desc: "Strained yogurt with olive oil and mint." },
    { id: "spinach-yogurt", cat: "starters", name: "Spinach Yogurt", ar: "زبادي السبانخ", price: 15, img: I("spinach-yogurt"), desc: "Yogurt with cooked spinach (borani)." },
    { id: "mast-moosir", cat: "starters", name: "Mast Moosir", ar: "ماست موسير", price: 5, img: I("mast-moosir"), desc: "Yogurt with wild shallot and herbs." },
    { id: "kask-bademjan", cat: "starters", name: "Kask Bademjan", ar: "كشك باذنجان", price: 25, img: I("kask-bademjan"), desc: "Eggplant topped with kashk, fried onion and mint oil." },
    { id: "omelette", cat: "starters", name: "Omelette", ar: "شكشوكة", price: 30, img: I("omelette"), desc: "Eggs cooked with tomato, served with cucumber and tomato." },
    { id: "cheese-plate", cat: "starters", name: "Cheese + Tomato + Cucumber", ar: "جبنة + خيار + طماطم", price: 20, img: I("cheese-plate"), desc: "White cheese with fresh tomato, cucumber and herbs." },

    /* ------------------------------ SALADS ------------------------------ */
    { id: "indonesian-salad", cat: "salads", name: "Indonesian Salad", ar: "سلطة اندونيسية", price: 19, img: I("indonesian-salad"), desc: "Red cabbage, lettuce, corn, carrot and radish." },
    { id: "special-salad", cat: "salads", name: "Special Salad", ar: "سلطة اسبشيال", price: 19, img: I("special-salad"), desc: "House salad with olives, cucumber, tomato and shredded toppings." },
    { id: "caesar-salad", cat: "salads", name: "Caesar Salad", ar: "سلطة سزار", price: 19, img: I("caesar-salad"), desc: "Lettuce, chicken, croutons and Caesar dressing." },
    { id: "gerger-salad", cat: "salads", name: "Gerger Salad", ar: "سلطة جرجير", price: 19, img: I("gerger-salad"), desc: "Rocket, cucumber, radish and pomegranate." },
    { id: "beetroot-salad", cat: "salads", name: "Beetroot Salad", ar: "سلطة شمندر", price: 19, img: I("beetroot-salad"), desc: "Sliced beetroot on fresh greens." },
    { id: "fattoush-salad", cat: "salads", name: "Fattoush Salad", ar: "سلطة فتوش", price: 19, img: I("fattoush-salad"), desc: "Mixed greens, vegetables and crispy bread." },
    { id: "tabbouleh-salad", cat: "salads", name: "Tabbouleh Salad", ar: "سلطة تبولة", price: 19, img: I("tabbouleh-salad"), desc: "Finely chopped parsley, tomato and bulgur." },
    { id: "shirazi-salad", cat: "salads", name: "Shirazi Salad", ar: "سلطة شيرازي", price: 19, img: I("shirazi-salad"), desc: "Diced cucumber, tomato and onion." },

    /* --------------------------- SOUPS & SIDES --------------------------- */
    { id: "baghali-polo", cat: "sides", name: "Baghali Polo", ar: "الأرز اخضر", price: 12, img: I("baghali-polo"), desc: "Rice with dill and broad beans, topped with saffron." },
    { id: "plain-rice", cat: "sides", name: "Plain Rice", ar: "الأرز أبيض", price: 12, img: I("plain-rice"), desc: "Steamed basmati rice with saffron and butter." },
    { id: "french-fries", cat: "sides", name: "French Fries", ar: "بطاطس مقلية", price: 19, img: I("french-fries"), desc: "Crispy golden fries." },
    { id: "fries-mushroom", cat: "sides", name: "French Fries Cheese Mushroom", ar: "بطاطس مقلية جبن الفطر", price: 19, img: I("fries-mushroom"), desc: "Fries topped with cheese and mushrooms." },
    { id: "lentil-soup", cat: "sides", name: "Lentil Soup", ar: "شوربة العدس", price: 10, img: I("lentil-soup"), desc: "Warm lentil soup served with lemon." },
    { id: "aash", cat: "sides", name: "Aash", ar: "آش", price: 19, img: I("aash"), desc: "Thick Persian noodle and herb soup with kashk and fried onion." },

    /* ------------------------- DRINKS & DESSERT ------------------------- */
    /* Each drink is its own item. Photos are all the same shape (800 x 500). */
    { id: "drink-limonade", cat: "drinks", name: "Limonade", price: 7, img: I("drink-limonade"), desc: "Chilled lemon soft drink." },
    { id: "drink-laban", cat: "drinks", name: "Laban Qamarzada", price: 6, img: I("drink-laban"), desc: "Chilled laban (yogurt drink)." },
    { id: "drink-doogh", cat: "drinks", name: "Doogh Abeali", price: 7, img: I("drink-doogh"), desc: "Chilled Persian yogurt drink (doogh)." },
    { id: "drink-coca-cola", cat: "drinks", name: "Coca Cola", price: 5, img: I("drink-coca-cola"), desc: "Chilled soft drink." },
    { id: "drink-mountain-dew", cat: "drinks", name: "Mountain Dew", price: 5, img: I("drink-mountain-dew"), desc: "Chilled soft drink." },
    { id: "drink-pepsi", cat: "drinks", name: "Pepsi", price: 5, img: I("drink-pepsi"), desc: "Chilled soft drink." },
    { id: "drink-mirinda", cat: "drinks", name: "Mirinda Orange", price: 5, img: I("drink-mirinda"), desc: "Chilled orange soft drink." },
    { id: "dough-cup", cat: "drinks", name: "Dough (Cup)", ar: "دوغ", price: 10, img: I("dough-cup"), desc: "Freshly served yogurt drink with mint." },
    { id: "faloode", cat: "drinks", name: "Faloode", ar: "فالودة", price: 15, img: I("faloode"), desc: "Persian frozen dessert with vermicelli, syrup and ice." },
    { id: "juice-cocktail", cat: "drinks", name: "Cocktail Juice", ar: "كوكتيل", price: 15, img: I("juice-cocktail"), desc: "Mixed fresh fruit juice." },
    { id: "juice-banana", cat: "drinks", name: "Banana Juice", ar: "موز", price: 15, img: I("juice-banana"), desc: "Fresh banana juice." },
    { id: "juice-avocado", cat: "drinks", name: "Avocado Juice", ar: "أفوكادو", price: 15, img: I("juice-avocado"), desc: "Fresh avocado juice." },
    { id: "juice-watermelon", cat: "drinks", name: "Watermelon Juice", ar: "بطيخ", price: 15, img: I("juice-watermelon"), desc: "Fresh watermelon juice." },
    { id: "juice-apple", cat: "drinks", name: "Apple Juice", ar: "تفاح", price: 15, img: I("juice-apple"), desc: "Fresh apple juice." },
    { id: "juice-lemon-mint", cat: "drinks", name: "Lemon Mint", ar: "ليمون نعناع", price: 15, img: I("juice-lemon-mint"), desc: "Fresh lemon juice with mint." },
    { id: "juice-orange", cat: "drinks", name: "Orange Juice", ar: "برتقال", price: 15, img: I("juice-orange"), desc: "Fresh orange juice." },
    { id: "juice-pineapple", cat: "drinks", name: "Pineapple Juice", ar: "أناناس", price: 15, img: I("juice-pineapple"), desc: "Fresh pineapple juice." },
    { id: "juice-mango", cat: "drinks", name: "Mango Juice", ar: "مانجو", price: 15, img: I("juice-mango"), desc: "Fresh mango juice." },
    { id: "juice-strawberry", cat: "drinks", name: "Strawberry Juice", ar: "فراولة", price: 15, img: I("juice-strawberry"), desc: "Fresh strawberry juice." },
    { id: "juice-carrot", cat: "drinks", name: "Carrot Juice", ar: "جزر", price: 15, img: I("juice-carrot"), desc: "Fresh carrot juice." },

    /* ------------------------- RAW MEAT (PER KG) ------------------------- */
    { id: "raw-minced-meat", cat: "raw", name: "Minced Meat Raw (1 kg)", ar: "كيلو كباب مفروم لحم نيء", price: 165, img: I("raw-minced-meat"), tag: "Per kg", desc: "Marinated minced meat for kabab, sold raw by the kilo." },
    { id: "raw-lamb-lemon", cat: "raw", name: "Lamb Lemon Tikka Raw (1 kg)", ar: "كيلو تكة لحم ليمون نيء", price: 95, img: I("raw-lamb-lemon"), tag: "Per kg", desc: "Lemon-marinated meat tikka, sold raw by the kilo." },
    { id: "raw-meat-yoghurt", cat: "raw", name: "Meat Yoghurt Tikka Raw (1 kg)", ar: "كيلو تكة لحم بالروب نيء", price: 95, img: I("raw-meat-yoghurt"), tag: "Per kg", desc: "Yogurt-marinated meat tikka, sold raw by the kilo." },
    { id: "raw-chicken-saffron", cat: "raw", name: "Chicken Tikka w/ Saffron Raw (1 kg)", ar: "كيلو تكة دجاج بالزعفران", price: 95, img: I("raw-chicken-saffron"), tag: "Per kg", desc: "Boneless saffron chicken tikka, sold raw by the kilo." },
    { id: "raw-chicken-yoghurt", cat: "raw", name: "Chicken Yoghurt Tikka Raw (1 kg)", ar: "كيلو تكة دجاج بالروب نيء", price: 95, img: I("raw-chicken-yoghurt"), tag: "Per kg", desc: "Yogurt-marinated chicken tikka, sold raw by the kilo." },
    { id: "raw-lamb-kebab", cat: "raw", name: "Lamb Kebab Raw (1 kg)", ar: "كيلو كباب لحم خروف نيء", price: 165, img: I("raw-minced-meat"), tag: "Per kg", desc: "Minced lamb kabab, sold raw by the kilo." },
    { id: "raw-lamb-chops", cat: "raw", name: "Lamb Chops Raw (1 kg)", ar: "كيلو ريش خروف نيء", price: 185, img: I("lamb-chops"), tag: "Per kg", desc: "Lamb chops, sold raw by the kilo." },
    { id: "raw-camel-tikka", cat: "raw", name: "Camel Tikka Raw (1 kg)", ar: "كيلو تكة جمل", price: 165, img: I("camel-tikka"), tag: "Per kg", desc: "Camel meat tikka, sold raw by the kilo." }
  ];
})();
