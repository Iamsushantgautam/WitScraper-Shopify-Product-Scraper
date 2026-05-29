import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import './CsvMaker.css';

const HEADERS = [
  "Title", "Handle", "Description", "Vendor", "Product category", "Type", "Tags", "Published on online store", "Status", "SKU", "Barcode",
  "Option1 name", "Option1 value", "Option1 Linked To", "Option2 name", "Option2 value", "Option2 Linked To",
  "Option3 name", "Option3 value", "Option3 Linked To", "Price", "Compare-at price", "Cost per item", "Charge tax", "Tax code",
  "Unit price total measure", "Unit price total measure unit", "Unit price base measure", "Unit price base measure unit",
  "Inventory tracker", "Inventory quantity", "Continue selling when out of stock", "Weight value (grams)", "Weight unit for display",
  "Requires shipping", "Fulfillment service", "Product image URL", "Image position", "Image alt text", "Variant image URL", "Gift card",
  "SEO title", "SEO description", "Color (product.metafields.shopify.color-pattern)",
  "Google Shopping / Google product category", "Google Shopping / Gender", "Google Shopping / Age group",
  "Google Shopping / Manufacturer part number (MPN)", "Google Shopping / Ad group name", "Google Shopping / Ads labels",
  "Google Shopping / Condition", "Google Shopping / Custom product", "Google Shopping / Custom label 0",
  "Google Shopping / Custom label 1", "Google Shopping / Custom label 2", "Google Shopping / Custom label 3",
  "Google Shopping / Custom label 4"
];

const initialFormState = {
  title: '',
  body: '',
  vendor: '',
  type: '',
  tags: '',
  price: '',
  sku: '',
  image: '',
  inventory: '100',
  handle: '',
  status: 'active',
  category: '',
  barcode: '',
  comparePrice: '',
  cost: '',
  weight: '',
  weightUnit: 'g',
  published: 'TRUE',
  continueSelling: 'deny',
  fulfillment: 'manual',
  opt1Name: 'Title',
  opt1Val: 'Default Title',
  opt2Name: '',
  opt2Val: '',
  variantImage: '',
  imgAlt: '',
  seoTitle: '',
  seoDesc: ''
};

function CsvMaker() {
  const [productList, setProductList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);

  // File upload and bulk paste states
  const [bulkInput, setBulkInput] = useState('');
  const [showMapping, setShowMapping] = useState(false);
  const [previewRows, setPreviewRows] = useState([]);
  const [bulkRows, setBulkRows] = useState([]);
  const [columnSelectors, setColumnSelectors] = useState([]);
  const [columnMappings, setColumnMappings] = useState({});
  const [skipHeader, setSkipHeader] = useState(false);
  const [importMode, setImportMode] = useState('new');

  // Bulk operations states
  const [bulkOpHeader, setBulkOpHeader] = useState('Title');
  const [bulkOpValue, setBulkOpValue] = useState('');
  const [copyFromHeader, setCopyFromHeader] = useState('Title');
  const [copyToHeader, setCopyToHeader] = useState('Handle');


  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Helper to create handle from title
  const createHandle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Toggle More Fields
  const toggleMoreFields = () => {
    setShowExtraFields(prev => !prev);
  };

  // File Upload Parser
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const fileName = file.name.toLowerCase();

    reader.onload = (event) => {
      const data = event.target.result;
      let csvString = '';

      if (fileName.endsWith('.csv')) {
        csvString = data;
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        csvString = XLSX.utils.sheet_to_csv(worksheet);
      }

      if (csvString) {
        setBulkInput(csvString);
        prepareBulkPreview(csvString);
        alert('File processed successfully! Please configure column mapping inside the paste section below.');
      }
    };

    if (fileName.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  // Clear Form
  const clearForm = () => {
    setFormValues(initialFormState);
    setEditIndex(-1);
  };

  // Add or Update manual product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formValues.title) {
      alert('Please enter at least a product title.');
      return;
    }

    let product;
    if (editIndex === -1) {
      // New Product
      product = {};
      HEADERS.forEach(h => product[h] = '');

      // Set default credentials
      product["Status"] = "active";
      product["Published on online store"] = "TRUE";
      product["Inventory tracker"] = "shopify";
      product["Requires shipping"] = "TRUE";
      product["Fulfillment service"] = "manual";
      product["Option1 name"] = "Title";
      product["Option1 value"] = "Default Title";
      product["Gift card"] = "FALSE";
      product["Image position"] = "1";
    } else {
      // Edit existing
      product = { ...productList[editIndex] };
    }

    // Map fields
    product["Title"] = formValues.title;
    product["Description"] = formValues.body;
    product["Vendor"] = formValues.vendor || 'My Shop';
    product["Type"] = formValues.type || 'Product';
    product["Tags"] = formValues.tags;
    product["Price"] = formValues.price || '0.00';
    product["SKU"] = formValues.sku;
    product["Product image URL"] = formValues.image;
    product["Inventory quantity"] = formValues.inventory || '0';

    // Extra fields mapping
    product["Handle"] = formValues.handle || createHandle(formValues.title);
    product["Status"] = formValues.status;
    product["Product category"] = formValues.category;
    product["Barcode"] = formValues.barcode;
    product["Compare-at price"] = formValues.comparePrice;
    product["Cost per item"] = formValues.cost;
    product["Weight value (grams)"] = formValues.weight;
    product["Weight unit for display"] = formValues.weightUnit;
    product["Published on online store"] = formValues.published;
    product["Continue selling when out of stock"] = formValues.continueSelling;
    product["Fulfillment service"] = formValues.fulfillment || 'manual';
    product["Option1 name"] = formValues.opt1Name || "Title";
    product["Option1 value"] = formValues.opt1Val || "Default Title";
    product["Option2 name"] = formValues.opt2Name;
    product["Option2 value"] = formValues.opt2Val;
    product["Variant image URL"] = formValues.variantImage;
    product["Image alt text"] = formValues.imgAlt;
    product["SEO title"] = formValues.seoTitle;
    product["SEO description"] = formValues.seoDesc;

    if (editIndex === -1) {
      setProductList(prev => [...prev, product]);
    } else {
      setProductList(prev => {
        const updated = [...prev];
        updated[editIndex] = product;
        return updated;
      });
      setEditIndex(-1);
    }

    clearForm();
  };

  // Edit Product callback
  const editProduct = (index) => {
    const p = productList[index];
    setEditIndex(index);

    setFormValues({
      title: p["Title"] || '',
      body: p["Description"] || '',
      vendor: p["Vendor"] || '',
      type: p["Type"] || '',
      tags: p["Tags"] || '',
      price: p["Price"] || '',
      sku: p["SKU"] || '',
      image: p["Product image URL"] || '',
      inventory: p["Inventory quantity"] || '100',
      handle: p["Handle"] || '',
      status: p["Status"] || 'active',
      category: p["Product category"] || '',
      barcode: p["Barcode"] || '',
      comparePrice: p["Compare-at price"] || '',
      cost: p["Cost per item"] || '',
      weight: p["Weight value (grams)"] || '',
      weightUnit: p["Weight unit for display"] || 'g',
      published: p["Published on online store"] || 'TRUE',
      continueSelling: p["Continue selling when out of stock"] || 'deny',
      fulfillment: p["Fulfillment service"] || 'manual',
      opt1Name: p["Option1 name"] || 'Title',
      opt1Val: p["Option1 value"] || 'Default Title',
      opt2Name: p["Option2 name"] || '',
      opt2Val: p["Option2 value"] || '',
      variantImage: p["Variant image URL"] || '',
      imgAlt: p["Image alt text"] || '',
      seoTitle: p["SEO title"] || '',
      seoDesc: p["SEO description"] || ''
    });

    setShowExtraFields(true);
    window.scrollTo({ top: document.getElementById('shopify-csv-maker-tool').offsetTop, behavior: 'smooth' });
  };

  // Remove Product callback
  const removeProduct = (index) => {
    setProductList(prev => prev.filter((_, idx) => idx !== index));
  };

  // Prepare Bulk Preview
  const prepareBulkPreview = (textValue = bulkInput) => {
    const data = textValue.trim();
    if (!data) {
      alert('Please paste some raw data first.');
      return;
    }

    const results = Papa.parse(data, {
      skipEmptyLines: true,
      dynamicTyping: false
    });

    if (results.data.length === 0) {
      alert('Could not parse any data. Please verify your format.');
      return;
    }

    const columns = results.data[0];
    setBulkRows(results.data);
    setPreviewRows(results.data.slice(0, 5));

    // Synonym logic for columns auto-mapping
    const synonyms = {
      "Title": ["product", "name", "item", "title", "heading", "label", "product name"],
      "Description": ["body", "content", "info", "description", "details", "about", "product description"],
      "Vendor": ["brand", "manufacturer", "supplier", "vendor", "make"],
      "Type": ["category", "class", "type", "kind", "product type"],
      "Tags": ["keywords", "tags", "labels", "attributes"],
      "SKU": ["code", "part number", "id", "sku", "reference", "ref"],
      "Price": ["price", "cost", "rate", "amount", "msrp", "value", "unit price"],
      "Compare-at price": ["compare at price", "compare-at price", "old price", "was price"],
      "Cost per item": ["cost per item", "cost price", "purchase price", "buying price"],
      "Inventory quantity": ["stock", "qty", "quantity", "inventory", "count", "inventory quantity"],
      "Product image URL": ["image", "photo", "url", "picture", "src", "image url"]
    };

    const initialMaps = {};
    columns.forEach((col, index) => {
      let matchedHeader = '';
      const cleanCol = col.trim().toLowerCase();

      // Check exact matches
      HEADERS.forEach(h => {
        const cleanHeader = h.trim().toLowerCase();
        if (cleanCol === cleanHeader) {
          matchedHeader = h;
        } else if (synonyms[h]) {
          if (synonyms[h].some(syn => cleanCol === syn)) {
            matchedHeader = h;
          }
        }
      });

      // Fallbacks
      if (!matchedHeader) {
        if (index === 0) matchedHeader = "Title";
        else if (index === 1 && !cleanCol.includes('compare') && !cleanCol.includes('cost')) matchedHeader = "Price";
        else if (index === 2) matchedHeader = "SKU";
        else if (index === 3) matchedHeader = "Vendor";
      }

      initialMaps[index] = matchedHeader;
    });

    setColumnMappings(initialMaps);
    setBulkColumns(columns);
    setShowMapping(true);
  };

  // Mapping Selector Change callback
  const handleMappingChange = (colIndex, value) => {
    setColumnMappings(prev => ({
      ...prev,
      [colIndex]: value
    }));
  };

  // Process & Add bulk products
  const handleProcessBulk = () => {
    let rows = [...bulkRows];
    if (skipHeader) {
      rows = rows.slice(1);
    }

    const activeMaps = Object.entries(columnMappings)
      .map(([colIdx, header]) => ({
        index: parseInt(colIdx),
        header
      }))
      .filter(m => m.header !== '');

    if (activeMaps.length === 0) {
      alert('Please map at least one column.');
      return;
    }

    let processedCount = 0;
    setProductList(prev => {
      const newList = [...prev];

      rows.forEach((parts, rowIndex) => {
        if (parts.length > 0) {
          if (importMode === 'update' && newList[rowIndex]) {
            // Update existing
            const product = { ...newList[rowIndex] };
            activeMaps.forEach(m => {
              if (parts[m.index] !== undefined) {
                product[m.header] = parts[m.index].trim();
              }
            });
            if (product["Title"]) {
              product["Handle"] = createHandle(product["Title"]);
            }
            newList[rowIndex] = product;
            processedCount++;
          } else if (importMode === 'new') {
            // Add new
            const product = {};
            HEADERS.forEach(h => product[h] = '');

            // Set standard defaults
            product["Status"] = "active";
            product["Published on online store"] = "TRUE";
            product["Inventory tracker"] = "shopify";
            product["Requires shipping"] = "TRUE";
            product["Fulfillment service"] = "manual";
            product["Option1 name"] = "Title";
            product["Option1 value"] = "Default Title";
            product["Gift card"] = "FALSE";
            product["Image position"] = "1";

            activeMaps.forEach(m => {
              if (parts[m.index] !== undefined) {
                product[m.header] = parts[m.index].trim();
              }
            });

            if (product["Title"] && !product["Handle"]) {
              product["Handle"] = createHandle(product["Title"]);
            }

            if (product["Title"] || product["Handle"]) {
              newList.push(product);
              processedCount++;
            }
          }
        }
      });

      return newList;
    });

    setShowMapping(false);
    setBulkInput('');
    alert(importMode === 'new' ? `Successfully added ${processedCount} products!` : `Successfully updated ${processedCount} existing rows!`);
  };

  // Bulk set one column value for all rows
  const handleBulkSetValue = () => {
    if (productList.length === 0) {
      alert('Add some products first!');
      return;
    }

    if (!window.confirm(`Are you sure you want to set all "${bulkOpHeader}" values to "${bulkOpValue}"?`)) {
      return;
    }

    setProductList(prev => prev.map(p => ({
      ...p,
      [bulkOpHeader]: bulkOpValue
    })));

    setBulkOpValue('');
    alert(`Successfully set "${bulkOpHeader}" to "${bulkOpValue}" for all rows.`);
  };

  // Clear specific column for all rows
  const handleClearColumn = () => {
    if (productList.length === 0) {
      alert('Add some products first!');
      return;
    }

    if (!window.confirm(`Are you sure you want to CLEAR all data in the "${bulkOpHeader}" column?`)) {
      return;
    }

    setProductList(prev => prev.map(p => ({
      ...p,
      [bulkOpHeader]: ''
    })));

    alert(`Successfully cleared "${bulkOpHeader}" column values.`);
  };

  // Copy data from one column to another for all rows
  const handleCopyColumn = () => {
    if (productList.length === 0) {
      alert('Add some products first!');
      return;
    }

    if (copyFromHeader === copyToHeader) {
      alert('Please select different columns for "From" and "To".');
      return;
    }

    if (!window.confirm(`Are you sure you want to COPY data from "${copyFromHeader}" to "${copyToHeader}" for all rows? This will overwrite existing data.`)) {
      return;
    }

    setProductList(prev => prev.map(p => ({
      ...p,
      [copyToHeader]: p[copyFromHeader]
    })));

    alert(`Successfully copied "${copyFromHeader}" values to "${copyToHeader}".`);
  };

  // Download final CSV file
  const handleDownloadCSV = () => {
    if (productList.length === 0) {
      alert('Add some products first!');
      return;
    }

    let csvContent = HEADERS.join(',') + '\n';
    productList.forEach(p => {
      const rowData = HEADERS.map(h => `"${(p[h] || "").toString().replace(/"/g, '""')}"`);
      csvContent += rowData.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "shopify_products.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="shopify-csv-maker-tool" className="features-section">
      <div className="section-container" style={{ maxWidth: '1240px' }}>
        <div className="section-header">
          <h2 className="section-title">Shopify CSV File Master</h2>
          <p className="section-subtitle">Generate, parse, bulk-map, and clean Shopify import-ready product CSVs in seconds directly inside your browser.</p>
        </div>

        {/* 1. Upload File Panel */}
        <div className="feature-card" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <h3 className="feature-name"><i className="fas fa-file-excel text-green" style={{ marginRight: '8px' }}></i> Upload Spreadsheet (CSV/Excel)</h3>
          <p className="feature-desc" style={{ marginBottom: '24px' }}>
            Quickly import an existing list of products from your hard drive. We parse `.csv`, `.xlsx`, and `.xls` instantly.
          </p>
          <div className="input-group">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileUpload}
              className="file-upload-input"
            />
          </div>
        </div>

        {/* 2. Manual Product Entry */}
        <div className="feature-card" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <h3 className="feature-name"><i className="fas fa-edit text-green" style={{ marginRight: '8px' }}></i> {editIndex === -1 ? 'Add New Product Row' : 'Edit Product Row'}</h3>
          <p className="feature-desc" style={{ marginBottom: '24px' }}>
            Fill in details to build rows individually. Supports sizes, SKUs, inventory tracking, variant prices, and alt tags.
          </p>

          <form onSubmit={handleAddProduct}>
            <div className="input-grid">
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Product Title *</label>
                <input type="text" id="title" value={formValues.title} onChange={handleInputChange} placeholder="e.g. Premium Silk Scarf" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vendor</label>
                <input type="text" id="vendor" value={formValues.vendor} onChange={handleInputChange} placeholder="e.g. My Awesome Shop" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Product Type</label>
                <input type="text" id="type" value={formValues.type} onChange={handleInputChange} placeholder="e.g. Apparel" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price ($)</label>
                <input type="number" id="price" step="0.01" value={formValues.price} onChange={handleInputChange} placeholder="0.00" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SKU</label>
                <input type="text" id="sku" value={formValues.sku} onChange={handleInputChange} placeholder="e.g. ACC-001" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tags (comma separated)</label>
                <input type="text" id="tags" value={formValues.tags} onChange={handleInputChange} placeholder="silk, scarf, luxury" />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Description (HTML supported)</label>
                <textarea id="body" rows="3" value={formValues.body} onChange={handleInputChange} placeholder="Enter product description here..."></textarea>
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Image URL</label>
                <input type="url" id="image" value={formValues.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
              </div>
              <div className="input-group">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inventory Qty</label>
                <input type="number" id="inventory" value={formValues.inventory} onChange={handleInputChange} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleMoreFields}
                style={{ borderRadius: '30px', padding: '8px 24px', fontSize: '0.85rem' }}
              >
                <i className={showExtraFields ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i> {showExtraFields ? 'Show Less Fields' : 'Show More Fields'}
              </button>
            </div>

            {showExtraFields && (
              <div className="extra-fields-container">
                <div className="input-grid">
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Handle (URL Slug)</label>
                    <input type="text" id="handle" value={formValues.handle} onChange={handleInputChange} placeholder="auto-generated if empty" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</label>
                    <select id="status" value={formValues.status} onChange={handleInputChange}>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Product Category</label>
                    <input type="text" id="category" value={formValues.category} onChange={handleInputChange} placeholder="e.g. Clothing > Shirts" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Barcode (ISBN, UPC)</label>
                    <input type="text" id="barcode" value={formValues.barcode} onChange={handleInputChange} placeholder="e.g. 12345678" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Compare-at Price ($)</label>
                    <input type="number" id="comparePrice" step="0.01" value={formValues.comparePrice} onChange={handleInputChange} placeholder="0.00" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cost per item ($)</label>
                    <input type="number" id="cost" step="0.01" value={formValues.cost} onChange={handleInputChange} placeholder="0.00" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Weight (Grams)</label>
                    <input type="number" id="weight" value={formValues.weight} onChange={handleInputChange} placeholder="0" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Weight Unit</label>
                    <select id="weightUnit" value={formValues.weightUnit} onChange={handleInputChange}>
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Published</label>
                    <select id="published" value={formValues.published} onChange={handleInputChange}>
                      <option value="TRUE">TRUE</option>
                      <option value="FALSE">FALSE</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Continue Selling Out of Stock</label>
                    <select id="continueSelling" value={formValues.continueSelling} onChange={handleInputChange}>
                      <option value="deny">DENY</option>
                      <option value="continue">CONTINUE</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fulfillment Service</label>
                    <input type="text" id="fulfillment" value={formValues.fulfillment} onChange={handleInputChange} />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Option 1 Name</label>
                    <input type="text" id="opt1Name" value={formValues.opt1Name} onChange={handleInputChange} placeholder="e.g. Size" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Option 1 Value</label>
                    <input type="text" id="opt1Val" value={formValues.opt1Val} onChange={handleInputChange} placeholder="e.g. Medium" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Option 2 Name</label>
                    <input type="text" id="opt2Name" value={formValues.opt2Name} onChange={handleInputChange} placeholder="e.g. Color" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Option 2 Value</label>
                    <input type="text" id="opt2Val" value={formValues.opt2Val} onChange={handleInputChange} placeholder="e.g. Red" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Variant Image URL</label>
                    <input type="url" id="variantImage" value={formValues.variantImage} onChange={handleInputChange} placeholder="Image for this variant" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Image Alt Text</label>
                    <input type="text" id="imgAlt" value={formValues.imgAlt} onChange={handleInputChange} placeholder="Description for SEO" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEO Title</label>
                    <input type="text" id="seoTitle" value={formValues.seoTitle} onChange={handleInputChange} placeholder="Search engine title" />
                  </div>
                  <div className="input-group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEO Description</label>
                    <input type="text" id="seoDesc" value={formValues.seoDesc} onChange={handleInputChange} placeholder="Search engine description" />
                  </div>
                </div>
              </div>
            )}

            <div className="actions">
              <button type="submit" className={editIndex === -1 ? "btn btn-primary" : "btn btn-green"} style={{ padding: '12px 32px' }}>
                <i className={editIndex === -1 ? "fas fa-plus" : "fas fa-save"}></i> {editIndex === -1 ? 'Add Product Row' : 'Update Product Row'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={clearForm} style={{ padding: '12px 32px' }}>
                <i className="fas fa-eraser"></i> Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* 3. Bulk Import & Paste section */}
        <div className="feature-card" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <h3 className="feature-name"><i className="fas fa-paste text-green" style={{ marginRight: '8px' }}></i> Bulk Spreadsheet Copier & Mapper</h3>
          <p className="feature-desc" style={{ marginBottom: '24px' }}>
            Paste rows directly from Microsoft Excel or Google Sheets. Tab and comma separations are parsed on-the-fly.
          </p>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <textarea
              rows="6"
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="Title, Price, SKU, Vendor&#10;Silk Scarf, 25.00, ACC-001, My Shop&#10;Wool Hat, 15.00, ACC-002, My Shop"
            />
          </div>

          {showMapping && (
            <div className="extra-fields-container">
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>1. Verify Parsed Data Grid:</h4>
              <div className="table-container" style={{ maxHeight: '180px' }}>
                <table>
                  <tbody>
                    {previewRows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((val, cellIdx) => (
                          <td key={cellIdx} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>2. Configure Columns Mapper & Import Scope:</h4>
              <div className="mapping-scope-box">
                <div className="mapping-scope-item">
                  <input
                    type="radio"
                    name="import-mode"
                    id="mode-new"
                    value="new"
                    checked={importMode === 'new'}
                    onChange={() => setImportMode('new')}
                  />
                  <label htmlFor="mode-new">Create New Products</label>
                </div>
                <div className="mapping-scope-item">
                  <input
                    type="radio"
                    name="import-mode"
                    id="mode-update"
                    value="update"
                    checked={importMode === 'update'}
                    onChange={() => setImportMode('update')}
                  />
                  <label htmlFor="mode-update">Fill/Update Existing Rows</label>
                </div>
                <div className="mapping-scope-item scope-header-checkbox" style={{ marginLeft: 'auto' }}>
                  <input
                    type="checkbox"
                    id="skip-header"
                    checked={skipHeader}
                    onChange={(e) => setSkipHeader(e.target.checked)}
                  />
                  <label htmlFor="skip-header">First line is header row</label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {bulkColumns.map((col, idx) => (
                  <div className="input-group" key={idx}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Column {idx + 1} ({col.length > 15 ? col.substring(0, 15) + '...' : col})</label>
                    <select
                      value={columnMappings[idx] || ''}
                      onChange={(e) => handleMappingChange(idx, e.target.value)}
                    >
                      <option value="">Ignore / Ignore Column</option>
                      {HEADERS.map(h => (
                        <option value={h} key={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            <button className="btn btn-secondary" onClick={() => prepareBulkPreview(bulkInput)} style={{ padding: '12px 24px' }}>
              <i className="fas fa-eye"></i> {showMapping ? 'Refresh Mapping Preview' : 'Prepare Columns Mapping'}
            </button>
            {showMapping && (
              <button className="btn btn-primary" onClick={handleProcessBulk} style={{ padding: '12px 24px' }}>
                <i className="fas fa-magic"></i> Process & Add Bulk Rows
              </button>
            )}
          </div>
        </div>

        {/* 4. Column Operations (Bulk Sets and Copies) */}
        <div className="feature-card" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <h3 className="feature-name"><i className="fas fa-fill-drip text-green" style={{ marginRight: '8px' }}></i> Column Operations (Bulk Set & Copy)</h3>
          <p className="feature-desc" style={{ marginBottom: '24px' }}>
            Quickly perform bulk alterations over entire columns, such as setting a shared vendor name or copying data across fields.
          </p>

          <div className="input-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '20px' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Column Heading</label>
              <select value={bulkOpHeader} onChange={(e) => setBulkOpHeader(e.target.value)}>
                {HEADERS.map(h => (
                  <option value={h} key={h}>{h}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Value to Inject</label>
              <input type="text" value={bulkOpValue} onChange={(e) => setBulkOpValue(e.target.value)} placeholder="e.g. My Apparel Co." />
            </div>
          </div>
          <div className="actions" style={{ justifyContent: 'flex-start', marginBottom: '32px' }}>
            <button className="btn btn-secondary" onClick={handleBulkSetValue}>
              <i className="fas fa-fill-drip"></i> Set Value to All Rows
            </button>
            <button className="btn btn-secondary" onClick={handleClearColumn} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <i className="fas fa-eraser"></i> Clear Entire Column
            </button>
          </div>

          {/* Copy Column Data */}
          <div className="extra-fields-container">
            <div className="input-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', alignItems: 'center' }}>
              <div className="input-group">
                <label>Copy From Column</label>
                <select value={copyFromHeader} onChange={(e) => setCopyFromHeader(e.target.value)}>
                  {HEADERS.map(h => (
                    <option value={h} key={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--text-muted)', paddingTop: '16px' }}>
                <i className="fas fa-long-arrow-alt-right"></i>
              </div>
              <div className="input-group">
                <label>To Column (Overwrite)</label>
                <select value={copyToHeader} onChange={(e) => setCopyToHeader(e.target.value)}>
                  {HEADERS.map(h => (
                    <option value={h} key={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="actions" style={{ justifyContent: 'flex-start', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={handleCopyColumn}>
              <i className="fas fa-copy"></i> Overwrite & Copy Column Data
            </button>
          </div>
        </div>

        {/* 5. Product Grid Table Preview */}
        <div className="feature-card" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h3 className="feature-name" style={{ margin: 0 }}><i className="fas fa-table text-green" style={{ marginRight: '8px' }}></i> Active Product Database Preview</h3>
              <p className="feature-desc" style={{ marginTop: '4px', marginBottom: 0 }}>
                Total: <strong>{productList.length}</strong> items loaded in memory.
              </p>
            </div>
            <button className="btn btn-green" onClick={handleDownloadCSV} disabled={productList.length === 0} style={{ padding: '12px 32px' }}>
              <i className="fas fa-download"></i> Download Verified Shopify CSV
            </button>
          </div>

          <div className="table-container">
            {productList.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <i className="fas fa-info-circle" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block', color: 'var(--primary)' }}></i>
                No products loaded yet. Import a file, paste raw rows, or fill in manual products above to build your Shopify database preview!
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th className="sno-cell" style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                    {HEADERS.map(h => (
                      <th key={h}>{h}</th>
                    ))}
                    <th className="actions-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((product, idx) => (
                    <tr key={idx}>
                      <td className="sno-cell" style={{ textAlign: 'center' }}>{idx + 1}</td>
                      {HEADERS.map(h => (
                        <td key={h}>{product[h] || ''}</td>
                      ))}
                      <td className="actions-cell">
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="table-action-btn"
                            onClick={() => editProduct(idx)}
                            title="Edit Row"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => removeProduct(idx)}
                            title="Delete Row"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CsvMaker;
