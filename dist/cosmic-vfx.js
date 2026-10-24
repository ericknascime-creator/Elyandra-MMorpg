const TAU=Math.PI*2,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const COSMIC_STYLES=[
 {id:'blackhole',name:'Horizonte de Eventos',short:'Buraco negro',color:'#ffca7d',secondary:'#ab77ff',price:0,description:'Núcleo escuro, anel gravitacional e espirais de acreção.'},
 {id:'quasar',name:'Quasar de Asterion',short:'Quasar',color:'#63eaff',secondary:'#e783ff',price:45000,description:'Dois jatos opostos de plasma e um disco de energia em rotação.'},
 {id:'supernova',name:'Coroa da Supernova',short:'Supernova',color:'#ffc673',secondary:'#ff688e',price:75000,description:'Coroa estelar com ondas que se expandem suavemente e filamentos solares.'},
 {id:'neutron',name:'Pulsar de Nêutrons',short:'Estrela de nêutrons',color:'#afcfff',secondary:'#57fff0',price:60000,description:'Estrela compacta, campo magnético e feixes que varrem o próprio eixo.'}
];
export function cosmicProfile(rank,style='blackhole',economy=false){const r=clamp(Math.floor(Number(rank)||0),0,500),d=COSMIC_STYLES.find(d=>d.id===style)||COSMIC_STYLES[0],p=r/500;return{...d,rank:r,stage:Math.min(5,Math.floor(r/100)),strength:r?.22+.78*p:0,radius:12+33*p,height:84+60*p,particles:r?(economy?8:Math.min(32,8+Math.floor(r/20))):0,orbitCount:r?(economy?2:2+Math.floor(r/125)):0};}
export function initCosmicStyle(p){p.magicula||={rank:0};p.cosmicStyles||=['blackhole'];if(p.localRole==='gm')p.cosmicStyles=COSMIC_STYLES.map(d=>d.id);if(!COSMIC_STYLES.some(d=>d.id===p.magicula.style))p.magicula.style='blackhole';}
export function cosmicStyleQuote(p,id){const d=COSMIC_STYLES.find(x=>x.id===id);if(!d)return{ok:false,reason:'Estilo inválido.'};const owned=id==='blackhole'||p.localRole==='gm'||p.cosmicStyles?.includes(id);return{ok:true,owned,price:owned?0:d.price,style:d};}
export function applyCosmicStyle(p,id,inCombat=false){const q=cosmicStyleQuote(p,id);if(inCombat)return{ok:false,reason:'Saia de combate para trocar o estilo.'};if(!q.ok)return q;if((p.wallet?.cash||0)<q.price)return{ok:false,reason:'Cash insuficiente.'};initCosmicStyle(p);if(q.price)p.wallet.cash-=q.price;p.cosmicStyles=[...new Set([...p.cosmicStyles,id])];p.magicula.style=id;return{ok:true,price:q.price};}
const ellipse=(g,x,y,rx,ry,rotation=0,start=0,end=TAU)=>{g.beginPath();g.ellipse(x,y,rx,ry,rotation,start,end);g.stroke();};
function bloom(g,x,y,r,color,alpha){const glow=g.createRadialGradient(x,y,0,x,y,r);glow.addColorStop(0,'#ffffff');glow.addColorStop(.08,color);glow.addColorStop(.25,color+'88');glow.addColorStop(1,color+'00');g.fillStyle=glow;g.globalAlpha=alpha;g.fillRect(x-r,y-r,r*2,r*2);}
function jet(g,x,y,length,width,angle,color,strength,time){g.save();g.translate(x,y);g.rotate(angle);const gradient=g.createLinearGradient(0,0,0,-length);gradient.addColorStop(0,'#f5ffff');gradient.addColorStop(.15,color+'e0');gradient.addColorStop(.7,color+'55');gradient.addColorStop(1,color+'00');g.fillStyle=gradient;g.globalAlpha=strength*.6;g.beginPath();g.moveTo(-width*.3,0);g.bezierCurveTo(-width*.5,-length*.4,-width,-length*.75,-width*1.25,-length);g.lineTo(width*1.25,-length);g.bezierCurveTo(width,-length*.75,width*.5,-length*.4,width*.3,0);g.fill();for(let i=0;i<3;i++){const q=(time*.32+i/3)%1;g.strokeStyle='#e9ffff';g.lineWidth=.6;g.globalAlpha=Math.sin(q*Math.PI)*strength*.7;g.beginPath();g.moveTo(Math.sin(q*9+time)*width*.25,-q*length);g.lineTo(Math.sin(q*9+time)*width*.25,-q*length-12);g.stroke();}g.restore();}
export function drawCosmicPhenomenon(g,rank,time,front=false,style='blackhole',economy=false){const p=cosmicProfile(rank,style,economy);if(!p.rank)return;const {radius:r,strength:s,color,secondary}=p,cy=-p.height*.82;
 g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=color;
 if(!front){
  bloom(g,0,cy,r*2.5,secondary,s*.38);
  if(p.id==='blackhole'){
   g.save();g.translate(0,cy);g.rotate(-.28);g.scale(1,.32);const disk=g.createRadialGradient(0,0,r*.25,0,0,r*2.05);disk.addColorStop(0,color+'00');disk.addColorStop(.16,color+'00');disk.addColorStop(.28,'#fff6cddd');disk.addColorStop(.36,'#ffca7dcc');disk.addColorStop(.55,secondary+'88');disk.addColorStop(1,secondary+'00');g.fillStyle=disk;g.globalAlpha=s*.8;g.fillRect(-r*2.05,-r*2.05,r*4.1,r*4.1);g.restore();

   g.save();g.translate(0,cy);g.rotate(-.28);for(let n=0;n<p.orbitCount;n++){g.strokeStyle=n%2?secondary:color;g.lineWidth=n===0?3:1;g.globalAlpha=s*(.42+n*.06);ellipse(g,0,0,r*(1.1+n*.14),r*(.30+n*.055),0,time*(n%2?-.2:.15)+n, time*(n%2?-.2:.15)+n+Math.PI*1.5);}g.restore();
   // Event horizon sits behind the head, never over the face/name pass.
   g.save();g.globalCompositeOperation='source-over';g.globalAlpha=.94;g.fillStyle='#03050e';g.beginPath();g.arc(0,cy,r*.47,0,TAU);g.fill();g.restore();
   bloom(g,0,cy,r*.78,color,s*.5);g.save();g.globalCompositeOperation='source-over';g.globalAlpha=1;g.fillStyle='#02030b';g.beginPath();g.arc(0,cy,r*.43,0,TAU);g.fill();g.restore();g.strokeStyle='#fff0c7';g.lineWidth=1.5;g.globalAlpha=s;ellipse(g,0,cy,r*.52,r*.52);g.strokeStyle=color;g.lineWidth=3;g.globalAlpha=s*.35;ellipse(g,0,cy,r*.61,r*.61);
   for(let n=0;n<p.particles;n++){const q=(time*.1+n*.618)%1,a=n*2.399+time*.3+q*4,rr=r*(1.9-q*1.3),x=Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.32;g.globalAlpha=Math.sin(q*Math.PI)*s*.8;g.strokeStyle=n%3?color:secondary;g.lineWidth=.8;g.beginPath();g.moveTo(x,y);g.lineTo(x-Math.sin(a)*5,y+Math.cos(a)*2);g.stroke();}
  }else if(p.id==='quasar'){
   jet(g,0,cy,35+r*1.4,3+r*.12,-.45,color,s,time);jet(g,0,cy,28+r,3+r*.10,Math.PI-.45,secondary,s*.7,time);
   for(let n=0;n<p.orbitCount;n++){g.globalAlpha=s*(.28+n*.07);g.strokeStyle=n%2?secondary:color;g.lineWidth=1.5;ellipse(g,0,cy,r*(.7+n*.18),r*(.22+n*.04),-.2,time*.15+n,time*.15+n+Math.PI*1.65);}bloom(g,0,cy,8+r*.4,color,s*.95);
  }else if(p.id==='supernova'){
   bloom(g,0,cy,r*1.3,color,s*.75);for(let n=0;n<3;n++){const q=(time*.1+n/3)%1;g.globalAlpha=Math.sin(q*Math.PI)*s*.65;g.strokeStyle=n%2?secondary:color;g.lineWidth=(1-q)*2+.4;ellipse(g,0,cy,r*(.6+q*1.5),r*(.6+q*1.5));}
   for(let n=0;n<p.particles;n++){const a=n*TAU/p.particles+time*.06,wave=.8+.2*Math.sin(time*.8+n*1.4);g.globalAlpha=s*.6;g.strokeStyle=n%3?color:'#fff7dc';g.lineWidth=.8;g.beginPath();g.moveTo(Math.cos(a)*r*.45,cy+Math.sin(a)*r*.45);g.quadraticCurveTo(Math.cos(a+.12)*r*wave,cy+Math.sin(a+.12)*r*wave,Math.cos(a)*r*(1.1+.12*Math.sin(time+n)),cy+Math.sin(a)*r*(1.1+.12*Math.sin(time+n)));g.stroke();}
  }else{
   const rotation=time*.42;jet(g,0,cy,30+r,2+r*.08,rotation,color,s*.8,time);jet(g,0,cy,30+r,2+r*.08,rotation+Math.PI,secondary,s*.8,time);
   for(let n=0;n<p.orbitCount;n++){g.strokeStyle=n%2?secondary:color;g.globalAlpha=s*.5;g.lineWidth=.8;ellipse(g,0,cy,r*(.7+n*.12),r*(.25+n*.05),rotation+n*Math.PI/3);}bloom(g,0,cy,10+r*.3,color,s*(.8+.1*Math.sin(time*1.2)));
  }
 }
 // Ground seal and rising filaments connect the phenomenon to the player's own energy.
 for(let n=0;n<(economy?6:12);n++){const a=n*TAU/(economy?6:12)+time*.12;if((Math.sin(a)>0)!==front)continue;const x=Math.cos(a)*(24+r*.7),q=(time*.12+n*.618)%1,y=4-q*(p.height*.65);g.globalAlpha=Math.sin(q*Math.PI)*s*.65;g.strokeStyle=n%2?color:secondary;g.lineWidth=.8;g.beginPath();g.moveTo(x*(1-q*.5),y);g.quadraticCurveTo(x+Math.sin(time+n)*3,y-12,x*(1-q*.4),y-22);g.stroke();}
 g.strokeStyle=color;g.globalAlpha=s*.6;g.lineWidth=1;ellipse(g,0,4,25+r*.7,10+r*.22,0,front?0:Math.PI,front?Math.PI:TAU);
 g.restore();}
