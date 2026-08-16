<div align="center">
  <img src="macho-pod-logo.png" alt="The Macho Pod logo" width="180">
</div>

# 🧮 Kerala Female Delusion Calculator
### by [@themachopodml](https://github.com/themachopodml)

> *"How rare is your Prince, really?"*

A statistically-grounded interactive calculator for Kerala that estimates how rare a male profile becomes when multiple preferences are combined. It uses official Indian government sources where available and clearly separates published statistics from modelled assumptions.

**🔗 Live Site:** https://themachopodml.github.io/Female-Delusion-Calculator-Kerala

---

## 🌟 Features

**Age Range** — redesigned as a draggable dual-handle range from **21 to 70+**, following the newer FemDelCalc interface.

**Height Range** — redesigned as a draggable dual-handle range from **4'6" to 6'8"**. This is a calculator-defined Kerala envelope retained from the earlier version, not a claim that the Government maintains a wedding-groom height registry.

**💰 Annual Personal Income** — replaces the old monthly-income selector with annual personal-income thresholds from ₹3 lakh+ through ₹5 crore+.

**🏠 Asset Requirements** — Own House, Own Car, Own Business, Financial Assets, Own Land / Plot and Two-Wheeler.

**🚫 Exclude Obese / Overweight** — updated using NFHS-6 Kerala's published adult male overweight-or-obese indicator.

**🐱 Cat Food Scarcity Rating** — a 10-can rarity scale. Lower modelled match percentage means more cans and greater statistical scarcity.

**Readable futuristic dashboard** — typography and controls have been substantially enlarged for easier reading while retaining the dark neon interface.

**Responsive layout** — desktop dashboard plus a single-column mobile layout.

---

## 📊 Data Sources & Update Status

The Kerala calculator has been refreshed against the latest government releases available in August 2026.

### Census

**Census of India 2011 remains the latest completed population Census.** The Office of the Registrar General and Census Commissioner is currently conducting preparatory work for **Census 2027**, including 2026 pre-tests and first-phase operations. Final Census 2027 population results do not exist yet, so they are not fabricated into this calculator.

The calculator therefore uses:
- Census of India 2011 demographic classifications
- Government of India Population Projection Report 2011–2036 where a current age/sex base is needed
- Current Census 2027 status only as a source-status note

### NFHS-6

**NFHS-6 (2023–24)** was released in May 2026 and is the newest National Family Health Survey.

For Kerala, NFHS-6 reports:
- Men aged 15–49 with BMI ≥25 (overweight or obese): **37.0%**
- Therefore the calculator uses **63.0%** as the non-overweight/non-obese screening share when the exclusion filter is enabled.

Important: NFHS publishes **overweight or obese combined**, not an obesity-only percentage in this indicator. The calculator therefore does not mislabel 37% as "obesity".

### Employment & Income

**MoSPI PLFS Annual Report 2025** is the latest annual PLFS release used for employment and earnings context. PLFS collects earnings information for self-employed workers, regular wage/salaried employees and casual labour.

The calculator's high annual-income thresholds are **modelled scarcity tiers**, because PLFS does not publish one official table containing the exact Kerala male matrimonial population at every ₹10 lakh, ₹20 lakh, ₹50 lakh, ₹1 crore and ₹5 crore annual-income threshold.

### Kerala economic context

The Kerala State Planning Board's **Economic Review 2025** is the current annual state economic review used as contextual source material.

---

## ⚙️ How the Calculation Works

Within a category, selected alternatives are treated as OR. For example, selecting both Government and Private employment accepts either group.

Across categories, conditions are combined as AND. The model therefore multiplies the selected shares:

```text
Final match % ≈
Age × Height × Education × Income × Employment
× Religion × Body × Marital × Location
× Assets × Lifestyle × Social Category
```

This is a **screening model**, not a live matrimonial database.

Government datasets do not publish the exact intersection of age + height + income + education + employment + religion + marital status + assets + lifestyle + location. Therefore the final percentage is a modelled statistical estimate. Characteristics are also correlated in real life, so multiplying independent-looking percentages can overstate or understate the true intersection.

The result should not be presented as "X actual bachelors are currently available in Kerala."

---

## 🐱 Cat Food Rating Scale

| Cans | Match % | Rating |
|------|---------|--------|
| 10/10 | >0%–0.01% | Single Origin Mythic Blend |
| 9/10 | >0.01%–0.1% | Collector's Edition |
| 8/10 | >0.1%–0.5% | Rare Reserve |
| 7/10 | >0.5%–1% | Small Batch Import |
| 6/10 | >1%–2% | Limited Batch |
| 5/10 | >2%–5% | Specialty Store |
| 4/10 | >5%–10% | Premium Aisle |
| 3/10 | >10%–20% | Decent Brand |
| 2/10 | >20%–50% | Standard Shelf Stock |
| 1/10 | >50% | Bulk Bin Basics |
| 0/10 | 0% | Out of Stock — Permanently |

*More cans = scarcer man · Fewer cans = more common*

---

## ⚠️ Important Limitations

- Census 2027 final population data are not available yet.
- There is no official Kerala registry of the shortest or tallest wedding groom. The 4'6"–6'8" height envelope is a calculator input, not a government statistic.
- NFHS-6's BMI indicator combines overweight and obesity.
- PLFS does not publish every high-income threshold used here.
- Asset combinations are modelled screening factors, not direct counts of Kerala men owning each asset simultaneously.
- The calculator estimates statistical scarcity. It does not measure attraction, compatibility, willingness to marry, family approval, geography, timing or actual availability.

---

## 🎙️ About The Macho Pod

**The Macho Pod** (`@themachopodml`) is a podcast and content platform based in Kerala, India. This calculator is an educational tool developed for the FemDelCalc series.

### 🧮 In FemDelCalc

- 🧮 [KL FemDelCalc](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala)
- 🧮 [IN FemDelCalc](https://themachopodml.github.io/Female-Delusion-Calculator-India)

### 📣 Connect with The Macho Pod

- 💬 [Send Videos to React](https://t.me/themachopodchat)
- 🎙️ [Exclusive Uncensored Contents](https://rumble.com/c/c-7911504)
- 📸 [DM reels for Reaction, Opinion](https://www.instagram.com/themachopodml/)
- 🎙️ [Telegram: @themachopodml](https://t.me/themachopodml)
- ▶️ [YouTube: @themachopodml](https://www.youtube.com/@themachopodml)

---

*Built with ❤️ and brutal honesty · Kerala, India*
