/** Editable parametric model. Metres; Y up; north = -Z. Original geometry from supplied drawings.
 * Run npm run model. No reference raster is embedded or used as a texture. */
import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries,mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
export const rooms = [
 ['Living room',.2,.2,5.3,4.3],['Dining',5.5,.2,4.8,3.1],['Kitchen',5.5,3.3,4.8,3.3],['Pantry',.2,4.5,4.8,2.1],
 ['Courtyard',10.5,.2,4.5,4.4],['Foyer',10.5,4.6,6.3,2],['Family lounge',15.2,.2,4.4,3.4],['Study',16,3.8,3.6,1.9],
 ['Master bedroom',19.8,.2,4.3,3.4],['Walk-in wardrobe',24.3,.2,2.4,3.4],['Ensuite',26.9,.2,2.9,3.0],
 ['Guest WC',21.2,3.8,2.1,1.8],['Shower',23.5,3.8,1.5,1.8],['Bathroom',26,3.4,3.8,2.2],
 ['Bedroom 2',17.3,6.5,4.0,2.1],['Bedroom 3',21.5,6.5,4.0,2.1],['Guest bedroom',25.7,6.2,4.1,2.4]
];
// Segment: x1,z1,x2,z2, opening type and intervals in metres along segment.
export const walls = [
 [0,0,10.4,0,'window',[[1,3.2],[4,6.2],[7,9.5]]],[15.1,0,30,0,'window',[[.5,4],[5.3,8.4],[9.6,11.4],[12,14.3]]],
 [0,0,0,6.7,'window',[[.8,2.7],[4.8,5.6]]],[30,0,30,8.8,'window',[[.6,2.2],[3.6,5.4],[6.5,8]]],
 [0,6.7,10.4,6.7,'window',[[1.2,4.4],[6,9.1]]],[10.4,6.7,17.2,6.7,'door',[[1.3,3.1]]],
 [17.2,8.8,30,8.8,'window',[[.6,3.4],[4.8,7.7],[9.1,11.9]]],
 [17.2,6.4,17.2,8.8],[10.4,0,10.4,5,'window',[[.4,3.8]]],[15.1,0,15.1,4.8,'window',[[.4,3.6]]],
 [10.4,4.7,15.1,4.7,'door',[[1.45,3.25]]],
 [0,4.45,5.2,4.45,'door',[[3.8,4.8]]],[5.2,4.45,5.2,6.7,'door',[[.2,1.2]]],
 [15.1,3.6,19.8,3.6],[16,3.6,16,5.65],[16,5.65,19.8,5.65,'door',[[2.25,3.35]]],
 [19.8,0,19.8,5.7,'door',[[2.5,3.5],[4.35,5.35]]],
 [19.8,3.65,24.3,3.65],[24.3,0,24.3,3.65,'door',[[2.3,3.3]]],
 [26.8,0,26.8,3.2,'door',[[2,3]]],[26.8,3.2,30,3.2],
 [21.1,3.65,21.1,5.65],[21.1,5.65,23.4,5.65,'door',[[.5,1.5]]],
 [23.4,3.65,23.4,5.65],[25.1,3.65,25.1,5.65],[23.4,5.65,25.1,5.65,'door',[[.4,1.3]]],
 [26,3.2,26,5.65],[26,5.65,30,5.65,'door',[[.3,1.3]]],
 [17.2,6.4,21.4,6.4,'door',[[2.9,3.9]]],[21.4,6.4,25.6,6.4,'door',[[.25,1.25]]],
 [25.6,6.1,30,6.1,'door',[[.25,1.25]]],[21.4,6.4,21.4,8.8],[25.6,6.1,25.6,8.8]
];
export function createHouse({merge=true}={}) {
 const root=new T.Group(); root.name='My Courtyard House • image-based concept';
 const groups={}; for(const n of ['base','site','floor','walls','glazing','doors','furniture','landscape','details']){groups[n]=new T.Group();groups[n].name=n;root.add(groups[n]);}
 const mat={}; const material=(n,c,r=.7,m=0)=>mat[n]=new T.MeshStandardMaterial({name:n,color:c,roughness:r,metalness:m});
 material('Lime plaster','#e6e0d1');material('Charcoal cap','#344139');material('Limestone','#d0c7b3');material('Gravel','#afa99a');material('Terracotta','#a66c4c');
 material('Lawn','#6f8350');material('Leaves','#345b3e');material('Light leaves','#6c8652');material('Flower','#bd896d');material('Cream linen','#eee8da');material('Sage linen','#99a393');
 material('Oak','#a67e50');material('Oak light','#c49e6c');material('Oak pale','#d4b383');material('Oak dark','#82603c');material('Stone','#dfddd4');material('Rug','#c7bda6');material('Rug light','#dcd4bd');
 material('Metal','#4b504d',.35,.65);material('Steel','#a4a9a4',.25,.75);material('Porcelain','#faf7ed',.25);material('Ink','#26352f');material('Car white','#e7e7df',.25,.2);material('Car green','#52615c',.25,.3);
 mat.Glass=new T.MeshStandardMaterial({name:'Architectural glazing',color:'#9abfc3',roughness:.15,metalness:.15,transparent:true,opacity:.3,depthWrite:false});
 let seed=721;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 function mesh(g,geometry,x,y,z,m,ry=0){const q=new T.Mesh(geometry,mat[m]);q.position.set(x,y,z);q.rotation.y=ry;q.castShadow=!['site','floor','glazing'].includes(g);q.receiveShadow=true;groups[g].add(q);return q;}
 function box(g,x,y,z,w,h,d,m,ry=0,round=0){return mesh(g,round?new RoundedBoxGeometry(w,h,d,1,Math.min(round,w/3,h/3,d/3)):new T.BoxGeometry(w,h,d,Math.ceil(w/.8),1,Math.ceil(d/.8)),x,y,z,m,ry);}
 function cyl(g,x,y,z,r,h,m,rt=r){return mesh(g,new T.CylinderGeometry(rt,r,h,10),x,y,z,m);}
 function ball(g,x,y,z,r,m,sx=1,sy=1,sz=1){const q=mesh(g,new T.IcosahedronGeometry(r,1),x,y,z,m);q.scale.set(sx,sy,sz);return q;}
 function slab(x,z,w,d,m='Oak light'){box('floor',x+w/2,.04,z+d/2,w,.16,d,m);}
 // Site is presentation context, not a surveyed boundary.
 box('base',15,-.42,4.5,32,.65,18,'Limestone');box('site',15,-.06,11.3,30,.12,4.6,'Lawn');box('site',15,-.06,-1.7,30,.12,2.6,'Lawn');
 slab(0,0,10.4,6.7);slab(10.4,4.7,6.8,2);slab(15.1,0,4.7,5.65);slab(19.8,0,10.2,8.8);slab(17.2,5.65,2.6,3.15);
 slab(0,4.45,5.2,2.25,'Stone');slab(21.1,3.65,8.9,2,'Stone');slab(26.8,0,3.2,3.2,'Stone');slab(10.5,0,4.5,4.7,'Gravel');
 // Individual oak boards create genuine three-dimensional floor grain, no image texture.
 const floorRects=[[.2,.2,10,4.1],[5.4,4.5,4.8,2],[15.3,.2,4.3,3.2],[16.2,3.8,3.4,1.6],[20,.2,4.1,3.2],[17.4,6.6,3.8,2],[21.6,6.6,3.8,2],[25.8,6.3,4,2.3],[10.6,4.9,6.3,1.5],[20,5.8,9.7,.45],[24.5,.2,2.1,3.2]];
 for(const [x,z,w,d]of floorRects){for(let zz=z;zz<z+d;zz+=.21){for(let xx=x;xx<x+w;xx+=1.3){box('floor',xx+Math.min(1.28,x+w-xx)/2,.133,zz,Math.min(1.28,x+w-xx),.012,.202,['Oak','Oak light','Oak pale'][Math.floor(rand()*3)]);}}}
 slab(.1,-1.6,29.8,1.5,'Limestone');slab(5.4,6.9,11.6,1.9,'Limestone');slab(.1,7,5.1,6.2,'Gravel');
 for(let x=0;x<30;x+=1.2){box('details',x+.6,.15,-.8,1.18,.01,1.4,'Limestone');}
 for(let i=0;i<4;i++)box('site',12.5,-.025-i*.06,9+i*.33,3.2,.18,.36,'Limestone');
 for(let i=0;i<6;i++)box('site',12.5,.02,10.4+i*.53,1.8,.1,.4,'Limestone');
 for(const xx of [5.6,17,29.7])for(let i=0;i<6;i++)box('site',xx,.02,9.5+i*.6,.48,.1,.44,'Limestone');
 const H=2.8,th=.19;
 function segment(x1,z1,x2,z2,bottom,height,m='Lime plaster',g='walls',depth=th){const len=Math.hypot(x2-x1,z2-z1);if(len<.005)return;return box(g,(x1+x2)/2,bottom+height/2,(z1+z2)/2,len,height,depth,m,-Math.atan2(z2-z1,x2-x1));}
 for(const [x1,z1,x2,z2,type,open=[]] of walls){const len=Math.hypot(x2-x1,z2-z1),dx=(x2-x1)/len,dz=(z2-z1)/len;const p=t=>[x1+dx*t,z1+dz*t];let last=0;for(const [a,b]of open){segment(...p(last),...p(a),.15,H);segment(...p(a),...p(b),type==='window'?2.45:2.35,type==='window'?.5:.6);if(type==='window'){
 segment(...p(a),...p(b),.15,.65);segment(...p(a),...p(b),.82,1.6,'Glass','glazing',.045);for(const t of[a,(a+b)/2,b])box('glazing',...(()=>{const pp=p(t);return[pp[0],1.63,pp[1],.045,1.75,.045]})(),'Metal');segment(...p(a),...p(b),.8,.05,'Metal','glazing',.06);segment(...p(a),...p(b),2.4,.05,'Metal','glazing',.06);
 } else {const pp=p(a+.06);const angle=-Math.atan2(dz,dx)-Math.PI*.38;box('doors',pp[0]+Math.cos(angle)*.43,1.22,pp[1]-Math.sin(angle)*.43,.86,2.15,.045,'Oak',angle);}
 last=b;}segment(...p(last),...p(len),.15,H);segment(x1,z1,x2,z2,H+.15,.065,'Charcoal cap');}
 // Chairs, sofas and joinery are modelled from primitives with softened edges.
 function leg(x,z,h=.45){cyl('furniture',x,.15+h/2,z,.035,h,'Oak dark');}
 function chair(x,z,ry=0){const g=new T.Group();const before=groups.furniture.children.length;box('furniture',0,.62,0,.52,.14,.53,'Cream linen',0,.06);box('furniture',0,.91,-.22,.52,.55,.09,'Oak',0,.04);for(const a of[-.2,.2])for(const b of[-.2,.2])leg(a,b);const arr=groups.furniture.children.slice(before);arr.forEach(q=>g.add(q));g.position.set(x,0,z);g.rotation.y=ry;groups.furniture.add(g);}
 function sofa(x,z,w=2.7,ry=0,m='Cream linen'){const g=new T.Group(),i=groups.furniture.children.length;box('furniture',0,.45,0,w,.45,.9,'Oak dark',0,.07);box('furniture',0,.82,-.4,w,.75,.21,m,0,.09);for(let j=0;j<3;j++){box('furniture',-w/2+.2+(w-.4)*(j+.5)/3,.74,.05,(w-.42)/3,.25,.68,m,0,.07);box('furniture',-w/2+.2+(w-.4)*(j+.5)/3,1,-.25,(w-.42)/3,.43,.15,m,0,.06);}for(const a of[-1,1]){box('furniture',a*(w/2-.1),.82,0,.2,.65,.92,m,0,.06);}groups.furniture.children.slice(i).forEach(q=>g.add(q));g.position.set(x,0,z);g.rotation.y=ry;groups.furniture.add(g);}
 function rug(x,z,w,d){box('furniture',x,.16,z,w,.035,d,'Rug');box('furniture',x,.183,z,w-.12,.014,d-.12,'Rug light');for(let i=0;i<8;i++)box('furniture',x-w/2+.18+i*.045,.194,z,.015,.005,d-.14,'Rug');}
 function table(x,z,w,d){box('furniture',x,.94,z,w,.1,d,'Oak',0,.08);for(const a of[-1,1])for(const b of[-1,1])leg(x+a*(w/2-.15),z+b*(d/2-.15),.78);}
 function coffee(x,z,r=.55){cyl('furniture',x,.57,z,r,.09,'Oak light');cyl('furniture',x,.37,z,.19,.38,'Oak dark');plant(x,z,.18,.65);}
 function plant(x,z,s=.45,base=.15){cyl('landscape',x,base+.18*s,z,.32*s,.4*s,'Terracotta',.39*s);for(let a=0;a<7;a++){const ang=a*2.4;const q=ball('landscape',x+Math.cos(ang)*.24*s,base+.6*s+rand()*.18*s,z+Math.sin(ang)*.24*s,.25*s,a%2?'Leaves':'Light leaves',.6,1.6,.6);q.rotation.z=Math.sin(ang)*.5;}}
 function tree(x,z,s=1){cyl('landscape',x,.9*s,z,.1*s,1.9*s,'Oak dark',.045*s);for(let j=0;j<7;j++){ball('landscape',x+Math.cos(j*2.4)*.55*s,2.25*s+rand()*.5*s,z+Math.sin(j*2.4)*.55*s,.8*s,j%2?'Leaves':'Light leaves',1,.8,1);}}
 rug(2.8,2.1,4.4,3.1);sofa(2.4,.9,2.8);sofa(.95,2.5,2.5,Math.PI/2);coffee(2.9,2.4,.6);chair(4.4,1.8,-.6);chair(4.4,3.2,-.6);
 box('furniture',2.8,.55,4.15,3,.8,.34,'Oak');box('furniture',2.8,1.16,4.17,1.9,.9,.05,'Ink');
 table(7.75,1.75,2.9,1.2);for(let j=0;j<3;j++){chair(6.8+j*.95,.85);chair(6.8+j*.95,2.65,Math.PI);}plant(7.75,1.75,.25,1);
 // Kitchen island, cabinets, cooktop, paired inset sinks and faucet.
 box('furniture',7.7,1.05,4.25,2.9,.92,1.05,'Oak');box('furniture',7.7,1.55,4.25,3.02,.12,1.16,'Stone');
 for(const x of[7.3,7.95]){box('details',x,1.62,4.2,.47,.025,.4,'Steel');box('details',x,1.64,4.2,.36,.02,.3,'Metal');}
 cyl('details',7.65,1.85,4.04,.026,.48,'Steel');for(let j=0;j<3;j++){cyl('furniture',6.8+j*.9,.78,3.35,.25,.13,'Oak');for(const a of[-.12,.12])leg(6.8+j*.9+a,3.35,.62);}
 for(let x=5.75;x<10;x+=.64){box('furniture',x, .68,6.23,.62,1.08,.64,'Oak');box('furniture',x,1.25,6.23,.64,.08,.72,'Stone');box('details',x,.98,5.9,.28,.025,.025,'Metal');}
 box('details',7.8,1.31,6.24,1,.035,.52,'Ink');for(const x of[7.55,8.05])for(const z of[6.11,6.36])cyl('details',x,1.34,z,.1,.018,'Metal');
 box('furniture',5.65,1.35,5.1,.56,2.4,.9,'Stone');box('details',5.31,1.6,5.1,.035,.45,.035,'Steel');
 box('furniture',.65,1.38,5.5,.55,2.5,1.7,'Oak');for(let j=0;j<6;j++)box('details',.98,.45+j*.35,5.5,.2,.035,1.5,'Oak light');table(2.6,6.2,2.7,.6);box('furniture',2.7,1.02,6.22,.7,.025,.42,'Steel');
 // Open planted courtyard and glass perimeter.
 tree(12.65,2.25,.95);for(const [x,z]of[[10.8,.5],[14.7,.6],[10.8,4.1],[14.7,4.1],[11.2,3.8],[14.3,1.4]])plant(x,z,.8);for(let j=0;j<22;j++){const x=10.75+rand()*4,z=.4+rand()*3.8;cyl('landscape',x,.18,z,.12+rand()*.13,.08,'Limestone');}
 rug(17.5,1.9,3.7,2.6);sofa(17.4,.75,2.5);sofa(19.1,2.1,2.25,-Math.PI/2);coffee(17.4,2.1,.55);chair(15.9,2.7,.6);
 table(17.7,4.75,1.8,.7);chair(17.8,5.3,Math.PI);box('details',17.75,1.05,4.7,.62,.04,.4,'Metal');box('details',17.75,1.28,4.5,.62,.43,.04,'Ink');
 box('furniture',19.4,1.35,4.7,.35,2.4,1.4,'Oak');for(let j=0;j<5;j++)box('details',19.16,.4+j*.42,4.7,.2,.035,1.35,'Oak light');
 function bed(x,z,ry=0){const g=new T.Group(),i=groups.furniture.children.length;rug(0,0,2.8,2.6);box('furniture',0,.45,0,1.9,.45,2.25,'Oak',0,.06);box('furniture',0,.79,0,1.86,.3,2.18,'Cream linen',0,.1);box('furniture',0,1.08,-1.1,2.1,1.3,.12,'Oak',0,.06);box('furniture',0,.96,.4,1.9,.06,1.2,'Sage linen',0,.04);for(const a of[-.46,.46])box('furniture',a,1,-.7,.73,.18,.48,'Porcelain',0,.08);for(const a of[-1.25,1.25]){box('furniture',a,.5,-.75,.45,.58,.5,'Oak');cyl('furniture',a,.86,-.75,.13,.2,'Cream linen');}groups.furniture.children.slice(i).forEach(q=>g.add(q));g.position.set(x,0,z);g.rotation.y=ry;groups.furniture.add(g);}
 bed(21.8,1.8,Math.PI/2);bed(19.1,7.6,Math.PI/2);bed(23.65,7.6,-Math.PI/2);bed(28.05,7.5,-Math.PI/2);
 for(const zz of[.5,3.1]){box('furniture',25.5,1.25,zz,2.1,2.2,.52,'Oak');for(let j=0;j<9;j++)box('details',24.65+j*.21,1.3,zz-.28,.025,1.9,.025,'Oak dark');}
 function toilet(x,z){cyl('furniture',x,.5,z,.26,.5,'Porcelain');box('furniture',x,.87,z-.22,.5,.65,.25,'Porcelain',0,.06);ball('furniture',x,.65,z+.12,.29,'Porcelain',1,.2,1.3);}
 function basin(x,z,w=1.2){box('furniture',x,.62,z,w,.9,.5,'Oak');box('furniture',x,1.1,z,w+.04,.1,.58,'Stone');cyl('details',x,1.19,z,.18,.1,'Porcelain');cyl('details',x,1.35,z-.2,.025,.3,'Steel');}
 toilet(27.5,2.5);basin(27.25,.9,.65);box('furniture',29.15,.23,.9,1,.16,1.2,'Stone');box('glazing',28.55,1.2,.95,.035,2.1,1.4,'Glass');cyl('details',29.3,2.38,.5,.13,.035,'Steel');
 toilet(21.55,4.15);basin(22.65,4.05,.8);box('furniture',24.25,.23,4.6,1.3,.12,1.3,'Stone');box('glazing',24.9,1.2,4.6,.035,2.1,1.5,'Glass');
 toilet(26.6,3.85);basin(27.7,5.25,1.3);box('furniture',29.3,.56,4.5,.8,.8,1.8,'Porcelain',0,.16);box('furniture',29.3,.99,4.5,.6,.07,1.55,'Glass',0,.13);
 // Terrace, entry seating, gardens and two genuine 3D cars.
 sofa(6,-.9,2.5);coffee(7.9,-.9,.4);chair(8.7,-.8,-.4);table(21,-.8,2.8,1);for(let j=0;j<3;j++){chair(20+j*.9,-1.55);chair(20+j*.9,-.08,Math.PI);}
 for(const x of[26,28]){box('furniture',x,.45,-.9,.7,.24,1.5,'Oak');box('furniture',x,.62,-1.25,.68,.14,.75,'Cream linen',0,.06);}
 chair(6.3,7.8,.4);chair(8.5,7.8,-.4);coffee(7.4,7.9,.4);
 for(const [x,z]of[[.7,.7],[4.8,.6],[9.8,.6],[.6,3.8],[15.6,.6],[19.3,.6],[20.2,.6],[23.9,3.1],[17.6,6.8],[25.9,8.2],[29.6,6.6],[16.5,6.1],[11,6],[14.8,6],[6,7.1],[16.4,7.1],[1,-1],[10,-1],[24,-1]])plant(x,z,.75);
 for(let j=0;j<45;j++){const x=.25+j*.67;for(const z of[-2.45,12.95]){if(z>12&&x<5.4)continue;ball('landscape',x,.26,z,.35,j%3?'Leaves':'Light leaves',1,.65,1);if(j%3===0)ball('landscape',x,.51,z,.12,'Flower');}}
 for(let j=0;j<23;j++){const z=-2.1+j*.66;for(const x of[-.5,30.5])ball('landscape',x,.29,z,.36,'Light leaves',1,.8,1);}
 for(const [x,z,s]of[[1,-2,.8],[18,-2,.8],[29,-2,.9],[7,11.7,.65],[17.2,11.5,.7],[28.8,11.6,.9]])tree(x,z,s);
 function car(x,z,m){box('furniture',x,.72,z,1.85,.65,4.05,m,0,.23);box('furniture',x,1.19,z-.1,1.62,.6,2.4,m,0,.2);box('furniture',x,1.42,z-.13,1.5,.2,1.6,'Ink',0,.1);for(const zz of[-1.32,1.32])for(const xx of[-.92,.92]){const q=cyl('furniture',x+xx,.48,z+zz,.33,.18,'Ink');q.rotation.z=Math.PI/2;}for(const xx of[-.6,.6])box('details',x+xx,.86,z+2.04,.4,.15,.025,'Porcelain');}
 car(1.45,10.3,'Car green');car(3.8,10.3,'Car white');
 // Batch by category and material. Retain semantic group names for animated construction.
 if(merge){for(const g of Object.values(groups)){g.updateMatrixWorld(true);const batches=new Map();g.traverse(q=>{if(!q.isMesh)return;const geo=q.geometry.index?q.geometry.toNonIndexed():q.geometry.clone();geo.applyMatrix4(q.matrixWorld);geo.deleteAttribute('uv');if(!batches.has(q.material))batches.set(q.material,[]);batches.get(q.material).push(geo);});g.clear();for(const [m,geos]of batches){const geo=mergeGeometries(geos,false);if(!geo)throw Error('Geometry merge failed');const q=new T.Mesh(mergeVertices(geo),m);q.name=g.name+' • '+m.name;q.castShadow=!['site','floor','glazing'].includes(g.name);q.receiveShadow=true;g.add(q);}}}
 root.position.set(-15,0,-4.5);root.userData={source:'Original parametric geometry reconstructed from user drawings',classification:'Image-based architectural concept',north:'-Z',units:'metres',assumedWallHeight:2.8,referenceAnnotations:'30 m × 12 m; not verified internal area',bedrooms:4};
 return root;
}
