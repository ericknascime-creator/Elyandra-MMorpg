// Repeatable audit of Elyndra's implementation, not a reconstruction of proprietary formulas.
import fs from 'node:fs';
import {createPlayer,stats,CLASSES} from '../dist/core.js';
import {provisionGM} from '../dist/gm-tools.js';
import {KITS} from '../dist/skills.js';
import {resolveStrike} from '../dist/combat.js';
import {simulateDuel} from '../dist/balance-lab.js';
const data=JSON.parse(fs.readFileSync(new URL('../dist/content.json',import.meta.url))),builds=Object.keys(CLASSES).map(classId=>{const p=createPlayer(classId,'Auditoria');provisionGM(p,data);return {classId,stats:stats(p)};});
const target={level:250,def:3000,hp:100000};
const rows=builds.map(({classId,stats:st})=>{const index=KITS[classId].findIndex(k=>k.coef>0),coef=KITS[classId][index].coef,base=resolveStrike(st,classId,target,{index,coefficient:coef,expected:true}).value,delta=key=>resolveStrike({...st,[key]:st[key]+.10},classId,target,{index,coefficient:coef,expected:true}).value-base;return {classId,name:CLASSES[classId].name,power:st.pc,hp:st.hp,af:st.af,am:st.am,crit:st.crit,maxCrit:st.maxcrit,critMultiplier:st.critd,swordAmp:st.ampF,magicAmp:st.ampM,skill:KITS[classId][index].name,expectedSkillDamage:Math.round(base),plus10ppCritDamage:Math.round(delta('critd')),plus10ppSwordAmp:Math.round(delta('ampF')),plus10ppMagicAmp:Math.round(delta('ampM'))};});
const duels=[];for(let a=0;a<builds.length;a++)for(let b=a+1;b<builds.length;b++){let first=0,second=0,ties=0,total=0;for(let seed=1;seed<=50;seed++){const out=simulateDuel(builds[a],builds[b],{seed,seconds:90});if(out.winner===builds[a].classId)first++;else if(out.winner===builds[b].classId)second++;else ties++;total+=out.elapsed;}duels.push({a:builds[a].classId,b:builds[b].classId,aWins:first,bWins:second,draws:ties,meanSeconds:Math.round(total/50*100)/100});}
const result={purpose:'Audit of current alpha0.16; NOT official Crystal Saga/Cabal formulas',configuration:'Level250, perfectULTRA+25, three sockets, progression100, skill20; same presets as localGM',limitations:['Stationary targets; no distance/kiting/line-of-sight','Duel bot ignores several buffs, utility skills, ultimates and pet AI','Duel mana costs are base costs, not rank-discounted; not a livePvP validation','Power is a reference estimate, not an equal-budget balance certificate'],rows,duels,matches:duels.length*50};
fs.writeFileSync(new URL('../docs/research/combat-audit.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify({matches:result.matches,rows},null,2));
