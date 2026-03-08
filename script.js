/* ════════════════════════════════════════════════════════════
   script.js — Kerala Female Delusion Calculator
   by @themachopodml
   ─────────────────────────────────────────────────────────
   HARD DEPENDENCIES — must be loaded before this file:
     1. html2canvas  (CDN, declared in index.html <head>)
     2. kerala-data.js  — provides: TOTAL_MEN, H_DATA, CAT_RATING_TIERS

   FILE STRUCTURE:
     §1  Starfield       animated canvas star background
     §2  heightFactor()  converts dropdown indices → a decimal fraction
     §3  getCatRating()  looks up a scarcity tier from CAT_RATING_TIERS
     §4  renderRating()  builds the 🥫 cans HTML for the results panel
     §5  orSum()         OR aggregation — sums selected checkbox values
     §6  andProduct()    AND aggregation — multiplies selected values
     §7  calculate()     main entry point, wired to the Build My Prince button
     §8  animateResult() count-up animation + ghost-decimal guard
     §9  buildTags()     builds the "My Standards" tag chips in the results
     §10 resetAll()      clears every input and the results panel
     §11 shareResults()  Web Share API with clipboard fallback
     §12 exportImage()   html2canvas PNG download of the results column
     §13 flash()         non-blocking toast notification (replaces alert)
   ════════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────────────────
   §1  STARFIELD
   A lightweight canvas animation that draws 200 twinkling cyan
   stars behind the page.  Uses a simple sine-wave for opacity
   so each star pulses independently.  Re-initialises on resize
   so stars always fill the whole viewport.
────────────────────────────────────────────────────────────── */
(function () {
  const c = document.getElementById("stars");
  const ctx = c.getContext("2d");
  let W, H, stars;

  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }

  function init() {
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.003 + 0.001,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const a = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,238,255,${a * 0.55})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); init(); });
  resize(); init();
  requestAnimationFrame(draw);
})();


/* ──────────────────────────────────────────────────────────────
   §2–§4  HEIGHT HELPER · CAT FOOD RATING · RENDER RATING
────────────────────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════
   HEIGHT HELPER
   Converts two dropdown indices (min, max) into the fraction of
   Kerala men whose height falls within that window.
   Uses H_DATA from kerala-data.js.
══════════════════════════════════════════════════════════════ */
function heightFactor(minI, maxI) {
  if (minI > maxI) return 0;
  // pct[minI] = % of men at minI or taller
  // pct[maxI+1] = % of men above the max cut-off (excluded)
  // difference = % of men strictly within the chosen range
  const above    = H_DATA[minI].pct;
  const aboveMax = maxI < H_DATA.length - 1 ? H_DATA[maxI + 1].pct : 0;
  return (above - aboveMax) / 100;
}


/* ══════════════════════════════════════════════════════════════
   CAT FOOD SCARCITY RATING
   Delegates entirely to CAT_RATING_TIERS from kerala-data.js.
   To add, remove, or relabel a tier — edit kerala-data.js only.
══════════════════════════════════════════════════════════════ */
function getCatRating(pct) {
  for (const t of CAT_RATING_TIERS) {
    if (pct > t.above) return t;
  }
  // Fallback: pct is exactly 0 or negative — "out of stock"
  return CAT_RATING_TIERS[CAT_RATING_TIERS.length - 1];
}

// Builds the 🥫 can row HTML and score display for the results panel.
// Filled cans = scarcity level. Empty cans = how common he is.
function renderRating(pct) {
  const t      = getCatRating(pct);
  const filled = t.r;
  const empty  = 10 - filled;
  let cans = "";
  for (let i = 0; i < filled; i++) cans += `<span class="can">🥫</span>`;
  for (let i = 0; i < empty;  i++) cans += `<span class="can empty">🥫</span>`;
  // Score colour: gold for ultra-rare (8+), cyan for mid-range (5–7), muted for common
  const col = filled >= 8 ? "var(--gold)" : filled >= 5 ? "var(--cyan)" : "var(--sub)";
  return `
    <div class="rhint">🥫 More cans = scarcer man · Fewer cans = more common</div>
    <div class="rcans">${cans}</div>
    <div class="rscore" style="color:${col}">${filled} / 10</div>
    <div class="rlbl">${t.label}</div>
    <div class="rdesc">${t.desc}</div>`;
}


/* ──────────────────────────────────────────────────────────────
   §5–§13  CALCULATOR LOGIC
────────────────────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
// OR: sum checked values, cap at 100%
function orSum(name) {
  let s = 0;
  document.querySelectorAll(`input[name="${name}"]:checked`).forEach(e => s += +e.value);
  return Math.min(s, 100);
}

// AND: multiply each checked value as a fraction
function andProduct(name) {
  let f = 1;
  document.querySelectorAll(`input[name="${name}"]:checked`).forEach(e => f *= +e.value / 100);
  return f;
}

/* ═══════════════════════════════════════════════════════════
   CALCULATE
═══════════════════════════════════════════════════════════ */
// TOTAL_MEN is declared in kerala-data.js — no redeclaration needed here.

function calculate() {
  const agePct = orSum("age");
  if (!agePct) { flash("Select at least one age group."); return; }

  const minI = +document.getElementById("height-min").value;
  const maxI = +document.getElementById("height-max").value;
  const errEl = document.getElementById("height-err");
  if (minI > maxI) { errEl.style.display = "block"; return; }
  errEl.style.display = "none";

  const eduFact  = +document.getElementById("education").value / 100;
  const incFact  = +document.getElementById("income").value    / 100;

  const empPct = orSum("emp");
  if (!empPct)  { flash("Select at least one employment type."); return; }

  const relPct = orSum("rel");
  if (!relPct)  { flash("Select at least one religion."); return; }

  const bodyPct = orSum("body");
  if (!bodyPct) { flash("Select at least one body type."); return; }
  let bodyFact = bodyPct / 100;
  if (document.getElementById("exclude-obese").checked) bodyFact *= 0.77;

  const marPct = orSum("mar");
  if (!marPct)  { flash("Select at least one marital status."); return; }

  const locPct = orSum("loc");
  if (!locPct)  { flash("Select at least one location."); return; }

  const lifeFact  = andProduct("life");
  const assetFact = andProduct("asset");

  // All cross-category conditions are AND-ed (multiplicative)
  const factor = (agePct / 100) * heightFactor(minI, maxI) * eduFact * incFact
               * (empPct / 100) * (relPct / 100) * bodyFact
               * (marPct / 100) * (locPct / 100) * lifeFact * assetFact;

  const finalPct   = factor * 100;
  const exactCount = factor * TOTAL_MEN;  // TOTAL_MEN is defined in kerala-data.js

  animateResult(finalPct, exactCount, Math.round(exactCount));
  document.getElementById("rating-display").innerHTML = renderRating(finalPct);
  buildTags(minI, maxI);
  document.getElementById("rcol").classList.add("done");
}

/* ═══════════════════════════════════════════════════════════
   ANIMATE RESULT
   Ghost-decimal guard: when exactCount < 1, not even one
   whole man in Kerala statistically satisfies all criteria.
   Show ~0% clearly rather than a confusing tiny decimal.
═══════════════════════════════════════════════════════════ */
function animateResult(targetPct, exactCount, roundCount) {
  const pEl = document.getElementById("mpct");
  const cEl = document.getElementById("mcnt");

  if (exactCount < 1) {
    pEl.textContent = "~0%";
    pEl.className   = "mpct zero";
    cEl.textContent = "Statistically none — not even 1 man matches all criteria";
    return;
  }

  const t0 = performance.now(), dur = 700;
  (function step(now) {
    const t    = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const cur  = targetPct * ease;
    const cnt  = Math.round(roundCount * ease);

    pEl.textContent = targetPct < 0.01 ? targetPct.toFixed(4) + "%"
                    : targetPct < 0.1  ? cur.toFixed(4) + "%"
                    : targetPct < 1    ? cur.toFixed(3) + "%"
                    :                    cur.toFixed(2) + "%";

    pEl.className = "mpct" + (targetPct < 1 ? " zero" : "");

    cEl.textContent = cnt < 1000   ? `≈ ${cnt.toLocaleString()} men`
                    : cnt < 100000 ? `≈ ${(cnt / 1000).toFixed(1)}K men`
                    :                `≈ ${(cnt / 100000).toFixed(2)} Lakh men`;

    if (t < 1) requestAnimationFrame(step);
  })(t0);
}

/* ═══════════════════════════════════════════════════════════
   BUILD TAGS
═══════════════════════════════════════════════════════════ */
function buildTags(minI, maxI) {
  const box  = document.getElementById("tags");
  const tags = [];

  const agePct = orSum("age");
  if (agePct) tags.push(`Age: ${agePct}%`);

  tags.push(`Height: ${H_DATA[minI].label} – ${H_DATA[maxI].label}`);

  const eduTxt = document.getElementById("education").selectedOptions[0].text;
  tags.push("Edu: " + (eduTxt.match(/\(([^)]+)\)/)?.[1] ?? eduTxt));

  const incTxt = document.getElementById("income").selectedOptions[0].text;
  tags.push("Income: " + (incTxt.match(/\(([^)]+)\)/)?.[1] ?? incTxt));

  const empPct = orSum("emp");
  if (empPct) tags.push(`Employment: ${empPct}%`);

  const relPct = orSum("rel");
  if (relPct) tags.push(`Religion: ${relPct}%`);

  const bodyPct = orSum("body");
  if (bodyPct) tags.push(`Body: ${bodyPct}%`);

  if (document.getElementById("exclude-obese").checked) tags.push("Non-Obese Only");

  const marPct = orSum("mar");
  if (marPct) tags.push(`Marital: ${marPct}%`);

  const locPct = orSum("loc");
  if (locPct) tags.push(`Location: ${locPct}%`);

  document.querySelectorAll(`input[name="life"]:checked`).forEach(el =>
    tags.push(el.closest(".cb").textContent.trim().split(" ")[0]));

  document.querySelectorAll(`input[name="asset"]:checked`).forEach(el =>
    tags.push(el.closest(".cb").textContent.trim().split("(")[0].trim()));

  box.innerHTML = tags.length
    ? tags.map(t => `<span class="tag">${t}</span>`).join("")
    : `<span class="tph">Standards will appear after calculation</span>`;
}

/* ═══════════════════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════════════════ */
function resetAll() {
  document.querySelectorAll("input[type=checkbox]").forEach(el => el.checked = false);
  document.getElementById("education").selectedIndex  = 0;
  document.getElementById("income").selectedIndex     = 0;
  document.getElementById("height-min").selectedIndex = 0;
  document.getElementById("height-max").selectedIndex = 13;
  document.getElementById("height-err").style.display = "none";
  document.getElementById("mpct").textContent = "–";
  document.getElementById("mpct").className   = "mpct";
  document.getElementById("mcnt").textContent = "Press 👑 Build My Prince to reveal your fate";
  document.getElementById("rating-display").innerHTML =
    `<div class="rplaceholder">Awaiting calibration…</div>`;
  document.getElementById("tags").innerHTML =
    `<span class="tph">Standards will appear after calculation</span>`;
  document.getElementById("rcol").classList.remove("done");
}

/* ═══════════════════════════════════════════════════════════
   SHARE / EXPORT
═══════════════════════════════════════════════════════════ */
function shareResults() {
  const p   = document.getElementById("mpct").textContent;
  const msg = `My Kerala Prince result: ${p} match! 😻 Try it: ${location.href}`;
  if (navigator.share) {
    navigator.share({ title: "Kerala Female Delusion Calculator", text: msg, url: location.href });
  } else {
    navigator.clipboard.writeText(msg).then(() => flash("Copied to clipboard!"));
  }
}

// ═══════════════════════════════════════════════════════════
//  EXPORT AS PNG
//  Uses html2canvas to render the results panel into a canvas,
//  then converts that canvas to a PNG data URL and triggers a
//  browser download — no server, no permissions, no popups.
// ═══════════════════════════════════════════════════════════
function exportImage() {
  const target = document.getElementById("rcol");

  // Guard: make sure a calculation has actually been run first,
  // so we don't export a blank "Awaiting calibration…" card.
  const pctText = document.getElementById("mpct").textContent;
  if (pctText === "–") {
    flash("Run 👑 Build My Prince first, then export your result.");
    return;
  }

  flash("📸 Capturing your result…");

  // html2canvas works best when backdrop-filter blur is removed
  // temporarily, because it cannot composite blur across layers.
  // We store the original value, clear it, capture, then restore.
  const originalFilter = target.style.backdropFilter;
  target.style.backdropFilter = "none";
  // Also temporarily boost the card background opacity so the
  // dark surface looks solid in the exported image.
  target.style.background = "rgba(7, 7, 32, 0.98)";

  html2canvas(target, {
    backgroundColor: "#020210",   // match the page background colour
    scale: 2,                     // 2× pixel density → crisp on retina / high-DPI screens
    useCORS: true,                // allow cross-origin resources (fonts, logo)
    logging: false,               // suppress console noise
    // Ignore the starfield canvas behind the page — we only want the card
    ignoreElements: (el) => el.id === "stars",
  }).then(canvas => {

    // Restore the original styles before the user sees anything change
    target.style.backdropFilter = originalFilter;
    target.style.background     = "";

    // Convert the canvas to a PNG blob URL and trigger a download.
    // The filename includes the match % so exported files are
    // self-describing when saved to disk.
    canvas.toBlob(blob => {
      const url      = URL.createObjectURL(blob);
      const link     = document.createElement("a");
      link.href      = url;
      link.download  = `kerala-prince-result-${pctText.replace("%","pct")}.png`;
      link.click();

      // Clean up the object URL after a short delay to free memory
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      flash("✅ PNG saved!");
    }, "image/png");

  }).catch(err => {
    // Restore styles even if something went wrong
    target.style.backdropFilter = originalFilter;
    target.style.background     = "";
    console.error("Export error:", err);
    flash("Export failed — try a screenshot instead (Ctrl+Shift+S).");
  });
}

/* ═══════════════════════════════════════════════════════════
   FLASH MESSAGE  — replaces browser alert() for clean UX
═══════════════════════════════════════════════════════════ */
function flash(msg) {
  let el = document.getElementById("flash-msg");
  if (!el) {
    el = document.createElement("div");
    el.id = "flash-msg";
    Object.assign(el.style, {
      position: "fixed", bottom: "24px", left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(6,6,30,0.97)",
      border: "1px solid rgba(255,48,128,0.45)",
      color: "#ff3080",
      fontFamily: "Exo 2, sans-serif",
      fontSize: "0.86rem",
      fontWeight: "600",
      padding: "12px 22px",
      borderRadius: "12px",
      zIndex: "9999",
      boxShadow: "0 4px 24px rgba(255,48,128,0.35)",
      pointerEvents: "none",
      transition: "opacity 0.4s",
    });
    document.body.appendChild(el);
  }
  el.textContent   = msg;
  el.style.opacity = "1";
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = "0"; }, 2700);
}
