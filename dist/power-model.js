import {KITS} from './skills.js?v=23';
import {resolveStrike} from './combat.js?v=23';
// A common target and a time budget, independent of player level and UI labels.
export function rotationPower(st,classId){const target={def:6500,level:1000,acc:2000},window=15,kit=KITS[classId];let time=0,damage=0;
 for(const [index,k]of kit.entries()){if(!k.coef||index===6)continue;const uses=window/Math.max(.5,k.cd*(1-st.cdr)),duration=(k.cast||0)+.4;time+=uses*duration;damage+=uses*resolveStrike(st,classId,target,{index,coefficient:k.coef*(k.kind==='storm'?3:1),expected:true}).value;}
 // If rotation exceeds the action budget, scale skill throughput; no double counting basics.
 if(time>window)damage*=window/time;
 const basics=Math.max(0,window-Math.min(window,time))/st.interval;damage+=basics*resolveStrike(st,classId,target,{index:null,expected:true}).value;
 return{dps:damage/window,skillTime:Math.min(window,time),basicUses:basics};}
