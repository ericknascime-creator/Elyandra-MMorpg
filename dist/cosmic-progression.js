import {equipmentLevel} from './rebirth.js?v=26';
// Original Elyndra progression. Fractions are used for every percentage.
export const LIMITS={level:1000,evolution:500,enchant:100,relic:590,stars:500};
const clamp=(n,max)=>Math.max(0,Math.min(max,Math.floor(Number(n)||0)));
export const RELICS=[{id:'comet',name:'Coração do Cometa',focus:'Cadência e acerto crítico',bonuses:{haste:.15,crit:.08,critd:.35,pen:450}},{id:'rift',name:'Prisma da Fenda',focus:'Explosão de habilidades',bonuses:{ampAll:.15,cdr:.06,crit:.08,pen:700}},{id:'aegis',name:'Égide do Zênite',focus:'Resistência e contra-ataque',bonuses:{critres:.10,ampres:.10,ten:.12,critd:.25,pen:400}}];
export const SIGNS=['Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
export const SOUL_NODES=[{id:'vital',name:'Raiz Vital',stat:'hp',value:35},{id:'sight',name:'Olhar Celeste',stat:'precisao',value:12},{id:'edge',name:'Fio da Alma',stat:'pen',value:6},{id:'resolve',name:'Vontade',stat:'ten',value:.0015},{id:'spark',name:'Centelha',stat:'critd',value:.004}];
export function initCosmic(p){p.relic||={rank:0,id:'comet'};p.constellation||={rank:0,sign:0};p.soul||={vital:0,sight:0,edge:0,resolve:0,spark:0};}
export function cosmicBonuses(p){const out={};const add=(k,v)=>out[k]=(out[k]||0)+v;
 if(equipmentLevel(p)>=750){const r=clamp(p.relic?.rank,590)/590,d=RELICS.find(x=>x.id===p.relic?.id)||RELICS[0];for(const[k,v]of Object.entries(d.bonuses))add(k,v*r);}
 if(equipmentLevel(p)>=850){const r=clamp(p.constellation?.rank,500),t=r/500,sign=clamp(p.constellation?.sign,11);add('precisao',r*2);add('pen',r*.6);if(r>=50)add('crit',.06*t);if(r>=100)add('critd',.30*t);if(r>=200)add('haste',.08*t);if(r>=300)add('ampAll',.08*t);if(r>=400)add('maxcrit',.10*t);if(r>=450)add('ignoreAmpRes',.03*t);const focus=['critd','critres','haste','ampres','crit','cdr','ten','pen','critd','ignoreCritRes','ampAll','maxcrit'][sign];add(focus,focus==='pen'?200*t:.04*t);}
 if(equipmentLevel(p)>=30)for(const n of SOUL_NODES)add(n.stat,clamp(p.soul?.[n.id],100)*n.value);
 return out;}
export function cosmicQuote(p,kind,node=null){const minLevel=kind==='relic'?750:kind==='constellation'?850:30,max=kind==='relic'?590:kind==='constellation'?500:100;
 if(!['relic','constellation','soul'].includes(kind)||kind==='soul'&&!SOUL_NODES.some(x=>x.id===node))return{ok:false,reason:'Sistema inválido.'};
 const rank=clamp(kind==='soul'?p.soul?.[node]:p[kind]?.rank,max);if(equipmentLevel(p)<minLevel)return{ok:false,reason:'Libera no Nv'+minLevel};if(rank>=max)return{ok:false,reason:'Nível máximo '+max};
 const level=kind==='soul'?Math.ceil(30+970*rank/99):Math.ceil(minLevel+(1000-minLevel)*rank/(max-1));if(equipmentLevel(p)<level)return{ok:false,reason:'Requer Nv'+level};
 const material=kind==='relic'?'Fragmento de Relíquia':kind==='constellation'?'Poeira de Constelação':'Cristal da Alma',count=Math.ceil(2+(rank+1)**1.1),gold=Math.round((kind==='soul'?200:1000)*(rank+1)**1.6),missing=Math.max(0,count-(p.materials?.[material]||0)),missingGold=Math.max(0,gold-(p.gold||0));
 return{ok:true,rank,next:rank+1,max,level,material,count,gold,missing,missingGold,price:Math.ceil(250+missing*15+missingGold/50)};}
export function evolveCosmic(p,kind,node=null,currency='materials',inCombat=false){initCosmic(p);if(inCombat)return{ok:false,reason:'Saia de combate.'};const q=cosmicQuote(p,kind,node);if(!q.ok)return q;if(!['materials','cash'].includes(currency))return{ok:false,reason:'Moeda inválida.'};if(currency==='cash'&&(p.wallet?.cash||0)<q.price)return{ok:false,reason:'Cash insuficiente.'};if(currency==='materials'&&(q.missing||q.missingGold))return{ok:false,reason:'Faltam ouro ou materiais.'};
 if(currency==='cash'){p.wallet.cash-=q.price;p.gold+=q.missingGold;p.materials[q.material]=(p.materials[q.material]||0)+q.missing;}p.gold-=q.gold;p.materials[q.material]-=q.count;if(kind==='soul')p.soul[node]=q.next;else p[kind].rank=q.next;return{ok:true,rank:q.next};}
export function selectCosmic(p,kind,id,inCombat=false){initCosmic(p);if(inCombat)return{ok:false,reason:'Saia de combate.'};if(kind==='relic'&&equipmentLevel(p)>=750&&RELICS.some(r=>r.id===id)){p.relic.id=id;return{ok:true};}if(kind==='constellation'&&equipmentLevel(p)>=850&&Number.isInteger(id)&&id>=0&&id<12){p.constellation.sign=id;return{ok:true};}return{ok:false,reason:'Escolha bloqueada.'};}
