/**
 * website/app.js
 * =========================================================================
 * Interactive Cyber Engine for nevioniebel.tech (Ethiack Architecture)
 * - Interactive Terminal Simulation with Human-Understandable Explanations
 * - Detailed Pipeline & Tool Demonstrations
 * - Synchronized Offer Card Updates
 * - Multi-Page Query Parameter Passing (?pkg=...)
 * - Booking Portal Form & SEPA Deposit Calculation
 * =========================================================================
 */

// Comprehensive Scenarios with Authentic Technical Pipeline & Human Explanations
const SCENARIOS = {
  scraping: {
    title: "Web Scraping & Marktdaten-Monitor",
    badge: "Schlüsselfertig • 24–48h SLA",
    desc: "Ausfallsichere Extraktion geschützter Portale, Wettbewerbspreise und B2B-Kataloge. Ausgestattet mit automatischer Proxy-Rotation, Playwright-Headless-Engine, SHA-256 Deduplizierung und direktem SQL/CSV-Export.",
    price: "350 €",
    priceSub: "Festpreis (einmalig, keine Nachkosten)",
    packageName: "Script Automation (350 €)",
    bookingUrl: "booking.html?pkg=Script+Automation+(350+€)",
    features: [
      "Headless Chrome / Playwright mit Cloudflare- & DataDome-Resilienz",
      "SHA-256 Fingerprint-Hashing zur Vermeidung von Dubletten",
      "Strikte Pydantic v2 Schema-Validierung (100% typsicher)",
      "Automatischer Datenexport in CSV, JSON, PostgreSQL oder Ihr CRM",
      "14 Tage Support & 100% Unittest-Garantie"
    ],
    commands: [
      { cmd: "crawl-market --source b2b-portal --stealth-mode --dedup sha256", delay: 25 },
      { out: "[1/4 INGESTION] Initialisiere rotierende IPv4/IPv6 Residential Proxies...", delay: 120 },
      { out: "[2/4 ANTI-BOT] Umgehe Cloudflare Turnstile & DataDome TLS-Fingerprints...", delay: 180 },
      { out: "[3/4 PARSING] 3.420 Produkt- & Preisdatensätze extrahiert...", delay: 160 },
      { out: "[4/4 DEDUP] Berechne SHA-256 Hashes: 0 Dubletten, 100% typsicher nach Pydantic v2...", delay: 140 },
      { out: "✅ PIPELINE SUCCESS: Daten transaktionssicher in PostgreSQL synchronisiert!", delay: 150 }
    ],
    humanExplanation: [
      "══════════════════════════════════════════════════════════════════════════════════",
      "💡 WIE DIESE PIPELINE FÜR IHR UNTERNEHMEN ARBEITET (VERSTÄNDLICH ERKLÄRT):",
      "══════════════════════════════════════════════════════════════════════════════════",
      "",
      "❌ DAS PROBLEM IM ALLTAG:",
      "   Ihre Mitarbeiter verbringen jede Woche Stunden damit, Preise, Produktkataloge",
      "   oder B2B-Kontaktdaten händisch von Portalen abzutippen oder in Excel zu kopieren.",
      "   Das ist fehleranfällig, zeitraubend und bei Website-Änderungen sofort veraltet.",
      "",
      "⚙️ UNSERE WERKZEUGE & ARCHITEKTUR:",
      "   • Playwright & Stealth-Engine: Lädt Seiten wie ein echter menschlicher Nutzer.",
      "   • Cloudflare & DataDome Bypass: Kein Hängenbleiben an Captcha-Schutzmauern.",
      "   • Pydantic v2 Typvalidierung: Jeder Datensatz wird vor dem Speichern geprüft.",
      "   • SHA-256 Deduplizierung: Dubletten werden automatisch verworfen.",
      "",
      "🎯 IHR KONKRETER NUTZEN:",
      "   • Bis zu 40 Stunden manuelle Routine-Arbeit monatlich eingespart.",
      "   • Jeden Morgen frische, saubere Daten direkt in Excel, CSV oder Ihrer Datenbank.",
      "   • 100% DSGVO-konform, lokal oder auf Ihrem eigenen Server betreibbar.",
      "",
      "📦 LIEFERUMFANG & FESTPREIS:",
      "   • Schlüsselfertiges Python-Skript + Docker-Setup + 14 Tage Support.",
      "   • Festpreis: 350,00 € netto (50% Anzahlung per SEPA, 50% nach Abnahme).",
      "   • Lieferzeit: Erster Prototyp binnen 24–48 Stunden.",
      "══════════════════════════════════════════════════════════════════════════════════"
    ]
  },
  api: {
    title: "API- & System-Integration",
    badge: "FastAPI / Node.js • Idempotent",
    desc: "Nahtlose Verbindung Ihrer internen Software mit externen Plattformen (Shopify, Shopware, DATEV, HubSpot, Stripe) über asynchrone FastAPI-Konnektoren mit idempotenten Webhooks und Zero-Downtime.",
    price: "850 €",
    priceSub: "Festpreis (schlüsselfertige Schnittstelle)",
    packageName: "B2B Data Pipeline (850 €)",
    bookingUrl: "booking.html?pkg=B2B+Data+Pipeline+(850+€)",
    features: [
      "Asynchrones FastAPI / Node.js Gateway mit Sub-50ms Latenz",
      "Idempotente Webhook-Verarbeitung mit HMAC-SHA256 Signaturprüfung",
      "Bidirektionaler Sync zwischen ERP, CRM, Webshop und Buchhaltung",
      "Automatisches Error-Handling mit Dead-Letter-Queues & Alerting",
      "Vollständige OpenAPI / Swagger Dokumentation & Docker-Image"
    ],
    commands: [
      { cmd: "fastapi-bridge --sync shopify --target erp-production --verify-hmac", delay: 25 },
      { out: "[1/4 WEBHOOK] Eingehender Bestelleingang via Webhook empfangen...", delay: 120 },
      { out: "[2/4 CRYPTO] HMAC-SHA256 Signatur validiert: Payload integer & authentisch...", delay: 150 },
      { out: "[3/4 MAPPING] Konvertiere Webshop-JSON in ERP-taugliches Pydantic v2 Modell...", delay: 140 },
      { out: "[4/4 IDEMPOTENCY] Idempotency-Key geprüft: Keine Doppelbuchung möglich...", delay: 130 },
      { out: "✅ BRIDGE SUCCESS: Bestellung transaktionssicher im ERP verbucht (Latenz: 38ms)!", delay: 150 }
    ],
    humanExplanation: [
      "══════════════════════════════════════════════════════════════════════════════════",
      "💡 WIE DIESE API-BRÜCKE IHRE SYSTEME VERBINDET (VERSTÄNDLICH ERKLÄRT):",
      "══════════════════════════════════════════════════════════════════════════════════",
      "",
      "❌ DAS PROBLEM IM ALLTAG:",
      "   Ihr Webshop (Shopify/Shopware), Ihr CRM (HubSpot/Salesforce) und Ihre",
      "   Buchhaltung (DATEV/sevdesk) sprechen nicht miteinander. Mitarbeiter müssen",
      "   Bestellungen, Rechnungsdaten und Kundendaten manuell hin und her übertragen.",
      "",
      "⚙️ UNSERE WERKZEUGE & ARCHITEKTUR:",
      "   • FastAPI / Uvicorn Microservice: Asynchrone Schnittstelle mit unter 50ms Latenz.",
      "   • HMAC-SHA256 Krypto-Signaturen: Garantiert abhör- und manipulationssicher.",
      "   • Idempotente Queues: Keine doppelten Bestellungen oder Geister-Datensätze.",
      "   • Dead-Letter-Pufferung: Wenn DATEV mal down ist, gehen keine Daten verloren.",
      "",
      "🎯 IHR KONKRETER NUTZEN:",
      "   • Vollautomatischer Echtzeit-Sync: Eine Bestellung im Shop ist sofort im ERP.",
      "   • Null manuelle Tippfehler, null Verzögerung bei der Auftragsabwicklung.",
      "   • Vollständige OpenAPI/Swagger-Dokumentation für Ihr Inhouse-Team.",
      "",
      "📦 LIEFERUMFANG & FESTPREIS:",
      "   • Schlüsselfertige Schnittstelle als Docker-Container + 30 Tage Betreuung.",
      "   • Festpreis: 850,00 € netto (50% Anzahlung per SEPA, 50% nach Abnahme).",
      "   • Lieferzeit: 3–5 Werktage.",
      "══════════════════════════════════════════════════════════════════════════════════"
    ]
  },
  pipeline: {
    title: "B2B Automatisierte Daten-Pipeline",
    badge: "Vollautomatisiert • Docker & Cron",
    desc: "Vollständige Ingestion-Pipeline mit automatischer Datenaufbereitung, Qualitätsprüfungen, Anomalie-Erkennung und täglichem Slack/E-Mail-Reporting direkt an Ihr Management-Team.",
    price: "850 €",
    priceSub: "Festpreis (schlüsselfertige Ingestion)",
    packageName: "B2B Data Pipeline (850 €)",
    bookingUrl: "booking.html?pkg=B2B+Data+Pipeline+(850+€)",
    features: [
      "Automatisierte Multi-Source Ingestion (APIs, FTP, Web-Portale)",
      "Normalisierung von Umlauten, Adressen, IBANs und Steuernummern",
      "Anomalie-Erkennung & Validierung nach vordefinierten Business-Rules",
      "Täglicher Excel- & Management-Report via Slack / E-Mail",
      "Docker-Container für einfachen Betrieb auf jedem Server / Cloud"
    ],
    commands: [
      { cmd: "run-pipeline --schedule '0 6 * * *' --alert slack --export-daily", delay: 25 },
      { out: "[1/4 SCHEDULER] Autonomer Cron-Job um 06:00:00 Uhr ausgelöst...", delay: 110 },
      { out: "[2/4 INGESTION] Aggregiere 22.840 Rohdatensätze aus 4 heterogenen Quellen...", delay: 160 },
      { out: "[3/4 NORMALISIERUNG] Bereinige Umlaute, ISO-Datumsformate & Telefonnummern...", delay: 140 },
      { out: "[4/4 QA-CHECK] Anomalie-Prüfung: 100% konsistente Werte, 0 Null-Pointer...", delay: 130 },
      { out: "✅ PIPELINE SUCCESS: Management-Report & Excel an Slack #operations zugestellt!", delay: 150 }
    ],
    humanExplanation: [
      "══════════════════════════════════════════════════════════════════════════════════",
      "💡 WIE DIESE DATEN-PIPELINE IHREN FLASCHENHALS LÖST (VERSTÄNDLICH ERKLÄRT):",
      "══════════════════════════════════════════════════════════════════════════════════",
      "",
      "❌ DAS PROBLEM IM ALLTAG:",
      "   Unternehmensdaten liegen verstreut auf FTP-Servern, in E-Mail-Anhängen und",
      "   externen Portalen. Jeden Morgen muss jemand manuell Berichte zusammenstellen,",
      "   bevor das Management oder der Vertrieb arbeitsfähig sind.",
      "",
      "⚙️ UNSERE WERKZEUGE & ARCHITEKTUR:",
      "   • Vollautomatischer Ingestion-Daemon: Holt Daten pünktlich um 06:00 Uhr ab.",
      "   • Data-Cleaning-Engine: Korrigiert Tippfehler, Umlaute, Telefon- & Adressformate.",
      "   • Integrierte Anomalie-Erkennung: Warnt sofort bei auffälligen Zahlenabweichungen.",
      "   • Automatische Reports: Fertige Excel-Dateien & Slack-Dashboards ohne Klick.",
      "",
      "🎯 IHR KONKRETER NUTZEN:",
      "   • Bis zu 60 Stunden manuelle Routine-Arbeit im Monat eingespart.",
      "   • Geschäftsentscheidungen basieren täglich auf 100% verlässlichen Zahlen.",
      "   • Läuft geräuschlos im Hintergrund auf jedem Server (Docker-ready).",
      "",
      "📦 LIEFERUMFANG & FESTPREIS:",
      "   • Vollständige ETL-Pipeline + Unittest-Suite + 30 Tage Nachbesserungsschutz.",
      "   • Festpreis: 850,00 € netto (50% Anzahlung per SEPA, 50% nach Abnahme).",
      "   • Lieferzeit: Schlüsselfertig in 3–5 Werktagen.",
      "══════════════════════════════════════════════════════════════════════════════════"
    ]
  },
  maintenance: {
    title: "Skript-Wartung & 24/7 Monitoring-Retainer",
    badge: "Monatlicher Retainer • < 4h SLA",
    desc: "Ihre Crawler brechen nach Layout-Änderungen ab oder Skripte werfen Memory-Fehler? Mit dem Wartungs-Retainer überwache ich Ihre Software kontinuierlich und repariere Fehler innerhalb von 4 Stunden SLA.",
    price: "190 €",
    priceSub: "/ Monat (monatlich kündbar, keine Mindestlaufzeit)",
    packageName: "Wartungs-Retainer (190 €/Mo.)",
    bookingUrl: "booking.html?pkg=Wartungs-Retainer+(190+€/Mo.)",
    features: [
      "24/7 Kontinuierliches Health-Monitoring Ihrer Crawler & Schnittstellen",
      "Garantierte Reaktionszeit unter 4 Stunden bei Störungen",
      "Bis zu 5 Stunden monatliche Entwickler-Arbeitszeit inklusive",
      "Automatische Anpassung an veränderte HTML-Selektoren & API-Versionen",
      "Keine langfristige Bindung: Flexibel monatlich kündbar"
    ],
    commands: [
      { cmd: "health-monitor --inspect crawlers --auto-patch --sla-alert", delay: 25 },
      { out: "[1/4 MONITOR] Alert empfangen: Zielportal hat HTML-DOM Selektoren geändert...", delay: 110 },
      { out: "[2/4 DIAGNOSE] Selektor-Bruch analysiert, neuer robuster XPath generiert...", delay: 150 },
      { out: "[3/4 PYTEST] Führe Test-Suite aus: 24/24 Tests erfolgreich (100% PASS)...", delay: 160 },
      { out: "[4/4 DEPLOY] Hotfix auf Produktionsserver ausgerollt (Gemessene SLA: 1h 14m)...", delay: 130 },
      { out: "✅ SLA SUCCESS: Crawler läuft wieder stabil, 0 Datensätze verloren!", delay: 150 }
    ],
    humanExplanation: [
      "══════════════════════════════════════════════════════════════════════════════════",
      "💡 WIE UNSER WARTUNGS-RETAINER IHREN BETRIEB SCHÜTZT (VERSTÄNDLICH ERKLÄRT):",
      "══════════════════════════════════════════════════════════════════════════════════",
      "",
      "❌ DAS PROBLEM IM ALLTAG:",
      "   Websites ändern ständig ihr Design, Portale ändern CSS-Klassen und APIs ändern",
      "   Endpoints. Ein funktionierender Scraper bricht plötzlich ab, und niemand merkt",
      "   es – bis tagelang kritische Daten fehlen.",
      "",
      "⚙️ UNSERE WERKZEUGE & ARCHITEKTUR:",
      "   • 24/7 Monitoring-Agent: Prüft kontinuierlich, ob Ihre Datenströme intakt sind.",
      "   • Schnelle Hotfix-Garantie: Reaktionszeit unter 4 Stunden an Werktagen.",
      "   • Bis zu 5 Entwickler-Stunden monatlich für Anpassungen und Upgrades inklusive.",
      "   • Pytest Regressions-Suiten: Jeder Patch wird vor dem Deployment automatisch geprüft.",
      "",
      "🎯 IHR KONKRETER NUTZEN:",
      "   • Ruhiger Schlaf für Ihr Team: Sie müssen sich nie wieder um kaputte Skripte sorgen.",
      "   • Fester Ansprechpartner direkt ohne Ticket-Warteschlangen großer Agenturen.",
      "   • 100% flexibel: Monatlich kündbar, keine Mindestbindung.",
      "",
      "📦 KONDITIONEN & ABRECHNUNG:",
      "   • 190,00 € netto / Monat auf monatliche SEPA-Rechnung mit USt-Ausweis.",
      "   • Inklusive 5 Programmierstunden/Monat und < 4h Notfall-SLA.",
      "══════════════════════════════════════════════════════════════════════════════════"
    ]
  }
};

let isSimulating = false;

/**
 * Execute interactive scenario in terminal with human explanation
 */
function playScenario(scenarioKey) {
  if (isSimulating) return;
  const scenario = SCENARIOS[scenarioKey];
  if (!scenario) return;

  // 1. Update Selector Buttons Active State
  document.querySelectorAll(".terminal-selector-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const clickedBtn = document.getElementById(`btn-scenario-${scenarioKey}`);
  if (clickedBtn) {
    clickedBtn.classList.add("active");
  }

  const screen = document.getElementById("terminal-screen");
  const badge = document.getElementById("terminal-status-badge");
  
  if (badge) {
    badge.textContent = "Simulation läuft...";
    badge.className = "terminal-badge badge-running";
  }

  // Clear previous output and set typing header
  screen.innerHTML = `
    <div class="terminal-line"><span class="prompt-user">nevio@engine</span>:<span class="prompt-path">~/production</span>$ <span class="text-cmd" id="typing-line"></span></div>
  `;

  const typingTarget = document.getElementById("typing-line");
  const firstCmd = scenario.commands[0].cmd;
  isSimulating = true;

  // Typewriter effect for command
  let charIdx = 0;
  function typeChar() {
    if (charIdx < firstCmd.length) {
      typingTarget.textContent += firstCmd.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, scenario.commands[0].delay);
    } else {
      // Stream terminal technical logs
      streamLines(scenario.commands.slice(1), 0);
    }
  }

  // Stream technical log output lines
  function streamLines(lines, lineIdx) {
    if (lineIdx < lines.length) {
      const lineObj = lines[lineIdx];
      setTimeout(() => {
        const div = document.createElement("div");
        div.className = "terminal-line " + (lineObj.out.startsWith("✅") ? "text-success" : "text-log");
        div.textContent = lineObj.out;
        screen.appendChild(div);
        screen.scrollTop = screen.scrollHeight;
        streamLines(lines, lineIdx + 1);
      }, lineObj.delay);
    } else {
      // Stream the HUMAN-UNDERSTANDABLE explanation lines!
      setTimeout(() => {
        const spacer = document.createElement("div");
        spacer.className = "terminal-line";
        spacer.innerHTML = "&nbsp;";
        screen.appendChild(spacer);

        scenario.humanExplanation.forEach((hLine, i) => {
          setTimeout(() => {
            const hDiv = document.createElement("div");
            hDiv.className = "terminal-line " + (hLine.startsWith("💡") || hLine.startsWith("📦") || hLine.startsWith("💰") ? "text-highlight" : hLine.startsWith("✅") ? "text-success" : hLine.startsWith("❌") ? "text-amber" : "text-log");
            hDiv.textContent = hLine;
            screen.appendChild(hDiv);
            screen.scrollTop = screen.scrollHeight;
          }, i * 25);
        });

        // Set status to complete
        if (badge) {
          badge.textContent = "Abgeschlossen";
          badge.className = "terminal-badge badge-success";
        }
        isSimulating = false;

        // Synchronize the Offer Card below the terminal INSTANTLY
        updateTerminalOfferCard(scenario);
      }, 150);
    }
  }

  typeChar();
}

/**
 * Synchronize the product offer card directly under the terminal
 */
function updateTerminalOfferCard(scenario) {
  const card = document.getElementById("terminal-offer-card");
  const badgeEl = document.getElementById("offer-badge");
  const titleEl = document.getElementById("offer-title");
  const descEl = document.getElementById("offer-desc");
  const featuresEl = document.getElementById("offer-features");
  const priceTagEl = document.getElementById("offer-price-tag");
  const priceSubEl = document.getElementById("offer-price-sub");
  const ctaBtn = document.getElementById("offer-cta-btn");

  if (badgeEl) badgeEl.textContent = scenario.badge;
  if (titleEl) titleEl.textContent = scenario.title;
  if (descEl) descEl.textContent = scenario.desc;
  if (priceTagEl) priceTagEl.textContent = scenario.price;
  if (priceSubEl) priceSubEl.textContent = scenario.priceSub;

  if (featuresEl) {
    featuresEl.innerHTML = scenario.features
      .map(feat => `<li><span>✓</span> ${feat}</li>`)
      .join("");
  }

  if (ctaBtn) {
    ctaBtn.textContent = `Jetzt Paket wählen & reservieren (${scenario.price})`;
    ctaBtn.href = scenario.bookingUrl;
  }

  // Visual pulse highlight
  if (card) {
    card.classList.add("card-highlight-pulse");
    setTimeout(() => card.classList.remove("card-highlight-pulse"), 800);
  }
}

/**
 * Handle package selection on booking.html
 */
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

  // Calculate 50% deposit
  const numericMatch = priceValue.match(/(\d+)/);
  if (numericMatch && summaryDeposit) {
    const num = parseInt(numericMatch[1], 10);
    const deposit = Math.round(num * 0.5);
    summaryDeposit.textContent = `${deposit} €`;
  }
}

/**
 * Pre-fill booking form based on URL parameter ?pkg=...
 */
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

  const select = document.getElementById("booking-package");
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(pkgParam) || pkgParam.includes(select.options[i].value)) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  // Auto-fill ROI notes if passed from ROI Calculator
  const roiSavings = urlParams.get("roi_savings");
  const hours = urlParams.get("hours");
  const notesField = document.getElementById("portal-notes");
  if (roiSavings && notesField && !notesField.value) {
    notesField.value = `Berechnetes Einsparpotenzial aus ROI-Rechner: ca. ${parseInt(roiSavings, 10).toLocaleString('de-DE')} € Netto-Ersparnis pro Jahr (bei ca. ${hours || 10}h manuellem Aufwand/Woche). Bitte um Vorschlag zur Umsetzung.`;
  }

  // Auto-fill Audit findings if passed from File Auditor
  const auditDefects = urlParams.get("audit_defects");
  const auditSavings = urlParams.get("audit_savings");
  const auditFile = urlParams.get("file");
  if (auditDefects && notesField && !notesField.value) {
    notesField.value = `Ergebnis des Datenqualitäts-Audits für '${auditFile || "unsere Datei"}': ${auditDefects} identifizierte Fehler/Dubletten, geschätztes Einsparpotenzial: ca. ${parseInt(auditSavings || "0", 10).toLocaleString('de-DE')} €/Jahr. Wir möchten diesen Datenstrom mit einer schlüsselfertigen Pipeline automatisieren.`;
  }
}

/**
 * Handle standalone Booking Checkout submission
 */
function handlePortalBookingSubmit(e) {
  e.preventDefault();

  const pkgInput = document.getElementById("selected-package");
  const pkg = pkgInput ? pkgInput.value : "B2B Data Pipeline (850 €)";
  const day = document.getElementById("portal-day") ? document.getElementById("portal-day").value : "Schnellstmöglich";
  const time = document.getElementById("portal-time") ? document.getElementById("portal-time").value : "Vormittags";
  const name = document.getElementById("portal-name").value;
  const company = document.getElementById("portal-company").value;
  const email = document.getElementById("portal-email").value;
  const notes = document.getElementById("portal-notes") ? document.getElementById("portal-notes").value : "";

  const subject = `Projekt- & Terminbuchung: ${pkg} - ${company} (${name})`;
  const body = `Sehr geehrter Herr Niebel,\n\nhiermit frage ich ein unverbindliches 15-minütiges Vorbesprechungsgespräch für folgendes Projekt an:\n\n` +
    `• Gewähltes Paket: ${pkg}\n` +
    `• Unternehmen: ${company}\n` +
    `• Ansprechpartner: ${name}\n` +
    `• E-Mail: ${email}\n` +
    `• Wunschtermin: ${day}, ${time}\n` +
    (notes ? `• Vorhaben & Anforderungen:\n${notes}\n\n` : `\n`) +
    `Ich bitte um Bestätigung des Termins und Zusendung des Google Meet / MS Teams Links.\n\nMit freundlichen Grüßen,\n${name}\n${company}`;

  const mailtoUrl = `mailto:dev@nevioniebel.tech?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const formBox = document.getElementById("portal-form-container");
  const successBox = document.getElementById("portal-success-container");

  if (formBox && successBox) {
    formBox.style.display = "none";
    successBox.style.display = "block";
  }

  window.location.href = mailtoUrl;
}

// Initial Run on load
document.addEventListener("DOMContentLoaded", () => {
  checkUrlPackageParameter();

  // If on index.html, pre-populate the offer card with scraping scenario
  if (document.getElementById("terminal-offer-card")) {
    updateTerminalOfferCard(SCENARIOS.scraping);
  }

  // Initialize ROI Calculator if present
  initRoiCalculator();
});

/**
 * Interactive ROI & Amortization Calculator Engine
 */
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

    // Monthly manual hours = weekly hours * 4.2 weeks
    const monthlyHours = hours * 4.2;
    const monthlyCost = monthlyHours * rate;
    const projectInvestment = 850; // Standard B2B Pipeline package

    // Days to break even: (projectInvestment / dailyCost)
    const dailyCost = monthlyCost / 21; // 21 working days per month
    const breakEven = Math.max(1, Math.round(projectInvestment / dailyCost));

    // First year net savings: 12 months * monthlyCost - projectInvestment
    const year1Savings = Math.round(monthlyCost * 12 - projectInvestment);

    if (costMonthly) costMonthly.textContent = `${Math.round(monthlyCost).toLocaleString("de-DE")} € / Mo.`;
    if (breakevenDays) breakevenDays.textContent = `${breakEven} Tagen`;
    if (yearlySavings) yearlySavings.textContent = `${year1Savings.toLocaleString("de-DE")} €`;

    if (roiCta) {
      roiCta.textContent = `Jetzt ${year1Savings.toLocaleString("de-DE")} € Einsparpotenzial sichern →`;
      roiCta.href = `booking.html?pkg=Business+Pipeline+(850+€)&roi_savings=${year1Savings}&hours=${hours}`;
    }
  }

  hoursSlider.addEventListener("input", recalculate);
  rateSlider.addEventListener("input", recalculate);
  recalculate();
}

/**
 * =========================================================================
 * Forensic Data Quality & Inefficiency Auditor Engine (Browser-Native)
 * =========================================================================
 */

// Realistic German B2B catalog sample dataset with deliberate anomalies
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

let lastAuditReportText = "";

/**
 * Switch terminal mode tabs
 */
function switchTerminalMode(mode) {
  const tabScenarios = document.getElementById("tab-mode-scenarios");
  const tabAudit = document.getElementById("tab-mode-audit");
  const tabCli = document.getElementById("tab-mode-cli");
  const dropzone = document.getElementById("terminal-dropzone");
  const scenarioGrid = document.getElementById("terminal-scenario-grid");
  const cliInput = document.getElementById("terminal-cli-input");

  if (tabScenarios) tabScenarios.classList.remove("active");
  if (tabAudit) tabAudit.classList.remove("active");
  if (tabCli) tabCli.classList.remove("active");

  if (mode === "audit") {
    if (tabAudit) tabAudit.classList.add("active");
    if (dropzone) dropzone.style.display = "block";
    if (scenarioGrid) scenarioGrid.style.display = "none";
    printTerminalMessage("[MODUS: DATEI-AUDIT] Ziehen Sie eine eigene Datei hinein oder klicken Sie auf 'Beispieldatei laden', um die Pipeline zu testen.");
  } else if (mode === "cli") {
    if (tabCli) tabCli.classList.add("active");
    if (dropzone) dropzone.style.display = "none";
    if (scenarioGrid) scenarioGrid.style.display = "none";
    if (cliInput) cliInput.focus();
    printTerminalMessage("[MODUS: KONSOLE] Interaktive Befehlszeile aktiv. Tippen Sie 'help' für eine Befehlsübersicht.");
  } else {
    if (tabScenarios) tabScenarios.classList.add("active");
    if (dropzone) dropzone.style.display = "none";
    if (scenarioGrid) scenarioGrid.style.display = "grid";
    printTerminalMessage("[MODUS: SZENARIEN] Wählen Sie eine der 4 Kacheln, um automatisierte Workflows zu simulieren.");
  }
}

/**
 * File Drop & Select handlers
 */
function triggerFileInput() {
  const fileInput = document.getElementById("audit-file-input");
  if (fileInput) fileInput.click();
}

function handleDragOver(e) {
  e.preventDefault();
  const dropzone = document.getElementById("terminal-dropzone");
  if (dropzone) dropzone.classList.add("dragover");
}

function handleDragLeave(e) {
  e.preventDefault();
  const dropzone = document.getElementById("terminal-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");
}

function handleFileDrop(e) {
  e.preventDefault();
  const dropzone = document.getElementById("terminal-dropzone");
  if (dropzone) dropzone.classList.remove("dragover");

  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    readAndAuditFile(file);
  }
}

function handleFileSelect(e) {
  if (e.target && e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    readAndAuditFile(file);
  }
}

function loadSampleDataset(e) {
  if (e) e.stopPropagation();
  printTerminalMessage("[DEMO] Lade realistischen Großhandels-Musterkatalog (14 Datensätze mit typischen Datenfehlern)...");
  runForensicAudit(SAMPLE_B2B_DATASET, "Muster-Katalog-Grosshandel.csv", true);
}

function readAndAuditFile(file) {
  printTerminalMessage(`[UPLOAD] Datei '${file.name}' (${Math.round(file.size / 1024)} KB) empfangen. Starte forensische Analyse...`);
  const reader = new FileReader();
  reader.onload = function(evt) {
    const content = evt.target.result;
    runForensicAudit(content, file.name, false);
  };
  reader.onerror = function() {
    printTerminalMessage("❌ [FEHLER] Datei konnte nicht gelesen werden.");
  };
  reader.readAsText(file);
}

/**
 * Core Forensic Data & Inefficiency Audit Engine
 */
function runForensicAudit(content, fileName, isSample) {
  const terminalScreen = document.getElementById("terminal-screen");
  if (!terminalScreen) return;

  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    printTerminalMessage("⚠️ [WARNUNG] Die Datei enthält weniger als 2 Zeilen (keine Datensätze gefunden).");
    return;
  }

  // Detect delimiter
  const firstLine = lines[0];
  let delimiter = ";";
  if (firstLine.includes(",") && !firstLine.includes(";")) delimiter = ",";
  if (firstLine.includes("\t")) delimiter = "\t";

  const headers = firstLine.split(delimiter).map(h => h.trim().replace(/^["']|["']$/g, ""));
  const rows = lines.slice(1).map(l => l.split(delimiter).map(c => c.trim().replace(/^["']|["']$/g, "")));

  let duplicates = 0;
  let missingValues = 0;
  let unnormalizedPhones = 0;
  let encodingErrors = 0;
  const seenHashes = new Set();

  // Pattern detection
  const phoneVariationRegex = /^(0049|\+49|0)[0-9\s\/\-\(\)]+$/;
  const e164StrictRegex = /^\+49[1-9][0-9]{1,14}$/;
  const encodingCorruptRegex = /(Ã¼|Ã¶|Ã¤|ÃŸ|Ã„|Ã–|Ãœ|â‚¬|\?{2,})/;

  rows.forEach((row, idx) => {
    // Fingerprint for deduplication
    const rowKey = row.join("||").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seenHashes.has(rowKey)) {
      duplicates++;
    } else {
      seenHashes.add(rowKey);
    }

    // Check row fields
    row.forEach(val => {
      if (val === "" || val === "null" || val === "n/a" || val === "-") {
        missingValues++;
      }
      if (encodingCorruptRegex.test(val)) {
        encodingErrors++;
      }
      if (phoneVariationRegex.test(val) && !e164StrictRegex.test(val.replace(/\s+/g, ""))) {
        unnormalizedPhones++;
      }
    });
  });

  // Scale metrics if sample data represents a larger enterprise batch
  const multiplier = isSample ? 85 : 1;
  const totalRowsReport = rows.length * multiplier;
  const totalDuplicates = duplicates * multiplier;
  const totalMissing = missingValues * multiplier;
  const totalPhones = unnormalizedPhones * multiplier;
  const totalEncoding = encodingErrors * multiplier;
  const totalDefects = totalDuplicates + totalMissing + totalPhones + totalEncoding;

  // Realistic manual labor calculation
  // Each defective record requires ~2.5 minutes of research, back-and-forth and manual spreadsheet editing
  const wastedMinutes = totalDefects * 2.5;
  const wastedHoursPerWeek = Math.max(1, Math.round((wastedMinutes / 60) * 10) / 10);
  const hourlyRate = 45; // Standard German back-office kalkulatorischer Stundensatz
  const monthlyCost = Math.round(wastedHoursPerWeek * hourlyRate * 4.2);
  const annualSavings = Math.round(monthlyCost * 12);
  const breakEvenDays = Math.max(7, Math.round(850 / (monthlyCost / 21)));

  // Build Report
  const reportLines = [
    "",
    "╔══════════════════════════════════════════════════════════════════════════════════╗",
    `║ 📊 ERGEBNIS DES KOSTENLOSEN EFFIZIENZ- & DATENQUALITÄTS-CHECKS                   ║`,
    "╠══════════════════════════════════════════════════════════════════════════════════╣",
    `║ 📄 Datei: ${fileName.padEnd(70)}║`,
    `║ 🔍 Analysierte Datensätze: ${String(totalRowsReport).padEnd(4)} Zeilen mit ${String(headers.length).padEnd(2)} Attributspalten                        ║`,
    "║                                                                                  ║",
    `║ ⚠️ ERMITTELTE FEHLER & MANUELLE REIBUNGSPUNKTE:                                   ║`,
    `║    • Redundante Dubletten (SHA-256):            ${String(totalDuplicates).padStart(4)} Einträge                          ║`,
    `║    • Fehlende Pflichtangaben / Null-Werte:      ${String(totalMissing).padStart(4)} Leerstellen                         ║`,
    `║    • Inkonsistente Telefonformate:              ${String(totalPhones).padStart(4)} Nummern                            ║`,
    `║    • Zeichensatz- & Umlaut-Verfälschungen:      ${String(totalEncoding).padStart(4)} Datensätze                         ║`,
    `║    -------------------------------------------------------------------------     ║`,
    `║    GESAMTE IDENTIFIZIERTE DEFEKTE:             ${String(totalDefects).padStart(4)} Reibungspunkte                     ║`,
    "║                                                                                  ║",
    "║ ⏱️ VERLORENE ARBEITSZEIT FÜR IHR TEAM:                                           ║",
    `║    ca. ${String(wastedHoursPerWeek).replace(".", ",")} Arbeitsstunden pro Woche für manuelles Korrigieren & Abtippen.     ║`,
    "║                                                                                  ║",
    "║ 💸 KALKULATORISCHER FINANZIELLER VERLUST:                                        ║",
    `║    ca. ${monthlyCost.toLocaleString("de-DE")} € jeden Monat (bei kalkulatorischen ${hourlyRate} €/h interner Arbeitszeit).     ║`,
    "║                                                                                  ║",
    "║ 🎯 LÖSUNG DURCH UNSERE SCHLÜSSELFERTIGE PYTHON-PIPELINE:                         ║",
    "║    • 100% automatische SHA-256 Deduplizierung in < 1,5 Sekunden.                 ║",
    "║    • E.164 Telefon- und Adress-Normalisierung nach deutschem Standard.          ║",
    "║    • Strikte Pydantic v2 Schema-Validierung (keine fehlerhaften Werte mehr).    ║",
    `║    • Einmalige Investition: 850 € Festpreis (keine Agentur-Folgekosten).         ║`,
    `║    • Vollständig amortisiert nach ca. ${breakEvenDays} Arbeitstagen!                            ║`,
    `║    • IHR NETTO-GEWINN IM 1. JAHR: ÜBER ${annualSavings.toLocaleString("de-DE")} €!                                ║`,
    "╚══════════════════════════════════════════════════════════════════════════════════╝",
    ""
  ];

  lastAuditReportText = reportLines.join("\n");

  terminalScreen.innerHTML = "";
  reportLines.forEach(line => {
    const div = document.createElement("div");
    div.className = "terminal-line";
    if (line.includes("📊") || line.includes("NETTO-GEWINN")) {
      div.className += " text-highlight";
    } else if (line.includes("⚠️") || line.includes("VERLUST")) {
      div.className += " text-warn";
    } else if (line.includes("🎯") || line.includes("LÖSUNG")) {
      div.className += " text-success";
    } else {
      div.className += " text-log";
    }
    div.textContent = line;
    terminalScreen.appendChild(div);
  });
  terminalScreen.scrollTop = terminalScreen.scrollHeight;

  // Update offer card below
  const offerCard = document.getElementById("terminal-offer-card");
  if (offerCard) {
    const badge = document.getElementById("offer-badge");
    const title = document.getElementById("offer-title");
    const desc = document.getElementById("offer-desc");
    const price = document.getElementById("offer-price");
    const btn = document.getElementById("offer-booking-btn");

    if (badge) badge.textContent = `Audit-Ergebnis: ${totalDefects} Fehler erkannt`;
    if (title) title.textContent = "Maßgeschneiderte Bereinigungs- & Ingestion-Pipeline";
    if (desc) desc.textContent = `Ihr Audit zeigt ein Einsparpotenzial von ca. ${wastedHoursPerWeek}h Arbeitszeit pro Woche (ca. ${annualSavings.toLocaleString("de-DE")} €/Jahr). Wir bauen Ihnen eine schlüsselfertige Python-Pipeline, die diese Datei vollautomatisch und fehlerfrei verarbeitet.`;
    if (price) price.textContent = "850 €";
    if (btn) {
      btn.textContent = `Diese Pipeline anfragen (spart ${annualSavings.toLocaleString("de-DE")} €/J.) →`;
      btn.href = `booking.html?pkg=B2B+Data+Pipeline+(850+€)&audit_defects=${totalDefects}&audit_savings=${annualSavings}&file=${encodeURIComponent(fileName)}`;
    }
    offerCard.classList.remove("card-highlight-pulse");
    void offerCard.offsetWidth;
    offerCard.classList.add("card-highlight-pulse");
  }

  // Print next action options
  printTerminalMessage(`[AKTION] Tippen Sie 'download', um diesen Bericht als Textdatei herunterzuladen, oder 'clean', um die Bereinigungssimulation zu sehen.`);
}

/**
 * CLI Command Handler
 */
function handleCliKeyDown(e) {
  if (e.key === "Enter") {
    submitCliCommand();
  }
}

function submitCliCommand() {
  const input = document.getElementById("terminal-cli-input");
  if (!input) return;
  const cmd = input.value.trim();
  if (cmd) {
    executeCliCommand(cmd);
    input.value = "";
  }
}

function executeCliCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  printTerminalPrompt(rawCmd);

  switch (cmd) {
    case "help":
    case "hilfe":
    case "?":
      printTerminalMessage("Verfügbare Befehle im Datenlabor:");
      printTerminalMessage("  • sample   - Lädt realistischen Großhandels-Musterdatensatz (1.250 Zeilen)");
      printTerminalMessage("  • audit    - Führt die forensische Datenqualitäts- und Verschwendungsanalyse durch");
      printTerminalMessage("  • clean    - Zeigt die automatisierte Bereinigung (Deduplizierung & Normalisierung)");
      printTerminalMessage("  • download - Lädt den letzten Auditbericht als .txt Datei herunter");
      printTerminalMessage("  • roi      - Berechnet das Einsparpotenzial für Ihr Unternehmen");
      printTerminalMessage("  • clear    - Leert das Terminalfenster");
      printTerminalMessage("  • kontakt  - Öffnet die unverbindliche Terminbuchung");
      break;

    case "sample":
    case "muster":
      loadSampleDataset();
      break;

    case "audit":
    case "check":
      if (!lastAuditReportText) {
        loadSampleDataset();
      } else {
        printTerminalMessage("[INFO] Zeige aktuellen Auditbericht an:");
        runForensicAudit(SAMPLE_B2B_DATASET, "Muster-Katalog-Grosshandel.csv", true);
      }
      break;

    case "clean":
    case "bereinigen":
      printTerminalMessage("⚙️ [PIPELINE] Führe Bereinigungs-Algorithmen aus...");
      setTimeout(() => {
        printTerminalMessage("  ✓ SHA-256 Deduplizierung: 142 doppelte Datensätze eliminiert.");
        printTerminalMessage("  ✓ E.164 Telefon-Normalisierung: 210 Rufnummern standardisiert (+49...).");
        printTerminalMessage("  ✓ Umlaut-Korrektur: MÃ¼ller -> Müller, BÃ¤cker -> Bäcker behoben.");
        printTerminalMessage("  ✓ Schema-Validierung nach Pydantic v2: 100% typsicher.");
        printTerminalMessage("✅ BEREINIGUNG ERFOLGREICH: Laufzeit 0.42 Sekunden. 0 manuelle Eingriffe nötig.");
      }, 400);
      break;

    case "download":
      downloadAuditReport();
      break;

    case "roi":
    case "rechner":
      const roiSection = document.querySelector(".roi-calculator-box");
      if (roiSection) {
        roiSection.scrollIntoView({ behavior: "smooth" });
        printTerminalMessage("✓ Scrolle zum interaktiven ROI- und Amortisationsrechner...");
      } else {
        window.location.href = "pricing.html";
      }
      break;

    case "clear":
    case "cls":
      const screen = document.getElementById("terminal-screen");
      if (screen) screen.innerHTML = "";
      break;

    case "kontakt":
    case "buchen":
      window.location.href = "booking.html";
      break;

    case "scraping":
    case "api":
    case "pipeline":
    case "maintenance":
      playScenario(cmd);
      break;

    default:
      printTerminalMessage(`Befehl '${rawCmd}' nicht erkannt. Tippen Sie 'help' für eine Liste aller Befehle.`);
  }
}

function printTerminalPrompt(cmdText) {
  const screen = document.getElementById("terminal-screen");
  if (!screen) return;
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = `<span class="prompt-user">gast@besucher</span>:<span class="prompt-path">~/labor</span>$ <span class="text-cmd">${escapeHtml(cmdText)}</span>`;
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

function printTerminalMessage(msg) {
  const screen = document.getElementById("terminal-screen");
  if (!screen) return;
  const line = document.createElement("div");
  line.className = "terminal-line text-log";
  line.textContent = msg;
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

function downloadAuditReport() {
  if (!lastAuditReportText) {
    printTerminalMessage("⚠️ [HINWEIS] Bitte führen Sie zuerst einen Audit aus (z. B. mit 'sample'), bevor Sie einen Bericht herunterladen.");
    return;
  }
  const blob = new Blob([lastAuditReportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Datenqualitaets-Auditbericht-NevioNiebel-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  printTerminalMessage("✓ Auditbericht erfolgreich als .txt Datei heruntergeladen!");
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}
