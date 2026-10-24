import {drawCosmicPhenomenon} from './cosmic-vfx.js?v=19';
import {visualAssets,drawCell} from './engine/visual-assets.js?v=18';
const TAU=Math.PI*2,COLORS=['#b5f7ff','#58ffb2','#c384ff','#ffd16c','#65f6ff','#d7a5ff'];
export function presenceProfile(rank){const r=Math.max(0,Math.min(500,Math.floor(rank||0))),stage=Math.min(5,Math.floor(r/100));return {rank:r,stage,color:COLORS[stage],radius:24+stage*7+r*.025,height:90+r*.12,particles:r?4+Math.floor(r/20):0,layers:r?1+stage:0,shards:stage>=3?stage+2:0};}
// Two world passes preserve the silhouette and foreground legibility.
export function drawPresence(g,rank,t,front=false,moving=false,economy=false,style='blackhole'){drawCosmicPhenomenon(g,rank,t,front,style,economy);}
