export const CONTINENTS=[
 {name:'Aurion',nation:'Aliança Solar',subtitle:'Portos, cinzas e desertos ancestrais',color:'#e9c67d',cell:0,regions:[0,1,2],fortress:'Bastião da Alvorada'},
 {name:'Vespera',nation:'Domínio Lunar',subtitle:'Montanhas, bosques e fortalezas esquecidas',color:'#af9aff',cell:2,regions:[3,4,5],fortress:'Santuário do Eclipse'},
 {name:'Nhal',nation:'Fronteira disputada',subtitle:'Abismos, impérios e mares de cristal',color:'#e29ce8',cell:1,regions:[6,7,8],fortress:'Coroa de Obsidiana'},
 {name:'Asterion',nation:'Território das Origens',subtitle:'Céus partidos e observatórios primordiais',color:'#87d9fa',cell:3,regions:[9,10,11],fortress:'Observatório do Infinito'}
];
export function continentFor(region){return CONTINENTS.find(c=>c.regions.includes(region))||CONTINENTS[0];}
export function landmarkFor(region){return ['citadelSun','citadelMoon','sanctuary','observatory'][continentFor(region).cell];}
export function citizenPosition(i,t,isBlocked=()=>false){const home={x:10+i*2,y:15},candidate={x:home.x+Math.sin(t*.16+i)*1.2,y:home.y+Math.sin(t*.1+i)*.45};return isBlocked(candidate.x,candidate.y)?home:candidate;}
export function drawStatusEnergy(g,state,t){const colors=[];if(state.eye>0)colors.push('#9effbd');if(state.hasteBuff>0)colors.push('#70e8ff');if(state.timers?.amp>0)colors.push('#d3a0ff');if(state.shield>0||state.guard)colors.push('#f9dc87');if(!colors.length)return;g.save();g.globalCompositeOperation='lighter';colors.slice(0,3).forEach((color,i)=>{g.strokeStyle=color;g.lineWidth=1.4;g.globalAlpha=.55;g.beginPath();g.ellipse(0,-12-i*7,25+i*5,7+i*2,t*.15+i,0,Math.PI*2);g.stroke();for(let n=0;n<4;n++){const a=t*(1+i*.2)+n*Math.PI/2;g.fillStyle=color;g.beginPath();g.arc(Math.cos(a)*(25+i*5),-12-i*7+Math.sin(a)*(7+i*2),1.5,0,Math.PI*2);g.fill();}});g.restore();}
