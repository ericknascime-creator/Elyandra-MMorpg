// Official Cabal equipment slot table, adapted to Elyndra's level bands.
// https://www.cabal.co.kr/gameInfo/forcebook/장비슬롯확장
export const SOCKET_GRADES=[{name:'Médio',min:1,amp:[7,8],critd:[10,12,25],atk:[25,40],hp:[50,80],def:[15,25],precisao:[100,150]},{name:'Alto',min:100,amp:[7,9],critd:[10,14,30],atk:[35,55],hp:[70,100],def:[25,40],precisao:[150,200]},{name:'Altíssimo',min:175,amp:[7,10],critd:[10,16,36],atk:[45,70],hp:[100,150],def:[35,55],precisao:[200,250]},{name:'Transcendente',min:250,amp:[8,11],critd:[12,18,40],atk:[60,90],hp:[150,230],def:[45,70],precisao:[250,300]}];
export function socketGrade(item){return SOCKET_GRADES.filter(g=>(item.level||1)>=g.min).at(-1);}
export function runeValue(item,rune,index=0){const g=socketGrade(item),extended=item.slots===3,factor=item.classId==='RUP'&&item.slot==='weapon'?2:1,type=rune.type;let value;
if(type==='ampF'||type==='ampM')value=g.amp[extended?1:0]/100;
else if(type==='critd'){value=g.critd[extended?1:0]/100;if(extended&&item.runes?.slice(0,index).filter(r=>r.type===type).length>=2)value=(g.critd[2]-g.critd[1]*2)/100;}
else if(type==='crit'){value=extended?.08:.05;if(extended&&item.runes?.slice(0,index).filter(r=>r.type===type).length>=2)value=.02;}
else if(g[type])value=g[type][extended?1:0];
else value=rune.value||0;
return Math.round(value*factor*100000)/100000;}
export function runeChoices(item,classId){return ['critd','crit',classId==='ARC'?'ampM':'ampF','atk','hp','def','precisao'].map(type=>{const rune={type,rule:'cabal05'},mock={...item,runes:[...(item.runes||[]),rune]};return {...rune,value:runeValue(mock,rune,mock.runes.length-1)};});}
