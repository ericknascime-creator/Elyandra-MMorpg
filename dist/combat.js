import {skillGrowth} from './skill-growth.js?v=16';
// Cabal-inspired separation of sword/magic offense; coefficients are Elyndra balancing.
export const CLASS_PROFILES={
 VIG:{growth:{hp:30,mp:3,af:5,am:1,def:2.6},primary:'DES',focus:'Ataque físico · velocidade de ataque · taxa crítica · dano crítico · precisão · penetração. Ampliação atua apenas nas skills, não nos tiros básicos.'},
 ESP:{growth:{hp:28,mp:3,af:5.4,am:1,def:2.4},primary:'DES / FOR',focus:'Ataque físico · taxa crítica · dano crítico · ampliação de espada · penetração. Explosão com adagas e reposicionamento.'},
 ARC:{growth:{hp:24,mp:6,af:1,am:6,def:2},primary:'INT',focus:'Ataque mágico · ampliação de magia · taxa crítica · dano crítico · penetração mágica. Ampliação de espada não aumenta suas magias.'},
 BAS:{growth:{hp:44,mp:3,af:4.2,am:1.4,def:4.5},primary:'FOR',focus:'Defesa · HP · redução de dano · resistências críticas. Para dano: ataque físico, ampliação de espada e penetração.'},
 RUP:{growth:{hp:38,mp:2.5,af:6.5,am:1,def:3.5},primary:'FOR',focus:'Ataque físico · ampliação de espada · penetração · dano crítico. Arma unificada usa o orçamento de duas armas.'},
 DUE:{growth:{hp:32,mp:3.5,af:5.2,am:1,def:2.8},primary:'FOR / DES',focus:'Ataque físico · ampliação de espada · taxa crítica · dano crítico · precisão. Cortes consecutivos exploram a cadência.'},
 LAS:{growth:{hp:31,mp:4.5,af:4.3,am:3.2,def:3},primary:'FOR / INT / DES',focus:'Ataques físico e mágico separados. Corte rúnico usa magia; Iaijutsu usa espada; Eclipse combina65% espada e35% magia.'}
};
export const bounded=(n,a,b)=>Math.max(a,Math.min(b,n));
export function attackProfile(st,classId,index=null){
 const magic=classId==='ARC'||classId==='LAS'&&index===1,hybrid=classId==='LAS'&&index===6;
 if(hybrid)return {type:'Híbrido',atk:st.af*.65+st.am*.35,amp:st.ampF*.65+st.ampM*.35,pen:st.penF*.65+st.penM*.35};
 return magic?{type:'Magia',atk:st.am,amp:st.ampM,pen:st.penM}:{type:'Espada / físico',atk:st.af,amp:st.ampF,pen:st.penF};
}
export function criticalChance(st,target={},bonus=0){return bounded(Math.min(st.maxcrit,st.critRaw+bonus)-Math.max(0,(target.critres||0)-(st.ignoreCritRes||0)),0,1);}
export function criticalMultiplier(st,target={}){return Math.max(1.2,st.critd-Math.max(0,(target.critdres||0)-(st.ignoreCritdRes||0)));}
export function effectiveAmp(amp,st,target={}){return Math.max(0,amp-Math.max(0,(target.ampres||0)-(st.ignoreAmpRes||0)));}
export function damageReduction(def,penetration=0){return bounded(Math.max(0,def-penetration)/(1000+Math.max(0,def-penetration)),.003,.95);}
export function combatDamage(atk,coef,def,critChance=0,critMult=1.2,rng=Math.random,penetration=0,reduction=0){const critical=rng()<critChance;return {value:Math.max(1,Math.round(atk*coef*(critical?critMult:1)*(1-damageReduction(def,penetration))-reduction)),critical};}

export function basicInterval(st,buffs={}){const bonus=(buffs.haste?1.25:1)*(buffs.dance?1.15:1);return Math.max(.18,st.interval/bonus);}
export function nextBasicCooldown(remaining,interval){return Math.max(-.08,remaining)+interval;}
export function enchantVisual(rank){const e=Math.max(0,Math.min(25,rank));return {stage:e===25?5:e>=20?4:e>=15?3:e>=10?2:e>=5?1:0,color:e===25?'#baffff':e>=20?'#b06dff':e>=15?'#00e5ff':e>=10?'#72aaff':e>=5?'#ffc46c':'#d8d8d8',motes:e<5?0:Math.min(18,Math.ceil(e*.65)),intensity:e/25};}

// One damage pipeline for live PvE and the offline PvP laboratory. All rates are fractions.
export const COMBAT_RULES={version:3,pvpDamage:.55,pvpMaxHit:.20,hitMin:.65,hitMax:.99};
export const CLASS_ROLES={
 VIG:{basicShare:.88,label:'Tiros e críticos',recommended:'DES → AF → velocidade → taxa/dano crítico → precisão/penetração'},
 ESP:{basicShare:.45,label:'Adagas e execução',recommended:'DES/FOR → AF → crítico → AMP espada → penetração'},
 ARC:{basicShare:.10,label:'Conjuração e controle',recommended:'INT → AM → AMP magia → taxa/dano crítico → penetração mágica'},
 BAS:{basicShare:.40,label:'Guarda e contra-ataque',recommended:'FOR → HP/defesa → resistências → AF/AMP espada'},
 RUP:{basicShare:.25,label:'Impactos de duas mãos',recommended:'FOR → AF → AMP espada → penetração → dano crítico'},
 DUE:{basicShare:.30,label:'Sequência de habilidades',recommended:'FOR/DES → AF → AMP espada → taxa/dano crítico → recarga'},
 LAS:{basicShare:.25,label:'Espada e magia independentes',recommended:'FOR/INT/DES → AF/AM → AMP da habilidade → crítico/penetração'}
};
export function attackComponents(st,classId,index=null){
 if(classId==='LAS'&&index===6)return [{type:'physical',weight:.65,atk:st.af,amp:st.ampF,pen:st.penF},{type:'magical',weight:.35,atk:st.am,amp:st.ampM,pen:st.penM}];
 const magic=classId==='ARC'||classId==='LAS'&&index===1;
 return [{type:magic?'magical':'physical',weight:1,atk:magic?st.am:st.af,amp:magic?st.ampM:st.ampF,pen:magic?st.penM:st.penF}];
}
export function hitChance(st,target={},bonus=0){return bounded(.85+((st.acc||1000)-(target.acc??(target.level||1)*10))/10000-(target.evasion||0)/20000+bonus,.65,.99);}
export function resolveStrike(st,classId,target={},options={}){
 const {index=null,coefficient=1,bonus=1,ampBonus=0,critBonus=0,accuracyBonus=0,pvp=false,expected=false,rng=Math.random}=options;
 const chance=criticalChance(st,target,critBonus),mult=criticalMultiplier(st,target),hit=hitChance(st,target,accuracyBonus);
 if(!expected&&rng()>hit)return {value:0,miss:true,critical:false,hitChance:hit,critChance:chance,components:[]};
 const critical=!expected&&rng()<chance,criticalFactor=expected?1+chance*(mult-1):critical?mult:1;
 const components=attackComponents(st,classId,index).map(part=>{
 const amp=index===null?0:effectiveAmp(part.amp+ampBonus,st,target),def=target[part.type==='magical'?'defM':'defF']??target.def??0;
 const damage=part.atk*part.weight*coefficient*bonus*(index===null?1:skillGrowth(st['skillRank'+index]).damage)*(1+amp)*(1-damageReduction(def,part.pen));
 return {...part,amp,damage};});
 let value=components.reduce((sum,c)=>sum+c.damage,0)*criticalFactor;
 value=Math.max(1,value-Math.max(0,target.dr||0));
 if(pvp){value*=COMBAT_RULES.pvpDamage*(1+(st.pvp||0));if(target.hp>0)value=Math.min(value,target.hp*COMBAT_RULES.pvpMaxHit);}
 if(expected)value*=hit;
 return {value:expected?Math.max(0,value):Math.max(1,Math.round(value)),miss:false,critical,hitChance:hit,critChance:chance,components};
}
export function canStartAction(state){return !state.cast&&!(state.actionLock>0);}
export function queuedHitValid(hit,state){return hit.epoch===state.combatEpoch&&hit.e.hp>0&&state.enemies.includes(hit.e)&&hit.lifeId===(hit.e.lifeId||0);}
