# 🛍️ WitScraper – Shopify Product Scraper

A state-of-the-art developer and e-commerce utility designed to instantly identify, scrape, and export complete product databases from any Shopify-powered storefront. Built with private, local-first execution paradigms and zero third-party dependencies, WitScraper delivers verified, multi-variant CSV files fully compatible with Shopify's direct product importer.

This repository features a **dual-architecture layout** containing:
1.  **📦 Chrome Extension**: An unpacked, ultra-lightweight browser utility.
2.  **⚛️ React Web Landing Page**: A premium, glassmorphic single-page presentation built on React and Vite, featuring an interactive live scraper simulation engine.

---

## 🎨 Technology Stack & Optimization

*   **Chrome Extension Core**: Vanilla HTML5, CSS3, and high-performance Javascript.
*   **Asset Footprint (Optimized)**: The primary 1.6MB icon has been systematically downscaled and compressed to four web-standard outputs (`16px`, `32px`, `48px`, `128px`), shrinking extension storage requirements by **98.7%** (only ~20KB total!).
*   **Web Portal**: React 18, Vite 8, and Outfit + Inter typography, featuring custom 3D coordinate-tracking components and real-time state simulators.

---

## ✨ Core Features

*   **🔍 Auto-Detection**: Instantly audits the active webpage to identify active Shopify configurations and global scripts.
*   **📊 Comprehensive Data Mapping**: Extracts variant titles, individual option values, SKU databases, weights (grams), tags, image assets, SEO headers, prices, and cost-per-item calculations.
*   **📚 Collection Auditing**: Detects store collection channels and updates popup selectors to filter and scrape targeted categories.
*   **💾 Multi-variant Support**: Processes complex, multi-row variant structures cleanly, maintaining parent-child relations for flawless imports.
*   **⚡ Multiple Export Engines**: Download complete product catalogs, specific selected items via checkout check-boxes, or single listings instantly.
*   **🔒 Local and Secure**: Zero cloud connections, zero tracking trackers, and completely transparent local-unpacked builds.

---

## 🚀 Quick Start Guide

### 1. Load the Chrome Extension

Since WitScraper is loaded from source, compile it directly into Chrome in under 60 seconds:

1.  Open **Google Chrome** and navigate to `chrome://extensions/` in your address bar.
2.  Enable **Developer Mode** by clicking the toggle switch in the top-right corner.
3.  Click the **Load unpacked** button in the top-left corner.
4.  Select the **`extension/`** subdirectory of this project (the folder containing `manifest.json`).
5.  Click the puzzle piece icon on your Chrome toolbar, find **WitScraper**, and click the pushpin icon to keep it visible!

### 2. Run the React Landing Page Locally

Explore the interactive live simulator and tilt mockup animations on your local workstation:

1.  Open your terminal and enter the web app directory:
    ```bash
    cd site
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite hot-reloading development server:
    ```bash
    npm run dev
    ```
4.  Open the local address printed in the terminal (e.g. `http://localhost:5173`) in Chrome!

### 3. Packaging & Bundling (ZIP Builder)

If you update the extension code (inside the `extension/` folder) and want to bundle it for others to download:

1.  Open your terminal in the repository root directory.
2.  Execute the automated build utility:
    ```bash
    node scripts/build-zip.js
    ```
3.  The package engine will verify your source files, check folder mappings, and bundle the optimized extension files directly into `site/public/witscraper-extension.zip` in under a second! It utilizes a platform-independent zipping scheme.

---

## 📖 How to Use

1.  **Auditing Stores**: Navigate to any e-commerce storefront (e.g., `gymshark.com`, `colourpop.com`). Open the extension from your toolbar.
    *   *If Shopify*: The dashboard lights up showing theme metadata, verified badges, active first/last catalog dates, and statistical item counters.
    *   *If Non-Shopify*: Renders a secure warnings box detailing non-compatible environments.
2.  **Filtering & Searching**: Input key titles in the search bar or pick collections from the dropdown selection to filter the card grid view.
3.  **Downloading**: Click **Export All Products**, download filtered grids using collection triggers, check specific cards for custom exports, or click individual export tags.

---

## 🗃️ Exported CSV Schema

WitScraper generates CSV blocks conforming directly to Shopify Import specifications. The output features these core fields:

| CSV Column Header | Description | Example Output |
| :--- | :--- | :--- |
| **Handle** | URL-friendly product slug | `nebula-oversized-hoodie` |
| **Title** | Scraped item name | `"Nebula Oversized Hoodie"` |
| **Body (HTML)** | Structured item description | `"<p>Premium high-quality items...</p>"` |
| **Vendor** | Store brand ownership | `"Aesthetic Clothing Co."` |
| **Type** | Broad product categorization | `"Apparel > Hoodie"` |
| **Tags** | Meta descriptors and tags | `summer, cozy, oversized, premium` |
| **Option1 Name** | Primary variant property | `Size` |
| **Option1 Value** | Specific variant value | `OS` |
| **Variant SKU** | Auto-formatted stock SKU | `AP-NEBUL-OS` |
| **Variant Price** | Selling price value | `59.00` |
| **Cost per Item** | Auto-calculated profit cost | `23.60` (Based on 40% margin metrics) |
| **Image Src** | High-resolution photo asset | `https://cdn.shopify.com/...` |
| **Status** | Publication status | `active` |

---

## 🔒 Security & Privacy

WitScraper is built on **trust, local execution, and privacy**:
*   No external analytics engines or tracking cookies.
*   Zero telemetry. All operations run directly inside standard Google API hooks inside your active session.
*   The raw code is fully auditable inside `extension/content.js` and `extension/popup.js`.

---

## 💡 About the Creator

**Sushant Gautam** is a full-stack engineer and designer dedicated to engineering high-performance, private-first developer utilities. Check out creative systems, web portals, and portfolios at:
👉 **[Sushant.online](https://www.sushant.online)**

---

**Happy Scraping!** 🕵️‍♂️
