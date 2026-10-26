import {ascensionCost,evolveAscension} from './ascension.js?v=24';
import {enchantPrice,enchant} from './progression.js?v=24';
import {extendEquipment} from './loadout.js?v=24';
import {canExtend} from './core.js?v=24';

// A quote buys only missing reagents. The original wallet changes once, after validation.
export function premiumQuote(p,action,item){
  if(action==='wings'||action==='aura'){
    if((p[action]?.rank||0)>=500)return {ok:false,reason:'Evolução máxima.'};
    const c=ascensionCost(p,action);
    if(p.level<c.level)return {ok:false,reason:'Requer nível '+c.level+'.'};
    const missing=Math.max(0,c.count-(p.materials?.[c.material]||0)),cores=Math.max(0,c.cores-(p.materials?.['Núcleo de Cataclismo']||0)),gold=Math.max(0,c.gold-p.gold);
    return {ok:true,price:Math.ceil(150+missing*8+cores*1000+gold/50),cost:c,missing,cores,gold,summary:`${missing} ${c.material}, ${cores} núcleo(s), ${gold.toLocaleString('pt-BR')} ouro faltante + serviço150 cash. Evolução garantida.`};
  }
  if(!item||!p.bag.includes(item))return {ok:false,reason:'Peça não encontrada.'};
  if(item.classId!==p.classId||p.level<item.level)return {ok:false,reason:'Requer classe e nível da peça.'};
  if(action==='enchant'){
    if(item.enchant>=100)return {ok:false,reason:'Aprimoramento máximo +100.'};
    const c=enchantPrice(item.enchant),missing=Math.max(0,c.crystals-p.shards),gold=Math.max(0,c.gold-p.gold);
    return {ok:true,price:Math.ceil(200+missing*100+gold/50),cost:c,missing,gold,summary:`${missing} cristal(is), ${gold.toLocaleString('pt-BR')} ouro faltante + serviço200 cash. Uma tentativa: ${Math.round(c.chance*100)}% de sucesso; garantia normal preservada.`};
  }
  if(action==='extend'){
    if(!canExtend(p.level,item))return {ok:false,reason:'Requer Nv175+, peça175+, SS+ ou melhor e dois slots.'};
    const missing=(p.materials?.['Extensor Astral']||0)>0?0:1;
    return {ok:true,price:missing*25000+500,missing,summary:missing?'Compra 1 Extensor Astral (25.000) + aplicação (500 cash). Abre o terceiro slot e recalcula as runas.':'Usa 1 Extensor Astral do inventário + aplicação (500 cash).'};
  }
  return {ok:false,reason:'Serviço inválido.'};
}
export function premiumApply(p,action,item=null,inCombat=false,rng=Math.random){
  if(inCombat)return {ok:false,reason:'Saia de combate para evoluir.'};
  const q=premiumQuote(p,action,item);if(!q.ok)return q;
  if((p.wallet?.cash||0)<q.price)return {ok:false,reason:'Cash insuficiente: '+q.price.toLocaleString('pt-BR')+' necessário.'};
  const staged=structuredClone(p);staged.materials||={};let out;
  if(action==='wings'||action==='aura'){
    staged.gold+=q.gold;const m=q.cost.material;staged.materials[m]=(staged.materials[m]||0)+q.missing;
    staged.materials['Núcleo de Cataclismo']=(staged.materials['Núcleo de Cataclismo']||0)+q.cores;
    out=evolveAscension(staged,action);
  }else{
    const target=staged.bag.find(i=>i.id===item.id);
    if(action==='enchant'){staged.gold+=q.gold;staged.shards+=q.missing;out=enchant(staged,target,rng);}
    else {staged.materials['Extensor Astral']=(staged.materials['Extensor Astral']||0)+q.missing;out=extendEquipment(staged,target);}
  }
  if(!out.ok)return out;
  staged.wallet.cash-=q.price;Object.assign(p,staged);return {...out,price:q.price};
}

import {craft} from './progression.js?v=24';
import {runeChoices} from './runes.js?v=24';
export function premiumCraftQuote(p,src){
 if(!src||src.class_id!==p.classId)return {ok:false,reason:'Receita de outra classe.'};
 if(p.level<src.level_min)return {ok:false,reason:'Requer nível '+src.level_min+'.'};
 if(p.bag.length>=80)return {ok:false,reason:'Mochila cheia.'};
 const lines=Object.entries(src.recipe_components||{}).map(([key,need])=>{const have=key==='gold'?p.gold:p.materials?.[key]||0,missing=Math.max(0,need-have),unit=key==='Núcleo Soberano'?50000:key==='gold'?.02:key.startsWith('L')?8:key.startsWith('E')?24:key.startsWith('N')?150:key.startsWith('K')?100:key.startsWith('P')?250:25000;return {key,missing,price:Math.ceil(missing*unit)};});
 return {ok:true,price:500+lines.reduce((s,l)=>s+l.price,0),lines,summary:'Compra somente materiais faltantes +500 cash de fabricação. Opções e valores continuam aleatórios; não garante perfeição.'};
}
export function premiumCraftApply(p,src,inCombat=false){if(inCombat)return {ok:false,reason:'Saia de combate para fabricar.'};const q=premiumCraftQuote(p,src);if(!q.ok)return q;if((p.wallet?.cash||0)<q.price)return {ok:false,reason:'Cash insuficiente.'};const staged=structuredClone(p);staged.materials||={};for(const l of q.lines){if(l.key==='gold')staged.gold+=l.missing;else staged.materials[l.key]=(staged.materials[l.key]||0)+l.missing;}const out=craft(staged,src);if(!out.ok)return out;staged.wallet.cash-=q.price;Object.assign(p,staged);return {...out,price:q.price};}
export function premiumSocket(p,item,type,inCombat=false){if(inCombat)return {ok:false,reason:'Saia de combate para inserir runas.'};if(!item||!p.bag.includes(item)||item.classId!==p.classId||p.level<item.level||item.runes.length>=item.slots)return {ok:false,reason:'Peça sem encaixe livre ou requisito não atendido.'};const rune=runeChoices(item,p.classId).find(r=>r.type===type);if(!rune)return {ok:false,reason:'Atributo inválido.'};const price=(p.runes>0?0:100)+50;if((p.wallet?.cash||0)<price)return {ok:false,reason:'Cash insuficiente.'};if(p.runes>0)p.runes--;p.wallet.cash-=price;item.runes.push({type,rule:'cabal05',value:rune.value});return {ok:true,price};}
