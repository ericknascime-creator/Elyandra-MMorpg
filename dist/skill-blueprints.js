import {stamp,glint} from './fantasy-vfx.js?v=22';
const TAU=Math.PI*2;
export const CLASS_VFX={VIG:{color:'#73ffc0',shape:'arrow'},ESP:{color:'#d68bff',shape:'daggers'},ARC:{color:'#89dbff',shape:'lance'},BAS:{color:'#ffd37a',shape:'shield'},RUP:{color:'#ffab73',shape:'quake'},DUE:{color:'#a5f8ff',shape:'cross'},LAS:{color:'#c39bff',shape:'crescent'}};
export function skillBlueprint(classId,index,skill){const style=CLASS_VFX[classId];return{...style,classId,index,kind:skill.kind,damage:skill.coef>0,name:skill.name,windup:skill.cast||.12,flight:['shot','spell','dispel','rune'].includes(skill.kind),duration:index===6?1.2:.7,rays:Math.min(16,6+index),radius:index===6?80:32+index*4,impact:skill.coef>0?'dano após trajetória':'suporte no personagem',stun:skill.stun||0};}
function crystal(g,x,y,length,angle,color,alpha){g.save();g.translate(x,y);g.rotate(angle);g.globalAlpha=alpha;const grad=g.createLinearGradient(0,-length,4,0);grad.addColorStop(0,'#efffff');grad.addColorStop(.35,color);grad.addColorStop(1,color+'00');g.fillStyle=grad;g.beginPath();g.moveTo(0,-length);g.lineTo(3,0);g.lineTo(0,5);g.lineTo(-3,0);g.closePath();g.fill();g.restore();}
export function drawProjectile(g,a,b,q,color,arrow=false,size=1){const dx=b.x-a.x,dy=b.y-a.y,angle=Math.atan2(dy,dx),x=a.x+dx*q,y=a.y+dy*q-22,width=(arrow?58:72)*size,tail=width*.30;g.save();g.globalCompositeOperation='screen';stamp(g,arrow?1:2,x-Math.cos(angle)*tail,y-Math.sin(angle)*tail,width,arrow?26*size:40*size,angle,color,.90);g.strokeStyle=color;g.globalAlpha=.6;g.lineWidth=arrow?1.2:2;g.beginPath();g.moveTo(x-Math.cos(angle)*18*size,y-Math.sin(angle)*18*size);g.lineTo(x,y);g.stroke();glint(g,x,y,arrow?2.2:3.2,color,.85);g.restore();}
export function drawContactImpact(g,x,y,q,color,classId='ARC',index=0){const fade=Math.sin(Math.min(1,q)*Math.PI),scale=index===6?1.7:1;g.save();g.translate(x,y-22);g.globalCompositeOperation='screen';stamp(g,3,0,0,(26+q*36)*scale,(26+q*36)*scale,q*.25,color,fade*.85);const count=classId==='RUP'?10:classId==='VIG'?5:8;for(let n=0;n<count;n++){const a=n*TAU/count+index*.31,dist=(5+q*22)*scale;crystal(g,Math.cos(a)*dist,Math.sin(a)*dist*.7,(3+(1-q)*9)*scale,a+Math.PI/2,color,fade*.7);}if(classId==='ESP'||classId==='DUE'){g.globalAlpha=fade;g.strokeStyle=color;g.lineWidth=1;for(const side of [-1,1]){g.beginPath();g.moveTo(-16*scale,-10*scale*side);g.lineTo(16*scale,10*scale*side);g.stroke();}}g.restore();}
function slash(g,x,y,q,color,rotation=0,scale=1,reverse=false){g.save();g.translate(x,y-22);g.rotate(rotation);g.scale(reverse?-1:1,1);stamp(g,4,0,0,(60+q*34)*scale,(37+q*22)*scale,-.2+q*.30,color,Math.sin(q*Math.PI)*.78);g.strokeStyle=color;g.lineWidth=(1-q)*2+.4;g.globalAlpha=Math.sin(q*Math.PI)*.6;g.beginPath();g.ellipse(0,0,(27+q*13)*scale,(13+q*5)*scale,-.3,-1.4+q*.8,1.8+q*.8);g.stroke();g.restore();}
export function drawSkillBlueprint(g,fx,a,b,time){const p=fx.blueprint;if(!p)return;const q=Math.max(0,Math.min(1,1-fx.life/fx.max)),color=p.color,dx=b.x-a.x,dy=b.y-a.y,angle=Math.atan2(dy,dx),scale=p.index===6?1.4:1;
 if(p.flight){drawProjectile(g,a,b,q,color,p.classId==='VIG',scale);return;}
 g.save();g.globalCompositeOperation='screen';
 if(!p.damage){const fade=Math.sin(q*Math.PI);stamp(g,5,a.x,a.y,54,24,time*.10,color,fade*.65);for(const side of [-1,1]){stamp(g,6,a.x+side*18,a.y-30-q*25,13,58,side*.2,color,fade*.6);glint(g,a.x+side*18,a.y-45-q*20,2.5,color,fade);}g.restore();return;}
 if(p.classId==='ARC'&&['nova','storm'].includes(p.kind)){
  const radius=(18+q*45)*scale;stamp(g,5,a.x,a.y,radius*2,radius*.8,-time*.07,color,(1-q)*.4);
  for(let n=0;n<p.rays;n++){const aa=n*TAU/p.rays+p.index*.2,rr=radius*(.45+.2*Math.sin(n*2.4)),x=a.x+Math.cos(aa)*rr,y=a.y+Math.sin(aa)*rr*.43;crystal(g,x,y-5,8+Math.sin(q*Math.PI)*26,Math.sin(aa)*.35,color,Math.sin(q*Math.PI)*.8);}
 }else if(p.classId==='RUP'){
  slash(g,a.x+dx*.4,a.y+dy*.4,q,color,angle*.3,1.2*scale);g.strokeStyle=color;g.globalAlpha=Math.sin(q*Math.PI)*.6;g.lineWidth=1.5;for(let n=0;n<4;n++){g.beginPath();g.moveTo(a.x,a.y);for(let k=1;k<=4;k++)g.lineTo(a.x+Math.cos(angle+(n-1.5)*.3)*k*15*q+Math.sin(k*3+n)*3,a.y+Math.sin(angle+(n-1.5)*.3)*k*8*q+k*2);g.stroke();}
 }else if(p.classId==='ESP'||p.classId==='DUE'){
  slash(g,a.x+dx*.55,a.y+dy*.55,Math.min(1,q*1.4),color,angle+.2,scale);if(q>.15)slash(g,a.x+dx*.6,a.y+dy*.6,(q-.15)/.85,color,angle-.6,scale,true);
 }else if(p.classId==='LAS'){
  slash(g,a.x+dx*.45,a.y+dy*.45,q,color,angle-.25,1.2*scale);for(let n=0;n<5;n++){const aa=time*.25+n*TAU/5;glint(g,b.x+Math.cos(aa)*q*28,b.y-24+Math.sin(aa)*q*13,1.7,color,Math.sin(q*Math.PI)*.65);}
 }else if(p.classId==='BAS'){
  slash(g,a.x+dx*.4,a.y+dy*.4,q,color,angle,.9*scale);stamp(g,5,a.x,a.y-8,45,55,-q*.2,color,Math.sin(q*Math.PI)*.45);
 }else slash(g,a.x+dx*.45,a.y+dy*.45,q,color,angle,scale);
 g.restore();}
export function renderFantasyEffect(g,fx,project,t,economy=false){const q=Math.max(0,Math.min(1,1-fx.life/fx.max)),a=project(fx.x,fx.y),color=fx.color||'#9bdfff';
 if(fx.type==='classSkill'){const b=project(fx.target?.hp>0?fx.target.x:(fx.tx??fx.x),fx.target?.hp>0?fx.target.y:(fx.ty??fx.y));drawSkillBlueprint(g,fx,a,b,t);return true;}
 if(['arrow','bolt'].includes(fx.type)){const start=project(fx.sx,fx.sy),end=project(fx.target?.hp>0?fx.target.x:fx.tx,fx.target?.hp>0?fx.target.y:fx.ty);drawProjectile(g,start,end,q,color,fx.type==='arrow');return true;}
 if(fx.type==='impact'){drawContactImpact(g,a.x,a.y,q,color,fx.classId,fx.skillIndex);return true;}
 if(fx.type==='slash'){const b=project(fx.tx??fx.x,fx.ty??fx.y);slash(g,a.x+(b.x-a.x)*.35,a.y+(b.y-a.y)*.35,q,color,Math.atan2(b.y-a.y,b.x-a.x)*.4,.8);return true;}
 if(fx.type==='sigil'||fx.type==='ring'||fx.type==='ascend'){g.save();g.globalCompositeOperation='screen';stamp(g,5,a.x,a.y,(45+q*26)*(fx.ultimate?1.5:1),21+q*13,t*.08,color,(1-q)*.42);if(fx.type==='ascend')for(let n=0;n<8;n++){const aa=n*TAU/8;glint(g,a.x+Math.cos(aa)*24,a.y-q*75+Math.sin(aa)*8,2,color,Math.sin(q*Math.PI));}g.restore();return true;}
 if(fx.type==='nova'){return true;}// Class-specific area geometry is already drawn by classSkill; contact has its own impact.
 if(fx.type==='channel')return true;
 if(fx.type==='spark'){const angle=fx.angle||0;glint(g,a.x+Math.cos(angle)*q*20,a.y-22+Math.sin(angle)*q*13,1.7,color,1-q);return true;}
 if(fx.type==='storm'){g.save();g.globalCompositeOperation='screen';for(let n=0;n<(economy?3:6);n++){const phase=(q*2+n*.17)%1,aa=n*2.399,x=a.x+Math.cos(aa)*40,y=a.y+Math.sin(aa)*18;stamp(g,2,x,y-45+phase*32,38,12,Math.PI/2,color,Math.sin(phase*Math.PI)*.65);if(phase>.72)drawContactImpact(g,x,y,(phase-.72)/.28,color,'ARC',2);}g.restore();return true;}
 if(fx.type==='dashtrail'){const b=project(fx.tx,fx.ty);g.save();g.globalCompositeOperation='screen';g.strokeStyle=color;g.globalAlpha=(1-q)*.5;g.lineWidth=1.4;for(let n=0;n<2;n++){g.beginPath();g.moveTo(a.x,a.y-20+n*5);g.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2-30,b.x,b.y-20+n*5);g.stroke();}g.restore();return true;}
 return false;}
