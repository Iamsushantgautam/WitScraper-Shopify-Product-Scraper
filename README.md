# 🛍️ WitScraper – Shopify Product Scraper

A powerful and user-friendly Chrome extension designed to extract product data from any Shopify-powered online store. Export complete product catalogs, including variants and images, directly into a CSV file compatible with Shopify's import verification.

## ✨ Key Features

*   **Auto-Detection**: Instantly identifies if the current website is a Shopify store.
*   **Comprehensive Data**: Scrapes titles, handles, descriptions (HTML), prices, variants, images, and SEO metadata.
*   **Collection Filtering**: Select and export products from specific collections only.
*   **One-Click Export**: Download a properly formatted CSV ready for Shopify import.
*   **Smart Dashboard**: View store statistics like total products, collections, and catalog age at a glance.
*   **Batch & Single Export**: Choose to export the entire store, a specific collection, or individual products.

---

## 📂 Folder Structure

This repository is structured into two clean parts:
*   **`extension/`**: Contains ONLY the Chrome extension files (manifest, popup, background scripting, optimized icons). This keeps the extension isolated and extremely lightweight.
*   **Root Folder**: Contains the premium landing page (`index.html`, `style.css`, `script.js`) featuring an interactive Live Scraper Simulator, alongside the one-click packager utility (`build-zip.ps1`) and the generated ZIP bundle (`witscraper-extension.zip`).

---

## 🚀 How to Install Locally

Since this extension is in development, follow these steps to load it into Google Chrome:

1.  **Download the Code**:
    *   Ensure you have the repository folder. The extension files reside inside the `extension/` subdirectory.

2.  **Open Chrome Extensions Page**:
    *   Open Google Chrome.
    *   In the address bar, type: `chrome://extensions/` and hit Enter.

3.  **Enable Developer Mode**:
    *   Look for the toggle switch named **"Developer mode"** in the top right corner.
    *   Turn it **ON**.

4.  **Load the Extension**:
    *   Click the **"Load unpacked"** button that appears in the top left.
    *   Navigate to the repository folder, and select the **`extension/`** subdirectory (the folder containing `manifest.json`).

5.  **Pin It**:
    *   Click the puzzle piece icon in your Chrome toolbar.
    *   Find "WitScraper – Shopify Product Scraper" and click the pushpin icon to keep it visible.

---

## 📦 Bundling the Extension (ZIP Builder)

To generate the download-ready `witscraper-extension.zip` file containing only the extension source files:
1. Open PowerShell in the project root directory.
2. Run the build script:
   ```powershell
   powershell -File .\scripts\build-zip.ps1
   ```
3. The script will automatically verify the extension assets, clean old files, and bundle them directly into the React app's public folder at `site/public/witscraper-extension.zip` for instant downloads! This keeps the project root clean and organized.

---

## 📖 How to Use

1.  **Navigate to a Store**:
    *   Visit any e-commerce website (e.g., `gymshark.com`, `colourpop.com`).
    *   The extension icon will remain active.

2.  **Open the Extension**:
    *   Click the extension icon in your toolbar.
    *   **If it's a Shopify store**: You will see the "Connected" dashboard with store stats.
    *   **If it's NOT a Shopify store**: You will see a "Not Shopify" warning and a promotional offer.

3.  **Export Data**:
    *   **Export All**: Click **"Export All Products"** to fetch and download the entire catalog.
    *   **Export Collection**: Select a collection from the dropdown menu. The grid will update to show only those products. Click **"Export Collection"** to download them.
    *   **Select & Export**: Check the boxes on specific product cards and click **"Download Selected"** (floating bar).
    *   **Single Product**: Click the **"Export"** button on any individual card.

4.  **Review CSV**:
    *   The downloaded file is formatted for Shopify. You can open it in Excel, Google Sheets, or import it directly into another Shopify store.

---

## ⚠️ Troubleshooting & Notes

*   **"Not a Shopify Store"**: This tool only works on sites built with Shopify. It detects standard Shopify global variables. Custom headless builds might not always be detected.
*   **Slow Export**: For stores with thousands of products, the export process might take a minute as it fetches data page-by-page. Please be patient and keep the popup open if required (though the background script handles most tasks).
*   **Missing Images**: The tool scrapes image URLs. If the source store protects its images or deletes them, they won't appear.

---

**Happy Scraping!** 🕵️‍♂️
