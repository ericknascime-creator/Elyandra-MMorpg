import {writeFileSync,readFileSync} from 'node:fs';
import {rotationPower} from '../dist/power-model.js?v=24';
import {resolveStrike,damageReduction} from '../dist/combat.js?v=24';
const classes=['VIG','ARC','RUP','LAS'];
const reference={hp:1000000,mp:100000,af:100000,am:100000,def:20000,critRaw:.5,crit:.5,maxcrit:.85,critd:4,haste:.5,interval:.8,ampF:1,ampM:1,penF:6000,penM:6000,acc:1500,evasion:1000,critres:.15,critdres:.3,ampres:.2,dr:400,cdr:.1,ten:.1,pvp:.1,ignoreAmpRes:.05,ignoreCritRes:.05};for(let i=0;i<7;i++)reference['skillRank'+i]=20;
const metric=(st,id)=>{const offense=rotationPower({...st,critRaw:Math.max(0,st.critRaw-Math.max(0,.15-st.ignoreCritRes)),ampF:Math.max(0,st.ampF-Math.max(0,.2-st.ignoreAmpRes)),ampM:Math.max(0,st.ampM-Math.max(0,.2-st.ignoreAmpRes))},id).dps;const incoming=(1-damageReduction(st.def,6000))*(1+Math.max(0,.5-st.critres)*(Math.max(1.2,2.5-st.critdres)-1))*(1+Math.max(0,1-st.ampres));const ehp=st.hp/Math.max(.01,incoming-st.dr/30000);return Math.sqrt(offense*ehp);};
const med=a=>a.sort((x,y)=>x-y).slice(1,3).reduce((a,b)=>a+b,0)/2;
const baseline=med(classes.map(id=>metric(reference,id))),scale=1000000/baseline,weights={};
for(const [key,step] of Object.entries({atk:100,hp:1000,def:100,crit:.01,critd:.01,amp:.01,haste:.01,pen:100,acc:100,dr:100,cdr:.01,critres:.01,critdres:.01,ampres:.01,ten:.01,pvp:.01,ignoreAmpRes:.01,ignoreCritRes:.01})){
const values=classes.map(id=>{const st={...reference};if(key==='atk'){st.af+=step;st.am+=step;}else if(key==='amp'){st.ampF+=step;st.ampM+=step;}else if(key==='pen'){st.penF+=step;st.penM+=step;}else if(key==='crit'){st.critRaw+=step;st.crit+=step;}else if(key==='haste'){st.haste+=step;st.interval=reference.interval*(1+reference.haste)/(1+st.haste);}else st[key]+=step;
return Math.max(0,(metric(st,id)-metric(reference,id))*scale/step);});weights[key]=Math.round(med(values)*10000)/10000;
}
// Tenacity/PvP don't affect the PvE rotation: calibrate their scenario value explicitly.
weights.ten=100000;weights.pvp=250000;
const model={version:4,reference,classes,normalization:1000000,weights,method:'Median marginal gain in sqrt(rotation DPS * effective HP), four classes; +1pp fractional step. Tenacity/PvP use separate conservative scenario budgets, not PvE DPS.'};
writeFileSync('dist/power-calibration.json',JSON.stringify(model,null,2));
writeFileSync('dist/power-score.js',`// Generated from documented common reference; no class-specific prices.\nexport const POWER_WEIGHTS=${JSON.stringify(weights)};\nexport function powerScore(st,classId,level){const magic=classId==='ARC',hybrid=classId==='LAS',values={atk:magic?st.am:st.af,hp:st.hp,def:st.def,crit:st.crit,critd:Math.max(0,st.critd-1.2),amp:hybrid?(st.ampF+st.ampM)/2:magic?st.ampM:st.ampF,haste:st.haste,pen:hybrid?(st.penF+st.penM)/2:magic?st.penM:st.penF,acc:st.acc,dr:st.dr,cdr:st.cdr,critres:st.critres,critdres:Math.min(1,st.critdres),ampres:Math.min(.8,st.ampres),ten:st.ten,pvp:st.pvp,ignoreAmpRes:st.ignoreAmpRes,ignoreCritRes:st.ignoreCritRes};return Math.round(level*100+Object.entries(values).reduce((sum,[k,v])=>sum+Math.max(0,v)*POWER_WEIGHTS[k],0));}\n`);
console.log(JSON.stringify(weights));
