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

// 5 Core Solutions
const SCENARIOS = {
  invoicing: {
    id: "invoicing",
    title: "Rechnungs- & Dokumentenverarbeitung",
    badge: "Paket A • Büroarbeit automatisieren",
    tagline: "Eingehende Rechnungen & PDF-Belege fehlerfrei auslesen und buchen",
    desc: "Automatische Extraktion von Rechnungsbeträgen, IBAN, USt-IdNr., Steuersätzen und Positionen aus PDFs oder E-Mails. Übergabe direkt an Ihr Buchhaltungsprogramm (DATEV, sevdesk, Lexware) oder ERP.",
    price: "450 € – 850 €",
    priceSub: "Festpreis (schlüsselfertige Automatisierung)",
    packageName: "Paket A: Büroarbeit automatisieren (450 € - 850 €)",
    bookingUrl: "booking.html?pkg=Paket+A:+Büroarbeit+automatisieren",
    features: [
      "Automatischer Postfach-Scan oder Drag & Drop Upload",
      "Strukturierte Extraktion aller steuerrelevanten Felder nach § 14 UStG",
      "Plausibilitätsprüfung (Netto + MwSt = Brutto, IBAN-Prüfziffer)",
      "Direkter Export in CSV, Excel oder API-Übergabe an DATEV / sevdesk",
      "Spart 5 bis 15 Arbeitsstunden pro Woche im kaufmännischen Bereich"
    ],
    steps: [
      { step: "Posteingang prüfen", detail: "PDF-Rechnung 'Rechnung_2026_0891.pdf' erkannt..." },
      { step: "Daten auslesen", detail: "Lieferant, Rechnungsnummer, Datum, Netto/USt/Brutto extrahiert..." },
      { step: "Mathematische Prüfung", detail: "Prüfe Beträge: 1.250,00 € + 237,50 € (19%) = 1.487,50 € ✓ Korrekt." },
      { step: "Buchung vorbereiten", detail: "DATEV-Format erzeugt, Buchungssatz schlüsselfertig bereitgestellt." }
    ],
    plainExplanation: {
      problem: "Mitarbeiter tippen jede Woche dutzende Rechnungen von Hand ab. Ein Zahlendreher führt zu falschen Überweisungen oder Fehlern in der Umsatzsteuervoranmeldung.",
      solution: "Eine schlanke Python-Pipeline liest die Belege in Sekundenbruchteilen aus, prüft die Rechenwege und bereitet die Buchungssätze vor.",
      benefit: "Bis zu 80% Zeitersparnis bei der vorbereitenden Buchhaltung, null Tippfehler und sofortige Übersicht über alle offenen Posten."
    }
  },
  dataclean: {
    id: "dataclean",
    title: "Datenbereinigung & Katalog-Aufbereitung",
    badge: "Paket D • Daten & Systeme verbinden",
    tagline: "Großhändler-Kataloge, Datanorm & Artikelstammdaten harmonisieren",
    desc: "Beseitigen Sie unvollständige Artikel, kaputte Umlaute, inkonsistente Preise und redundante Dubletten vollautomatisch aus Ihren Tabellen.",
    price: "650 € – 1.250 €",
    priceSub: "Festpreis (inklusive Unittests & 30 Tage Betreuung)",
    packageName: "Paket D: Daten und Systeme verbinden (850 €)",
    bookingUrl: "booking.html?pkg=Paket+D:+Daten+und+Systeme+verbinden",
    features: [
      "Kollisionsfreie SHA-256 Deduplizierung über Artikelmerkmale",
      "Automatische Reparatur korrumpierter Zeichensätze (UTF-8 / ISO-8859)",
      "Normalisierung von Telefonnummern (E.164) und Postanschriften",
      "Datanorm v4 / v5 und BMEcat Konvertierungsroutinen",
      "Verhindert fehlerhafte Bestellungen und veraltete Kundenpreise"
    ],
    steps: [
      { step: "Katalog einlesen", detail: "Importiere 1.250 Großhändler-Artikelzeilen..." },
      { step: "Umlaute reparieren", detail: "Korrumpierte Zeichenketten behoben (z.B. 'MÃ¼ller' -> 'Müller')..." },
      { step: "Dubletten entfernen", detail: "SHA-256 Fingerprints verglichen: 142 redundante Zeilen eliminiert..." },
      { step: "Export bereitstellen", detail: "Bereinigter Katalog validiert und im Zielformat exportiert." }
    ],
    plainExplanation: {
      problem: "Lieferanten senden Preislisten mit abweichenden Spalten, falschen Umlauten und doppelten Artikeln. Vor dem Import in den Shop oder die WaWi müssen Tabellen mühsam bereinigt werden.",
      solution: "Ein automatisierter Validator bereinigt alle Felder in unter 2 Sekunden nach festen Regeln und meldet Ausreißer sofort.",
      benefit: "Aktuelle Preise im System, keine Reklamationen durch veraltete Katalogdaten und keine manuelle Tabellenarbeit mehr."
    }
  },
  crmsync: {
    id: "crmsync",
    title: "Kunden- & Auftragsverwaltung",
    badge: "Paket C • Kunden- & Auftragsverwaltung",
    tagline: "Anfragen, Termine und Kundendaten zentral bündeln",
    desc: "Führen Sie Website-Anfragen, E-Mails und Aufträge an einem Ort zusammen. Keine verlorenen Zettel, keine unbeantworteten Interessenten.",
    price: "850 € – 1.850 €",
    priceSub: "Festpreis (Maßgeschneidertes CRM / Auftrags-Board)",
    packageName: "Paket C: Kunden- und Auftragsverwaltung (850 € - 1.850 €)",
    bookingUrl: "booking.html?pkg=Paket+C:+Kunden-+und+Auftragsverwaltung",
    features: [
      "Zentrale Übersicht über alle Kunden, Angebote und Projektstände",
      "Automatische Benachrichtigung bei neuen Kundenanfragen per E-Mail/SMS",
      "Status-Tracking: Von der Anfrage über das Angebot bis zum Geldeingang",
      "Wiedervorlage-Funktion: Nie wieder ein wichtiges Nachfassen vergessen",
      "Einfache Bedienung ohne monatliche teure Lizenzgebühren pro Benutzer"
    ],
    steps: [
      { step: "Anfrage erfassen", detail: "Neue Kundenanfrage über Webformular eingegangen..." },
      { step: "Dubletten-Check", detail: "Kundenstamm geprüft: Neuer Interessent, Kontaktdaten angelegt..." },
      { step: "Benachrichtigung", detail: "Sofort-Benachrichtigung an Vertriebsleitung gesendet..." },
      { step: "Status setzen", detail: "Status 'QUALIFIED' im Dashboard gesetzt, Wiedervorlage in 48h geplant." }
    ],
    plainExplanation: {
      problem: "Anfragen landen in verschiedenen Postfächern, Angebote geraten in Vergessenheit und es fehlt der Überblick, welche Aufträge bereits abgerechnet sind.",
      solution: "Ein klares, unkompliziertes System erfasst jede Anfrage automatisch, erinnert an Fristen und zeigt den genauen Auftragsstatus.",
      benefit: "Mehr Abschlüsse durch pünktliches Nachfassen, zufriedene Kunden und volle Transparenz über alle offenen Umsätze."
    }
  },
  apisync: {
    id: "apisync",
    title: "Systemintegration & Datensynchronisation",
    badge: "Paket D • Daten & Systeme verbinden",
    tagline: "Vorhandene Programme und externe Plattformen nahtlos verknüpfen",
    desc: "Verbinden Sie Ihren Onlineshop, Ihr ERP-System und externe Schnittstellen über sichere, ausfallsichere FastAPI-Konnektoren mit Zero-Downtime.",
    price: "850 € – 2.400 €",
    priceSub: "Festpreis (schlüsselfertig inkl. Dokumentation & Docker)",
    packageName: "Paket D: Daten und Systeme verbinden (850 € - 2.400 €)",
    bookingUrl: "booking.html?pkg=Paket+D:+Daten+und+Systeme+verbinden",
    features: [
      "Asynchrones FastAPI / Python Backend mit extrem kurzen Latenzen",
      "Sichere Authentifizierung (API-Keys, HMAC-SHA256 Signaturprüfung)",
      "Bidirektionaler Datenabgleich (z. B. Shopware/Shopify <-> WaWi)",
      "Automatisches Retry-Handling mit Fehlerspeicher (kein Datenverlust bei Netzausfall)",
      "Lokal oder auf Ihrem eigenen Server betreibbar"
    ],
    steps: [
      { step: "Webhook empfangen", detail: "Eingehender Auftrag aus Webshop eingetroffen..." },
      { step: "Signatur prüfen", detail: "HMAC-SHA256 Krypto-Signatur validiert: Payload integer & echt..." },
      { step: "Daten transformieren", detail: "Shop-JSON in ERP-taugliches Schema übersetzt..." },
      { step: "Transaktion buchen", detail: "Auftrag transaktionssicher im Zielsystem verbucht (Latenz: 42ms)." }
    ],
    plainExplanation: {
      problem: "Programme arbeiten isoliert voneinander. Aufträge aus dem Shop müssen von Hand in die Warenwirtschaft eingetragen werden. Das verzögert den Versand.",
      solution: "Eine automatische Schnittstelle überträgt Daten in Echtzeit zwischen den Programmen, sobald ein Ereignis eintritt.",
      benefit: "Schnellere Lieferzeiten, null Doppelarbeiten und vollständige Datenkonsistenz über alle Unternehmensbereiche hinweg."
    }
  },
  reporting: {
    id: "reporting",
    title: "Automatische Berichterstellung",
    badge: "Paket E • Wartung & laufende Betreuung",
    tagline: "Wöchentliche Auswertungen & Kennzahlen pünktlich auf dem Tisch",
    desc: "Schluss mit stundenlangem Zusammensuchen von Zahlen aus verschiedenen Systemen. Automatisch generierte PDF- und Excel-Berichte jeden Montagmorgen um 07:00 Uhr.",
    price: "ab 190 € / Monat",
    priceSub: "Monatlicher Retainer (laufende Überwachung & Updates)",
    packageName: "Paket E: Wartung und laufende Betreuung (190 €/Mo.)",
    bookingUrl: "booking.html?pkg=Paket+E:+Wartung+und+laufende+Betreuung",
    features: [
      "Automatische Aggregation von Umsätzen, Beständen und Auftragseingängen",
      "Kompakter PDF-Management-Report pünktlich jeden Montagmorgen",
      "Frühwarnsystem bei Schwellenwert-Überschreitungen (z. B. Lieferengpässe)",
      "Verlässliche Reaktionszeiten bei technischen Fragen oder Anpassungen",
      "Monatlich kündbar, transparente Abrechnung nach § 14 UStG"
    ],
    steps: [
      { step: "Datenquellen abfragen", detail: "Umsatz-, Lager- und Auftragsdatenbanken abgefragt..." },
      { step: "KPIs berechnen", detail: "Wochenumsatz, Deckungsbeitrag und Durchlaufzeiten aggregiert..." },
      { step: "Report generieren", detail: "Übersichtlicher 2-seitiger PDF-Bericht mit Diagrammen erstellt..." },
      { step: "Versand ausführen", detail: "Report per E-Mail an Geschäftsleitung zugestellt (07:00 Uhr)." }
    ],
    plainExplanation: {
      problem: "Montagmorgen verbringt die Geschäftsleitung oder Assistenz Stunden damit, Zahlen aus verschiedenen Tabellen zusammenzukopieren, um den Wochenstatus zu kennen.",
      solution: "Ein geplanter Hintergrund-Service sammelt die Kennzahlen nachts vollautomatisch und liefert den fertigen Bericht um 07:00 Uhr ins Postfach.",
      benefit: "Fundierte Geschäftsentscheidungen auf Knopfdruck, sofortige Erkennung von Trends und mehr Zeit für das Kerngeschäft."
    }
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
let activeScenarioId = "invoicing";
let isSimulating = false;

// =========================================================================
// 3. RFC 4180 COMPLIANT PARSER (CSV, TSV, JSON)
// =========================================================================

/**
 * Robust CSV/TSV parser handling quotes, commas/semicolons, and escaped quotes
 */
function parseCsvAdvanced(text, delimiterHint) {
  // 1. Detect delimiter if not given
  let delimiter = delimiterHint;
  if (!delimiter) {
    const firstLine = text.split(/\r?\n/)[0] || "";
    const semicolons = (firstLine.match(/;/g) || []).length;
    const commas = (firstLine.match(/,/g) || []).length;
    const tabs = (firstLine.match(/\t/g) || []).length;
    if (semicolons >= commas && semicolons >= tabs) delimiter = ";";
    else if (tabs > commas) delimiter = "\t";
    else delimiter = ",";
  }

  const rows = [];
  let currentRow = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' || char === "'") {
      if (inQuotes && nextChar === char) {
        // Escaped quote
        currentField += char;
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = "";
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++; // Skip \n in \r\n
      currentRow.push(currentField.trim());
      if (currentRow.some(f => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(f => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) return { headers: [], rows: [], delimiter };

  const headers = rows[0].map(h => h.replace(/^["']|["']$/g, ""));
  const dataRows = rows.slice(1);

  return { headers, rows: dataRows, delimiter };
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
 * Cleans the dataset in memory:
 * - Fixes corrupted UTF-8 umlaute
 * - Removes duplicate rows (based on SHA-256 / normalized row key)
 * - Standardizes German & international phone numbers to E.164 (+49...)
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

  function normalizePhone(str) {
    if (!str) return str;
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
  let duplicatesRemoved = 0;
  let encodingFixedCount = 0;
  let phonesNormalizedCount = 0;

  dataset.rows.forEach(row => {
    // 1. Repair fields
    const cleanedRow = row.map(val => {
      let v = val.trim();
      const repaired = repairEncoding(v);
      if (repaired !== v) encodingFixedCount++;

      const phoneNormalized = normalizePhone(repaired);
      if (phoneNormalized !== repaired && phoneNormalized.startsWith("+49")) {
        phonesNormalizedCount++;
        return phoneNormalized;
      }
      return repaired;
    });

    // 2. Deduplicate
    const rowKey = cleanedRow.map(x => x.toLowerCase().replace(/[^a-z0-9]/g, "")).join("||");
    if (seenHashes.has(rowKey)) {
      duplicatesRemoved++;
    } else {
      seenHashes.add(rowKey);
      cleanedRows.push(cleanedRow);
    }
  });

  // Re-encode cleaned dataset to CSV text
  const delimiter = dataset.delimiter || ";";
  const headerLine = dataset.headers.join(delimiter);
  const dataLines = cleanedRows.map(r => r.map(f => f.includes(delimiter) || f.includes('"') ? `"${f.replace(/"/g, '""')}"` : f).join(delimiter));
  const fullCleanedCsv = [headerLine, ...dataLines].join("\n");

  return {
    headers: dataset.headers,
    rows: cleanedRows,
    delimiter: delimiter,
    duplicatesRemoved,
    encodingFixedCount,
    phonesNormalizedCount,
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

  const phoneVariationRegex = /^(0049|\+49|0)[0-9\s\/\-\(\)]+$/;
  const e164StrictRegex = /^\+49[1-9][0-9]{5,14}$/;
  const encodingCorruptRegex = /(Ã¼|Ã¶|Ã¤|ÃŸ|Ã„|Ã–|Ãœ|â‚¬|\?{2,})/;

  rows.forEach((row, idx) => {
    const rowKey = row.join("||").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seenHashes.has(rowKey)) {
      duplicates++;
      if (duplicateExamples.length < 3) {
        duplicateExamples.push(`Zeile ${idx + 2}: ${row.slice(0, 3).join(" | ")}`);
      }
    } else {
      seenHashes.add(rowKey);
    }

    row.forEach(val => {
      const v = val.trim();
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
// 6. TERMINAL TABS CONTROLLER (STRICT SEPARATION)
// =========================================================================

function switchTerminalMode(mode) {
  const tabScenarios = document.getElementById("tab-mode-scenarios");
  const tabAudit = document.getElementById("tab-mode-audit");
  const tabCli = document.getElementById("tab-mode-cli");

  const viewScenarios = document.getElementById("view-scenarios");
  const viewAudit = document.getElementById("view-audit");
  const viewCli = document.getElementById("view-cli");

  // Reset tab active states
  if (tabScenarios) tabScenarios.classList.remove("active");
  if (tabAudit) tabAudit.classList.remove("active");
  if (tabCli) tabCli.classList.remove("active");

  // Hide all view containers
  if (viewScenarios) viewScenarios.style.display = "none";
  if (viewAudit) viewAudit.style.display = "none";
  if (viewCli) viewCli.style.display = "none";

  if (mode === "audit") {
    if (tabAudit) tabAudit.classList.add("active");
    if (viewAudit) viewAudit.style.display = "block";
    updateOfferCardForAudit();
  } else if (mode === "cli") {
    if (tabCli) tabCli.classList.add("active");
    if (viewCli) viewCli.style.display = "block";
    const cliInp = document.getElementById("terminal-cli-input");
    if (cliInp) cliInp.focus();
    printCliLog("[KONSOLE AKTIV] Tippen Sie 'help' für eine Übersicht aller Befehle. Verwenden Sie Pfeiltasten ↑/↓ für die Historie.");
  } else {
    // Default: scenarios
    if (tabScenarios) tabScenarios.classList.add("active");
    if (viewScenarios) viewScenarios.style.display = "block";
    updateTerminalOfferCard(SCENARIOS[activeScenarioId] || SCENARIOS.invoicing);
  }
}

// =========================================================================
// 7. TAB 1: LÖSUNGEN ERLEBEN (SCENARIOS & PLAIN EXPLANATIONS)
// =========================================================================

function playScenario(scenarioId) {
  if (isSimulating) return;
  const scenario = SCENARIOS[scenarioId];
  if (!scenario) return;

  activeScenarioId = scenarioId;

  // Highlight active scenario selector button
  document.querySelectorAll(".scenario-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-scenario") === scenarioId);
  });

  const titleEl = document.getElementById("scenario-detail-title");
  const badgeEl = document.getElementById("scenario-detail-badge");
  const taglineEl = document.getElementById("scenario-detail-tagline");
  const problemEl = document.getElementById("scenario-plain-problem");
  const solutionEl = document.getElementById("scenario-plain-solution");
  const benefitEl = document.getElementById("scenario-plain-benefit");
  const stepsContainer = document.getElementById("scenario-steps-container");

  if (titleEl) titleEl.textContent = scenario.title;
  if (badgeEl) badgeEl.textContent = scenario.badge;
  if (taglineEl) taglineEl.textContent = scenario.tagline;
  if (problemEl) problemEl.textContent = scenario.plainExplanation.problem;
  if (solutionEl) solutionEl.textContent = scenario.plainExplanation.solution;
  if (benefitEl) benefitEl.textContent = scenario.plainExplanation.benefit;

  // Render steps with progress simulation
  if (stepsContainer) {
    stepsContainer.innerHTML = "";
    isSimulating = true;

    scenario.steps.forEach((st, idx) => {
      const stepRow = document.createElement("div");
      stepRow.className = "scenario-step-row pending";
      stepRow.id = `step-row-${idx}`;
      stepRow.innerHTML = `
        <div class="step-num">${idx + 1}</div>
        <div class="step-content">
          <div class="step-label">${escapeHtml(st.step)}</div>
          <div class="step-detail">${escapeHtml(st.detail)}</div>
        </div>
        <div class="step-status-icon">⏳</div>
      `;
      stepsContainer.appendChild(stepRow);
    });

    // Animate progress sequentially
    let currentStep = 0;
    function runNextStep() {
      if (currentStep < scenario.steps.length) {
        const row = document.getElementById(`step-row-${currentStep}`);
        if (row) {
          row.classList.remove("pending");
          row.classList.add("running");
          const icon = row.querySelector(".step-status-icon");
          if (icon) icon.textContent = "⚡";

          setTimeout(() => {
            row.classList.remove("running");
            row.classList.add("completed");
            if (icon) icon.textContent = "✓";
            currentStep++;
            runNextStep();
          }, 350);
        }
      } else {
        isSimulating = false;
        updateTerminalOfferCard(scenario);
      }
    }
    setTimeout(runNextStep, 200);
  } else {
    updateTerminalOfferCard(scenario);
  }
}

function toggleScenarioTechDetails() {
  const box = document.getElementById("scenario-tech-details");
  const btn = document.getElementById("scenario-tech-toggle-btn");
  if (!box || !btn) return;

  const isHidden = box.style.display === "none" || !box.style.display;
  box.style.display = isHidden ? "block" : "none";
  btn.textContent = isHidden ? "▲ Technische Details ausblenden" : "▼ Technische Details & Stack anzeigen";
}

// =========================================================================
// 8. TAB 2: KOSTENLOSER DATEN-AUDIT (REAL ENGINE & CLEANING)
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
    "   • Automatisierte Python-Pipeline (Paket D: Daten und Systeme verbinden)",
    "   • 100% automatische SHA-256 Deduplizierung und E.164 Normalisierung",
    "   • Einmaliger Festpreis ab 650 € netto (amortisiert sich in wenigen Wochen)",
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
 * Client-Side Reliable Lead Capture Submission (No Mailto Lock-In)
 */
function handleAuditLeadSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("audit-lead-name").value.trim();
  const company = document.getElementById("audit-lead-company").value.trim();
  const email = document.getElementById("audit-lead-email").value.trim();
  const message = document.getElementById("audit-lead-message").value.trim();
  const consent = document.getElementById("audit-lead-consent").checked;

  if (!consent) {
    alert("Bitte bestätigen Sie die Datenschutzerklärung für die Kontaktaufnahme.");
    return;
  }

  // Create lead record
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

  // Save to localStorage so no lead is EVER lost
  try {
    const existing = JSON.parse(localStorage.getItem("nevioniebel_inbound_leads") || "[]");
    existing.push(leadRecord);
    localStorage.setItem("nevioniebel_inbound_leads", JSON.stringify(existing));
  } catch (err) {
    console.warn("localStorage write error:", err);
  }

  // Show immediate on-page confirmation
  const formBox = document.getElementById("audit-lead-form-box");
  const successBox = document.getElementById("audit-lead-success-box");
  const refCodeEl = document.getElementById("audit-lead-ref-code");

  if (refCodeEl) refCodeEl.textContent = leadRecord.id;
  if (formBox) formBox.style.display = "none";
  if (successBox) successBox.style.display = "block";
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
    if (badgeEl) badgeEl.textContent = "Kostenloser Daten-Audit";
    if (titleEl) titleEl.textContent = "Datenbereinigung & Pipeline-Automatisierung";
    if (descEl) descEl.textContent = "Laden Sie oben Ihre Datei hoch, um Dubletten, defekte Zeichensätze und manuelle Zeitverschwendung transparent zu identifizieren.";
    if (priceTagEl) priceTagEl.textContent = "ab 650 €";
    if (priceSubEl) priceSubEl.textContent = "Festpreis nach Aufwand";
    return;
  }

  if (badgeEl) badgeEl.textContent = `Audit-Ergebnis: ${stats.totalDefects} Reibungspunkte erkannt`;
  if (titleEl) titleEl.textContent = `Maßgeschneiderte Pipeline für '${fileName}'`;
  if (descEl) descEl.textContent = `Beseitigen Sie diese ${stats.totalDefects} wiederkehrenden Datenfehler dauerhaft. Wir implementieren eine wartungsfreie Python-Pipeline, die diese Datei vollautomatisch und fehlerfrei einliest.`;
  if (priceTagEl) priceTagEl.textContent = "650 € – 850 €";
  if (priceSubEl) priceSubEl.textContent = "Festpreis (amortisiert sich in wenigen Wochen)";

  if (featuresEl) {
    featuresEl.innerHTML = `
      <li><span>✓</span> Beseitigt ${stats.duplicates} redundante Dubletten automatisch (SHA-256)</li>
      <li><span>✓</span> Repariert alle korrumpierten Umlaute & Sonderzeichen</li>
      <li><span>✓</span> Standardisiert Telefonnummern nach internationalem E.164 Standard</li>
      <li><span>✓</span> Berechnetes Einsparpotenzial: ca. ${annualLoss ? annualLoss.toLocaleString("de-DE") : "0"} € pro Jahr</li>
      <li><span>✓</span> 100% DSGVO-konform, lokal oder auf Ihrem Server betreibbar</li>
    `;
  }

  if (ctaBtn) {
    ctaBtn.textContent = `Diese Pipeline anfragen (spart ca. ${annualLoss ? annualLoss.toLocaleString("de-DE") : "0"} €/Jahr) →`;
    ctaBtn.href = `booking.html?pkg=Paket+D:+Daten+und+Systeme+verbinden&audit_defects=${stats.totalDefects}&file=${encodeURIComponent(fileName)}`;
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

function updateTerminalOfferCard(scenario) {
  const card = document.getElementById("terminal-offer-card");
  if (!card || !scenario) return;

  const badgeEl = document.getElementById("offer-badge");
  const titleEl = document.getElementById("offer-title");
  const descEl = document.getElementById("offer-desc");
  const priceTagEl = document.getElementById("offer-price-tag");
  const priceSubEl = document.getElementById("offer-price-sub");
  const featuresEl = document.getElementById("offer-features");
  const ctaBtn = document.getElementById("offer-cta-btn");

  if (badgeEl) badgeEl.textContent = scenario.badge;
  if (titleEl) titleEl.textContent = scenario.title;
  if (descEl) descEl.textContent = scenario.desc;
  if (priceTagEl) priceTagEl.textContent = scenario.price;
  if (priceSubEl) priceSubEl.textContent = scenario.priceSub;

  if (featuresEl && scenario.features) {
    featuresEl.innerHTML = scenario.features
      .map(feat => `<li><span>✓</span> ${escapeHtml(feat)}</li>`)
      .join("");
  }

  if (ctaBtn) {
    ctaBtn.textContent = `Jetzt Paket anfragen (${scenario.price}) →`;
    ctaBtn.href = scenario.bookingUrl;
  }
}

function selectPackageCard(cardElement, packageName, priceValue) {
  document.querySelectorAll(".package-radio-card").forEach(c => c.classList.remove("selected"));
  cardElement.classList.add("selected");

  const hiddenInput = document.getElementById("selected-package");
  if (hiddenInput) hiddenInput.value = packageName;

  const summaryPkg = document.getElementById("summary-package-name");
  const summaryPrice = document.getElementById("summary-package-price");
  const summaryDeposit = document.getElementById("summary-package-deposit");

  if (summaryPkg) summaryPkg.textContent = packageName;
  if (summaryPrice) summaryPrice.textContent = priceValue;

  const numericMatch = priceValue.match(/(\d+)/);
  if (numericMatch && summaryDeposit) {
    const num = parseInt(numericMatch[1], 10);
    const deposit = Math.round(num * 0.5);
    summaryDeposit.textContent = `${deposit} €`;
  }
}

function checkUrlPackageParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get("pkg");
  if (!pkgParam) return;

  const packageCards = document.querySelectorAll(".package-radio-card");
  packageCards.forEach(card => {
    const cardPkg = card.getAttribute("data-package");
    if (cardPkg && (cardPkg.includes(pkgParam) || pkgParam.includes(cardPkg))) {
      card.click();
    }
  });

  const notesField = document.getElementById("portal-notes");
  const auditDefects = urlParams.get("audit_defects");
  const auditFile = urlParams.get("file");
  if (auditDefects && notesField && !notesField.value) {
    notesField.value = `Ergebnis des Daten-Audits für '${auditFile || "unsere Datei"}': ${auditDefects} identifizierte Fehler/Dubletten. Wir möchten diesen Datenstrom mit einer schlüsselfertigen Pipeline automatisieren.`;
  }
}

function handlePortalBookingSubmit(e) {
  e.preventDefault();

  const pkgInput = document.getElementById("selected-package");
  const pkg = pkgInput ? pkgInput.value : "Paket D: Daten und Systeme verbinden (850 €)";
  const day = document.getElementById("portal-day") ? document.getElementById("portal-day").value : "Schnellstmöglich";
  const time = document.getElementById("portal-time") ? document.getElementById("portal-time").value : "Vormittags";
  const name = document.getElementById("portal-name").value.trim();
  const company = document.getElementById("portal-company").value.trim();
  const email = document.getElementById("portal-email").value.trim();
  const notes = document.getElementById("portal-notes") ? document.getElementById("portal-notes").value.trim() : "";

  // 1. Create client-side lead object
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

  // 2. Save to localStorage to guarantee lead preservation
  try {
    const existing = JSON.parse(localStorage.getItem("nevioniebel_inbound_leads") || "[]");
    existing.push(bookingRecord);
    localStorage.setItem("nevioniebel_inbound_leads", JSON.stringify(existing));
  } catch (err) {
    console.warn("localStorage error:", err);
  }

  // 3. Show instant confirmation UI on page
  const formBox = document.getElementById("portal-form-container");
  const successBox = document.getElementById("portal-success-container");
  const refCodeEl = document.getElementById("portal-ref-code");

  if (refCodeEl) refCodeEl.textContent = bookingRecord.id;
  if (formBox) formBox.style.display = "none";
  if (successBox) successBox.style.display = "block";

  // 4. Also provide mailto trigger for users with mail clients
  const subject = `Projekt- & Terminbuchung: ${pkg} - ${company} (${name})`;
  const body = `Sehr geehrter Herr Niebel,\n\nhiermit frage ich ein unverbindliches 15-minütiges Gespräch für folgendes Projekt an:\n\n` +
    `• Referenz: ${bookingRecord.id}\n` +
    `• Gewähltes Paket: ${pkg}\n` +
    `• Unternehmen: ${company}\n` +
    `• Ansprechpartner: ${name}\n` +
    `• E-Mail: ${email}\n` +
    `• Wunschtermin: ${day}, ${time}\n` +
    (notes ? `• Vorhaben:\n${notes}\n\n` : `\n`) +
    `Mit freundlichen Grüßen,\n${name}\n${company}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Set fallback button
  const mailtoBtn = document.getElementById("portal-mailto-fallback-btn");
  if (mailtoBtn) mailtoBtn.href = mailtoUrl;
}

// =========================================================================
// 11. ROI CALCULATOR
// =========================================================================

function initRoiCalculator() {
  const hoursSlider = document.getElementById("roi-hours");
  const rateSlider = document.getElementById("roi-rate");
  if (!hoursSlider || !rateSlider) return;

  const hoursVal = document.getElementById("roi-hours-val");
  const rateVal = document.getElementById("roi-rate-val");
  const costMonthly = document.getElementById("roi-cost-monthly");
  const breakevenDays = document.getElementById("roi-breakeven-days");
  const yearlySavings = document.getElementById("roi-yearly-savings");
  const roiCta = document.getElementById("roi-cta-btn");

  function recalculate() {
    const hours = parseFloat(hoursSlider.value);
    const rate = parseFloat(rateSlider.value);

    if (hoursVal) hoursVal.textContent = `${hours} Std.`;
    if (rateVal) rateVal.textContent = `${rate} €`;

    const monthlyHours = hours * 4.2;
    const monthlyCost = monthlyHours * rate;
    const projectInvestment = 850;
    const dailyCost = monthlyCost / 21;
    const breakEven = Math.max(1, Math.round(projectInvestment / dailyCost));
    const year1Savings = Math.round(monthlyCost * 12 - projectInvestment);

    if (costMonthly) costMonthly.textContent = `${Math.round(monthlyCost).toLocaleString("de-DE")} € / Mo.`;
    if (breakevenDays) breakevenDays.textContent = `${breakEven} Tagen`;
    if (yearlySavings) yearlySavings.textContent = `${year1Savings.toLocaleString("de-DE")} €`;

    if (roiCta) {
      roiCta.textContent = `Jetzt ${year1Savings.toLocaleString("de-DE")} € Einsparpotenzial sichern →`;
      roiCta.href = `booking.html?pkg=Paket+D:+Daten+und+Systeme+verbinden&roi_savings=${year1Savings}&hours=${hours}`;
    }
  }

  hoursSlider.addEventListener("input", recalculate);
  rateSlider.addEventListener("input", recalculate);
  recalculate();
}

function escapeHtml(text) {
  if (!text) return "";
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function handleContactSubmit(e) {
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

  try {
    const existing = JSON.parse(localStorage.getItem("nevioniebel_inbound_leads") || "[]");
    existing.push(contactRecord);
    localStorage.setItem("nevioniebel_inbound_leads", JSON.stringify(existing));
  } catch (err) {
    console.warn("localStorage error:", err);
  }

  const formBox = document.getElementById("contact-form-container");
  const successBox = document.getElementById("contact-success-container");
  const refCodeEl = document.getElementById("contact-ref-code");
  const mailtoBtn = document.getElementById("contact-mailto-fallback-btn");

  if (refCodeEl) refCodeEl.textContent = contactRecord.id;
  if (formBox) formBox.style.display = "none";
  if (successBox) successBox.style.display = "block";

  const mailSubject = `Kontaktanfrage: ${subject} - ${name} [${contactRecord.id}]`;
  const mailBody = `Sehr geehrter Herr Niebel,\n\nhiermit sende ich folgende Anfrage über das Kontaktformular:\n\n` +
    `• Referenz: ${contactRecord.id}\n` +
    `• Name: ${name}\n` +
    `• E-Mail: ${email}\n` +
    `• Betreff: ${subject}\n\n` +
    `• Nachricht:\n${message}\n\n` +
    `Mit freundlichen Grüßen,\n${name}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  if (mailtoBtn) mailtoBtn.href = mailtoUrl;
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  checkUrlPackageParameter();

  if (document.getElementById("scenario-detail-title")) {
    playScenario("invoicing");
  }

  initRoiCalculator();
});

// Explicit window bindings for robust inline event triggers & cross-context verification
window.switchTerminalMode = switchTerminalMode;
window.playScenario = playScenario;
window.toggleScenarioTechDetails = toggleScenarioTechDetails;
window.loadSampleDataset = loadSampleDataset;
window.cleanDatasetInMemory = cleanDatasetInMemory;
window.downloadCleanedFile = downloadCleanedFile;
window.downloadAuditReport = downloadAuditReport;
window.handleAuditLeadSubmit = handleAuditLeadSubmit;
window.handlePortalBookingSubmit = handlePortalBookingSubmit;
window.handleContactSubmit = handleContactSubmit;
window.executeTerminalCommand = executeTerminalCommand;
window.getCurrentDataset = () => typeof currentDataset !== "undefined" ? currentDataset : null;
window.getCleanedContent = () => typeof cleanedDatasetContent !== "undefined" ? cleanedDatasetContent : null;
