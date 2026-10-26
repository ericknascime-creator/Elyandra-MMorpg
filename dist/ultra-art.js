import {drawEnchantedEdge,glint} from './fantasy-vfx.js?v=24';
export const ULTRA_ROWS={VIG:0,ARC:1,RUP:2,LAS:3};
export const ULTRA_PATHS={
 VIG:[[[30,-91],[44,-65],[39,-31],[22,0]],[[38,-119],[44,-86],[38,-40]],[[38,-119],[44,-86],[38,-40]],[[30,-91],[44,-65],[39,-31],[22,0]]],
 ARC:[[[ -34,-7],[-35,-109]],[[-61,-48],[23,-116]],[[-28,-82],[58,-87]],[[-34,-7],[-35,-109]]],
 RUP:[[[1,-59],[-25,0]],[[28,-111],[-58,-63]],[[10,-46],[61,-1]],[[1,-59],[-25,0]]],
 LAS:[[[ -19,-57],[49,-1]],[[-12,-105],[58,-72]],[[-8,-60],[59,-50]],[[-19,-57],[49,-1]]]
};
export function drawUltraClass(g,image,id,attack,phase,t,appearance){const row=ULTRA_ROWS[id];if(!image||row===undefined)return false;const frame=attack?Math.min(3,Math.floor(Math.max(0,phase)*4)):0,cw=(image.naturalWidth||image.width)/4,ch=(image.naturalHeight||image.height)/4;
 g.drawImage(image,frame*cw,row*ch,cw,ch,-64,-122,128,128);
 const color={VIG:'#5dffa5',ARC:'#c681ff',RUP:'#ffc15c',LAS:'#849dff'}[id];drawEnchantedEdge(g,ULTRA_PATHS[id][frame],appearance.enchant||0,t,attack,color);
 if(id==='ARC'||id==='LAS'){const x=43,y=-92,rank=appearance.secondaryEnchant||0;drawEnchantedEdge(g,[[x-5,y],[x,y-7],[x+5,y],[x,y+7],[x-5,y]],rank,t+.5,attack,color);if(rank>=75)glint(g,x,y,3,color,.7);}
 return true;
}
