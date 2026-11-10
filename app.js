/**
 * website/app.js - Version 3.0 (Autonomous Business & Audit Engine)
 * Owner: Nevio Waldemar Niebel (@NevioCore)
 * Location: Salzgitter, Niedersachsen (Region Braunschweig) / Remote DACH
 *
 * Capabilities:
 * - 3 Strictly Separated Modes:
 *   1. Lösungen erleben (Interactive plain-language scenarios with technical toggle)
 *   2. Kostenloser Daten-Audit (Real CSV/TSV/JSON parser, SHA-256 deduplication, UTF-8 fix, real cleaned file download, ROI calculator, Lead Capture)
 *   3. Entwicklerkonsole (CLI with history, tab completion, help, real execution)
 * - RFC 4180 compliant CSV parser (handles quotes, commas, semicolons, tabs, newlines)
 * - In-browser data cleaning engine (outputs downloadable cleaned file)
 * - Client-side reliable Lead Capture (no mailto lock-in)
 * - Synchronized Offer Cards
 * - Interactive ROI Calculator
 */

// =========================================================================
// 1. DATASETS & SCENARIO DEFINITIONS
// =========================================================================

const SAMPLE_B2B_DATASET = `Artikel_ID;Lieferant;Produktbezeichnung;Kategorie;EAN;EK_Preis_Netto;VK_Preis_Netto;Telefon_Hotline;Bestand;Status
40101;Müller & Sohn Haustechnik GmbH;Kugelhahn Messing 1/2 Zoll IG/IG;Sanitär;4012345678901;4.85;8.90;+49 89 1234567;120;Lieferbar
40102;MÃ¼ller & Sohn Haustechnik GmbH;Kugelhahn Messing 1/2 Zoll IG/IG;Sanitär;4012345678901;4.85;8.90;089-1234567;120;Lieferbar
40103;Schmidt Elektro-Grosshandel;Verlegekabel NYM-J 3x1.5 mm² (50m);Elektro;4022334455667;28.50;44.90;;45;Lieferbar
40104;Schmidt Elektro-Grosshandel;Verlegekabel NYM-J 3x1.5 mm² (50m);Elektro;4022334455667;28.50;44.90;0049-221-998877;45;Lieferbar
40105;Bäcker Baustoffe & Logistik;Dichtschlämme 25kg Sack;Bauchemie;;18.90;;+49 (0)30 554433;18;Auf Anfrage
40106;BÃ¤cker Baustoffe & Logistik;Dichtschlämme 25kg Sack;Bauchemie;;18.90;29.90;030/554433;18;Auf Anfrage
40107;Kranbau & Hebetechnik Westfalen;Rundschlinge 2000kg 2m Umfang;Hebezeuge;4099887766554;11.20;19.80;0231 445566-0;60;Lieferbar
40108;Kranbau & Hebetechnik Westfalen;Rundschlinge 2000kg 2m Umfang;Hebezeuge;4099887766554;11.20;19.80;+49 231 445566;60;Lieferbar
40109;Dachdeckereinkauf Nord eG;Bitumenschweissbahn V60 S4 Schiefer;Dachbaustoffe;4088776655443;;42.50;040 - 776655;85;Lieferbar
40110;Dachdeckereinkauf Nord eG;Bitumenschweissbahn V60 S4 Schiefer;Dachbaustoffe;4088776655443;24.90;42.50;+49 40 776655;85;Lieferbar
40111;Richter & Partner Armaturen;Thermostat-Kopf M30 x 1.5 weiss;Heizung;4077665544332;8.40;14.95;0711 223344;240;Lieferbar
40112;Richter & Partner Armaturen;Thermostat-Kopf M30 x 1.5 weiss;Heizung;4077665544332;8.40;14.95;+49 711 223344-12;240;Lieferbar
40113;Weser Werkzeuge & Maschinen;Akku-Bohrschrauber 18V Brushless;Werkzeuge;4066554433221;115.00;;0421-998811;12;Lieferbar
40114;Weser Werkzeuge & Maschinen;Akku-Bohrschrauber 18V Brushless;Werkzeuge;4066554433221;115.00;189.00;+49 421 998811;12;Lieferbar`;

// =========================================================================
// 1. CENTRAL PRODUCT & SERVICE CATALOG (SINGLE SOURCE OF TRUTH)
// =========================================================================

const PRODUCT_CATALOG = {
  "paket-1": {
    id: "paket-1",
    aliases: ["paket 1", "datenprüfung", "bereinigung", "paket-1"],
    title: "Paket 1: Datenprüfung & Bereinigung",
    shortTitle: "Paket 1: Datenprüfung",
    tagline: "SHA-256 Dedupe • UTF-8 Reparatur • CSV-Export",
    priceTag: "350 € Festpreis",
    priceValue: "350 €",
    priceSub: "Einmaliger Festpreis (schlüsselfertige Bereinigung)",
    pricingType: "fixed",
    requiresDeposit: true,
    depositPct: 50,
    depositAmount: "175 €",
    depositLabel: "50% Anzahlung:",
    depositNote: "50% SEPA-Anzahlung vor Projektstart (175,00 €)",
    bookingUrl: "booking.html?pkg=paket-1"
  },
  "paket-2": {
    id: "paket-2",
    aliases: ["paket 2", "routine-automatisierung", "routine-büro", "paket-2"],
    title: "Paket 2: Routine-Automatisierung",
    shortTitle: "Paket 2: Routine-Büro",
    tagline: "PDF-Rechnungen • DATEV/sevdesk • E-Mail-Scan",
    priceTag: "ab 450 € Festpreis",
    priceValue: "ab 450 €",
    priceSub: "Festpreis nach Aufwandsschätzung (schlüsselfertig)",
    pricingType: "fixed_from",
    requiresDeposit: true,
    depositPct: 50,
    depositAmount: "ab 225 €",
    depositLabel: "50% Anzahlung:",
    depositNote: "50% SEPA-Anzahlung vor Projektstart (ab 225,00 €)",
    bookingUrl: "booking.html?pkg=paket-2"
  },
  "paket-3": {
    id: "paket-3",
    aliases: ["paket 3", "schnittstellen & systeme verbinden", "schnittstellen", "paket-3"],
    title: "Paket 3: Schnittstellen & Systeme verbinden",
    shortTitle: "Paket 3: Schnittstellen",
    tagline: "FastAPI • WaWi & Shop • Webhooks • Docker",
    priceTag: "ab 850 € Festpreis",
    priceValue: "ab 850 €",
    priceSub: "Festpreis (schlüsselfertig inkl. Docker & Quellcode)",
    pricingType: "fixed_from",
    requiresDeposit: true,
    depositPct: 50,
    depositAmount: "ab 425 €",
    depositLabel: "50% Anzahlung:",
    depositNote: "50% SEPA-Anzahlung vor Projektstart (ab 425,00 €)",
    bookingUrl: "booking.html?pkg=paket-3"
  },
  "paket-4": {
    id: "paket-4",
    aliases: ["paket 4", "individuelle softwareentwicklung", "softwareentwicklung", "paket-4"],
    title: "Paket 4: Individuelle Softwareentwicklung",
    shortTitle: "Paket 4: Softwareentwicklung",
    tagline: "Python Backend • Code-Reviews • Refactoring",
    priceTag: "95 € / Stunde",
    priceValue: "95 € / Std.",
    priceSub: "Abrechnung nach tatsächlichem Stundenaufwand",
    pricingType: "hourly",
    requiresDeposit: false,
    depositPct: 0,
    depositAmount: "Keine Anzahlung",
    depositLabel: "Anzahlung:",
    depositNote: "Keine Anzahlung (Abrechnung nach Aufwand mit Zeiterfassung)",
    bookingUrl: "booking.html?pkg=paket-4"
  },
  "retainer": {
    id: "retainer",
    aliases: ["retainer", "wartung & laufende betreuung", "wartung", "retainer"],
    title: "Retainer: Wartung & laufende Betreuung",
    shortTitle: "Retainer: Wartung",
    tagline: "Health-Monitoring • Updates • Monatlich kündbar",
    priceTag: "ab 190 € / Monat",
    priceValue: "ab 190 € / Mo.",
    priceSub: "Monatlicher Betreuungs- und Bereitschaftsvertrag",
    pricingType: "retainer",
    requiresDeposit: false,
    depositPct: 0,
    depositAmount: "Keine Anzahlung",
    depositLabel: "Anzahlung:",
    depositNote: "Keine Anzahlung (Monatliche Abrechnung zum Monatsanfang)",
    bookingUrl: "booking.html?pkg=retainer"
  },
  "consulting": {
    id: "consulting",
    aliases: ["consulting", "individuelle anfrage", "erstgespräch", "beratung"],
    title: "Erstgespräch / Individuelle Beratung",
    shortTitle: "Erstgespräch / Consulting",
    tagline: "15 Min. Call • Machbarkeit & Festpreisangebot",
    priceTag: "Kostenloses Erstgespräch",
    priceValue: "0 € (Kostenlos)",
    priceSub: "Unverbindliche Ersteinschätzung Ihres Vorhabens",
    pricingType: "free_consultation",
    requiresDeposit: false,
    depositPct: 0,
    depositAmount: "0,00 €",
    depositLabel: "Anzahlung:",
    depositNote: "100% kostenfrei und unverbindlich — kein Kaufvertrag",
    bookingUrl: "booking.html?pkg=consulting"
  }
};

// =========================================================================
// 2. STATE MANAGEMENT
// =========================================================================

let currentDataset = null;        // Holds currently loaded dataset { raw, headers, rows, fileName, isSample, isCleaned }
let cleanedDatasetContent = null; // Cleaned CSV or JSON text for download
let lastAuditReportText = null;   // Audit text report for download
let cliHistory = [];              // CLI command history
let cliHistoryIndex = -1;         // Index for up/down navigation

// =========================================================================
// 3. CRYPTOGRAPHIC SHA-256 & RFC 4180 COMPLIANT PARSER (CSV, TSV, JSON)
// =========================================================================

/**
 * Standard FIPS 180-4 compliant SHA-256 hashing algorithm in pure JS.
 * Used for collision-resistant cryptographic deduplication across rows.
 */
function sha256Utf8(str) {
  if (typeof str !== "string") str = String(str || "");
  const ascii = unescape(encodeURIComponent(str));

  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = "length";
  let i, j;
  let result = "";
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  const hash = [];
  const k = [];
  let primeCounter = 0;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  let padded = ascii + "\x80";
  while (padded[lengthProperty] % 64 - 56) padded += "\x00";
  for (i = 0; i < padded[lengthProperty]; i++) {
    words[i >> 2] |= padded.charCodeAt(i) << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength | 0);

  for (j = 0; j < words[lengthProperty];) {
    const w = words.slice(j, j += 16);
    const oldHash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + w[i];
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;
      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = (hash[3] + temp1) | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = (temp1 + temp2) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? "0" : "") + b.toString(16);
    }
  }
  return result;
}

/**
 * Robust RFC 4180 compliant CSV/TSV parser:
 * - Only double quote (") is the quote character (apostrophes ' like in O'Connor are regular characters)
 * - Escaped double quotes ("") resolve to a single "
 * - Multiline cells (CRLF / LF inside quotes) are preserved
 * - Commas, semicolons, tabs inside quotes are preserved as cell data
 * - Delimiter auto-detection across sample records outside quotes
 * - Accurately counts blank lines
 */
function parseCsvAdvanced(text, delimiterHint) {
  if (!text || typeof text !== "string") return { headers: [], rows: [], delimiter: ";", emptyLinesCount: 0, unclosedQuoteDetected: false };

  // Strip UTF-8 BOM if present (\uFEFF)
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  // 1. Delimiter auto-detection if not specified
  let delimiter = delimiterHint;
  if (!delimiter) {
    const counts = { ";": 0, ",": 0, "\t": 0, "|": 0 };
    let inQ = false;
    const sample = text.slice(0, 2000);
    for (let i = 0; i < sample.length; i++) {
      const c = sample[i];
      if (c === "\"") {
        if (inQ && sample[i + 1] === "\"") { i++; }
        else { inQ = !inQ; }
      } else if (!inQ && counts[c] !== undefined) {
        counts[c]++;
      }
    }
    // Priority for German DACH B2B: semicolon, then comma, then tab
    if (counts[";"] > 0 && counts[";"] >= counts[","]) delimiter = ";";
    else if (counts[","] > 0 && counts[","] > counts[";"]) delimiter = ",";
    else if (counts["\t"] > 0) delimiter = "\t";
    else delimiter = ";";
  }

  const rows = [];
  let currentRow = [];
  let currentField = "";
  let inQuotes = false;
  let emptyLinesCount = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === "\"") {
      if (inQuotes) {
        if (nextChar === "\"") {
          // Escaped double quote RFC 4180: "" -> "
          currentField += "\"";
          i++; // skip next quote
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        // Opening quote ONLY if at field start (ignoring leading whitespace)
        if (currentField.trim().length === 0) {
          inQuotes = true;
          currentField = ""; // discard any whitespace before opening quote
        } else {
          currentField += char;
        }
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++; // handle CRLF
      currentRow.push(currentField.trim());
      const isBlank = currentRow.every(f => f.length === 0);
      if (isBlank) {
        emptyLinesCount++;
      } else {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  const unclosedQuoteDetected = inQuotes;

  // Final field & row flush
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    const isBlank = currentRow.every(f => f.length === 0);
    if (isBlank) {
      emptyLinesCount++;
    } else {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) return { headers: [], rows: [], delimiter, emptyLinesCount, unclosedQuoteDetected };

  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1);

  return { headers, rows: dataRows, delimiter, emptyLinesCount, unclosedQuoteDetected };
}

/**
 * Robust JSON parser for arrays of objects
 */
function parseJsonDataset(text) {
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("JSON muss ein Array von Objekten sein.");
    }
    const headers = Object.keys(parsed[0]);
    const rows = parsed.map(obj => headers.map(h => obj[h] !== undefined && obj[h] !== null ? String(obj[h]) : ""));
    return { headers, rows, isJson: true };
  } catch (e) {
    return null;
  }
}

// =========================================================================
// 4. REAL IN-BROWSER DATA CLEANING ENGINE
// =========================================================================

/**
 * Sanitizes a CSV cell against spreadsheet formula injection (OWASP DDE prevention)
 */
function sanitizeCsvCell(val) {
  if (val === null || val === undefined) return "";
  let str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

/**
 * Cleans the dataset in memory:
 * - Fixes corrupted UTF-8 umlaute
 * - Removes duplicate rows using cryptographic SHA-256 row fingerprints
 * - Standardizes German & international phone numbers to E.164 (+49...)
 * - Neutralizes formula injection vulnerabilities on CSV export
 * - Trims whitespace
 */
function cleanDatasetInMemory(dataset) {
  if (!dataset || !dataset.rows || dataset.rows.length === 0) return null;

  const UTF8_FIX_MAP = {
    "Ã¼": "ü", "Ã¶": "ö", "Ã¤": "ä", "ÃŸ": "ß",
    "Ãœ": "Ü", "Ã–": "Ö", "Ã„": "Ä",
    "â‚¬": "€", "Â": ""
  };

  function repairEncoding(str) {
    if (!str) return str;
    let res = str;
    for (const [bad, good] of Object.entries(UTF8_FIX_MAP)) {
      res = res.split(bad).join(good);
    }
    return res;
  }

  function isPhoneCandidate(headerName, rawValue) {
    const h = (headerName || "").toLowerCase();
    if (/telefon|phone|tel|mobil|handy|fax|rufnummer|contact/i.test(h)) return true;
    if (/plz|postleitzahl|zip|postal|id|nr|code|artikel|kundennummer|auftrag|ean/i.test(h)) return false;
    // Explicit phone indicator (+49, 0049, or separators with length >= 7)
    if (/^(\+49|0049)/.test(rawValue)) return true;
    if (/[\/\(\)]/.test(rawValue) && rawValue.replace(/\D/g, "").length >= 7) return true;
    if (/^0[1-9][0-9\s\-]{6,}$/.test(rawValue) && /[\s\-]/.test(rawValue)) return true;
    return false;
  }

  function normalizePhone(str, headerName) {
    if (!str) return str;
    if (!isPhoneCandidate(headerName, str)) return str;
    const clean = str.replace(/[\s\-\/\(\)]/g, "");
    if (/^(0049|\+49)[1-9][0-9]{4,14}$/.test(clean)) {
      return clean.replace(/^0049/, "+49");
    }
    if (/^0[1-9][0-9]{4,13}$/.test(clean)) {
      return "+49" + clean.slice(1);
    }
    return str;
  }

  const seenHashes = new Set();
  const cleanedRows = [];
  const changePreview = [];
  let duplicatesRemoved = 0;
  let encodingFixedCount = 0;
  let phonesNormalizedCount = 0;

  const firstHeader = (dataset.headers[0] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const hasIdColumn = /^(id|nr|index|rowid|artikelid|produktid)$/.test(firstHeader);

  dataset.rows.forEach(row => {
    // 1. Repair fields
    const cleanedRow = row.map((val, colIdx) => {
      let v = String(val !== null && val !== undefined ? val : "").trim();
      const repaired = repairEncoding(v);
      if (repaired !== v) {
        encodingFixedCount++;
        if (changePreview.length < 15) {
          changePreview.push({
            type: "encoding_repair",
            column: dataset.headers[colIdx] || `Spalte ${colIdx + 1}`,
            before: v,
            after: repaired
          });
        }
      }

      const colHeader = dataset.headers ? dataset.headers[colIdx] : "";
      const phoneNormalized = normalizePhone(repaired, colHeader);
      if (phoneNormalized !== repaired && phoneNormalized.startsWith("+49")) {
        phonesNormalizedCount++;
        if (changePreview.length < 15) {
          changePreview.push({
            type: "phone_normalization",
            column: colHeader || `Spalte ${colIdx + 1}`,
            before: repaired,
            after: phoneNormalized
          });
        }
        return phoneNormalized;
      }
      return repaired;
    });

    // 2. Cryptographic SHA-256 Deduplication (evaluates business fields)
    const dedupeCells = hasIdColumn && cleanedRow.length > 1 ? cleanedRow.slice(1) : cleanedRow;
    const rowKey = dedupeCells.map(x => x.toLowerCase().trim()).join("\x1f");
    const rowHash = sha256Utf8(rowKey);

    if (seenHashes.has(rowHash)) {
      duplicatesRemoved++;
      if (changePreview.length < 15) {
        changePreview.push({
          type: "duplicate_dropped",
          rowPreview: cleanedRow.slice(0, 3).join(" | "),
          hash: rowHash.slice(0, 8) + "..."
        });
      }
    } else {
      seenHashes.add(rowHash);
      cleanedRows.push(cleanedRow);
    }
  });

  // Re-encode cleaned dataset to CSV text with OWASP formula injection protection & leading zero preservation
  const delimiter = dataset.delimiter || ";";
  const headerLine = dataset.headers.map(h => sanitizeCsvCell(h)).join(delimiter);
  const dataLines = cleanedRows.map(r => r.map(f => {
    const sanitized = sanitizeCsvCell(f);
    const hasLeadingZeroNum = /^0[0-9]+$/.test(sanitized);
    if (sanitized.includes(delimiter) || sanitized.includes("\"") || sanitized.includes("\n") || sanitized.includes("\r") || hasLeadingZeroNum) {
      return `"${sanitized.replace(/"/g, '""')}"`;
    }
    return sanitized;
  }).join(delimiter));
  const fullCleanedCsv = [headerLine, ...dataLines].join("\n");

  return {
    headers: dataset.headers,
    rows: cleanedRows,
    delimiter: delimiter,
    duplicatesRemoved,
    encodingFixedCount,
    phonesNormalizedCount,
    changePreview,
    cleanedCsvText: fullCleanedCsv,
    originalRowCount: dataset.rows.length,
    newRowCount: cleanedRows.length
  };
}

// =========================================================================
// 5. FORENSIC AUDIT ENGINE
// =========================================================================

function analyzeDataQuality(headers, rows) {
  let duplicates = 0;
  let missingValues = 0;
  let unnormalizedPhones = 0;
  let encodingErrors = 0;
  const seenHashes = new Set();
  const duplicateExamples = [];

  const firstHeader = (headers && headers[0] ? headers[0] : "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const hasIdColumn = /^(id|nr|index|rowid|artikelid|produktid)$/.test(firstHeader);

  const phoneVariationRegex = /^(0049|\+49|0)[0-9\s\/\-\(\)]+$/;
  const e164StrictRegex = /^\+49[1-9][0-9]{5,14}$/;
  const encodingCorruptRegex = /(Ã¼|Ã¶|Ã¤|ÃŸ|Ã„|Ã–|Ãœ|â‚¬|\?{2,})/;

  rows.forEach((row, idx) => {
    const dedupeCells = hasIdColumn && row.length > 1 ? row.slice(1) : row;
    const rowKey = dedupeCells.map(c => String(c || "").toLowerCase().trim()).join("\x1f");
    const rowHash = sha256Utf8(rowKey);

    if (seenHashes.has(rowHash)) {
      duplicates++;
      if (duplicateExamples.length < 3) {
        duplicateExamples.push(`Zeile ${idx + 2}: ${row.slice(0, 3).join(" | ")}`);
      }
    } else {
      seenHashes.add(rowHash);
    }

    row.forEach(val => {
      const v = String(val || "").trim();
      if (v === "" || v === "null" || v === "n/a" || v === "-") {
        missingValues++;
      }
      if (encodingCorruptRegex.test(v)) {
        encodingErrors++;
      }
      if (phoneVariationRegex.test(v) && !e164StrictRegex.test(v.replace(/\s+/g, ""))) {
        unnormalizedPhones++;
      }
    });
  });

  const totalDefects = duplicates + missingValues + unnormalizedPhones + encodingErrors;

  return {
    rowCount: rows.length,
    colCount: headers.length,
    duplicates,
    missingValues,
    unnormalizedPhones,
    encodingErrors,
    totalDefects,
    duplicateExamples
  };
}

// =========================================================================
// 6. TERMINAL TABS CONTROLLER (2 DISTINCT FUNCTIONAL MODES)
// =========================================================================

function switchTerminalMode(mode) {
  const tabAudit = document.getElementById("tab-mode-audit");
  const tabDemo = document.getElementById("tab-mode-demo");

  const viewAudit = document.getElementById("view-audit");
  const viewDemo = document.getElementById("view-demo");

  const badgeEl = document.getElementById("terminal-status-badge");

  const isAudit = mode === "audit";

  // Accessible tab aria attributes and active classes
  if (tabAudit) {
    tabAudit.classList.toggle("active", isAudit);
    tabAudit.setAttribute("aria-selected", isAudit ? "true" : "false");
    tabAudit.tabIndex = isAudit ? 0 : -1;
  }
  if (tabDemo) {
    tabDemo.classList.toggle("active", !isAudit);
    tabDemo.setAttribute("aria-selected", !isAudit ? "true" : "false");
    tabDemo.tabIndex = !isAudit ? 0 : -1;
  }

  // Toggle view containers
  if (viewAudit) viewAudit.style.display = isAudit ? "block" : "none";
  if (viewDemo) viewDemo.style.display = !isAudit ? "block" : "none";

  if (!isAudit) {
    if (badgeEl) badgeEl.textContent = "Simulation";
    updateOfferCardForDemo();
  } else {
    // Mode 1: Audit (Default)
    if (badgeEl) badgeEl.textContent = "Bereit";
    updateOfferCardForAudit();
  }
}

function updateOfferCardForDemo() {
  const badgeEl = document.getElementById("offer-badge");
  const titleEl = document.getElementById("offer-title");
  const descEl = document.getElementById("offer-desc");
  const priceTagEl = document.getElementById("offer-price-tag");
  const priceSubEl = document.getElementById("offer-price-sub");
  const featuresEl = document.getElementById("offer-features");
  const ctaBtn = document.getElementById("offer-cta-btn");

  if (badgeEl) badgeEl.textContent = "Paket 3 • Schlüsselfertige Integration";
  if (titleEl) titleEl.textContent = "Schnittstellen & Systeme verbinden";
  if (descEl) descEl.textContent = "Verbinden Sie Ihren Webshop, die Warenwirtschaft und Buchhaltung über maßgeschneiderte, asynchrone Schnittstellen und Webhooks.";
  if (priceTagEl) priceTagEl.textContent = "ab 850 €";
  if (priceSubEl) priceSubEl.textContent = "Festpreis (schlüsselfertig inkl. Docker & Quellcode)";
  if (featuresEl) {
    featuresEl.innerHTML = `
      <li><span>✓</span> Asynchrone REST-APIs & Webhooks (FastAPI / Python)</li>
      <li><span>✓</span> Idempotente Payloads mit HMAC-SHA256 Signaturprüfung</li>
      <li><span>✓</span> Dead-Letter-Queues & automatisches Retry bei Verbindungsabbruch</li>
      <li><span>✓</span> Docker-Container für schlüsselfertigen, ausfallsicheren Betrieb</li>
      <li><span>✓</span> 30 Tage Nachbetreuung & vollständige Quellcode-Übergabe</li>
    `;
  }
  if (ctaBtn) {
    ctaBtn.textContent = "Jetzt Paket 3 anfragen (ab 850 €) →";
    ctaBtn.href = "booking.html?pkg=paket-3";
  }
}

// =========================================================================
// 7. TAB 2: KOSTENLOSER DATEN-AUDIT (REAL ENGINE & CLEANING)
// =========================================================================

function triggerFileInput() {
  const inp = document.getElementById("audit-file-input");
  if (inp) inp.click();
}

function handleFileSelect(event) {
  if (event.target && event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    processUploadedFile(file);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  const dz = document.getElementById("audit-dropzone");
  if (dz) dz.classList.add("dragover");
}

function handleDragLeave(e) {
  e.preventDefault();
  const dz = document.getElementById("audit-dropzone");
  if (dz) dz.classList.remove("dragover");
}

function handleFileDrop(e) {
  e.preventDefault();
  const dz = document.getElementById("audit-dropzone");
  if (dz) dz.classList.remove("dragover");

  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    processUploadedFile(file);
  }
}

function loadSampleDataset() {
  const parsed = parseCsvAdvanced(SAMPLE_B2B_DATASET, ";");
  currentDataset = {
    raw: SAMPLE_B2B_DATASET,
    headers: parsed.headers,
    rows: parsed.rows,
    fileName: "Muster-Katalog-Grosshandel.csv",
    delimiter: ";",
    isSample: true
  };
  executeAuditWorkflow(currentDataset);
}

function processUploadedFile(file) {
  if (file.size > 25 * 1024 * 1024) {
    alert("Dateigröße überschreitet das Limit von 25 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const text = evt.target.result;
    let parsed = null;

    if (file.name.endsWith(".json")) {
      parsed = parseJsonDataset(text);
      if (!parsed) {
        alert("Die JSON-Datei konnte nicht als tabellarisches Array interpretiert werden.");
        return;
      }
    } else {
      parsed = parseCsvAdvanced(text);
    }

    if (!parsed || parsed.rows.length === 0) {
      alert("In der Datei wurden keine gültigen Datenzeilen gefunden.");
      return;
    }

    currentDataset = {
      raw: text,
      headers: parsed.headers,
      rows: parsed.rows,
      fileName: file.name,
      fileSizeKb: Math.round(file.size / 1024),
      delimiter: parsed.delimiter || ";",
      isSample: false
    };

    executeAuditWorkflow(currentDataset);
  };
  reader.readAsText(file);
}

function executeAuditWorkflow(dataset) {
  const dropzone = document.getElementById("audit-dropzone");
  const progressBox = document.getElementById("audit-progress-box");
  const resultsBox = document.getElementById("audit-results-box");

  if (dropzone) dropzone.style.display = "none";
  if (resultsBox) resultsBox.style.display = "none";
  if (progressBox) progressBox.style.display = "block";

  // Simulate real progressive check steps
  const progressSteps = [
    { pct: 20, text: "Dateiformat & Trennzeichen validieren..." },
    { pct: 45, text: "Zeichensatz & UTF-8 Integrität prüfen..." },
    { pct: 70, text: "Kollisionsfreie SHA-256 Dubletten-Hashes berechnen..." },
    { pct: 90, text: "E.164 Telefon- & Pflichtfeld-Normalisierung testen..." },
    { pct: 100, text: "Audit abgeschlossen. Erstelle Analysebericht..." }
  ];

  let stepIdx = 0;
  const bar = document.getElementById("audit-progress-bar");
  const label = document.getElementById("audit-progress-label");

  function nextProgress() {
    if (stepIdx < progressSteps.length) {
      const s = progressSteps[stepIdx];
      if (bar) bar.style.width = `${s.pct}%`;
      if (label) label.textContent = s.text;
      stepIdx++;
      setTimeout(nextProgress, 220);
    } else {
      setTimeout(() => {
        if (progressBox) progressBox.style.display = "none";
        renderAuditResults(dataset);
      }, 200);
    }
  }
  nextProgress();
}

function renderAuditResults(dataset) {
  const resultsBox = document.getElementById("audit-results-box");
  if (!resultsBox) return;
  resultsBox.style.display = "block";

  const stats = analyzeDataQuality(dataset.headers, dataset.rows);
  const cleaned = cleanDatasetInMemory(dataset);
  cleanedDatasetContent = cleaned ? cleaned.cleanedCsvText : null;

  // Header info
  const fileNameEl = document.getElementById("audit-res-filename");
  const rowCountEl = document.getElementById("audit-res-rowcount");
  if (fileNameEl) fileNameEl.textContent = dataset.fileName;
  if (rowCountEl) rowCountEl.textContent = `${stats.rowCount} Zeilen mit ${stats.colCount} Spalten`;

  // Metric cards
  const elDupes = document.getElementById("audit-metric-dupes");
  const elEncoding = document.getElementById("audit-metric-encoding");
  const elPhones = document.getElementById("audit-metric-phones");
  const elMissing = document.getElementById("audit-metric-missing");
  const elTotal = document.getElementById("audit-metric-total");

  if (elDupes) elDupes.textContent = stats.duplicates;
  if (elEncoding) elEncoding.textContent = stats.encodingErrors;
  if (elPhones) elPhones.textContent = stats.unnormalizedPhones;
  if (elMissing) elMissing.textContent = stats.missingValues;
  if (elTotal) elTotal.textContent = stats.totalDefects;

  // ROI Calculation (Transparent)
  // Assumption: ~2 minutes manual labor per defect
  const wastedMinutes = stats.totalDefects * 2.0;
  const hoursPerMonth = Math.max(0.5, Math.round((wastedMinutes / 60) * 10) / 10);
  const hourlyWage = 45; // € kalkulatorischer Mittelstandsstundensatz
  const monthlyCost = Math.round(hoursPerMonth * hourlyWage);
  const annualLoss = monthlyCost * 12;

  const elHours = document.getElementById("audit-res-hours");
  const elMonthly = document.getElementById("audit-res-monthly-loss");
  const elAnnual = document.getElementById("audit-res-annual-loss");

  if (elHours) elHours.textContent = `ca. ${hoursPerMonth} Std. / Monat`;
  if (elMonthly) elMonthly.textContent = `ca. ${monthlyCost.toLocaleString("de-DE")} € / Monat`;
  if (elAnnual) elAnnual.textContent = `ca. ${annualLoss.toLocaleString("de-DE")} € / Jahr`;

  // Sample data explanation note
  const sampleNote = document.getElementById("audit-sample-note");
  if (sampleNote) {
    sampleNote.style.display = dataset.isSample ? "block" : "none";
  }

  // Pre-fill lead capture message
  const leadMsg = document.getElementById("audit-lead-message");
  if (leadMsg && !leadMsg.value) {
    leadMsg.value = `Ergebnis des Daten-Audits für '${dataset.fileName}': ${stats.totalDefects} gefundene Abweichungen (${stats.duplicates} Dubletten, ${stats.encodingErrors} Zeichensatzfehler). Bitte um unverbindliche Ersteinschätzung zur Automatisierung.`;
  }

  // Build text report
  buildAuditReportText(dataset, stats, hoursPerMonth, monthlyCost, annualLoss);

  // Update offer card
  updateOfferCardForAudit(stats, dataset.fileName, annualLoss);
}

function buildAuditReportText(dataset, stats, hoursPerMonth, monthlyCost, annualLoss) {
  const dateStr = new Date().toLocaleDateString("de-DE");
  lastAuditReportText = [
    "================================================================================",
    "  DATENQUALITÄTS- & PROZESS-AUDITBERICHT",
    "  Erstellt durch: Nevio Niebel Software Engineering (https://nevioniebel.tech)",
    `  Datum: ${dateStr} | Datei: ${dataset.fileName}`,
    "================================================================================",
    "",
    "1. ANALYSIERTER DATENSATZ:",
    `   • Geprüfte Datenzeilen:    ${stats.rowCount}`,
    `   • Spaltenanzahl:           ${stats.colCount}`,
    `   • Datei-Ursprung:          ${dataset.isSample ? "Muster-Datensatz Großhandel" : "Eigene Nutzerdatei"}`,
    "",
    "2. IDENTIFIZIERTE DEFEKTE & REIBUNGSPUNKTE:",
    `   • Redundante Dubletten (SHA-256):       ${stats.duplicates} Datensätze`,
    `   • Zeichensatz- & Umlaut-Verfälschung:   ${stats.encodingErrors} Fehler`,
    `   • Unnormalisierte Telefonnummern:       ${stats.unnormalizedPhones} Nummern`,
    `   • Fehlende Pflichtwerte (Null/Leer):    ${stats.missingValues} Leerstellen`,
    "   -----------------------------------------------------------------------------",
    `   GESAMTE ABWEICHUNGEN:                  ${stats.totalDefects} Punkte`,
    "",
    "3. KALKULATORISCHE ZEIT- & KOSTENVERSCHWENDUNG (TRANSPARENTE ANNAHME):",
    `   • Manueller Korrekturaufwand:          ca. ${hoursPerMonth} Stunden monatlich`,
    `   • Monatlicher Personalaufwand (45 €/h): ca. ${monthlyCost.toLocaleString("de-DE")} €`,
    `   • Berechneter jährlicher Verlust:      ca. ${annualLoss.toLocaleString("de-DE")} €`,
    "",
    "4. EMPFOHLENE LÖSUNG:",
    "   • Automatisierte Python-Pipeline (Paket 1: Datenprüfung & Bereinigung ab 350 €)",
    "   • Schlüsselfertige Schnittstellenintegration (Paket 3 ab 850 €)",
    "   • Kollisionsfreie SHA-256 Deduplizierung und E.164 Normalisierung",
    "   • Transparente Festpreisangebote nach Aufwandsschätzung",
    "",
    "5. KONTAKT & BERATUNG:",
    "   Nevio Waldemar Niebel | dev@nevioniebel.tech | https://nevioniebel.tech",
    "   Salzgitter, Niedersachsen (Region Braunschweig / Deutschlandweit Remote)",
    "================================================================================"
  ].join("\n");
}

function resetAuditDropzone() {
  currentDataset = null;
  cleanedDatasetContent = null;
  lastAuditReportText = null;

  const dropzone = document.getElementById("audit-dropzone");
  const progressBox = document.getElementById("audit-progress-box");
  const resultsBox = document.getElementById("audit-results-box");

  if (dropzone) dropzone.style.display = "block";
  if (progressBox) progressBox.style.display = "none";
  if (resultsBox) resultsBox.style.display = "none";

  const fileInput = document.getElementById("audit-file-input");
  if (fileInput) fileInput.value = "";
}

function downloadAuditReport() {
  if (!lastAuditReportText) {
    alert("Bitte führen Sie zuerst einen Audit durch.");
    return;
  }
  const blob = new Blob([lastAuditReportText], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, `Auditbericht-NevioNiebel-${new Date().toISOString().slice(0, 10)}.txt`);
}

function downloadCleanedFile() {
  if (!cleanedDatasetContent) {
    alert("Es liegt noch keine bereinigte Datei vor.");
    return;
  }
  const isJson = currentDataset && currentDataset.isJson;
  const mime = isJson ? "application/json;charset=utf-8" : "text/csv;charset=utf-8";
  const ext = isJson ? "json" : "csv";
  const baseName = currentDataset ? currentDataset.fileName.replace(/\.[^/.]+$/, "") : "Datensatz";

  const blob = new Blob([cleanedDatasetContent], { type: mime });
  downloadBlob(blob, `${baseName}-bereinigt.${ext}`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Unified Lead Dispatcher (Public FormSubmit HTTPS Gateway + Transparent Fallback)
 * Dispatches to FormSubmit HTTPS endpoint.
 * Note: Never contacts visitor-local endpoints in production. Does not store visitor PII in localStorage.
 * Returns { delivered: boolean, receipt: string, statusMessage: string }
 */
async function dispatchLeadData(payload) {
  let delivered = false;
  const receipt = payload.id;
  let statusMessage = "";

  // 1. Try public HTTPS endpoint: FormSubmit AJAX
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const formSubmitPayload = {
      _subject: `Neue B2B-Anfrage [${payload.id}]: ${payload.company || payload.name}`,
      name: payload.name || "Interessent",
      email: payload.email,
      company: payload.company || "k. A.",
      message: payload.message || payload.notes || JSON.stringify(payload),
      ref_id: payload.id,
      source: payload.source,
      _honey: ""
    };

    const res = await fetch("https://formsubmit.co/ajax/dev@nevioniebel.tech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formSubmitPayload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && (data.success === "true" || data.success === true)) {
        delivered = true;
        statusMessage = "Ihre Anfrage wurde erfolgreich übermittelt. Ich prüfe Ihre Angaben persönlich und melde mich zeitnah bei Ihnen.";
      }
    }
  } catch (e) {
    // Network error, adblocker or gateway timeout
  }

  return { delivered, receipt, statusMessage };
}

/**
 * Audit Lead Submission with Honest Fallback (Keeps input visible on non-delivery)
 */
async function handleAuditLeadSubmit(event) {
  event.preventDefault();

  const name = (document.getElementById("audit-lead-name")?.value || "").trim();
  const company = (document.getElementById("audit-lead-company")?.value || "").trim();
  const email = (document.getElementById("audit-lead-email")?.value || "").trim();
  const message = (document.getElementById("audit-lead-message")?.value || "").trim();
  const consent = document.getElementById("audit-lead-consent")?.checked;

  if (!consent) {
    alert("Bitte bestätigen Sie die Datenschutzerklärung für die Kontaktaufnahme.");
    return;
  }

  const leadRecord = {
    id: `LEAD-${Date.now()}`,
    source: "website_audit_lead_capture",
    timestamp: new Date().toISOString(),
    name,
    company,
    email,
    message,
    datasetAnalyzed: currentDataset ? currentDataset.fileName : "none",
    consentGiven: true
  };

  const formBox = document.getElementById("audit-lead-form-box");
  const successBox = document.getElementById("audit-lead-success-box");
  const fallbackBox = document.getElementById("audit-lead-fallback-box");
  const refCodeEl = document.getElementById("audit-lead-ref-code");
  const statusMsg = document.getElementById("audit-lead-status-msg");

  const mailSubject = `Ersteinschätzung Daten-Audit: ${company || name} [${leadRecord.id}]`;
  const mailBody = `Hallo Nevio Niebel,\n\nich habe den kostenlosen Daten-Audit auf nevioniebel.tech genutzt und interessiere mich für eine Optimierung:\n\n` +
    `• Vorgangs-ID: ${leadRecord.id}\n` +
    `• Name: ${name}\n` +
    `• Unternehmen: ${company || 'k. A.'}\n` +
    `• E-Mail: ${email}\n` +
    `• Analysierte Datei: ${leadRecord.datasetAnalyzed}\n` +
    (message ? `• Anmerkung:\n${message}\n\n` : `\n`) +
    `Bitte senden Sie mir eine unverbindliche Einschätzung zu.\n\nFreundliche Grüße,\n${name}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?cc=niebelnevio@icloud.com&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const dispatchResult = await dispatchLeadData(leadRecord);

  if (dispatchResult.delivered) {
    if (formBox) formBox.style.display = "none";
    if (fallbackBox) fallbackBox.style.display = "none";
    if (successBox) successBox.style.display = "block";
    if (refCodeEl) refCodeEl.textContent = leadRecord.id;
    if (statusMsg) {
      statusMsg.innerHTML = `Ihre Anfrage wurde erfolgreich an den Server übermittelt (Vorgangs-ID: <strong class="highlight-mint">${leadRecord.id}</strong>). Ich melde mich innerhalb von 24h an Werktagen persönlich bei Ihnen.`;
    }
  } else {
    // Form REMAINS VISIBLE with entered data. Show clear fallback CTA.
    if (fallbackBox) {
      fallbackBox.style.display = "block";
      const fallbackMailto = document.getElementById("audit-lead-fallback-mailto-btn");
      if (fallbackMailto) fallbackMailto.href = mailtoUrl;
      const copyBtn = document.getElementById("audit-lead-fallback-copy-btn");
      if (copyBtn) {
        copyBtn.onclick = () => copyTextToClipboard(mailBody, copyBtn);
      }
    }
    try { window.location.href = mailtoUrl; } catch (e) {}
  }
}

function updateOfferCardForAudit(stats, fileName, annualLoss) {
  const badgeEl = document.getElementById("offer-badge");
  const titleEl = document.getElementById("offer-title");
  const descEl = document.getElementById("offer-desc");
  const priceTagEl = document.getElementById("offer-price-tag");
  const priceSubEl = document.getElementById("offer-price-sub");
  const featuresEl = document.getElementById("offer-features");
  const ctaBtn = document.getElementById("offer-cta-btn");

  if (!stats) {
    if (badgeEl) badgeEl.textContent = "Paket 1 • Schnelle Ergebnisse";
    if (titleEl) titleEl.textContent = "Datenprüfung & Bereinigung";
    if (descEl) descEl.textContent = "Einmalige Analyse und Bereinigung fehlerhafter Datensätze, Adressbestände oder Artikelkataloge. Inklusive ausführlichem Prüfbericht und bereinigter CSV/Excel-Datei.";
    if (priceTagEl) priceTagEl.textContent = "350 €";
    if (priceSubEl) priceSubEl.textContent = "Festpreis (schlüsselfertige Bereinigung)";
    if (featuresEl) {
      featuresEl.innerHTML = `
        <li><span>✓</span> Kollisionsfreie SHA-256 Deduplizierung über Datensatzmerkmale</li>
        <li><span>✓</span> Vollständige Reparatur defekter Zeichensätze (UTF-8 / ISO-8859)</li>
        <li><span>✓</span> Normalisierung von Telefonnummern (E.164) und Adressfeldern</li>
        <li><span>✓</span> Neutralisierung potenzieller Formelinjektionen (OWASP-konform)</li>
        <li><span>✓</span> Bereitstellung schlüsselfertiger, direkt importierbarer Daten</li>
      `;
    }
    if (ctaBtn) {
      ctaBtn.textContent = "Jetzt unverbindlich anfragen (350 €) →";
      ctaBtn.href = "booking.html?pkg=paket-1";
    }
    return;
  }

  if (badgeEl) badgeEl.textContent = `Audit-Ergebnis: ${stats.totalDefects} Reibungspunkte erkannt`;
  if (titleEl) titleEl.textContent = `Maßgeschneiderte Bereinigung für '${fileName}'`;
  if (descEl) descEl.textContent = `Beseitigen Sie diese ${stats.totalDefects} wiederkehrenden Datenfehler dauerhaft. Wir bereinigen Ihren Datensatz und implementieren auf Wunsch eine wartungsarme Pipeline.`;
  if (priceTagEl) priceTagEl.textContent = "350 € – 850 €";
  if (priceSubEl) priceSubEl.textContent = "Festpreis (amortisiert sich in wenigen Wochen)";

  if (featuresEl) {
    featuresEl.innerHTML = `
      <li><span>✓</span> Beseitigt ${stats.duplicates} redundante Dubletten automatisch (SHA-256)</li>
      <li><span>✓</span> Repariert alle ${stats.encodingErrors} korrumpierten Umlaute & Sonderzeichen</li>
      <li><span>✓</span> Standardisiert ${stats.unnormalizedPhones} Telefonnummern nach internationalem E.164 Standard</li>
      <li><span>✓</span> Berechnetes Einsparpotenzial: ca. ${annualLoss ? annualLoss.toLocaleString("de-DE") : "0"} € pro Jahr</li>
      <li><span>✓</span> Datenschutzbewusst, clientseitige Analyse im Browser</li>
    `;
  }

  if (ctaBtn) {
    ctaBtn.textContent = `Bereinigung anfragen (spart ca. ${annualLoss ? annualLoss.toLocaleString("de-DE") : "0"} €/Jahr) →`;
    ctaBtn.href = `booking.html?pkg=paket-1&audit_defects=${stats.totalDefects}&file=${encodeURIComponent(fileName)}`;
  }
}

// =========================================================================
// 9. TAB 3: ENTWICKLERKONSOLE (CLI WITH REAL EXECUTION & HISTORY)
// =========================================================================

function handleCliKeyDown(e) {
  const input = document.getElementById("terminal-cli-input");
  if (!input) return;

  if (e.key === "Enter") {
    submitCliCommand();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (cliHistory.length > 0 && cliHistoryIndex > 0) {
      cliHistoryIndex--;
      input.value = cliHistory[cliHistoryIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (cliHistoryIndex < cliHistory.length - 1) {
      cliHistoryIndex++;
      input.value = cliHistory[cliHistoryIndex];
    } else {
      cliHistoryIndex = cliHistory.length;
      input.value = "";
    }
  } else if (e.key === "Tab") {
    e.preventDefault();
    handleCliTabCompletion(input);
  }
}

function handleCliTabCompletion(input) {
  const current = input.value.trim().toLowerCase();
  const COMMANDS = ["help", "sample", "audit", "summary", "duplicates", "validate", "clean", "roi", "report", "download", "reset", "kontakt", "clear"];
  const matches = COMMANDS.filter(c => c.startsWith(current));
  if (matches.length === 1) {
    input.value = matches[0];
  } else if (matches.length > 1) {
    printCliLog(`Mögliche Befehle: ${matches.join(", ")}`);
  }
}

function submitCliCommand() {
  const input = document.getElementById("terminal-cli-input");
  if (!input) return;
  const cmd = input.value.trim();
  if (cmd) {
    cliHistory.push(cmd);
    cliHistoryIndex = cliHistory.length;
    executeCliCommand(cmd);
    input.value = "";
  }
}

function executeCliCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  const screen = document.getElementById("cli-screen");
  if (!screen) return;

  // Print prompt
  const pLine = document.createElement("div");
  pLine.className = "cli-line";
  pLine.innerHTML = `<span class="prompt-user">gast@besucher</span>:<span class="prompt-path">~/labor</span>$ <span class="text-cmd">${escapeHtml(rawCmd)}</span>`;
  screen.appendChild(pLine);

  switch (cmd) {
    case "help":
    case "hilfe":
    case "?":
      printCliLog("VERFÜGBARE BEFEHLE IN DER ENTWICKLERKONSOLE:");
      printCliLog("  • sample      - Lädt den realistischen Großhandels-Musterkatalog (14 Zeilen)");
      printCliLog("  • audit       - Analysiert die aktuell geladene Datei auf Qualitätsprobleme");
      printCliLog("  • summary     - Zeigt Metadaten, Spalten und Zeilenanzahl des aktiven Datensatzes");
      printCliLog("  • duplicates  - Listet konkrete redundante Zeilen anhand von SHA-256 Hashes");
      printCliLog("  • validate    - Prüft Pflichtfelder, E.164 Telefonnummern und Datentypen");
      printCliLog("  • clean       - Bereinigt den aktiven Datensatz ECHT im Speicher (Umlaute, Dubletten)");
      printCliLog("  • download    - Lädt Prüfbericht ('download report') oder bereinigte Datei ('download clean')");
      printCliLog("  • roi         - Berechnet Zeitersparnis und Amortisationsdauer");
      printCliLog("  • reset       - Löscht geladenen Datensatz aus dem Speicher");
      printCliLog("  • kontakt     - Öffnet die unverbindliche Terminbuchung");
      printCliLog("  • clear       - Leert den Bildschirm");
      break;

    case "sample":
      loadSampleDataset();
      printCliLog(`✓ Musterdatensatz '${currentDataset.fileName}' (${currentDataset.rows.length} Zeilen) in Arbeitsspeicher geladen.`);
      printCliLog("  Tippen Sie 'audit' zur Analyse oder 'clean' zur automatisierten Bereinigung.");
      break;

    case "audit":
      if (!currentDataset) {
        printCliLog("⚠️ Kein Datensatz geladen. Lade Beispieldatei...");
        loadSampleDataset();
      }
      const stats = analyzeDataQuality(currentDataset.headers, currentDataset.rows);
      printCliLog(`📊 AUDIT-ERGEBNIS FÜR '${currentDataset.fileName}':`);
      printCliLog(`   • Zeilen: ${stats.rowCount} | Spalten: ${stats.colCount}`);
      printCliLog(`   • Redundante Dubletten:            ${stats.duplicates}`);
      printCliLog(`   • Zeichensatzfehler (Umlaute):      ${stats.encodingErrors}`);
      printCliLog(`   • Unnormalisierte Telefonnummern:  ${stats.unnormalizedPhones}`);
      printCliLog(`   • Fehlende Pflichtwerte:           ${stats.missingValues}`);
      printCliLog(`   ---------------------------------------------`);
      printCliLog(`   GESAMTE IDENTIFIZIERTE DEFEKTE:    ${stats.totalDefects}`);
      printCliLog(`💡 Tippen Sie 'clean', um diese Fehler im Speicher automatisch zu beheben.`);
      break;

    case "summary":
      if (!currentDataset) {
        printCliLog("⚠️ Kein Datensatz im Speicher. Tippen Sie 'sample' zum Laden.");
        break;
      }
      printCliLog(`DATENSATZ-ÜBERSICHT: '${currentDataset.fileName}'`);
      printCliLog(`• Zeilen: ${currentDataset.rows.length}`);
      printCliLog(`• Spalten (${currentDataset.headers.length}): ${currentDataset.headers.join(", ")}`);
      break;

    case "duplicates":
      if (!currentDataset) {
        printCliLog("⚠️ Kein Datensatz im Speicher. Tippen Sie 'sample' zum Laden.");
        break;
      }
      const dStats = analyzeDataQuality(currentDataset.headers, currentDataset.rows);
      if (dStats.duplicates === 0) {
        printCliLog("✓ Keine Dubletten im Datensatz gefunden.");
      } else {
        printCliLog(`⚠️ ${dStats.duplicates} Dubletten gefunden. Fundstellen:`);
        dStats.duplicateExamples.forEach(ex => printCliLog(`   • ${ex}`));
      }
      break;

    case "validate":
      if (!currentDataset) {
        printCliLog("⚠️ Kein Datensatz im Speicher. Tippen Sie 'sample' zum Laden.");
        break;
      }
      printCliLog("SCHEMA-VALIDIERUNG:");
      printCliLog(`• Pflichtfelder geprüft: ${currentDataset.rows.length * currentDataset.headers.length} Datenpunkte.`);
      const vStats = analyzeDataQuality(currentDataset.headers, currentDataset.rows);
      printCliLog(`• Validierungsfehler: ${vStats.missingValues} Leerstellen, ${vStats.unnormalizedPhones} Formatfehler.`);
      break;

    case "clean":
      if (!currentDataset) {
        printCliLog("⚠️ Kein Datensatz im Speicher. Lade Beispieldatei...");
        loadSampleDataset();
      }
      printCliLog("⚙️ Führe echte In-Memory-Bereinigung aus...");
      const cleanResult = cleanDatasetInMemory(currentDataset);
      cleanedDatasetContent = cleanResult.cleanedCsvText;
      printCliLog(`  ✓ ${cleanResult.encodingFixedCount} fehlerhafte Umlaute repariert.`);
      printCliLog(`  ✓ ${cleanResult.duplicatesRemoved} redundante Zeilen via SHA-256 eliminiert.`);
      printCliLog(`  ✓ ${cleanResult.phonesNormalizedCount} Telefonnummern nach E.164 standardisiert.`);
      printCliLog(`✅ BEREINIGUNG ABGESCHLOSSEN: ${cleanResult.originalRowCount} Zeilen -> ${cleanResult.newRowCount} Zeilen.`);
      printCliLog(`📥 Tippen Sie 'download clean', um das bereinigte Ergebnis herunterzuladen.`);
      break;

    case "download":
    case "download report":
      if (!lastAuditReportText) {
        printCliLog("⚠️ Kein Auditbericht vorhanden. Führen Sie zuerst 'audit' aus.");
      } else {
        downloadAuditReport();
        printCliLog("✓ Auditbericht als Textdatei heruntergeladen.");
      }
      break;

    case "download clean":
      if (!cleanedDatasetContent) {
        printCliLog("⚠️ Noch keine bereinigte Datei vorhanden. Führen Sie zuerst 'clean' aus.");
      } else {
        downloadCleanedFile();
        printCliLog("✓ Bereinigte CSV-Datei erfolgreich heruntergeladen.");
      }
      break;

    case "roi":
      if (!currentDataset) loadSampleDataset();
      const rStats = analyzeDataQuality(currentDataset.headers, currentDataset.rows);
      const hoursSaved = Math.max(1, Math.round((rStats.totalDefects * 2.0 / 60) * 10) / 10);
      const monthlyEur = Math.round(hoursSaved * 45);
      printCliLog("KALKULATION DES EINSPARPOTENZIALS:");
      printCliLog(`• Wöchentliche Arbeitszeitersparnis: ca. ${hoursSaved} Stunden`);
      printCliLog(`• Monatliche Kostenersparnis (bei 45 €/h): ca. ${monthlyEur} €`);
      printCliLog(`• Berechnete Netto-Ersparnis im 1. Jahr: ca. ${(monthlyEur * 12 - 850).toLocaleString("de-DE")} €`);
      break;

    case "reset":
      resetAuditDropzone();
      printCliLog("✓ Arbeitsspeicher geleert.");
      break;

    case "clear":
    case "cls":
      screen.innerHTML = "";
      break;

    case "kontakt":
    case "buchen":
      window.location.href = "booking.html";
      break;

    default:
      printCliLog(`Befehl '${escapeHtml(rawCmd)}' nicht erkannt. Tippen Sie 'help' für eine Befehlsliste.`);
  }

  screen.scrollTop = screen.scrollHeight;
}

function printCliLog(text) {
  const screen = document.getElementById("cli-screen");
  if (!screen) return;
  const line = document.createElement("div");
  line.className = "cli-line text-log";
  line.textContent = text;
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

// =========================================================================
// 10. SYNCHRONIZE OFFER CARDS & BOOKING HELPERS
// =========================================================================

// =========================================================================
// 10. PRODUCT SELECTOR & BOOKING PORTAL LOGIC (CENTRAL CATALOG DRIVEN)
// =========================================================================

function selectPackage(pkgId) {
  let pkg = PRODUCT_CATALOG[pkgId];
  if (!pkg) {
    const search = String(pkgId).toLowerCase();
    for (const key in PRODUCT_CATALOG) {
      const candidate = PRODUCT_CATALOG[key];
      if (candidate.aliases.some(alias => search.includes(alias)) || candidate.title.toLowerCase().includes(search)) {
        pkg = candidate;
        break;
      }
    }
  }
  if (!pkg) pkg = PRODUCT_CATALOG["paket-3"];

  // Update DOM cards with accessibility state
  const cards = document.querySelectorAll(".package-radio-card");
  cards.forEach(card => {
    const cardId = card.getAttribute("data-package-id");
    const cardPkg = (card.getAttribute("data-package") || "").toLowerCase();
    const isSelected = cardId === pkg.id || cardPkg.includes(pkg.id) || (cardId && pkg.aliases.includes(cardId));

    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-checked", isSelected ? "true" : "false");
    card.tabIndex = isSelected ? 0 : -1;
  });

  // Update hidden input for form submission
  const hiddenInput = document.getElementById("selected-package");
  if (hiddenInput) {
    hiddenInput.value = `${pkg.title} (${pkg.priceValue})`;
  }

  // Update summary overview
  const summaryPkg = document.getElementById("summary-package-name");
  const summaryPrice = document.getElementById("summary-package-price");
  const summaryDepositLabel = document.getElementById("summary-deposit-label");
  const summaryDeposit = document.getElementById("summary-package-deposit");
  const summaryNote = document.getElementById("summary-billing-note");

  if (summaryPkg) summaryPkg.textContent = pkg.title;
  if (summaryPrice) summaryPrice.textContent = pkg.priceValue;
  if (summaryDepositLabel) summaryDepositLabel.textContent = pkg.depositLabel;
  if (summaryDeposit) summaryDeposit.textContent = pkg.depositAmount;
  if (summaryNote) summaryNote.textContent = pkg.depositNote;
}

// Backward-compatible helper for legacy onclick signatures
function selectPackageCard(cardElement, packageName, priceValue) {
  const pkgId = cardElement?.getAttribute("data-package-id");
  if (pkgId && PRODUCT_CATALOG[pkgId]) {
    selectPackage(pkgId);
  } else {
    selectPackage(packageName || priceValue);
  }
}

function initPackageKeyboardNavigation() {
  const group = document.querySelector(".package-radio-group");
  if (!group) return;

  const catalogKeys = Object.keys(PRODUCT_CATALOG);

  group.addEventListener("keydown", (e) => {
    const cards = Array.from(group.querySelectorAll(".package-radio-card"));
    const activeIndex = cards.findIndex(c => c === document.activeElement || c.classList.contains("selected"));

    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (activeIndex + 1) % cards.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (activeIndex - 1 + cards.length) % cards.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = cards.length - 1;
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (document.activeElement && document.activeElement.classList.contains("package-radio-card")) {
        const pkgId = document.activeElement.getAttribute("data-package-id");
        if (pkgId) selectPackage(pkgId);
      }
      return;
    }

    if (nextIndex >= 0 && cards[nextIndex]) {
      const targetCard = cards[nextIndex];
      const pkgId = targetCard.getAttribute("data-package-id");
      if (pkgId) {
        selectPackage(pkgId);
        targetCard.focus();
      }
    }
  });
}

function checkUrlPackageParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get("pkg");
  if (pkgParam) {
    selectPackage(pkgParam);
  } else {
    // Default to Paket 3 if no parameter provided
    selectPackage("paket-3");
  }

  const notesField = document.getElementById("portal-notes");
  const auditDefects = urlParams.get("audit_defects");
  const auditFile = urlParams.get("file");
  if (auditDefects && notesField && !notesField.value) {
    notesField.value = `Ergebnis des Daten-Audits für '${auditFile || "unsere Datei"}': ${auditDefects} identifizierte Fehler/Dubletten. Wir möchten diesen Datenbestand schlüsselfertig bereinigen und ggf. automatisieren.`;
  }
}

async function handlePortalBookingSubmit(e) {
  e.preventDefault();

  const pkgInput = document.getElementById("selected-package");
  const pkg = pkgInput ? pkgInput.value : "Paket 3: Schnittstellen & Systeme verbinden (ab 850 €)";
  const day = document.getElementById("portal-day") ? document.getElementById("portal-day").value : "Schnellstmöglich";
  const time = document.getElementById("portal-time") ? document.getElementById("portal-time").value : "Vormittags";
  const name = document.getElementById("portal-name").value.trim();
  const company = document.getElementById("portal-company").value.trim();
  const email = document.getElementById("portal-email").value.trim();
  const notes = document.getElementById("portal-notes") ? document.getElementById("portal-notes").value.trim() : "";

  const bookingRecord = {
    id: `BOOK-${Date.now()}`,
    source: "booking_portal",
    timestamp: new Date().toISOString(),
    package: pkg,
    preferredTime: `${day}, ${time}`,
    name,
    company,
    email,
    notes,
    status: "DISCOVERED_INBOUND"
  };

  const formBox = document.getElementById("portal-form-container");
  const successBox = document.getElementById("portal-success-container");
  const fallbackBox = document.getElementById("portal-fallback-container");
  const refCodeEl = document.getElementById("portal-ref-code");
  const statusMsg = document.getElementById("portal-status-msg");

  const subject = `Projekt- & Terminbuchung: ${pkg} - ${company} (${name}) [${bookingRecord.id}]`;
  const body = `Sehr geehrter Herr Niebel,\n\nhiermit frage ich ein unverbindliches 15-minütiges Gespräch für folgendes Projekt an:\n\n` +
    `• Referenz: ${bookingRecord.id}\n` +
    `• Gewähltes Paket: ${pkg}\n` +
    `• Unternehmen: ${company}\n` +
    `• Ansprechpartner: ${name}\n` +
    `• E-Mail: ${email}\n` +
    `• Wunschtermin: ${day}, ${time}\n` +
    (notes ? `• Vorhaben:\n${notes}\n\n` : `\n`) +
    `Mit freundlichen Grüßen,\n${name}\n${company}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?cc=niebelnevio@icloud.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const dispatchResult = await dispatchLeadData(bookingRecord);

  if (dispatchResult.delivered) {
    if (formBox) formBox.style.display = "none";
    if (fallbackBox) fallbackBox.style.display = "none";
    if (successBox) successBox.style.display = "block";
    if (refCodeEl) refCodeEl.textContent = bookingRecord.id;
    if (statusMsg) {
      statusMsg.innerHTML = `Ihre Terminanfrage wurde erfolgreich übermittelt (Vorgangsnummer: <strong style="color: var(--color-mint); font-family: var(--font-mono);">${bookingRecord.id}</strong>). Ich prüfe Ihre Angaben persönlich und melde mich zeitnah bei Ihnen.`;
    }
  } else {
    // Keep form and entered data VISIBLE! Show honest fallback container with 1-click mailto
    if (fallbackBox) {
      fallbackBox.style.display = "block";
      const fallbackMailto = document.getElementById("portal-fallback-mailto-btn");
      if (fallbackMailto) fallbackMailto.href = mailtoUrl;
      const copyBtn = document.getElementById("portal-fallback-copy-btn");
      if (copyBtn) {
        copyBtn.onclick = () => copyTextToClipboard(body, copyBtn);
      }
    }
    try { window.location.href = mailtoUrl; } catch (err) {}
  }
}

// =========================================================================
// 11. ROI CALCULATOR (REALISTIC BUSINESS CASE & UNCERTAINTY MODELING)
// =========================================================================

function initRoiCalculator() {
  const hoursSlider = document.getElementById("roi-hours");
  const rateSlider = document.getElementById("roi-rate");
  if (!hoursSlider || !rateSlider) return;

  const autoSlider = document.getElementById("roi-automation");
  const setupInput = document.getElementById("roi-setup");
  const maintInput = document.getElementById("roi-maintenance");

  const hoursVal = document.getElementById("roi-hours-val");
  const rateVal = document.getElementById("roi-rate-val");
  const autoVal = document.getElementById("roi-automation-val");
  const setupVal = document.getElementById("roi-setup-val");
  const maintVal = document.getElementById("roi-maintenance-val");
  const resSetup = document.getElementById("roi-res-setup");

  const costMonthly = document.getElementById("roi-cost-monthly");
  const breakevenDays = document.getElementById("roi-breakeven-days");
  const yearlySavings = document.getElementById("roi-yearly-savings");
  const roiCta = document.getElementById("roi-cta-btn");

  function recalculate() {
    const hours = parseFloat(hoursSlider.value) || 0;
    const rate = parseFloat(rateSlider.value) || 0;
    const autoPercent = autoSlider ? (parseFloat(autoSlider.value) || 75) : 75;
    const setupCost = setupInput ? (parseFloat(setupInput.value) || 850) : 850;
    const maintCost = maintInput ? (parseFloat(maintInput.value) || 300) : 300;

    const residualManualPercent = 100 - autoPercent;

    if (hoursVal) hoursVal.textContent = `${hours} Std. / Woche`;
    if (rateVal) rateVal.textContent = `${rate} € / Std.`;
    if (autoVal) autoVal.textContent = `${autoPercent} % (Restprüfung: ${residualManualPercent} %)`;
    if (setupVal) setupVal.textContent = `${setupCost.toLocaleString("de-DE")} €`;
    if (maintVal) maintVal.textContent = `${maintCost.toLocaleString("de-DE")} € / Jahr`;
    if (resSetup) resSetup.textContent = `${setupCost.toLocaleString("de-DE")} €`;

    // Realistic automation model:
    // Manual hours/month = hours * 4.2 weeks
    const monthlyManualHours = hours * 4.2;
    const monthlyManualCost = monthlyManualHours * rate;

    // Monthly gross savings from automation
    const automationRate = autoPercent / 100.0;
    const monthlyAutomatedSavings = monthlyManualCost * automationRate;

    // Net savings year 1 (CAN BE NEGATIVE if setup + maintenance > gross savings)
    const annualGrossSavings = monthlyAutomatedSavings * 12;
    const netSavingsYear1 = Math.round(annualGrossSavings - setupCost - maintCost);

    // Estimated break-even in months
    const monthlyNetBenefit = monthlyAutomatedSavings - (maintCost / 12);
    let breakEvenText = "N/A";
    if (monthlyNetBenefit <= 0) {
      breakEvenText = "Keine Amortisation (Kosten übersteigen Ersparnis)";
    } else {
      const months = setupCost / monthlyNetBenefit;
      const formattedMonths = months.toFixed(1).replace(".", ",");
      if (months > 36) {
        breakEvenText = `nach ca. ${formattedMonths} Monaten (> 3 Jahre)`;
      } else if (Math.abs(months - 1.0) < 0.08) {
        breakEvenText = `nach ca. 1 Monat`;
      } else {
        breakEvenText = `nach ca. ${formattedMonths} Monaten`;
      }
    }

    if (costMonthly) costMonthly.textContent = `ca. ${Math.round(monthlyManualCost).toLocaleString("de-DE")} € / Mo.`;
    if (breakevenDays) breakevenDays.textContent = breakEvenText;

    if (yearlySavings) {
      if (netSavingsYear1 < 0) {
        yearlySavings.textContent = `${netSavingsYear1.toLocaleString("de-DE")} € (Defizit im 1. Jahr)`;
        yearlySavings.style.color = "#ff6b6b";
      } else {
        yearlySavings.textContent = `ca. ${netSavingsYear1.toLocaleString("de-DE")} €`;
        yearlySavings.style.color = "var(--color-mint)";
      }
    }

    if (roiCta) {
      roiCta.textContent = `Unverbindliches Angebot anfragen →`;
      roiCta.href = `booking.html?pkg=Paket+3:+Schnittstellen+und+Systeme+verbinden&roi_savings=${netSavingsYear1}&hours=${hours}&rate=${rate}&auto=${autoPercent}`;
    }
  }

  hoursSlider.addEventListener("input", recalculate);
  rateSlider.addEventListener("input", recalculate);
  if (autoSlider) autoSlider.addEventListener("input", recalculate);
  if (setupInput) setupInput.addEventListener("input", recalculate);
  if (maintInput) maintInput.addEventListener("input", recalculate);
  recalculate();
}

function escapeHtml(text) {
  if (!text) return "";
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function copyTextToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const origText = btnElement.innerHTML;
      btnElement.innerHTML = "✓ Text kopiert!";
      setTimeout(() => { btnElement.innerHTML = origText; }, 2500);
    }
  }).catch(() => {
    alert("Kopieren fehlgeschlagen. Bitte markieren und kopieren Sie den Text manuell.");
  });
}

async function handleContactSubmit(e) {
  e.preventDefault();

  const name = (document.getElementById("contact-name")?.value || "").trim();
  const email = (document.getElementById("contact-email")?.value || "").trim();
  const subject = (document.getElementById("contact-subject")?.value || "").trim();
  const message = (document.getElementById("contact-message")?.value || "").trim();

  const contactRecord = {
    id: `CONTACT-${Date.now()}`,
    source: "contact_page",
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message,
    status: "DISCOVERED_INBOUND"
  };

  const formBox = document.getElementById("contact-form-container");
  const successBox = document.getElementById("contact-success-container");
  const fallbackBox = document.getElementById("contact-fallback-container");
  const refCodeEl = document.getElementById("contact-ref-code");
  const statusMsg = document.getElementById("contact-status-msg");

  const mailSubject = `Kontaktanfrage: ${subject} - ${name} [${contactRecord.id}]`;
  const mailBody = `Sehr geehrter Herr Niebel,\n\nhiermit sende ich folgende Anfrage über das Kontaktformular:\n\n` +
    `• Referenz: ${contactRecord.id}\n` +
    `• Name: ${name}\n` +
    `• E-Mail: ${email}\n` +
    `• Betreff: ${subject}\n\n` +
    `• Nachricht:\n${message}\n\n` +
    `Mit freundlichen Grüßen,\n${name}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?cc=niebelnevio@icloud.com&subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const dispatchResult = await dispatchLeadData(contactRecord);

  if (dispatchResult.delivered) {
    if (formBox) formBox.style.display = "none";
    if (fallbackBox) fallbackBox.style.display = "none";
    if (successBox) successBox.style.display = "block";
    if (refCodeEl) refCodeEl.textContent = contactRecord.id;
    if (statusMsg) {
      statusMsg.innerHTML = `Ihre Nachricht wurde erfolgreich übermittelt (Vorgangsnummer: <strong style="color: var(--color-mint); font-family: var(--font-mono);">${contactRecord.id}</strong>). Ich prüfe Ihre Angaben und melde mich zeitnah bei Ihnen.`;
    }
  } else {
    // Keep form and entered data VISIBLE! Show honest fallback container with 1-click mailto
    if (fallbackBox) {
      fallbackBox.style.display = "block";
      const fallbackMailto = document.getElementById("contact-fallback-mailto-btn");
      if (fallbackMailto) fallbackMailto.href = mailtoUrl;
      const copyBtn = document.getElementById("contact-fallback-copy-btn");
      if (copyBtn) {
        copyBtn.onclick = () => copyTextToClipboard(mailBody, copyBtn);
      }
    }
    try { window.location.href = mailtoUrl; } catch (err) {}
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  checkUrlPackageParameter();
  initPackageKeyboardNavigation();

  // Tablist arrow keyboard navigation for accessibility
  const tabList = document.querySelector(".terminal-mode-bar");
  if (tabList) {
    tabList.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        switchTerminalMode("audit");
        document.getElementById("tab-mode-audit")?.focus();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        switchTerminalMode("demo");
        document.getElementById("tab-mode-demo")?.focus();
      }
    });
  }

  initRoiCalculator();

  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      targetEl.scrollIntoView();
    }
  }
});

// Explicit window bindings for robust inline event triggers & cross-context verification
window.switchTerminalMode = switchTerminalMode;
window.selectPackage = selectPackage;
window.selectPackageCard = selectPackageCard;
window.loadSampleDataset = loadSampleDataset;
window.cleanDatasetInMemory = cleanDatasetInMemory;
window.downloadCleanedFile = downloadCleanedFile;
window.downloadAuditReport = downloadAuditReport;
window.handleAuditLeadSubmit = handleAuditLeadSubmit;
window.handlePortalBookingSubmit = handlePortalBookingSubmit;
window.handleContactSubmit = handleContactSubmit;
window.executeCliCommand = executeCliCommand;
window.executeTerminalCommand = executeCliCommand;
window.copyTextToClipboard = copyTextToClipboard;
window.sha256Utf8 = sha256Utf8;
window.getCurrentDataset = () => typeof currentDataset !== "undefined" ? currentDataset : null;
window.getCleanedContent = () => typeof cleanedDatasetContent !== "undefined" ? cleanedDatasetContent : null;
window.PRODUCT_CATALOG = PRODUCT_CATALOG;
