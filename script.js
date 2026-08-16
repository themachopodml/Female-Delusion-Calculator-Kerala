const $=id=>document.getElementById(id);
const INCOME_STEPS=DATA.incomeSteps;
const CAT=CAT_RATING_TIERS;

function ft(cm){let t=cm/2.54,f=Math.floor(t/12),i=Math.round(t-f*12);if(i===12){f++;i=0}return `${f}'${i}"`}

function rangeUI(t){
  const a=$(t+'Min'),b=$(t+'Max');
  let lo=+a.value,hi=+b.value;
  if(lo>hi){if(document.activeElement===a)b.value=lo;else a.value=hi;lo=+a.value;hi=+b.value}
  $(t+'MinOut').textContent=t==='age'?lo:`${lo} cm (${ft(lo)})`;
  $(t+'MaxOut').textContent=t==='age'?(hi>=70?'70+':hi):`${hi} cm (${ft(hi)})`;
  const p=(lo-+a.min)/(+a.max-+a.min)*100,q=(hi-+a.min)/(+a.max-+a.min)*100;
  $(t+'Range').style.setProperty('--start',p+'%');
  $(t+'Range').style.setProperty('--end',q+'%');
}

function incomeUI(){
  const i=+$('income').value;
  $('incomeOut').textContent=INCOME_STEPS[i].label;
  $('income').style.setProperty('--income-pos',i/17*100+'%');
  $('incomeTicks').innerHTML=INCOME_STEPS.map((x,n)=>`<button type="button" class="income-tick ${n===i?'active':''}" data-i="${n}">${x.label}</button>`).join('');
  document.querySelectorAll('.income-tick').forEach(b=>b.onclick=()=>{$('income').value=b.dataset.i;incomeUI()});
}

function orF(n){let v=[...document.querySelectorAll(`input[name="${n}"]:checked`)].map(x=>+x.value);return v.length?Math.min(1,v.reduce((a,b)=>a+b,0)):0}
function andF(n){let v=[...document.querySelectorAll(`input[name="${n}"]:checked`)].map(x=>+x.value);return v.length?v.reduce((a,b)=>a*b,1):1}

function agePool(a,z){
  return DATA.ageBands.reduce((s,b)=>{
    const lo=Math.max(a,b.min),hi=Math.min(z,b.max);
    return hi>=lo?s+(b.weight*DATA.malePopulation21to70):s;
  },0);
}

function heightF(a,z){
  const hs=DATA.heights.filter(h=>h>=a&&h<=z);
  if(!hs.length)return 0;
  const lo=Math.min(...hs),hi=Math.max(...hs);
  const upper=DATA.heightModel[lo]||0;
  const next=DATA.heights[DATA.heights.indexOf(hi)+1];
  const above=next===undefined?0:(DATA.heightModel[next]||0);
  return Math.max(.000001,upper-above);
}

function renderCat(p){
  const t=CAT.find(x=>p>x.above)||CAT[CAT.length-1];
  let c='';
  for(let i=0;i<10;i++)c+=`<span class="can ${i<t.r?'':'empty'}">🥫</span>`;
  return `<div class="rhint">🥫 More cans = scarcer man · Fewer cans = more common</div><div class="rcans">${c}</div><div class="rscore">${t.r} / 10</div><div class="rlbl">${t.label}</div><div class="rdesc">${t.desc}</div>`;
}

function pctText(p){return (p<.01?p.toFixed(4):p<.1?p.toFixed(3):p<1?p.toFixed(2):p.toFixed(1))+'%'}

function calc(){
  try{
    const a=+$('ageMin').value,z=+$('ageMax').value,h1=+$('heightMin').value,h2=+$('heightMax').value;
    if(a>z||h1>h2)throw Error('Check the selected range.');
    const ef=+$('education').value,ii=+$('income').value,inf=INCOME_STEPS[ii].factor;
    const wf=orF('emp'),rf=orF('rel'),bf=orF('body'),mf=orF('mar'),lf=orF('loc');
    if(!wf||!rf||!bf||!mf||!lf)throw Error('Select at least one option in each required section.');
    let body=bf;if($('exclude-obese').checked)body*=DATA.model.nonObese;
    const as=andF('asset'),life=andF('life');
    const af=agePool(a,z)/DATA.malePopulation21to70;
    const hf=heightF(h1,h2);
    const factor=af*hf*ef*inf*wf*rf*body*mf*lf*as*life;
    const finalPct=factor*100;
    const count=Math.round(DATA.malePopulation21to70*factor);
    $('count').textContent=count<1?'≈ 0':`≈ ${count.toLocaleString('en-IN')} men`;
    $('percent').textContent=pctText(finalPct);
    $('confidence').textContent=(ii>=8||$('exclude-obese').checked)?'MODELLED COVERAGE':'DEMOGRAPHIC ESTIMATE';
    $('resultText').textContent=count<1?'The selected combination produces less than one modelled match in the Kerala demographic base.':`The model estimates roughly ${count.toLocaleString('en-IN')} men in the selected demographic base. This is not a live availability count.`;
    $('meterBar').style.width=Math.min(100,Math.max(.25,finalPct))+'%';
    $('rating-display').innerHTML=renderCat(finalPct);
    buildTags(a,z,h1,h2,ii);
  }catch(e){flash(e.message)}
}

function buildTags(a,z,h1,h2,ii){
  const tags=[`Age ${a}–${z>=70?'70+':z}`,`Height ${h1}–${h2} cm`,`Education ${$('education').selectedOptions[0].text}`,`Income ${INCOME_STEPS[ii].label}`];
  const ep=orF('emp'),rp=orF('rel'),bp=orF('body'),mp=orF('mar'),lp=orF('loc');
  if(ep)tags.push(`Employment ${Math.round(ep*100)}%`);if(rp)tags.push(`Religion ${Math.round(rp*100)}%`);if(bp)tags.push(`Body ${Math.round(bp*100)}%`);if($('exclude-obese').checked)tags.push('Non-Obese Only');if(mp)tags.push(`Marital ${Math.round(mp*100)}%`);if(lp)tags.push(`Location ${Math.round(lp*100)}%`);
  document.querySelectorAll('input[name="asset"]:checked').forEach(x=>tags.push(x.closest('.cb').textContent.trim()));
  document.querySelectorAll('input[name="life"]:checked').forEach(x=>tags.push(x.closest('.cb').textContent.trim()));
  $('tags').innerHTML=tags.map(t=>`<span>${t}</span>`).join('');
}

function resetCalc(){
  document.querySelectorAll('input[type=checkbox]').forEach(x=>x.checked=false);
  [['mar','.52'],['loc','1'],['rel','1'],['body','.40']].forEach(([n,v])=>{const x=document.querySelector(`input[name="${n}"][value="${v}"]`);if(x)x.checked=true});
  document.querySelector('input[name="emp"][value=".28"]').checked=true;
  $('education').selectedIndex=0;$('income').value=0;$('ageMin').value=25;$('ageMax').value=34;$('heightMin').value=150;$('heightMax').value=195;
  rangeUI('age');rangeUI('height');incomeUI();$('count').textContent='—';$('percent').textContent='—';$('confidence').textContent='WAITING';$('resultText').textContent='Set your standards and build your Prince profile.';$('meterBar').style.width='0';$('rating-display').innerHTML='<div class="rplaceholder">Awaiting calibration…</div>';$('tags').innerHTML='';
}

async function share(){const t=`KL FemDelCalc by @themachopodml\nPrince pool: ${$('count').textContent} (${ $('percent').textContent })`;try{if(navigator.share)await navigator.share({title:'KL FemDelCalc',text:t,url:location.href});else{await navigator.clipboard.writeText(t+'\n'+location.href);flash('Result copied.')}}catch(e){if(e.name!=='AbortError')flash('Share failed.')}}

function exportImage(){const target=$('rcol');if($('count').textContent==='—'){flash('Run Build My Prince first, then export your result.');return}if(typeof html2canvas==='undefined'){flash('PNG export library is unavailable.');return}flash('Capturing your result…');html2canvas(target,{backgroundColor:'#080309',scale:2,useCORS:true,logging:false}).then(canvas=>canvas.toBlob(blob=>{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='KL-FemDelCalc-result.png';a.click();URL.revokeObjectURL(url);flash('PNG exported.')})).catch(()=>flash('PNG export failed.'))}

function flash(t){const x=document.querySelector('.toast');x.textContent=t;x.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>x.classList.remove('show'),2600)}

(function(){const c=$('stars'),x=c.getContext('2d');let w,h,s=[];function size(){w=c.width=innerWidth;h=c.height=innerHeight;s=Array.from({length:160},()=>({x:Math.random()*w,y:Math.random()*h,r:.2+Math.random()*1.1,p:Math.random()*6.28}))}function draw(t){x.clearRect(0,0,w,h);s.forEach(a=>{x.globalAlpha=.12+.18*Math.sin(t*.001+a.p);x.fillStyle='#ffc94a';x.beginPath();x.arc(a.x,a.y,a.r,0,6.28);x.fill()});requestAnimationFrame(draw)}addEventListener('resize',size);size();requestAnimationFrame(draw)})();

document.addEventListener('DOMContentLoaded',()=>{rangeUI('age');rangeUI('height');[$('ageMin'),$('ageMax')].forEach(x=>x.oninput=()=>rangeUI('age'));[$('heightMin'),$('heightMax')].forEach(x=>x.oninput=()=>rangeUI('height'));incomeUI();$('income').oninput=incomeUI;$('calculateBtn').onclick=calc;$('resetBtn').onclick=resetCalc;$('shareBtn').onclick=share;$('exportBtn').onclick=exportImage});
