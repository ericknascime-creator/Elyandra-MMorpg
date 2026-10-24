export const DIVINE_MERITS={
 weapon:{name:'Fenda do Éter',text:'Ignora 2/4 p.p. da resistência à ampliação.',stat:'ignoreAmpRes',value:.02},
 secondary:{name:'Espelho Astral',text:'Resistência a dano crítico +4/8 p.p.',stat:'critdres',value:.04},
 armor:{name:'Pele de Constelação',text:'Reduz 40/80 de dano por impacto.',stat:'dr',value:40},
 head:{name:'Mente Atemporal',text:'Redução de recarga +1/2 p.p.; teto global 50%.',stat:'cdr',value:.01},
 hands:{name:'Toque Inevitável',text:'Ignora 1/2 p.p. da resistência à taxa crítica.',stat:'ignoreCritRes',value:.01},
 legs:{name:'Memória do Vazio',text:'Resistência a ampliação +2/4 p.p.',stat:'ampres',value:.02},
 boots:{name:'Passo Dimensional',text:'Velocidade de movimento +1,5/3%.',stat:'speedPct',value:.015},
 neck:{name:'Olhar do Infinito',text:'Limite de taxa crítica +1/2 p.p.; teto global 95%.',stat:'maxcrit',value:.01},
 ring1:{name:'Vontade Soberana',text:'Resistência à taxa crítica +1/2 p.p.',stat:'critres',value:.01},
 ring2:{name:'Órbita Arcana',text:'Resistência a ampliação +1/2 p.p.',stat:'ampres',value:.01}
};
export function divineMerit(i){if(!i||i.level<215||!['SSS+','ULTRA'].includes(i.quality)||!DIVINE_MERITS[i.slot])return null;const m=DIVINE_MERITS[i.slot];const value=m.value*(i.quality==='ULTRA'?2:1),display=(m.stat==='dr'?value:(value*100)).toLocaleString('pt-BR',{maximumFractionDigits:2}),unit=m.stat==='dr'?'dano':m.stat==='speedPct'?'%':'p.p.',description=({ignoreAmpRes:'Ignora '+display+'p.p. de resistência à ampliação.',critdres:'Resistência a dano crítico +'+display+'p.p.',dr:'Reduz '+display+'de dano por impacto.',cdr:'Redução de recarga +'+display+'p.p. Teto global50%.',ignoreCritRes:'Ignora '+display+'p.p. de resistência à taxa crítica.',ampres:'Resistência a ampliação +'+display+'p.p.',speedPct:'Velocidade de movimento +'+display+'%.',maxcrit:'Limite de taxa crítica +'+display+'p.p. Teto global95%.',critres:'Resistência à taxa crítica +'+display+'p.p.'})[m.stat];return {...m,value,description,display:display+' '+unit};}
export function divineSlots(p){return [...new Set((p.divineSlots||['weapon','armor','boots']).filter(s=>DIVINE_MERITS[s]))].slice(0,3);}
export function divineBonuses(p){const out={speedPct:0},active=divineSlots(p);for(const slot of active){const i=p.bag.find(x=>x.id===p.equipped[slot]),m=divineMerit(i);if(m)out[m.stat]=(out[m.stat]||0)+m.value;}return out;}
export function toggleDivine(p,i,inCombat=false){if(inCombat)return {ok:false,reason:'Saia de combate para alterar ressonâncias.'};if(!divineMerit(i))return {ok:false,reason:'Peça sem mérito divino.'};const slots=divineSlots(p),at=slots.indexOf(i.slot);if(at>=0){p.divineSlots=slots.filter(s=>s!==i.slot);return {ok:true};}if(slots.length>=3)return {ok:false,reason:'Limite de três ressonâncias. Desative uma na central de evolução.'};p.divineSlots=[...slots,i.slot];return {ok:true};}
