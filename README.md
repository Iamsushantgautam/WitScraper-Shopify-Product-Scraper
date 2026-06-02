# 🛍️ WitScraper – Shopify Product Scraper (Chrome Extension)

A lightweight, powerful, and private-first Chrome extension designed to extract complete product databases—including title details, variant configurations, exact pricing, image assets, and SEO descriptions—from any Shopify-powered online store. Export directly to a properly formatted CSV ready for Shopify import verification.

This directory contains the isolated, unpacked source files for the **WitScraper Chrome Extension**.

---

## ✨ Features

*   **⚡ Ambient Store Auditing**: Instantly scans your active browser tab to confirm if it is built on Shopify.
*   **📦 Deep Product Scraping**: Recursively iterates through shop collection pages to scrape variant descriptions, option combinations, exact pricing, weight metrics, SKUs, and tags.
*   **📚 Collection Filter**: Renders category channels in a dropdown list, allowing users to isolate and download targeted collections.
*   **🔍 Searchable Grid Preview**: View extracted products in a visual grid, search items dynamically, and choose exactly what to export.
*   **💾 Flexible Downloads**: Export the entire catalog, designated collections, a custom hand-picked selection of cards, or individual products.
*   **🔒 100% Secure & Private**: Zero external analytics APIs, zero databases, and completely local execution.

---

## 🛠️ Technical Architecture & Permissions

WitScraper operates strictly on Google Chrome's **Manifest v3 (MV3)** extension guidelines:

*   **`manifest.json`**: Declares Manifest v3 standards, mapping out background content scripts, popup interfaces, and permission scopes.
*   **`activeTab`**: Used to safely run page audit scripts on the user's active tab only when the popup is clicked.
*   **`scripting`**: Injects lightweight page DOM scanners (`content.js`) to query shop variables in real time.
*   **`downloads`**: Compiles dynamic CSV Blobs locally inside the popup environment and triggers standard browser downloads securely.
*   **`host_permissions (<all_urls>)`**: Necessary to execute scraping fetches against custom-domain Shopify stores.

---

## 📂 File Manifest

*   **[manifest.json](file:///d:/My%20Project/Chrome%20extension/WitScraper%20–%20Shopify%20Product%20Scraper/extension/manifest.json)**: Extension entry point and metadata.
*   **[popup.html](file:///d:/My%20Project/Chrome%20extension/WitScraper%20–%20Shopify%20Product%20Scraper/extension/popup.html)**: Translucent, elegant dashboard view.
*   **[popup.css](file:///d:/My%20Project/Chrome%20extension/WitScraper%20–%20Shopify%20Product%20Scraper/extension/popup.css)**: Layout styling, card grids, verified badges, and animations.
*   **[popup.js](file:///d:/My%20Project/Chrome%20extension/WitScraper%20–%20Shopify%20Product%20Scraper/extension/popup.js)**: State controllers, product loaders, collection filters, and CSV creation engines.
*   **[content.js](file:///d:/My%20Project/Chrome%20extension/WitScraper%20–%20Shopify%20Product%20Scraper/extension/content.js)**: Active tab page DOM parsing script.
*   **`icons/`**: Lightweight, web-optimized asset icons (`16px`, `32px`, `48px`, `128px`).

---

## 🚀 Standalone Installation

To load this extension directly into Google Chrome:

1.  Open **Google Chrome** on your computer.
2.  Navigate to the extensions manager by typing `chrome://extensions/` in your address bar and hitting Enter.
3.  In the top-right corner, toggle the **Developer mode** switch to **ON**.
4.  In the top-left, click the **Load unpacked** button.
5.  Select **this `extension/` folder** (the directory containing `manifest.json`).
6.  Click the puzzle piece icon on your Chrome toolbar, find **WitScraper**, and click the pushpin icon to keep it pinned!

---

## 🗃️ CSV Export Mapping

The CSV file downloaded by the extension maps directly to Shopify's product CSV layout. It populates standard import columns, including:
*   `Handle` (URL slug)
*   `Title`
*   `Body (HTML)` (Clean, structured product description)
*   `Vendor` & `Type`
*   `Tags`
*   `Option1 Name` (e.g. Size, Color) & `Option1 Value`
*   `Variant SKU`
*   `Variant Grams` (Weight metrics)
*   `Variant Price`
*   `Variant Inventory Tracker` (Defaults to `shopify`)
*   `Variant Inventory Qty`
*   `Image Src` (Direct Shopify image URL link)

---

## 🔒 Privacy & Open Source

WitScraper runs completely **locally inside your browser context**. 
*   No database tracking.
*   No cookies or third-party log analytics.
*   The raw code is fully auditable in this folder. It requests standard API calls to public Shopify endpoints (e.g., `products.json`) to perform extractions cleanly.

---

## 💡 About the Creator

**Sushant Gautam** is a full-stack engineer and designer dedicated to engineering high-performance, private-first developer utilities. Check out creative systems, web portals, and portfolios at:
👉 **[Sushant.online](https://www.sushant.online)**
