// Compatibility API preserves existing purchases; presentation is fantasy energy.
import {FANTASY_STYLES,fantasyProfile,drawFantasyPresence} from './fantasy-vfx.js?v=23';
export const COSMIC_STYLES=FANTASY_STYLES;
export const cosmicProfile=fantasyProfile;
export function initCosmicStyle(p){p.magicula||={rank:0};p.cosmicStyles||=['blackhole'];if(p.localRole==='gm')p.cosmicStyles=COSMIC_STYLES.map(d=>d.id);if(!COSMIC_STYLES.some(d=>d.id===p.magicula.style))p.magicula.style='blackhole';}
export function cosmicStyleQuote(p,id){const d=COSMIC_STYLES.find(x=>x.id===id);if(!d)return{ok:false,reason:'Estilo inválido.'};const owned=id==='blackhole'||p.localRole==='gm'||p.cosmicStyles?.includes(id);return{ok:true,owned,price:owned?0:d.price,style:d};}
export function applyCosmicStyle(p,id,inCombat=false){const q=cosmicStyleQuote(p,id);if(inCombat)return{ok:false,reason:'Saia de combate para trocar o estilo.'};if(!q.ok)return q;if((p.wallet?.cash||0)<q.price)return{ok:false,reason:'Cash insuficiente.'};initCosmicStyle(p);if(q.price)p.wallet.cash-=q.price;p.cosmicStyles=[...new Set([...p.cosmicStyles,id])];p.magicula.style=id;return{ok:true,price:q.price};}
export const drawCosmicPhenomenon=drawFantasyPresence;
