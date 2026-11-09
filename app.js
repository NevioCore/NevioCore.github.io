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
