import {STYLES,ascensionTier} from './ascension.js?v=7';
const TAU=Math.PI*2;
export function drawAscension(g,wings,aura,t){
 if(aura?.rank&&aura.visible!==false){
  const r=Math.min(50,aura.rank),tier=ascensionTier(r),c=r<10?'#ffffff':STYLES[aura.style]?.color||tier.color,stage=Math.floor(r/10),radius=20+r*.42;
  g.save();g.translate(0,2);g.strokeStyle=c;g.shadowColor=c;g.shadowBlur=r>=40?10:r>=20?5:0;g.lineWidth=.8+r*.025;
  const glow=g.createRadialGradient(0,0,2,0,0,radius*1.7);glow.addColorStop(0,c+'44');glow.addColorStop(1,c+'00');g.fillStyle=glow;g.fillRect(-radius*1.7,-radius*.7,radius*3.4,radius*1.4);
  for(let layer=0;layer<Math.min(4,1+stage);layer++){g.save();g.scale(1,.36);g.rotate(t*(layer%2?-.45:.3));const rad=radius*(1-layer*.16);g.globalAlpha=.55;g.beginPath();g.arc(0,0,rad,0,TAU);g.stroke();const n=6+stage*2;for(let j=0;j<n;j++){const a=j*TAU/n;g.save();g.rotate(a);g.beginPath();g.moveTo(rad*.83,-2);g.lineTo(rad,0);g.lineTo(rad*.83,2);g.stroke();g.restore();}if(stage>=2){g.beginPath();for(let j=0;j<=6;j++){const a=j*TAU/6;g.lineTo(Math.cos(a)*rad*.77,Math.sin(a)*rad*.77);}g.stroke();}g.restore();}
  g.shadowBlur=0;for(let j=0;j<Math.min(18,3+Math.ceil(r/3));j++){const a=t*.65+j*2.4,h=(t*(14+stage*2)+j*11)%85;g.fillStyle=j%3===0?'#fffaff':c;g.globalAlpha=(1-h/85)*.85;g.beginPath();g.arc(Math.cos(a)*radius,-h,.7+stage*.13,0,TAU);g.fill();}
  if(stage>=4){g.globalAlpha=.45;g.strokeStyle=c;g.beginPath();g.ellipse(0,-100+Math.sin(t*2)*2,16,5,t*.15,0,TAU);g.stroke();}
  g.restore();
 }
 if(wings?.rank&&wings.visible!==false){
  const r=Math.min(50,wings.rank),tier=ascensionTier(r),c=r<10?'#ffffff':STYLES[wings.style]?.color||tier.color,stage=Math.floor(r/10),size=27+r*.55;
  g.save();g.translate(0,-55+Math.sin(t*1.9)*1.5);
  for(const side of [-1,1]){g.save();g.scale(side,1);g.rotate(-.07+Math.sin(t*1.9)*(.065+stage*.004));
   const layers=stage>=5?3:stage>=3?2:1;
   for(let layer=layers-1;layer>=0;layer--){g.save();g.rotate(layer*.38);g.scale(1-layer*.12,1-layer*.12);g.shadowColor=c;g.shadowBlur=stage>=4?9:stage>=2?4:0;
    const grad=g.createLinearGradient(4,5,size,-45);grad.addColorStop(0,'#081222');grad.addColorStop(.3,c+'55');grad.addColorStop(.7,c+'dd');grad.addColorStop(1,'#f2ffff');g.fillStyle=grad;g.strokeStyle=c;g.lineWidth=.7;
    const count=6+Math.min(stage,4);for(let n=count-1;n>=0;n--){const q=n/(count-1),tipX=size*(.5+q*.8),tipY=-49+q*48-Math.sin(t*2-n*.4)*2,rootY=5+q*15;
     g.beginPath();g.moveTo(5,rootY);g.bezierCurveTo(size*.3,-14,tipX*.76,tipY-8,tipX,tipY);g.lineTo(tipX-5-q*6,tipY+14);g.bezierCurveTo(tipX*.5,tipY+20,14,rootY+9,5,rootY);g.fill();g.stroke();
     if(stage>=1){g.strokeStyle=n%2?'#f5ffffcc':c;g.beginPath();g.moveTo(8,rootY);g.lineTo(tipX-3,tipY+4);g.stroke();g.strokeStyle=c;}
     if(stage>=3){g.fillStyle=n%2?'#ff46ee':c;g.beginPath();g.arc(tipX-5,tipY+5,1.4,0,TAU);g.fill();g.fillStyle=grad;}
    }
    g.restore();
   }
   g.shadowBlur=0;if(stage>=2){g.strokeStyle=c;g.globalAlpha=.5;g.beginPath();g.moveTo(9,10);g.bezierCurveTo(size*1.3,-25,size*.9,35+Math.sin(t*2)*5,size*.4,43);g.stroke();}
   for(let n=0;n<Math.min(10,stage*2);n++){const a=t*1.5+n*2.4;g.globalAlpha=.5+.3*Math.sin(a);g.fillStyle=n%3?'#ffffff':c;g.beginPath();g.arc(20+Math.cos(a)*size*.75,-15+Math.sin(a)*33,1,0,TAU);g.fill();}
   g.restore();
  }g.restore();
 }
}
