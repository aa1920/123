const fs=require('node:fs');
const htmlPath='dist/index.html';let html=fs.readFileSync(htmlPath,'utf8');html=html.replace('<script src="app.js">','<script src="kansai.js"></script><script src="app.js">');fs.writeFileSync(htmlPath,html);
const p='dist/app.js';let js=fs.readFileSync(p,'utf8');js=js.replace('let state;try{','Object.assign(initial,kansaiPlan);\nlet state;try{');js=js.replace('let day=0,nav=',`if(state.planVersion!==2){state={...state,...kansaiPlan,days:5,saved:[]};try{localStorage.setItem('roam-travel-v1',JSON.stringify(state))}catch{}}\nlet day=0,nav=`);
js=js.replace("$('#day-heading').textContent=['與京都的第一次見面','沿著風，走進山林','在鳥居之間漫步','把時間留給巷弄','帶著故事，回家'][day]||'今天，想去哪裡？'", "$('#day-heading').textContent=state.headings?.[day]||'今天，想去哪裡？';$('.hero-country').textContent='JAPAN · KYOTO × OSAKA';$('.map-label').textContent=day<3?'KYOTO 京都':'OSAKA 大阪'");
js=js.replace("'自由探索 · 無預估費用'", "'費用尚未估算'");
js=js.replace("if(fresh){state.stops=[];", "if(fresh){state.headings=[];state.stops=[];");
js=js.replace("$('#trip-note').textContent=state.note;", "$('#trip-note').textContent=state.note;");
js+=`\nconst sourceNote=document.createElement('div');sourceNote.className='plan-note';sourceNote.innerHTML='<strong>這趟旅行的安排</strong><p>京都住 3 晚，大阪住 1 晚；若第 5 天不返程，再加 1 晚大阪。第 1 天以早上已在京都為前提；第 5 天需依航班調整。時間為建議節奏，尚未訂票或訂房。</p><p>景點與餐飲費用尚未估算；右側預算保留示例金額。照片為旅行氛圍示意。</p><div>'+kansaiPlan.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener noreferrer">'+s[0]+' ↗</a>').join('')+'</div>';document.querySelector('footer').before(sourceNote);\n`;
fs.writeFileSync(p,js);
