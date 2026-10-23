// Coordinates measured from the original class and attack atlases, in rendered sprite units.
export const BOW_IDLE=[[-42,-36.5],[-31.75,-39.75],[-16,-39],[-1,-45.75],[16.5,-51.5],[29.75,-62.5],[39.25,-80.5],[43.5,-88.25]];
export const BOW_ATTACKS=[[[36,-118],[40.5,-107],[40.5,-91],[38.5,-74.5],[36,-57],[27,-37],[16,-23],[14,-16.5]],[[33,-120],[38,-103],[37,-75.5],[34.5,-57],[26.5,-34],[17.5,-18]],[[36,-118],[40,-102],[39,-62],[25,-27],[13.5,-17]],[[45.5,-63],[42,-46.5],[27,-33],[10,-28],[-3.5,-31.5]]];
export function bowPath(attack=false,phase=0){return attack?BOW_ATTACKS[Math.min(3,Math.max(0,Math.floor(phase*4)))]:BOW_IDLE;}
export function samplePath(points,progress){let total=0;const lengths=points.slice(1).map((p,i)=>{const d=Math.hypot(p[0]-points[i][0],p[1]-points[i][1]);total+=d;return d;});let at=Math.max(0,Math.min(1,progress))*total;for(let i=0;i<lengths.length;i++){if(at<=lengths[i]||i===lengths.length-1){const f=lengths[i]?at/lengths[i]:0,a=points[i],b=points[i+1];return {x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f,angle:Math.atan2(b[1]-a[1],b[0]-a[0])};}at-=lengths[i];}return {x:points[0][0],y:points[0][1],angle:0};}
// Axes measured per cell of the 256px attack atlas, converted to its 128px draw size.
const ATTACK_AXES={
 RUP:[ [[-30,-106,32,-121]], [[0,-111,-62,-117]], [[23,-56,63,-16]], [[24,-48,63,-25]] ],
 ESP:[ [[-35,-84,-60,-58],[28,-43,53,-20]], [[-27,-73,-61,-94],[26,-73,64,-65]], [[-24,-82,-55,-76],[43,-51,56,-54]], [[-38,-46,-56,-29],[39,-44,59,-29]] ],
 ARC:[ [[-18,-87,-32,-113],[23,-90,23,-90]], [[5,-75,32,-99],[-10,-69,-10,-69]], [[18,-75,50,-80],[50,-80,50,-80]], [[-17,-84,-18,-116],[39,-91,39,-91]] ],
 BAS:[ [[-18,-99,-53,-80],[24,-63,24,-32]], [[20,-35,55,-51],[23,-69,33,-52]], [[-12,-84,-55,-94],[38,-50,42,-28]], [[-28,-53,-42,-54],[25,-74,32,-31]] ],
 DUE:[ [[-9,-87,17,-61],[18,-84,38,-82]], [[31,-82,63,-77],[-8,-79,20,-65]], [[-19,-88,23,-70],[23,-70,63,-65]], [[-31,-53,-52,-16],[26,-51,39,-16]] ],
 LAS:[ [[-18,-72,54,-69],[23,-106,23,-106]], [[-5,-84,-58,-89],[37,-79,63,-74]], [[-16,-80,54,-52],[29,-78,29,-78]], [[-23,-55,-61,-10],[43,-103,43,-103]] ]
};
export function weaponAxes(id,attack,phase,idle){return attack&&ATTACK_AXES[id]?ATTACK_AXES[id][Math.min(3,Math.max(0,Math.floor(phase*4)))]:idle;}
