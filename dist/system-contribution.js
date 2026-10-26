import {stats} from './core.js?v=25';
export function withoutSystem(player,kind,node=null){const p=structuredClone(player);if(['pet','mount'].includes(kind)){p.companions||={};p.companions[kind]=null;}else if(kind==='soul'){p.soul||={};if(node)p.soul[node]=0;else for(const k of Object.keys(p.soul))p.soul[k]=0;}else{p[kind]||={};p[kind].rank=0;}return p;}
export function systemContribution(player,kind,node=null){return Math.max(0,stats(player).pc-stats(withoutSystem(player,kind,node)).pc);}
