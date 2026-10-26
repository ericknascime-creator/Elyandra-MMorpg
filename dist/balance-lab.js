import {KITS} from './skills.js?v=26';
import {resolveStrike,basicInterval} from './combat.js?v=26';
import {skillGrowth} from './skill-growth.js?v=26';
export function seededRandom(seed=1){let n=seed>>>0;return()=>{n=(Math.imul(1664525,n)+1013904223)>>>0;return n/4294967296;};}
// Deterministic 1D diagnostic, not a multiplayer server or a human-player balance certificate.
export function simulateDuel(a,b,{seed=1,seconds=90,movement=true,qualityA=1,qualityB=1}={}){
 const rng=seededRandom(seed),fighters=[a,b].map((x,i)=>({id:x.classId,st:x.stats,hp:x.stats.hp,mp:x.stats.mp,cd:Array(7).fill(0),basic:0,lock:0,stun:0,shield:0,damage:0,hits:0,criticals:0,x:i?7:0,quality:i?qualityB:qualityA,buffs:{},pending:[]}));let elapsed=0;
 for(let step=0;step<Math.min(1800,seconds*20);step++){
 elapsed=(step+1)/20;const strikes=[];
 for(let n=0;n<2;n++){
 const f=fighters[n],t=fighters[1-n],dt=.05,kit=KITS[f.id];f.basic-=dt;f.lock-=dt;f.stun=Math.max(0,f.stun-dt);f.mp=Math.min(f.st.mp,f.mp+f.st.mp*.01*dt);f.cd=f.cd.map(v=>Math.max(0,v-dt));for(const key of Object.keys(f.buffs))f.buffs[key]-=dt;
 for(const action of f.pending){action.left-=dt;if(action.left<=0)strikes.push({...action,n});}f.pending=f.pending.filter(x=>x.left>0);
 if(f.stun||f.lock>0)continue;const distance=Math.abs(t.x-f.x),direction=Math.sign(t.x-f.x)||1;
 if(movement){const desired=f.st.range>=5?Math.min(f.id==='ARC'?4.8:7,f.st.range*.8):1.8;if(distance>desired+.3)f.x+=direction*f.st.speed*dt;else if(distance<desired-.5&&f.st.range>=5)f.x-=direction*f.st.speed*dt*.8;}
 // Defense/buff actions consume time and mana like attacks, with real expiry.
 const support=kit.findIndex((sk,i)=>i!==6&&!sk.coef&&f.cd[i]<=0&&['crit','haste','amp','barrier','fortress','cloak','dance','guard','parry','iron','blink','backstep','break'].includes(sk.kind)&&(sk.shield||['guard','parry','iron','cloak','blink','backstep','break'].includes(sk.kind)?f.hp<f.st.hp*.70:true));
 if(support>=0){const sk=kit[support],rank=skillGrowth(f.st['skillRank'+support]);if(f.mp>=Math.ceil(sk.cost*rank.mana)){f.mp-=Math.ceil(sk.cost*rank.mana);f.cd[support]=Math.max(5,sk.cd*(1-f.st.cdr));f.lock=.4;if(['blink','backstep','break'].includes(sk.kind)){f.x-=direction*3;if(f.id==='ARC')f.shield=f.st.hp*.08;}if(sk.shield)f.shield=f.st.hp*sk.shield*rank.potency;f.buffs[sk.kind]=sk.duration||2;continue;}}
 const usable=kit.map((sk,i)=>({sk,i})).filter(({sk,i})=>sk.coef>0&&f.cd[i]<=0&&f.mp>=Math.ceil(sk.cost*skillGrowth(f.st['skillRank'+i]).mana)&&distance<=sk.range);
 usable.sort((a,b)=>a.i===6?1:b.i===6?-1:(b.sk.coef/(.4+(b.sk.cast||0)))-(a.sk.coef/(.4+(a.sk.cast||0))));const action=usable[0];
 if(action&&rng()<=f.quality){const {sk,i}=action;f.cd[i]=sk.cd*(1-f.st.cdr);f.mp-=Math.ceil(sk.cost*skillGrowth(f.st['skillRank'+i]).mana);f.lock=(sk.cast||0)+.4;
 if(sk.kind==='dash')f.x=t.x-direction*1.4;
 f.pending.push({left:(sk.cast||0)+(['spell','shot','rune','dispel'].includes(sk.kind)?Math.min(.5,distance/25):.2),index:i,coefficient:sk.coef*(sk.kind==='storm'?3:1),stun:sk.stun||0});}
 else if(f.basic<=0&&distance<=f.st.range){f.basic=basicInterval(f.st,{haste:f.buffs.haste>0,dance:f.buffs.dance>0});f.lock=.2;f.pending.push({left:Math.min(.4,.1+distance/25),index:null,coefficient:1,stun:0});}
 else if(!action)f.lock=.05;
 }
 for(const x of strikes){const f=fighters[x.n],t=fighters[1-x.n];const hit=resolveStrike(f.st,f.id,t.st,{index:x.index,coefficient:x.coefficient,pvp:true,rng,critBonus:f.buffs.crit>0?.12:0,ampBonus:f.buffs.amp>0?.15:0});let damage=hit.value*(t.buffs.guard>0?.6:1)*(t.buffs.iron>0?.5:1)*(t.buffs.parry>0?.4:1);const absorb=Math.min(t.shield,damage);t.shield-=absorb;damage-=absorb;f.hits+=!hit.miss;f.criticals+=hit.critical?1:0;f.damage+=Math.min(t.hp,damage);t.hp=Math.max(0,t.hp-damage);if(!hit.miss)t.stun=Math.max(t.stun,Math.min(.8,x.stun)*(1-t.st.ten));}
 if(fighters.some(f=>f.hp<=0))break;
 }
 return{winner:fighters[0].hp<=0&&fighters[1].hp<=0?null:fighters[0].hp<=0?b.classId:fighters[1].hp<=0?a.classId:null,elapsed,timeout:fighters.every(f=>f.hp>0),fighters:fighters.map(f=>({classId:f.id,hp:Math.round(f.hp),damage:Math.round(f.damage),hits:f.hits,criticals:f.criticals}))};
}
export function sensitivity(st,classId,index,target={def:6500,level:1000}){const base=resolveStrike(st,classId,target,{index,expected:true}).value;return Object.fromEntries(['af','am','critRaw','critd','ampF','ampM','penF','penM','acc'].map(key=>{const amount=['critRaw','critd','ampF','ampM'].includes(key)?.1:100,v=resolveStrike({...st,[key]:st[key]+amount},classId,target,{index,expected:true}).value;return[key,{amount,base,after:v,gain:v-base}];}));}
