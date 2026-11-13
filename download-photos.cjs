(async()=>{const fs=require('node:fs');const r=JSON.parse(fs.readFileSync('photo-research.json','utf8'));const specs={};
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&[^;]+;/g,' ').trim();
for(const [k,i]of Object.entries({katsuo:0,bamboo:0,ninen:0,yasaka:0,maruyama:1,togetsu:0,nonomiya:0,dotonbori:0,shinsaibashi:0,umeda:0,tadasu:0,mujiShop:0})){const s=r.spots[k]?.[i];if(s&&/CC BY|CC0|Public domain/.test(s.license||''))specs['spot-'+k]={url:s.url.split('?')[0],label:clean(s.title.replace('File:','')),source:s.page,credit:clean(s.artist)||'Wikimedia Commons',license:s.license,licenseUrl:s.licenseUrl||'https://creativecommons.org/publicdomain/zero/1.0/',kind:'景點照片'}}
function product(key,group,pick,label,source,kind='商品參考照片'){const list=r.products[group]||[];const s=typeof pick==='number'?list[pick]:list.find(pick);if(!s)throw Error('No image '+key);specs[key]={url:s.url.replace('http:','https:').replace(/%7Bwidth%7D|\{width\}/g,'600'),label,source:source||s.url,credit:kind.includes('門市')?'品牌／商場官方':'品牌／來源頁面',license:'圖片權利歸原權利人',kind}}
product('trend-liner','liner',2,'CANMAKE Creamy Touch Liner・色號依現場選擇','https://www.canmake.com/en/item/detail/creamy-touch-liner/');
product('trend-brow','brow',12,'CEZANNE 超細芯眉筆・包裝與色號參考','https://www.cezanne.co.jp/lineup/4939553040903/');
product('trend-lip','lip',4,'KATE Lip Monster 系列參考','https://www.nomorerules.net/all_products/lip/');
product('trend-base','base',x=>x.url.includes('/goods/L/01260'),'乾燥小姐妝前乳','https://www.bcl-brand.jp/shop/g/g01260/');
product('trend-lipoil','cosmo',3,'Cp-Lip 護唇精華・媒體圖片','https://www.cosmopolitan.com/tw/beauty/skin/g73232542/2026-japan-travel-donki-cosmeceutical-10/');
product('trend-clear','cosmo',5,'KOSE Clear Turn 化妝水／乳液・媒體圖片','https://www.cosmopolitan.com/tw/beauty/skin/g73232542/2026-japan-travel-donki-cosmeceutical-10/');
product('trend-mushroom','donki',x=>x.alt.includes('しいたけスナック'),'情熱價格香菇脆片','https://www.jeko-esim.com.tw/blog/japan-donki-must-buy-pb-guide/');
product('trend-nori','nori',x=>x.alt.includes('海苔の天ぷらスナック'),'情熱價格海苔天婦羅・口味參考','https://www.donki.com/j-kakaku/');
product('daiso-bag','daisoBag',1,'DAISO 手捲旅行壓縮袋','https://jp.daisonet.com/products/4550480909974');
product('daiso-pouch','daiso',x=>x.alt.includes('ＥＶＡポーチ３ポケット'),'DAISO EVA 三隔層收納袋','https://jp.daisonet.com/collections/travel0208');
product('daiso-hanging','daiso',x=>x.alt==='トラベル吊り下げポーチ','DAISO 吊掛盥洗包','https://jp.daisonet.com/collections/travel0208');
for(const [key,q]of [['coins-gadget','仕切りが多い'],['coins-eco','お土産用']]){const p=r.coinsProducts.find(p=>p.name.includes(q));specs[key]={url:p.image[0],label:p.name,source:p.url,credit:'3COINS / PAL CLOSET',license:'圖片權利歸原權利人',kind:'官方商品參考照片'}}
product('coins-compress','daiso',x=>x.alt==='圧縮バッグ','壓縮收納款式參考（圖片為 DAISO，非 3COINS 指定款）','https://jp.daisonet.com/collections/travel0208','類別參考，非指定商品');
// Generic clothing recommendations have no selected SKU: show their stores, clearly labelled.
specs['wear-uniqlo']={...specs['spot-shinsaibashi'],...r.spots.shinsaibashi[2],url:r.spots.shinsaibashi[2].url.split('?')[0],source:r.spots.shinsaibashi[2].page,credit:clean(r.spots.shinsaibashi[2].artist),label:'UNIQLO／GU 心齋橋門市參考',kind:'品牌門市照片，非指定服飾款式'};
specs['wear-gu']={...specs['wear-uniqlo']};specs['wear-muji']={...specs['spot-mujiShop'],label:'MUJI 品牌門市參考・照片為京都店，非難波門市',kind:'品牌門市照片，非指定服飾款式'};
product('wear-beams','beams',2,'BEAMS 梅田店・門市參考','https://www.beams.co.jp/shop/umd/','品牌門市照片，非指定服飾款式');
product('tea','tea',6,'一保堂茶葉系列參考・非指定焙茶款','https://global.ippodo-tea.co.jp/pages/store-kyoto','茶葉類別參考');
product('chanoka','chanoka',x=>x.alt==='茶の菓 8枚入','茶之菓・盒裝參考','https://www.kyoto-quality.com/');
product('yatsuhashi','yatsuhashi',3,'聖護院八橋系列參考','https://shogoin.co.jp/product/');
product('baton','baton',3,'Bâton d’or・巧克力口味包裝參考','https://www.glico.com/jp/product/limitedarea/batondor/');
product('tanebits','tanebits',18,'TANEBITS・起司醬油口味參考','https://www.e-kakinotane.com/tanebits/');
product('sanrio-series','sanrio',4,'Sanrio 心齋橋店原創商品系列・庫存另查','https://www.sanrio.co.jp/news/shop/mx-shinsaibashi-open-20260603/');
product('seria-store','seria',1,'Seria 難波 CITY 南館店・店內／門市參考','https://nambacity.com/shopresearch/300','門市照片，商品以現場為準');
product('donki-store','donki',x=>x.alt.includes('大阪道頓堀唐吉訶德門市'),'唐吉訶德道頓堀店・門市參考','https://www.donki-global.com/zhtw/store/shop_detail.php?shop_id=110','門市照片');
// Some official pages provide images only via CSS or structured data; read the actual source URLs.
const extras={chiikawa:'https://chiikawamarket.jp/collections/goods',coinsMore:'https://www.palcloset.jp/display/display/?b=3coins&search_word=%E5%9C%A7%E7%B8%AE&mode=zSearch'};
for(const [key,url]of Object.entries(extras)){try{const html=await(await fetch(url,{signal:AbortSignal.timeout(20000)})).text();fs.writeFileSync('photo-research/'+key+'.html',html);if(key==='chiikawa'){const tags=html.match(/<img\b[^>]*>/gi)||[];let found;for(const tag of tags){const a={};for(const m of tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g))a[m[1]]=m[2];if(a.alt?.includes('ちいかわ')&&(a['data-src']||a.src)&&!a.src?.startsWith('data:')){found={url:new URL((a['data-src']||a.src).replaceAll('&amp;','&'),url).href,label:a.alt,source:url,credit:'ちいかわマーケット',license:'圖片權利歸原權利人',kind:'角色周邊系列參考，非指定款'};break}}if(found)specs['trend-chiikawa']=found}if(key==='coinsMore'){const m=[...html.matchAll(/"name"\s*:\s*"([^"]*圧縮[^"]*)"[\s\S]{0,250}?"image"\s*:\s*\[\s*"([^"]+)"/g)].find(x=>!x[1].includes('自動'));if(m)specs['coins-compress']={url:m[2],label:m[1],source:url,credit:'3COINS / PAL CLOSET',license:'圖片權利歸原權利人',kind:'壓縮收納系列參考，非指定款'}}}catch(e){console.log('EXTRA ERROR',key,e.message)}}
fs.mkdirSync('dist/assets/photos',{recursive:true});const out={};for(const [key,s]of Object.entries(specs)){try{const res=await fetch(s.url,{headers:{'User-Agent':'RoamTravelPrototype/1.0'},signal:AbortSignal.timeout(25000)});if(!res.ok)throw Error(res.status);const mime=res.headers.get('content-type')?.split(';')[0];if(!mime?.startsWith('image/'))throw Error('Not image '+mime);const b=Buffer.from(await res.arrayBuffer());if(b.length<150)throw Error('Image too small');const ext=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif','image/gif':'gif'})[mime]||'img';const src='assets/photos/'+key+'.'+ext;fs.writeFileSync('dist/'+src,b);out[key]={...s,src,mime,bytes:b.length};console.log('OK',key,b.length)}catch(e){console.log('FAIL',key,String(e.message))}}
fs.writeFileSync('dist/photo-data.js','const photoAssets='+JSON.stringify(out)+';\n');fs.writeFileSync('photo-assets.json',JSON.stringify(out,null,2));console.log('TOTAL',Object.keys(out).length,Object.values(out).reduce((s,a)=>s+a.bytes,0));
})().catch(e=>{console.error(e);process.exitCode=1});
