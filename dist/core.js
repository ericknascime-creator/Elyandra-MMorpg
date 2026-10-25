import {weaponIntrinsics} from './weapon-intrinsics.js?v=23';
import {powerScore} from './power-score.js?v=23';
import {SUPREMACY,amplifyBonuses,ultraMerits} from './supremacy.js?v=23';
import {rotationPower} from './power-model.js?v=23';
import {cosmicBonuses} from './cosmic-progression.js?v=23';
import {divineBonuses} from './divine-merits.js?v=23';
import {skillRank,skillGrowth} from './skill-growth.js?v=23';
import {KITS} from './skills.js?v=23';
import {companionBonuses,magiculaBonuses} from './companions.js?v=23';
import {CLASS_PROFILES,attackProfile,damageReduction,combatDamage,CLASS_ROLES,resolveStrike} from './combat.js?v=23';
import {ascensionBonuses} from './ascension.js?v=23';
import {runeValue} from './runes.js?v=23';
import {xpNeeded} from './progression.js?v=23';
import {attributeGains} from './attributes.js?v=23';
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
import {CLASSES} from './classes.js?v=23';
export {CLASSES};
export function stats(p){
 const c=CLASSES[p.classId],lv=p.level-1,g=CLASS_PROFILES[p.classId].growth,growth=attributeGains(p);
 let hp=c.hp+lv*g.hp,mp=c.mp+lv*g.mp,af=(p.classId==='ARC'?12:c.atk)+lv*g.af,am=(p.classId==='ARC'?c.atk:p.classId==='LAS'?c.atk*.65:10)+lv*g.am,def=c.def+lv*g.def,critRaw=.05,critd=1.2,maxcrit=.5,acc=1000,haste=0,ampF=0,ampM=0,penF=0,penM=0,critres=0,critdres=0,ampres=0,dr=0,cdr=0,ten=0,pvp=0,ignoreCritRes=0,ignoreCritdRes=0,ignoreAmpRes=0,evasion=growth.evasion;
 const add=(type,v)=>{switch(type){case 'ten':ten+=v;break;case 'pvp':pvp+=v;break;case 'crit':critRaw+=v;break;case 'critd':critd+=v;break;case 'maxcrit':maxcrit+=v;break;case 'haste':haste+=v;break;case 'ampF':ampF+=v;break;case 'ampM':ampM+=v;break;case 'ampAll':ampF+=v;ampM+=v;break;case 'af':af+=v;break;case 'am':am+=v;break;case 'atk':if(p.classId==='ARC')am+=v;else if(p.classId==='LAS'){af+=v*.65;am+=v*.35;}else af+=v;break;case 'pen':penF+=v;penM+=v;break;case 'penF':penF+=v;break;case 'penM':penM+=v;break;case 'hp':hp+=v;break;case 'mana':case 'mp':mp+=v;break;case 'def':def+=v;break;case 'precisao':acc+=v;break;case 'critres':critres+=v;break;case 'critdres':critdres+=v;break;case 'ampres':ampres+=v;break;case 'dr':dr+=v;break;case 'cdr':cdr+=v;break;case 'evasion':evasion+=v;break;case 'ignoreCritRes':ignoreCritRes+=v;break;case 'ignoreCritdRes':ignoreCritdRes+=v;break;case 'ignoreAmpRes':ignoreAmpRes+=v;break;}};
 for(const id of new Set(Object.values(p.equipped))){const i=p.bag.find(v=>v.id===id);if(!i||p.classId==='RUP'&&i.slot==='secondary')continue;const e=clamp(i.enchant||0,0,100),b=Object.fromEntries(Object.entries(i.base).map(([k,v])=>[k,v*(i.quality==='ULTRA'?SUPREMACY.ultraBase:1)])),typed=b.af!=null||b.am!=null;
 if(typed){const a=((b.af||0)+(b.am||0))*(1+.012*e);if(p.classId==='ARC')am+=a;else if(p.classId==='LAS'){af+=a*.65;am+=a*.35;}else af+=a;}else {const a=(b.atk||0)*(1+.012*e);if(p.classId==='ARC')am+=a;else if(p.classId==='LAS'){af+=a*.65;am+=a*.35;}else af+=a;}
 def+=(b.def||0)*(1+.012*e);hp+=(b.hp||0)*(1+.008*e);acc+=(b.acc||0)*(1+.006*e);mp+=b.mp||0;
 for(const [k,v]of Object.entries(weaponIntrinsics(i,p.classId)))add(k,v);for(const [k,v]of Object.entries(ultraMerits(i)))add(k,v);for(const a of i.options||[])add(a.type,a.value);for(const [n,a] of (i.runes||[]).entries())add(a.type,runeValue(i,a,n));
 }
 for(const [k,v]of Object.entries(amplifyBonuses(p,cosmicBonuses(p))))add(k,v);
 const divine=divineBonuses(p);for(const [k,v] of Object.entries(divine))if(k!=='speedPct')add(k,v);
 af+=growth.physical;am+=growth.magical;def+=growth.def;hp*=1+growth.hpPct;mp=(mp+growth.mp)*(1+growth.mpPct);acc+=growth.accuracy;critRaw+=growth.crit;haste+=growth.haste;critd+=growth.critd;ampM+=growth.magicAmp;
 const wa=amplifyBonuses(p,ascensionBonuses(p));af*=1+wa.attackPct;am*=1+wa.attackPct;acc+=wa.accuracy;hp*=1+wa.hpPct;def*=1+wa.defensePct;critd+=wa.critd;haste+=wa.haste;ampres+=wa.ampres;
 const cb=amplifyBonuses(p,companionBonuses(p)),mb=amplifyBonuses(p,magiculaBonuses(p));af*=1+cb.attackPct+mb.attackPct;am*=1+cb.attackPct+mb.attackPct;hp*=1+cb.hpPct+mb.hpPct;def*=1+cb.defensePct;mp*=1+cb.mpPct;critd+=cb.critd;ampF+=cb.amp;ampM+=cb.amp;penF+=cb.pen+mb.pen;penM+=cb.pen+mb.pen;acc+=cb.accuracy;const now=Date.now();for(const b of p.buffs||[]){if(b.until<=now)continue;if(b.type==='crit')critRaw+=.03;if(b.type==='critd')critd+=.05;if(b.type==='hp')hp*=1.05;if(b.type==='def')def*=1.05;if(b.type==='fortress')hp*=1.2;}
 maxcrit=clamp(maxcrit,.5,.85);critd=Math.max(1.2,critd);const crit=clamp(critRaw,0,maxcrit);haste=clamp(haste,0,1.1);cdr=clamp(cdr,0,.4);
 const ranks=Array.from({length:7},(_,i)=>skillRank(p,i));const support=KITS[p.classId].map((k,i)=>!k.coef?skillGrowth(ranks[i]).potency-1:0).reduce((a,b)=>a+b,0)/7;
 const trained=ranks.reduce((sum,r)=>sum+r-1,0);hp*=1+(({VIG:1.1,ESP:1.25,ARC:1.65,BAS:.72,RUP:.85,DUE:.95,LAS:1.1}[p.classId])-1)*clamp(lv/999,0,1);hp+=trained*2;mp+=trained*4;acc+=trained*2;
 const unifiedAttack=p.classId==='ARC'?am:p.classId==='LAS'?af+am:af;
 const result={...Object.fromEntries(ranks.map((r,i)=>['skillRank'+i,r])),hp:Math.round(hp),mp:Math.round(mp),af:Math.round(p.classId==='LAS'?unifiedAttack:af),am:Math.round(p.classId==='LAS'?unifiedAttack:am),def:Math.round(def),crit,critRaw,maxcrit,critd,haste,ampF:Math.max(0,ampF),ampM:Math.max(0,ampM),penF,penM,acc,evasion,critres:clamp(critres,0,.8),critdres,ampres,dr,cdr,ignoreCritRes,ignoreCritdRes,ignoreAmpRes,pressure:Math.min(.35,mb.pressure),ten:clamp(ten,0,.6),pvp:clamp(pvp,0,.5),range:c.range,speed:c.speed*(1+cb.speed+divine.speedPct),interval:c.interval/(1+haste)};
 const basic=attackProfile(result,p.classId),skill=attackProfile(result,p.classId,p.classId==='LAS'?6:0),rotation=rotationPower(result,p.classId),offense=rotation.dps*12*(1+divine.speedPct*.5),survival=(def*7+hp*.7+dr*5)/(1-Math.min(.35,mb.pressure))/(1-Math.min(.25,evasion/10000))*(1+result.critres*.3+Math.min(.5,ampres)*.2+Math.min(1,critdres)*.1);

 return {...result,atk:Math.round(unifiedAttack),amp:skill.amp,pen:skill.pen,offensePower:Math.round(offense*2),defensePower:Math.round(survival*2),dps:Math.round(offense/12),pc:powerScore(result,p.classId,p.level)};
}
export const damage=combatDamage;
export const maxXP=xpNeeded;
export function rollValue(cap,rng=Math.random){const r=rng();let grade=r<.55?60+Math.floor(rng()*151)/10:r<.85?75.1+Math.floor(rng()*150)/10:r<.98?90.1+Math.floor(rng()*99)/10:100;return Math.round(cap*grade/100*10000)/10000;}
let serial=0;export function item(classId,level,slot='weapon',quality='D',rng=Math.random){const c=CLASSES[classId];const names={weapon:c.weapons[0],secondary:c.weapons[1],armor:c.torso,head:'Elmo de '+c.name,hands:'Manoplas de '+c.name,legs:'Perneiras de '+c.name,boots:'Botas de '+c.name};const scale=1+(level-1)*.15;return {id:Date.now().toString(36)+'-'+(++serial),name:names[slot],classId,level,slot,quality,weaponBudgetVersion:2,enchant:0,slots:quality==='D'?0:1,runes:[],base:slot==='weapon'?{atk:Math.round((classId==='RUP'?50:25)*scale),acc:classId==='RUP'?120:80}:slot==='secondary'?(classId!=='BAS'?{atk:Math.round(12*scale),acc:40}:{def:Math.round(18*scale),hp:Math.round(60*scale)}):{def:Math.round((slot==='armor'?10:4)*scale),hp:Math.round((slot==='armor'?70:25)*scale)},options:quality==='D'?[]:[{type:classId==='VIG'?'critd':'crit',cap:classId==='VIG'?.10:classId==='RUP'?.08:.04,value:rollValue(classId==='VIG'?.10:classId==='RUP'?.08:.04,rng)}]};}
export function canExtend(playerLevel,i){return playerLevel>=175&&i.level>=175&&['SS+','SSS','SSS+','ULTRA'].includes(i.quality)&&i.slots===2;}
export function potionPulse(current,maxAtUse,maxNow,rate){return Math.min(maxNow,current+maxAtUse*rate/5);}
export function createPlayer(classId,name){const bag=[item(classId,1),...(classId==='RUP'?[]:[item(classId,1,'secondary')]),...['armor','head','hands','legs','boots'].map(slot=>item(classId,1,slot))];return {attributes:{for:0,int:0,des:0},schema:1,name:name.trim().slice(0,18)||'Viajante',classId,level:1,xp:0,gold:5000,progressionVersion:4,materials:{L01:40,E01:10,N01:2,K01:10,P01:10},hp:CLASSES[classId].hp+170+(classId==='BAS'?60:0),mp:CLASSES[classId].mp,x:12,y:14,zone:'coast',bag,equipped:Object.fromEntries(bag.map(i=>[i.slot,i.id])),pots:{hp:6,mp:6},quest:0,kills:0,shards:3,runes:1,buffs:[],dungeonClears:0,killCount:0,playSeconds:0};}
