// Check if it's a Shopify store
function isShopify() {
    return !!(window.Shopify || document.querySelector('script[src*="shopify"]'));
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "CHECK_SHOPIFY") {
        let currency = "USD"; // Fallback

        // Try to find currency
        const metaCurrency = document.querySelector('meta[property="og:price:currency"]');
        if (metaCurrency) {
            currency = metaCurrency.getAttribute('content');
        } else if (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) {
            currency = window.Shopify.currency.active;
        }

        let themeName = "Unknown";
        try {
            const scripts = Array.from(document.querySelectorAll('script')).map(s => s.textContent || "");
            for (let text of scripts) {
                if (text.includes('Shopify.theme')) {
                    const match = text.match(/Shopify\.theme\s*=\s*\{[^}]*"name"\s*:\s*"([^"]+)"/i);
                    if (match && match[1]) {
                        themeName = match[1];
                        break;
                    }
                }
            }
            if (themeName === "Unknown") {
                for (let text of scripts) {
                    const match = text.match(/"theme_name"\s*:\s*"([^"]+)"/i) || text.match(/"themeName"\s*:\s*"([^"]+)"/i) || text.match(/Shopify\.theme\s*=\s*\{.*"name"\s*:\s*"([^"]+)"/is);
                    if (match && match[1]) {
                        themeName = match[1];
                        break;
                    }
                }
            }
        } catch (e) {}

        // App Detection
        let detectedApps = [];
        const appSignatures = {
            "Klaviyo": /klaviyo\.js|_learnq/i,
            "Yotpo": /yotpo\.com|yotpoTrack/i,
            "Judge.me": /judgeme|jdgm/i,
            "Loox": /loox\.io|loox\.js/i,
            "ReCharge": /rechargeapps|recharge/i,
            "Mailchimp": /mailchimp|chimpstatic/i,
            "Oberlo": /oberlo/i,
            "AliReviews": /alireviews/i,
            "Privy": /privy/i,
            "Smile.io": /smile-v2\.js|smile\.io/i,
            "Gorgias": /gorgias/i,
            "Bold": /boldapps|bold-/i,
            "Sezzle": /sezzle/i,
            "Afterpay": /afterpay/i,
            "Omnisend": /omnisend/i,
            "Stamped.io": /stamped\.io/i
        };

        try {
            const html = document.documentElement.innerHTML;
            for (const [appName, regex] of Object.entries(appSignatures)) {
                if (regex.test(html)) {
                    detectedApps.push(appName);
                }
            }
        } catch (e) {}

        sendResponse({
            isShopify: isShopify(),
            host: window.location.hostname,
            currency: currency,
            themeName: themeName,
            detectedApps: detectedApps
        });
    }

    if (request.action === "START_SCRAPE") {
        scrapeAllProducts(sendResponse);
        return true;
    }

    if (request.action === "FETCH_COLLECTION") {
        fetchCollectionProducts(request.handle, sendResponse);
        return true;
    }
});

async function fetchCollectionProducts(handle, sendResponse) {
    let collectionProducts = [];
    let page = 1;
    let hasMore = true;
    const limit = 250;

    try {
        while (hasMore) {
            chrome.runtime.sendMessage({ action: "PROGRESS", status: `Fetching collection page ${page}...` });

            const response = await fetch(`${window.location.origin}/collections/${handle}/products.json?limit=${limit}&page=${page}`);
            if (!response.ok) { // If collection scrape fails, maybe try get all if handle is 'all'
                hasMore = false; break;
            }

            const data = await response.json();
            const products = data.products;

            if (products && products.length > 0) {
                collectionProducts = collectionProducts.concat(products);
                page++;
            } else {
                hasMore = false;
            }
            if (page > 50) hasMore = false;
        }

        chrome.runtime.sendMessage({
            action: "COLLECTION_COMPLETE",
            products: collectionProducts,
            handle: handle
        });

    } catch (error) {
        chrome.runtime.sendMessage({ action: "ERROR", message: "Failed to fetch collection: " + error.message });
    }
}

async function scrapeAllProducts(sendResponse) {
    let allProducts = [];
    let page = 1;
    let hasMore = true;
    const limit = 250;

    try {
        while (hasMore) {
            // Notify progress
            chrome.runtime.sendMessage({
                action: "PROGRESS",
                count: allProducts.length,
                status: `Fetching page ${page}...`
            });

            const response = await fetch(`${window.location.origin}/products.json?limit=${limit}&page=${page}`);
            if (!response.ok) throw new Error("Failed to fetch products");

            const data = await response.json();
            const products = data.products;

            if (products && products.length > 0) {
                allProducts = allProducts.concat(products);
                page++;
            } else {
                hasMore = false;
            }

            // Safety break
            if (page > 50) hasMore = false;
        }

        // Fetch collections in parallel if possible, or after
        try {
            const collResp = await fetch(`${window.location.origin}/collections.json`);
            if (collResp.ok) {
                const collData = await collResp.json();
                chrome.runtime.sendMessage({
                    action: "COLLECTIONS_FOUND",
                    collections: collData.collections
                });
            }
        } catch (e) { console.log("Collections fetch failed", e); }

        chrome.runtime.sendMessage({
            action: "COMPLETE",
            products: allProducts,
            count: allProducts.length
        });


    } catch (error) {
        chrome.runtime.sendMessage({
            action: "ERROR",
            message: error.message
        });
    }
}
