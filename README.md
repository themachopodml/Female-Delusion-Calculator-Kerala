<div align="center">
  <img src="macho-pod-logo.png" alt="The Macho Pod logo" width="180">
</div>

# 🧮 Kerala Female Delusion Calculator
### by [@themachopodml](https://github.com/themachopodml)

> *"How rare is your Prince, really?"*

A statistically-grounded interactive calculator for estimating how rare a male profile becomes when multiple preferences are combined. The Kerala version uses the latest available official population projections and government survey sources, while clearly separating published data from modelled assumptions where an exact cross-tabulation is not published.

**🔗 Live Site:** [themachopodml.github.io/Female-Delusion-Calculator-Kerala](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala)

---

## 🌟 Features

**11+ Preference Categories** covering age, height, minimum qualification, annual personal income, employment, religion, body type, marital status, location, lifestyle and asset requirements.

**👑 Build My Prince** — age and height use the same draggable dual-range controls used by the India FemDelCalc. Age runs from 21 to 70+; height runs from 122 cm to 251 cm.

**💰 Annual Personal Income** — a stepped LPA threshold control from 1 LPA through crore, billion and trillion-level scarcity tiers. Tiers above normal survey coverage are explicitly modelled rather than presented as official survey percentages.

**🏠 Asset Requirements** — Own House, Own Car, Own Business, Financial Assets, Own Land / Plot and Two-Wheeler.

**🚫 Exclude Obese** — optional body-composition filter.

**🐱 Cat Food Scarcity Rating** — the result is presented on the 10-can scarcity scale. Lower modelled match percentage means more cans and a rarer statistical profile.

**Viewport-fitted desktop dashboard** — the calculator is designed as a compact multi-column interface, while smaller screens switch to a normal scrollable layout.

**Large readable typography** — interface text has been substantially enlarged for easier reading on desktop displays. Because apparently software occasionally needs to remember that humans have eyes.

---

## 📊 Data Sources

The calculator distinguishes published government inputs from model assumptions. It does not claim that an exact Kerala-wide intersection of every requested characteristic exists in one official table.

- **Census of India 2011** — C-01 religion and sex; C-02 marital status by age and sex; C-08/C-08A education; C-14 age/sex composition; Primary Census Abstract for population, sex, SC/ST and work-status indicators.
- **Technical Group / National Commission on Population, Population Projections 2011–2036** — projected Kerala population by sex, including the 2026 projection of about 36.26 million persons and 17.42 million males as of 1 October 2026.
- **MoSPI / PLFS** — latest labour-market and earnings framework. PLFS moved to a revised calendar-year annual reporting system from 2025; the calculator uses the latest published indicators where Kerala-level breakdowns are available and retains modelled factors where the required intersection is unavailable.
- **NFHS-5, 2019–21** — Kerala anthropometry, household characteristics and health-related indicators. A newer fully published Kerala NFHS cross-tab is not substituted merely because a newer survey round is being conducted.
- **MoSPI Household Consumption Expenditure Survey 2023–24** — latest published household consumption and durable-goods framework used as supporting socio-economic context, not as a direct individual-income measure.
- **Kerala Department of Economics & Statistics / Kerala Economic Review** — state-level socio-economic and labour-market context.

The calculator does **not** claim an official number of men actively available for marriage, an official "shortest/tallest wedding groom" registry, an exact individual wealth intersection, or an exact live matrimonial-market population. Those dimensions are modelled where necessary.

The 2026 population projection is a demographic base, not a live dating or matrimonial database.

---

## ⚙️ How the Calculation Works

**Within OR-based preference sections**, selecting several acceptable alternatives expands the accepted pool. For example, selecting multiple employment types means any of those employment types is acceptable.

**Across preference sections, the logic is AND** — age, height, education, income, employment, religion, body type, marital status, location, assets and lifestyle conditions are combined into one modelled intersection.

**Lifestyle and asset filters are AND-based**. Selecting Non-Smoker and Non-Drinker therefore applies both restrictions.

**Age** uses the Kerala demographic base and a transparent model calibration because the current official projection does not publish a complete 2026 Kerala male 21–70 cross-tab in the exact calculator bands.

**Height** is a modelled Kerala male-height envelope. The Census does not publish a male-height distribution, and there is no authoritative government registry of the shortest or tallest wedding groom. The range is therefore an interface envelope, not an official groom-record statistic.

**Income** uses annual personal-income thresholds. Survey-based tiers are separated from extreme scarcity tiers beyond ordinary PLFS coverage.

A simplified screening formula is:

```text
Final % = Age% × Height% × Education% × Income% × Employment%
        × Religion% × Body% × Marital% × Location%
        × Financial/Asset factors × Lifestyle factors
```

The multiplication assumes sufficient independence between characteristics for a screening model. Real-world characteristics are correlated, so the output is an estimate, not an exact Census intersection.

---

## 🐱 Cat Food Rating Scale

| Cans | Match % Range | Label |
|------|--------------|-------|
| 10/10 | > 0% to ≤ 0.01% | Single Origin Mythic Blend 🦄 |
| 9/10 | > 0.01% to ≤ 0.1% | Collector's Edition 🏛 |
| 8/10 | > 0.1% to ≤ 0.5% | Rare Reserve 💎 |
| 7/10 | > 0.5% to ≤ 1% | Small Batch Import 🚢 |
| 6/10 | > 1% to ≤ 2% | Limited Batch 📦 |
| 5/10 | > 2% to ≤ 5% | Specialty Store 🏬 |
| 4/10 | > 5% to ≤ 10% | Premium Aisle 🌟 |
| 3/10 | > 10% to ≤ 20% | Decent Brand 🥫 |
| 2/10 | > 20% to ≤ 50% | Standard Shelf Stock 🏪 |
| 1/10 | > 50% | Bulk Bin Basics 🛒 |
| 0/10 | Exactly 0% | Out of Stock — Permanently 😿 |

*More cans = scarcer man · Fewer cans = more common*

---

## ⚠️ Disclaimer

This calculator is for **educational and self-reflection purposes only**. Real relationships involve personality, chemistry, timing, values, family circumstances, geography, attraction and individual choice that demographic statistics cannot capture.

The result is a **modelled demographic scarcity estimate**. It is not a live dating-market population and does not measure willingness to marry, compatibility, attraction, availability or family approval. Where an official cross-tabulation is unavailable, the calculator labels the relevant factor as modelled rather than inventing a government statistic.

---

## 🎙️ About The Macho Pod

**The Macho Pod** (`@themachopodml`) is a podcast and content platform based in Kerala, India. The FemDelCalc project is designed as an educational statistical tool and discussion resource for the show.

### 🧮 In FemDelCalc

- 🧮 [KL FemDelCalc](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala) — Kerala demographic scarcity calculator
- 🧮 [IN FemDelCalc](https://themachopodml.github.io/Female-Delusion-Calculator-India) — India demographic scarcity calculator

### 📣 Connect with The Macho Pod

- 💬 [Send Videos to React](https://t.me/themachopodchat)
- 🎙️ [Exclusive Uncensored Contents](https://rumble.com/c/c-7911504)
- 📸 [DM reels for Reaction, Opinion](https://www.instagram.com/themachopodml/)
- 🎙️ [Telegram: @themachopodml](https://t.me/themachopodml)
- ▶️ [YouTube: @themachopodml](https://www.youtube.com/@themachopodml)
- 🌐 [Live Calculator](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala)

---

*Built with ❤️ and brutal honesty · Kerala, India*
