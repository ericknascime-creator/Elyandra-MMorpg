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
