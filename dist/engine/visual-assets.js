import {drawUltraClass} from '../ultra-art.js?v=26';
import {setFantasyAssets,drawEnchantedEdge} from '../fantasy-vfx.js?v=26';
import {bowPath,samplePath,weaponAxes} from '../weapon-paths.js?v=26';
import {enchantVisual} from '../combat.js?v=26';
// Original art sheets. UV cropping is performed at runtime; original alpha is preserved.
export const visualAssets={hero:null,terrain:null,wolf:null,weapon:null,ready:false,loaded:0,errors:[]};
const entries=[['ultraClasses','assets/ultra-classes-v22.webp'],['supremeEnergy','assets/supreme-energy-v21.webp'],['fantasySlash','assets/fantasy-slash-v20.webp'],['fantasySeal','assets/fantasy-seal-v20.webp'],['featherWings','assets/feather-wings-v20.webp'],['fantasyEffects','assets/fantasy-effects-v20.webp'],['cosmic','assets/cosmic-atlas-v18.webp'],['landmarks','assets/realm-landmarks-v16.webp'],['petForms','assets/pet-forms-v7.webp'],['pressureBurst','assets/pressure-burst-v7.webp'],['weaponEnergy','assets/weapon-energy-v5.webp'],['ground','assets/ground-v5.webp'],['scenery','assets/scenery-v5.webp'],['mobs','assets/mobs-v5.webp'],['presence','assets/presence-v5.webp'],['npcs','assets/npcs-v4.webp'],['companions','assets/companions-v4.webp'],['sigils','assets/sigils-v4.webp'],['ruptorMotion','assets/ruptor-motion-v3.webp'],['attackMotion','assets/attacks-v3.webp'],['effects','assets/effects-v3.webp'],['classes','assets/classes-atlas-v2.webp'],['relics','assets/relics-atlas-v2.webp'],['arsenal','assets/arsenal-atlas-v2.webp'],['hero','assets/warrior-atlas-v1.webp'],['terrain','assets/garden-atlas-v1.webp'],['wolf','assets/wolf-atlas-v1.webp'],['weapon','assets/weapon-atlas-v1.webp']];
export const visualAssetsReady=Promise.all(entries.map(([key,url])=>new Promise(resolve=>{const image=new Image();image.onload=()=>{visualAssets[key]=image;visualAssets.loaded++;resolve(true);};image.onerror=()=>{visualAssets.errors.push(url);resolve(false);};image.src=url;}))).then(values=>{setFantasyAssets(visualAssets);visualAssets.ready=values.every(Boolean);return visualAssets.ready;});
export function drawCell(g,image,columns,rows,index,x,y,w,h){if(!image)return false;const cw=(image.naturalWidth||image.width)/columns,ch=(image.naturalHeight||image.height)/rows;g.drawImage(image,(index%columns)*cw,Math.floor(index/columns)*ch,cw,ch,x,y,w,h);return true;}
export function drawScenery(g,kind,seed=0){const a=visualAssets.terrain;if(!a)return false;if(kind==='tree'){g.save();g.scale(seed%2?-1:1,1);drawCell(g,a,2,2,2,-68,-122,136,136);g.restore();return true;}if(['ruin','pillar','lighthouse','house'].includes(kind)){drawCell(g,a,2,2,3,-64,-114,128,128);return true;}return false;}
export function paintGardenTile(g,type,x,y){const a=visualAssets.ground||visualAssets.terrain;if(!a||!['grass','path','stone','sand'].includes(type))return false;g.save();g.transform(27/512,13.5/512,-27/512,13.5/512,x,y);drawCell(g,a,2,2,visualAssets.ground?({grass:0,path:1,stone:2,sand:3}[type]):type==='grass'?0:1,0,0,512,512);g.restore();return true;}
export function drawWarriorSprite(g,moving,t,attack,a={}){if(!visualAssets.hero)return false;const frame=attack?8+Math.min(3,Math.floor((a.attackProgress||0)*4)):moving?4+Math.floor(t*9)%4:Math.floor(t*2)%4;g.save();const bob=moving?Math.sin(t*18)*.7:Math.sin(t*2)*.5;g.translate(0,bob);if(a.facingLeft)g.scale(-1,1);drawCell(g,visualAssets.hero,4,3,frame,-48,-122,96,128);g.restore();return true;}
export function drawWolfSprite(g,e,t){if(!visualAssets.wolf)return false;const frame=e.flash>0?8:e.winding>0?6+Math.floor(t*8)%2:e.moving?3+Math.floor(t*9)%3:Math.floor(t*2)%3;g.save();if(e.facing?.x+e.facing?.y<0)g.scale(-1,1);drawCell(g,visualAssets.wolf,3,3,frame,-45,-65,90,90);g.restore();return true;}

export const CLASS_CELLS={VIG:0,ESP:1,ARC:2,BAS:3,RUP:4,DUE:5,LAS:6};
export function drawClassSprite(g,id,moving,t,attack,a={}){
 if(!visualAssets.classes||CLASS_CELLS[id]===undefined||a.hasWeapon===false||a.hasArmor===false||a.hasSecondary===false&&id!=='RUP'||['hasHead','hasHands','hasLegs','hasBoots'].some(k=>a[k]===false))return false;
 g.save();if(a.facingLeft)g.scale(-1,1);const phase=a.attackProgress||0;
 g.translate(attack?Math.sin(phase*Math.PI)*4:0,moving?-Math.abs(Math.sin(t*9))*2:Math.sin(t*1.8)*.5);
 g.rotate(attack?Math.sin(phase*Math.PI)*.055:0);
 if(a.quality==='ULTRA'&&(a.weaponQuality||a.quality)==='ULTRA'&&drawUltraClass(g,visualAssets.ultraClasses,id,attack,phase,t,a)){g.restore();return true;}
 const ev=enchantVisual(a.enchant||0);g.shadowColor=ev.color;g.shadowBlur=0;if(id==='RUP'&&visualAssets.ruptorMotion){const frame=attack?8+Math.min(3,Math.floor(phase*4)):moving?4+Math.floor(t*8)%4:Math.floor(t*1.5)%4;drawCell(g,visualAssets.ruptorMotion,4,3,frame,-64,-122,128,128);}else if(attack&&visualAssets.attackMotion){const row={VIG:0,ESP:1,ARC:2,BAS:3,DUE:4,LAS:5}[id];drawCell(g,visualAssets.attackMotion,4,6,row*4+Math.min(3,Math.floor(phase*4)),-64,-122,128,128);}else drawCell(g,visualAssets.classes,4,2,CLASS_CELLS[id],-48,-122,96,128);g.shadowBlur=0;
 // Energy is attached to the same transform as the weapon and hand.
 const classEnergy={VIG:'#5dffa5',ARC:'#bb72ff',RUP:'#ffbb4d',LAS:'#748eff',ESP:'#db79ff',DUE:'#ffdb66',BAS:'#7be7ff'}[id];const enchant=a.enchant||0;if(Math.max(enchant,a.secondaryEnchant||0)>=5){const paths={VIG:[[30,-91,41,-34],[-12,-89,-20,-59]],ESP:[[-37,-53,-15,-69],[24,-41,39,-57]],ARC:[[-29,-104,-28,-20],[25,-83,28,-76]],BAS:[[0,-50,37,-26],[-29,-67,-22,-32]],RUP:[[7,-62,63,-29]],DUE:[[-35,-25,-10,-63],[19,-48,36,-22]],LAS:[[-19,-57,40,-33],[25,-81,28,-75]]};for(const [n,[x,y,ex,ey]]of weaponAxes(id,attack,phase,paths[id]).entries()){const rank=n>0?(a.secondaryEnchant??enchant):enchant;if(id==='VIG'&&n===0)drawEnchantedEdge(g,bowPath(attack,phase),rank,t,attack,classEnergy);else drawEnchantedEdge(g,[[x,y],[ex,ey]],rank,t+n*.31,attack,classEnergy);}}

 g.restore();return true;
}

// Energy rises from the weapon axis rather than orbiting the whole character.
export function drawLivingWeaponEnergy(g,x,y,ex,ey,rank,t,attack=false){drawEnchantedEdge(g,[[x,y],[ex,ey]],rank,t,attack);}

export function drawBowEnergy(g,rank,t,attack=false,phase=0,pointsOverride=null){drawEnchantedEdge(g,pointsOverride||bowPath(attack,phase),rank,t,attack);}
