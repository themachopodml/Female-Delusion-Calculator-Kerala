# 🧮 Kerala Female Delusion Calculator
### by [@themachopodml](https://github.com/themachopodml)

> *"How rare is your Prince, really?"*

A statistically-grounded, interactive web calculator that helps women in Kerala understand the realistic probability of finding a man who matches their ideal preferences — based on real government census and survey data. The result isn't a judgement; it's a mirror.

**🔗 Live Site:** [themachopodml.github.io/Female-Delusion-Calculator-Kerala](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala)

---

## 🌟 Features

**11 Preference Categories** covering every major criterion women typically look for in a partner — age range (20–70 in 5-year bands), height range (4'6" to 6'8", spanning the full Kerala groom height record), minimum education level, minimum monthly income, employment type, religion, body type, marital history, location, lifestyle habits, and asset ownership.

**🐱 Cat Food Scarcity Rating** — the signature feature. After calculating, your result is scored out of 10 using a cat food rarity metaphor. The logic is *inverted on purpose*: the lower your match percentage, the more cans you score — because a man who only 0.01% of Kerala men qualify for is an ultra-rare collector's import, not a bulk-bin basic. Think of it as a luxury goods scarcity index, but for human compatibility.

**Ghost-decimal protection** — when the combination of filters is so strict that not even one whole man statistically exists (e.g. 0.03 of a person), the calculator displays `~0%` with the message *"Statistically none — not even 1 man matches all criteria"* rather than showing a confusing tiny decimal alongside "0 men".

**Viewport-fitted desktop layout** — on PC, the entire calculator fits within a single browser window with no page scroll needed. Preferences are arranged in a dense, dashboard-style grid so everything is accessible at a glance.

**Mobile-first responsive design** — on phones, the layout switches to a single column with the results panel shown *first*, so after scrolling through and pressing Build My Prince, your result is visible without needing to scroll back up. Touch targets are enlarged for comfortable use.

**Self-contained single file** — the logo, favicon, and all styles are embedded directly inside `index.html`. No external dependencies, no CDN calls for assets, no separate image files required.

---

## 📊 Data Sources

All statistics are drawn from authoritative Indian government sources. The calculator does not use estimates or guesswork — every percentage shown next to a filter option is sourced from the following:

- **Census of India 2021** — Kerala State Provisional Data (population, age distribution, marital status, religion, location)
- **National Family Health Survey (NFHS-5) 2019–21** — Kerala State (body type / BMI distribution, asset ownership, household characteristics)
- **National Sample Survey Office (NSSO) 2022–23** — Employment & Income data for Kerala
- **Kerala State Planning Board Economic Review 2023** — state-level economic indicators
- **Reserve Bank of India — Kerala Financial Inclusion Data 2023** (financial asset ownership estimates)

The total male population base used for count calculations is **~1.1 crore men (11,000,000)**, representing Kerala men aged 20–70 based on 2021 census projections.

---

## ⚙️ How the Calculation Works

Understanding the math behind the result helps you interpret it honestly.

**Within each preference section, the logic is OR** — meaning the filter passes if the man meets *any* of the selected options. If you tick "25–29 years" and "30–34 years", the calculator adds those percentages together (16% + 14% = 30%), because you'd accept either. This is the *union* of those groups.

**Across preference sections, the logic is AND** — meaning every condition must be satisfied simultaneously. A man must fit your age range *and* your height range *and* your income bracket *and* so on. This is implemented by multiplying all the factors together. This is why the final percentage can become very small very quickly — each AND condition is a multiplicative narrowing of the pool.

**Lifestyle and Asset filters are always AND within their own group** — since you're requiring a man to be both a non-smoker *and* a non-drinker (for example), not one or the other. Each ticked lifestyle or asset filter multiplies independently.

**The Exclude Obese toggle** applies a further `×0.77` multiplier to the body type result, reflecting that approximately 23% of Kerala men fall into the obese BMI category per NFHS-5.

A simplified version of the formula looks like this:

```
Final % = Age% × Height% × Education% × Income% × Employment%
        × Religion% × BodyType% × Marital% × Location%
        × (Lifestyle filters multiplied) × (Asset filters multiplied)
```

---

## 🐱 Cat Food Rating Scale

| Cans | Match % Range | Label |
|------|--------------|-------|
| 10/10 | > 0% to ≤ 0.01% | Single Origin Mythic Blend 🦄 |
| 9/10  | > 0.01% to ≤ 0.1% | Collector's Edition 🏛 |
| 8/10  | > 0.1% to ≤ 0.5%  | Rare Reserve 💎 |
| 7/10  | > 0.5% to ≤ 1%    | Small Batch Import 🚢 |
| 6/10  | > 1% to ≤ 2%      | Limited Batch 📦 |
| 5/10  | > 2% to ≤ 5%      | Specialty Store 🏬 |
| 4/10  | > 5% to ≤ 10%     | Premium Aisle 🌟 |
| 3/10  | > 10% to ≤ 20%    | Decent Brand 🥫 |
| 2/10  | > 20% to ≤ 50%    | Standard Shelf Stock 🏪 |
| 1/10  | > 50%             | Bulk Bin Basics 🛒 |
| 0/10  | Exactly 0%        | Out of Stock — Permanently 😿 |

*More cans = scarcer man · Fewer cans = more common*

---

## ⚠️ Disclaimer

This calculator is for **educational and self-reflection purposes only**. Real relationships involve many factors that demographics and statistics cannot capture — personality, chemistry, timing, values, and circumstance among them. The goal is to provide perspective on statistical realities, not to prescribe who you should or shouldn't date. All figures are approximations derived from government survey data and may not perfectly represent every individual's situation.

---

## 🎙️ About The Macho Pod

**The Macho Pod** (`@themachopodml`) is a podcast and content platform based in Malappuram, Kerala. This calculator was built as an educational tool discussed on the show.

- 💬 [Send Videos to React](https://t.me/themachopodchat)
- 🎙️ [Telegram: @themachopodml](https://t.me/themachopodml)
- ▶️ [YouTube: @themachopodml](https://www.youtube.com/@themachopodml)
- 🌐 [Live Calculator](https://themachopodml.github.io/Female-Delusion-Calculator-Kerala)

---

*Built with ❤️ and brutal honesty · Kerala, India*
