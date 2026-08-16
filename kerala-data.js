/* Kerala Female Delusion Calculator data layer
   by @themachopodml

   Published inputs and model assumptions are intentionally separated.
   Latest demographic base: Government of India Population Projections 2011–2036.
   Kerala 2026 projected population: ~36.263 million; male population: ~17.423 million
   (1 October projection table). The calculator's 21–70 base and some intersections
   remain modelled because no single official table publishes every requested cross-tab.
*/

const DATA = {
  year: 2026,
  projectedKeralaPopulation: 36263000,
  projectedMalePopulation: 17423000,
  /* Modelled male population aged 21–70 used by the calculator. */
  malePopulation21to70: 12000000,

  /* Transparent age-band weights calibrated to the current Kerala demographic profile.
     These are model factors, not a newly published Census table. */
  ageBands: [
    {min:21,max:24,weight:0.10,label:'21–24'},
    {min:25,max:29,weight:0.11,label:'25–29'},
    {min:30,max:34,weight:0.12,label:'30–34'},
    {min:35,max:39,weight:0.12,label:'35–39'},
    {min:40,max:44,weight:0.12,label:'40–44'},
    {min:45,max:49,weight:0.11,label:'45–49'},
    {min:50,max:54,weight:0.10,label:'50–54'},
    {min:55,max:59,weight:0.09,label:'55–59'},
    {min:60,max:64,weight:0.07,label:'60–64'},
    {min:65,max:69,weight:0.04,label:'65–69'},
    {min:70,max:70,weight:0.02,label:'70+'}
  ],

  /* Height envelope matching the Kerala calculator's established groom-height range.
     Height percentages are modelled because Census does not publish this distribution. */
  heights: [122,127,132,137,142,147,152,157,162,167,172,177,182,187,192,197,202,207,212,217,222,227,232,237,242,247,251],
  heightModel: {
    122:1,127:.995,132:.985,137:.97,142:.94,147:.87,152:.76,157:.63,162:.49,
    167:.36,172:.25,177:.16,182:.095,187:.055,192:.030,197:.016,202:.008,
    207:.004,212:.002,217:.001,222:.0006,227:.0003,232:.00015,237:.00008,
    242:.00004,247:.00002,251:.00001
  },

  /* Latest official labour source is PLFS. Income tiers above normal survey coverage
     are deliberately modelled scarcity tiers, not official billionaire counts. */
  incomeSteps: [
    {label:'1 LPA+',factor:1},{label:'2 LPA+',factor:.94},{label:'3 LPA+',factor:.88},
    {label:'5 LPA+',factor:.78},{label:'10 LPA+',factor:.62},{label:'15 LPA+',factor:.50},
    {label:'25 LPA+',factor:.35},{label:'50 LPA+',factor:.20},{label:'1 Cr+',factor:.12},
    {label:'10 Cr+',factor:.025},{label:'25 Cr+',factor:.01},{label:'50 Cr+',factor:.004},
    {label:'75 Cr+',factor:.002},{label:'1 B+',factor:.001},{label:'10 B+',factor:.00015},
    {label:'50 B+',factor:.00003},{label:'1 Trillion+',factor:.000001},{label:'∞',factor:1}
  ],

  model: {
    education: {any:1, primary:.94, secondary:.82, higherSecondary:.62, bachelors:.34, masters:.15, phd:.025},
    employment: {govt:.09, private:.28, self:.18, professional:.07, nri:.05, defence:.03},
    religion: {hindu:.55, muslim:.27, christian:.18, other:.01},
    body: {slim:.18, average:.40, athletic:.17, overweight:.25},
    nonObese:.77,
    marital: {neverMarried:.52, married:.48},
    location: {urban:.48, rural:.52},
    assets: {house:.70, car:.30, business:.18, financial:.22, land:.45, twoWheeler:.55},
    lifestyle: {nonSmoker:.75, nonDrinker:.60, vegetarian:.20, fitness:.25, religious:.55, noTobacco:.40}
  },

  sourceNotes: [
    'Census of India 2011: C-01 religion/sex, C-02 marital status, C-08/C-08A education, C-14 age/sex and PCA.',
    'Population Projection Report 2011–2036: Kerala projected 2026 population and sex totals.',
    'PLFS: latest published labour-market and earnings indicators; methodology revised from 2025.',
    'NFHS-5 2019–21: Kerala anthropometry and household characteristics.',
    'HCES 2023–24: household consumption and durable-goods socio-economic context.',
    'Kerala Department of Economics & Statistics / Economic Review: state economic context.',
    'Height, exact asset intersections, extreme income tiers and 21–70 age-band intersections are modelled where no official cross-tab exists.'
  ]
};

const CAT_RATING_TIERS = [
  {above:50,r:1,label:'Bulk Bin Basics 🛒',desc:'Broadly available statistically.'},
  {above:20,r:2,label:'Standard Shelf Stock 🏪',desc:'Relatively common profile.'},
  {above:10,r:3,label:'Decent Brand 🥫',desc:'Moderately common.'},
  {above:5,r:4,label:'Premium Aisle 🌟',desc:'Above-average selectivity.'},
  {above:2,r:5,label:'Specialty Store 🏬',desc:'Noticeably selective.'},
  {above:1,r:6,label:'Limited Batch 📦',desc:'Small statistical pool.'},
  {above:.5,r:7,label:'Small Batch Import 🚢',desc:'Uncommon profile.'},
  {above:.1,r:8,label:'Rare Reserve 💎',desc:'Very limited statistical pool.'},
  {above:.01,r:9,label:"Collector's Edition 🏛",desc:'Exceptionally rare profile.'},
  {above:0,r:10,label:'Single Origin Mythic Blend 🦄',desc:'Statistically extreme scarcity.'},
  {above:-1,r:0,label:'Out of Stock — Permanently 😿',desc:'No modelled match remains.'}
];
