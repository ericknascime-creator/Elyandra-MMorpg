import {SUPREMACY} from './supremacy.js?v=22';
import {POWER_WEIGHTS} from './power-score.js?v=22';
// Parameters are JSON; behavior and rendering remain ordinary JavaScript modules.
import {CLASSES,ACTIVE_CLASSES} from './classes.js?v=22';
import {KITS,PASSIVE_OPTIONS} from './skills.js?v=22';
import {CLASS_PROFILES,CLASS_DAMAGE,COMBAT_RULES} from './combat.js?v=22';
import {ATTRIBUTE_SCALE} from './attributes.js?v=22';
import {FANTASY_STYLES,ENCHANT_STAGES} from './fantasy-vfx.js?v=22';
const targets={supremacy:SUPREMACY,powerWeights:POWER_WEIGHTS,activeClasses:ACTIVE_CLASSES,classes:CLASSES,skills:KITS,passives:PASSIVE_OPTIONS,classProfiles:CLASS_PROFILES,classDamage:CLASS_DAMAGE,attributeScale:ATTRIBUTE_SCALE,combat:COMBAT_RULES,presenceStyles:FANTASY_STYLES,enchantmentStages:ENCHANT_STAGES};
const baseline=JSON.parse(JSON.stringify({schemaVersion:1,...targets}));
function check(value,model,path){
 if(typeof model==='number'){if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>1e7)throw Error(path+': número inválido');return;}
 if(typeof model==='string'){if(typeof value!=='string'||value.length>2000||/[<>]/.test(value))throw Error(path+': texto inválido');return;}
 if(Array.isArray(model)){if(!Array.isArray(value)||value.length!==model.length)throw Error(path+': lista incompatível');model.forEach((v,i)=>check(value[i],v,path+'.'+i));return;}
 if(model&&typeof model==='object'){if(!value||Array.isArray(value)||typeof value!=='object'||Object.keys(value).sort().join('|')!==Object.keys(model).sort().join('|'))throw Error(path+': estrutura incompatível');for(const k of Object.keys(model))check(value[k],model[k],path+'.'+k);return;}
 if(value!==model)throw Error(path+': valor incompatível');
}
export function validateGameDesign(data){
 check(data,baseline,'design');if(data.supremacy.ultraBase<1||data.supremacy.advancedBonuses<1||data.supremacy.referenceXPPerHour<=0||data.supremacy.hoursPerDay<=0||data.supremacy.years>100)throw Error('Progressão soberana inválida');
 if(data.schemaVersion!==1||data.activeClasses.join(',')!=='VIG,ARC,RUP,LAS')throw Error('Versão ou elenco incompatível');
 for(const id of Object.keys(baseline.classes)){
  for(const key of ['hp','mp','interval','speed'])if(data.classes[id][key]<=0)throw Error(id+': base deve ser positiva');
  if(data.classDamage[id]<=0)throw Error(id+': multiplicador deve ser positivo');
  data.skills[id].forEach((skill,i)=>{if(skill.kind!==baseline.skills[id][i].kind)throw Error(id+': comportamento desconhecido');});
 }
 for(const k of ['pvpDamage','pvpMaxHit','hitMin','hitMax'])if(data.combat[k]>1)throw Error('Combate: proporção inválida');
 if(data.combat.hitMin>data.combat.hitMax)throw Error('Combate: intervalo invertido');
 data.presenceStyles.forEach((s,i)=>{if(s.id!==baseline.presenceStyles[i].id||s.theme!==baseline.presenceStyles[i].theme||!/^#[0-9a-f]{6}$/i.test(s.color)||!/^#[0-9a-f]{6}$/i.test(s.secondary))throw Error('Estilo incompatível');});
 data.enchantmentStages.forEach((v,i)=>{if(v.threshold!==baseline.enchantmentStages[i].threshold||v.halo>24||v.streams>6||v.particles>28||v.emission>1)throw Error('Orçamento visual inválido');});
 return JSON.parse(JSON.stringify(data));
}
export function applyGameDesign(data){const clean=validateGameDesign(data);for(const [key,target] of Object.entries(targets)){if(Array.isArray(target))target.splice(0,target.length,...clean[key]);else Object.assign(target,clean[key]);}return clean;}
export async function loadGameDesign(fetcher=fetch){const response=await fetcher('game-design.json?v=22');if(!response.ok)throw Error('Design indisponível');return applyGameDesign(await response.json());}
