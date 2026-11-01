# Khori Special Kabab Restaurant: ordering website

A frontend-only restaurant site (HTML, CSS, JavaScript). No backend, database, login, payment or paid API.
Customers build a cart, enter delivery details, and the site opens WhatsApp with the order pre-filled.
**The order is only delivered when the customer taps Send in WhatsApp.**

## Run it
1. Unzip the folder.
2. Double-click `index.html` (opens in any modern browser).
   For best results (and for "Share my location" to work) serve it over http/https:
   - `cd khori && python3 -m http.server 8000`, then open http://localhost:8000
   - or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, your web hosting).
   Location sharing needs https or localhost in most browsers.
3. The page uses Google Fonts when online and falls back to system fonts offline.

## Folder
```
index.html          page structure
css/style.css       design (colours are variables at the top)
js/config.js        restaurant name, phone numbers, WhatsApp number, currency, hours, categories
js/menu-data.js     every dish: name, Arabic name, description, price, photo
js/app.js           cart, search, checkout, WhatsApp message, validation
images/logo.png     logo
images/menu/        dish photos (cropped from your PDF menu)
```

## Customize
- **WhatsApp number**: `js/config.js` -> `whatsappNumber` (country code + number, digits only, e.g. `"971588835200"`).
- **Name, phones, address, Instagram, hours, delivery fee, minimum order, currency**: `js/config.js`.
- **Opening hours**: `hours.open` / `hours.close` in 24h format. If close is earlier than open it means "next day". The "Open now / Closed" badge uses the `timezone`.
- **Add a dish**: copy any line in `js/menu-data.js`, change `id` (must be unique), `cat`, `name`, `price`, `img`.
  Put the photo in `images/menu/` and use `I("my-photo")` for `my-photo.jpg`, or paste a full web image URL.
- **Two prices for one dish**: use `variants: [{label:"Small", price:39}, {label:"Large", price:49}]` instead of `price`.
- **Categories**: edit `categories` in `js/config.js`. Every dish's `cat` must match a category `id`.
- **Popular picks on the home page**: `featuredIds` in `js/config.js`.
- **Colours / fonts**: variables at the top of `css/style.css`.

## Notes
- The cart is saved in the browser's localStorage, so it survives a refresh. Prices are re-read from `menu-data.js`, so price edits apply to saved carts.
- Contact form messages also open in WhatsApp (there is no server to receive emails).
- Items with no photo in the PDF reuse the closest dish photo. Change the `img` value to use a different photo.
