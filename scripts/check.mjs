import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import validator from 'gltf-validator';
const routes=['','how-it-works','projects','projects/courtyard-house','delivery','pricing','questions','start'];
let links=0;
for(const route of routes){const filename='dist/'+(route?route+'/':'')+'index.html',html=await fs.readFile(filename,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,filename+' has one H1');assert(!/<img\b/i.test(html),'Supplied raster references must not be shown');for(const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)){const href=match[1];if(!href.startsWith('/')||href.startsWith('//'))continue;const url=new URL(href,'https://check.local');let file='dist'+url.pathname;if(url.pathname.endsWith('/'))file+='index.html';await fs.access(file);if(url.hash){const linked=await fs.readFile(file,'utf8');assert(linked.includes('id="'+url.hash.slice(1)+'"'),href+' anchor exists');}links++;}}
const bytes=new Uint8Array(await fs.readFile('dist/assets/courtyard-house.glb'));const report=await validator.validateBytes(bytes,{uri:'courtyard-house.glb'});await fs.writeFile('glb-validation.json',JSON.stringify(report,null,2));assert.equal(report.issues.numErrors,0);assert.equal(report.issues.numWarnings,0);
const tour=await fs.readFile('dist/tour.html','utf8');assert(!/<(?:script|link)[^>]+(?:src|href)=/i.test(tour),'Standalone tour has no external scripts/styles');const embedded=tour.match(/window.COURTYARD_GLB="([A-Za-z0-9+/=]+)"/);assert(embedded,'Tour embeds GLB');const hash=b=>crypto.createHash('sha256').update(b).digest('hex');assert.equal(hash(Buffer.from(embedded[1],'base64')),hash(bytes));
const layout=JSON.parse(await fs.readFile('dist/assets/model-data.json','utf8'));assert.equal(layout.rooms.filter(r=>/bedroom/i.test(r[0])).length,4);assert(layout.rooms.some(r=>r[0]==='Courtyard'));assert(layout.walls.length>25);
const gallery=await fs.readFile('dist/projects/index.html','utf8');assert(gallery.includes('a2475c32d03949479b7f68dd03a9f851/embed?'));assert(gallery.includes('https://sketchfab.com/baezeni'));
for(const f of ['dist/downloads/spatially-complete.zip','dist/downloads/courtyard-model-source.zip']){const z=await fs.readFile(f);assert(z.length>1000);assert.equal(z.readUInt32LE(0),0x04034b50);}
console.log(JSON.stringify({htmlPages:routes.length,checkedLocalLinks:links,glbBytes:bytes.length,glbErrors:report.issues.numErrors,glbWarnings:report.issues.numWarnings,standaloneModelHash:hash(bytes),standaloneExternalAssets:0,bedrooms:4},null,2));
