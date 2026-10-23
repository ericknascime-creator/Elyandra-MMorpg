import {KITS} from './skills.js?v=12';
import {resolveStrike,basicInterval} from './combat.js?v=12';
// Bounded offline model. Stationary single targets, no pathing or player decisions.
export function seededRandom(seed=1){let n=seed>>>0;return ()=>{n=(Math.imul(1664525,n)+1013904223)>>>0;return n/4294967296;};}
export function simulateDuel(a,b,{seed=1,seconds=90}={}){
 const rng=seededRandom(seed),fighters=[a,b].map(x=>({id:x.classId,st:x.stats,hp:x.stats.hp,mp:x.stats.mp,cd:Array(7).fill(0),basic:0,lock:0,stun:0,shield:0,damage:0,hits:0,criticals:0}));let elapsed=0;
 for(let step=0;step<Math.min(1800,seconds*20);step++){
 elapsed=(step+1)/20;const strikes=[];
 for(let n=0;n<2;n++){const f=fighters[n],target=fighters[1-n];f.basic-=.05;f.lock-=.05;f.stun=Math.max(0,f.stun-.05);f.mp=Math.min(f.st.mp,f.mp+f.st.mp*.01*.05);f.cd=f.cd.map(v=>Math.max(0,v-.05));if(f.stun||f.lock>0)continue;
 const kit=KITS[f.id],index=kit.findIndex((sk,i)=>i!==6&&sk.coef>0&&f.cd[i]<=0&&f.mp>=sk.cost);
 if(index>=0){const sk=kit[index];f.cd[index]=sk.cd*(1-f.st.cdr);f.mp-=sk.cost;f.lock=(sk.cast||0)+.4;strikes.push({n,index,coefficient:sk.coef*(sk.kind==='storm'?3:1),stun:sk.stun||0});}
 else if(f.basic<=0){f.basic+=basicInterval(f.st);f.lock=.2;strikes.push({n,index:null,coefficient:1,stun:0});}
 }
 // Apply a frame simultaneously; no side receives a first-strike advantage.
 for(const action of strikes){const f=fighters[action.n],target=fighters[1-action.n];const hit=resolveStrike(f.st,f.id,target.st,{index:action.index,coefficient:action.coefficient,pvp:true,rng});f.hits+=!hit.miss;f.criticals+=hit.critical?1:0;f.damage+=Math.min(target.hp,hit.value);target.hp=Math.max(0,target.hp-hit.value);if(!hit.miss)target.stun=Math.max(target.stun,Math.min(.8,action.stun)*(1-(target.st.ten||0)));}
 if(fighters.some(f=>f.hp<=0))break;
 }
 return {winner:fighters[0].hp<=0&&fighters[1].hp<=0?null:fighters[0].hp<=0?b.classId:fighters[1].hp<=0?a.classId:null,elapsed,timeout:fighters.every(f=>f.hp>0),fighters:fighters.map(f=>({classId:f.id,hp:Math.round(f.hp),damage:Math.round(f.damage),hits:f.hits,criticals:f.criticals}))};
}
export function sensitivity(st,classId,index,target={def:3000,level:250}){
 const base=resolveStrike(st,classId,target,{index,expected:true}).value;
 return Object.fromEntries(['af','am','critRaw','critd','ampF','ampM','penF','penM','acc'].map(key=>{const amount=['critRaw','critd','ampF','ampM'].includes(key)?.10:100;const v=resolveStrike({...st,[key]:st[key]+amount},classId,target,{index,expected:true}).value;return [key,{amount,base,after:v,gain:v-base}];}));
}
