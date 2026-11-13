const fs=require('node:fs'),vm=require('node:vm');
let html=fs.readFileSync('dist/index.html','utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync('dist/style.css','utf8')+'</style>');
const files=[...html.matchAll(/<script src="([a-z-]+\.js)"><\/script>/g)].map(m=>m[1]);
for(const file of files){let code=fs.readFileSync('dist/'+file,'utf8');if(file==='photo-data.js'){const assets=JSON.parse(fs.readFileSync('photo-assets.json','utf8'));for(const a of Object.values(assets))a.src='data:'+a.mime+';base64,'+fs.readFileSync('dist/'+a.src).toString('base64');code='const photoAssets='+JSON.stringify(assets)+';'}html=html.replace('<script src="'+file+'"></script>',()=>'<script>'+code+'</script>');}
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
if(scripts.length!==files.length||/<script src=/.test(html))throw new Error('Missing embedded script');
new vm.Script(scripts.join('\n'),{filename:'漫旅App.html'});
fs.writeFileSync('漫旅App.html',html);
console.log('Standalone app saved; '+scripts.length+' embedded scripts passed combined syntax validation.');
