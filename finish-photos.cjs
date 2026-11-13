const fs=require('fs');
const registry=JSON.parse(fs.readFileSync('photo-assets.json','utf8'));
const r=JSON.parse(fs.readFileSync('photo-research.json','utf8'));
const specs=[];
specs.push({key:'cv-seven',url:'https://img-afd.7api-01.dp1.sej.co.jp/item-image/304120/583C70FF71CBAC60DB308E9F3AB0EDD3.jpg',label:'7-Eleven 蛋沙拉三明治・地區包裝參考',source:'https://www.sej.co.jp/products/a/item/304120/'});
specs.push({key:'cv-lawson',url:'https://www.lawson.co.jp/company/news/detail/__icsFiles/artimage/2025/07/31/cj310701/roll1_1.jpg',label:'LAWSON Premium Roll Cake・官方改版照片',source:'https://www.lawson.co.jp/company/news/detail/1508417_2504.html'});
function add(key,url,label,source){specs.push({key,url,label,source})}
const coins=r.coinsProducts.find(p=>p.name==='衣類収納バッグ：L');
add('coins-compress',coins.image[0],'3COINS 衣類收納袋 L・款式參考',coins.url);
registry['sanrio-series'].label='Sanrio 心齋橋店內裝・門市參考';registry['sanrio-series'].kind='門市照片，非商品照片';
add('sanrio-goods',r.products.sanrio.find(x=>x.url.endsWith('sub3.png')).url,'Sanrio 心齋橋店原創吊飾系列・款式參考','https://www.sanrio.co.jp/news/shop/mx-shinsaibashi-open-20260603/');
const ch=fs.readFileSync('photo-research/chiikawa.html','utf8');
const tag=(ch.match(/<img\b[^>]*>/g)||[]).find(x=>/alt="ちいかわ セーフティポーチ/.test(x));
add('trend-chiikawa',new URL(tag.match(/\ssrc="([^"]+)/)[1].replaceAll('&amp;','&'),'https://chiikawamarket.jp').href,'吉伊卡哇收納包・角色周邊款式參考','https://chiikawamarket.jp/collections/goods');
const pages=[];
(async()=>{
for(const [key,url,label,match]of pages){try{const h=await(await fetch(url,{signal:AbortSignal.timeout(20000)})).text();fs.writeFileSync('photo-research/'+key+'.html',h);const tags=(h.match(/<img\b[^>]*>/gi)||[]).map(t=>Object.fromEntries([...t.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(m=>[m[1],m[2]])));const item=tags.find(t=>match.test(t.alt||'')&&(t.src||t['data-src'])&&!/logo|banner|bnr/.test(t.src||''));let img=item&&(item['data-src']||item.src);if(!img){const og=h.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);img=og?.[1]}if(img)add(key,new URL(img.replaceAll('&amp;','&'),url).href,label,url);console.log(key,img||'NONE')}catch(e){console.log(key,e.message)}}
for(const s of specs){try{const res=await fetch(s.url,{signal:AbortSignal.timeout(25000)});if(!res.ok)throw Error(res.status);let mime=res.headers.get('content-type').split(';')[0];const b=Buffer.from(await res.arrayBuffer());if(!mime.startsWith('image/')){if(b[0]===255&&b[1]===216&&b[2]===255)mime='image/jpeg';else throw Error('not image ('+mime+')')}const ext=mime==='image/png'?'png':mime==='image/webp'?'webp':'jpg',src='assets/photos/'+s.key+'.'+ext;fs.writeFileSync('dist/'+src,b);registry[s.key]={...s,src,mime,bytes:b.length,credit:'品牌官方',license:'圖片權利歸原權利人',kind:'官方商品／系列參考照片'};console.log('OK',s.key,b.length)}catch(e){console.log('FAIL',s.key,e.message)}}
fs.writeFileSync('photo-assets.json',JSON.stringify(registry,null,2));fs.writeFileSync('dist/photo-data.js','const photoAssets='+JSON.stringify(registry)+';\n');
})().catch(e=>{console.error(e);process.exitCode=1});
