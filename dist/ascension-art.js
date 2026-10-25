import {drawAuraSeal,drawFeatherWings} from './fantasy-vfx.js?v=23';
import {STYLES,ascensionTier} from './ascension.js?v=23';
import {visualAssets,drawCell} from './engine/visual-assets.js?v=23';
const TAU=Math.PI*2,tints=new Map();
function relicTexture(style){if(!visualAssets.relics)return null;if(style==='mystic'||!style)return visualAssets.relics;if(tints.has(style))return tints.get(style);const c=document.createElement('canvas'),im=visualAssets.relics;c.width=im.naturalWidth;c.height=im.naturalHeight;const ctx=c.getContext('2d'),hues={nature:-60,void:110,infernal:170,solar:-140,glacial:0,eclipse:90,carmim:165};if('filter'in ctx)ctx.filter='hue-rotate('+(hues[style]||0)+'deg)';ctx.drawImage(im,0,0);if(!('filter'in ctx)){ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=.55;ctx.fillStyle=STYLES[style]?.color||'#00ffff';ctx.fillRect(0,0,c.width,c.height);}if(tints.size>=3)tints.delete(tints.keys().next().value);tints.set(style,c);return c;}

export function drawAscension(g,wings,aura,t){
 if(aura?.rank&&aura.visible!==false){const color=STYLES[aura.style]?.color||ascensionTier(aura.rank).color;drawAuraSeal(g,aura.rank,color,t);}
 if(wings?.rank&&wings.visible!==false){const accent=STYLES[wings.style]?.color||ascensionTier(wings.rank).color;if(!drawFeatherWings(g,wings.rank,t,accent)&&visualAssets.relics){const rank=Math.min(500,wings.rank),cell=rank<200?0:rank<400?1:2,size=100+rank*.10;g.save();g.translate(0,-67);g.globalAlpha=.93;drawCell(g,relicTexture(wings.style),3,2,cell,-size/2,-size*.48,size,size*.8);g.restore();}}
}
