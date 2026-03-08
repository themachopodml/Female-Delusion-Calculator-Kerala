/* ════════════════════════════════════════════════════════════
   kerala-data.js — Kerala Female Delusion Calculator
   by @themachopodml
   ─────────────────────────────────────────────────────────
   This file contains ONLY static data constants.
   No animation, no DOM access, no calculation logic lives here.

   To update a census figure or add a new tier:
     • Find the relevant constant below and edit the value.
     • Reload the page — script.js picks up the change automatically.
     • No changes to script.js or index.html are needed.

   Data sources:
     Census of India 2021 — Kerala Provisional Data
     NFHS-5 (2019–21) — Kerala State
     NSSO 2022–23 — Employment & Income
     Kerala Planning Board Economic Review 2023
     RBI — Kerala Financial Inclusion Data 2023
   ════════════════════════════════════════════════════════════ */


// ── Base population ───────────────────────────────────────────────────────────
// Total Kerala men aged 20–70, based on 2021 Census projections.
// Used as the denominator when converting a match fraction → head count.
const TOTAL_MEN = 11_000_000;


// ── Height distribution table ─────────────────────────────────────────────────
// Each row represents a height threshold.
// pct  =  percentage of Kerala men who are AT THAT HEIGHT OR TALLER.
// Range: 4'6" to 6'8" — the full Kerala wedding groom height record.
// Source: NFHS-5 anthropometric data, Kerala state.
//
// How script.js uses this:
//   heightFactor(minIndex, maxIndex)
//   = (pct[minIndex] − pct[maxIndex+1]) / 100
//   = the fraction of men whose height falls within the chosen window.
const H_DATA = [
  { label: "4'6\"",  pct: 99.9  },   // virtually every man clears this bar
  { label: "4'8\"",  pct: 99.5  },
  { label: "4'10\"", pct: 98    },
  { label: "5'0\"",  pct: 94    },
  { label: "5'2\"",  pct: 82    },
  { label: "5'4\"",  pct: 65    },
  { label: "5'6\"",  pct: 42    },
  { label: "5'8\"",  pct: 22    },
  { label: "5'10\"", pct: 10    },
  { label: "6'0\"",  pct: 3.5   },
  { label: "6'2\"",  pct: 1     },
  { label: "6'4\"",  pct: 0.3   },
  { label: "6'6\"",  pct: 0.08  },
  { label: "6'8\"",  pct: 0.01  },   // tallest groom on Kerala record
];


// ── Cat food scarcity rating tiers ────────────────────────────────────────────
// The rating is INVERTED: lower match % → more cans → rarer man.
// Think of it as a luxury goods scarcity index.
//
// Each entry:
//   above  the match-% threshold.  Tier applies when actualPct > above.
//   r      number of 🥫 cans to display (0 = discontinued, 10 = mythic).
//   label  tier name shown in the UI.
//   desc   humorous one-line description shown below the score.
//
// Iteration order matters: the array runs from MOST COMMON to MOST RARE.
// getCatRating() in script.js returns the first tier whose 'above' is
// exceeded by the actual percentage — so the order must not be changed.
const CAT_RATING_TIERS = [
  { above: 50,   r: 1,  label: "Bulk Bin Basics 🛒",            desc: "Sold by the truckload. Zero effort needed. 😐" },
  { above: 20,   r: 2,  label: "Standard Shelf Stock 🏪",       desc: "Walk into any supermarket — he's there. 🐱" },
  { above: 10,   r: 3,  label: "Decent Brand 🥫",               desc: "A few aisles over. Solid but not rare. 🐾" },
  { above: 5,    r: 4,  label: "Premium Aisle 🌟",              desc: "Check two or three stores. Getting picky! 🔍" },
  { above: 2,    r: 5,  label: "Specialty Store 🏬",            desc: "Select shops only. He exists — just needs effort. 🗺" },
  { above: 1,    r: 6,  label: "Limited Batch 📦",              desc: "Seasonal stock. Don't wait — might sell out. ⏳" },
  { above: 0.5,  r: 7,  label: "Small Batch Import 🚢",         desc: "You're ordering online and tracking the package. 📲" },
  { above: 0.1,  r: 8,  label: "Rare Reserve 💎",               desc: "Flown in on a private jet. Expensive taste. ✈️" },
  { above: 0.01, r: 9,  label: "Collector's Edition 🏛",        desc: "One crate per region. Cats fight over this. 🐈🐈" },
  { above: 0,    r: 10, label: "Single Origin Mythic Blend 🦄",  desc: "Hand-crafted by monks. Does he even exist? 🌌" },
  { above: -1,   r: 0,  label: "Out of Stock — Permanently 😿", desc: "Discontinued. Lower standards or adopt a cat. 🐱" },
];
