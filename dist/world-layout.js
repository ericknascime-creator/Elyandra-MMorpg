function oldTerrain(x,y,zone,region=0){if(zone==='dungeon')return x<3||y<3||x>32||y>32?'void':'stone';if(x<0||y<0||x>42||y>42)return 'water';if(region>=12){if(x<1||y<1||x>40||y>40)return 'water';if(Math.hypot(x-12,y-13)<4||Math.hypot(x-28,y-9)<4)return 'path';return Math.abs(x-y)<1.5||Math.abs(x+y-40)<2?'path':Math.sin(x*.19+region)*Math.cos(y*.17)>.78?'water':'grass';}if(region>0){if(x<1||y<1||x>40||y>40)return 'water';if(Math.hypot(x-12,y-13)<3||Math.hypot(x-28,y-9)<3)return 'path';if(region===2)return Math.abs(y-(24-Math.sin(x*.18)*7))<1.4?'path':'grass';if(region===3)return Math.abs(y-20)<5&&Math.abs(x-12)>2&&Math.abs(x-28)>2?'water':Math.abs(x-12)<1.5||Math.abs(x-28)<1.5||Math.abs(y-20)<1.5?'path':'grass';if([5,7,11].includes(region))return Math.abs(x-12)<1.5||Math.abs(y-13)<1.5||Math.abs(x-28)<1.5||Math.abs(y-28)<1.5?'path':'grass';if([6,9,10].includes(region))return (Math.abs(x-y-8)<2||Math.abs(x+y-28)<2)?'path':(Math.sin(x*.22)*Math.cos(y*.27)>.65?'water':'grass');if([4,8].includes(region))return Math.abs(y-(16+Math.sin(x*.2)*7))<1.6?'path':Math.hypot(x-27,y-26)<4?'water':'grass';if(region===1)return Math.abs(y-(14+x*.45))<1.5?'path':'grass';}const shore=33+Math.sin(y*.23)*2.6;if(x>shore)return 'water';if(x>shore-2)return 'sand';return Math.abs(y-(18+Math.sin(x*.15)*2))<1.3||Math.abs(x-12)<1.1&&y<19?'path':'grass';}
export const WORLD_SIZE=65;
export function terrain(x,y,zone,region=0){
 if(zone==='dungeon')return oldTerrain(x,y,zone,region);
 if(x<1||y<1||x>63||y>63)return 'water';
 // A guaranteed road connects the old harbor to two new districts.
 if(x>=28&&x<=56&&Math.abs(y-18)<1.6||x>=44&&x<=56&&Math.abs(y-43)<1.6||Math.abs(x-54)<1.6&&y>=17&&y<=55||Math.abs(x-47)<1.6&&y>=17&&y<=43)return 'path';
 if(x>40||y>40)return Math.abs(x-y-5)<1.5?'path':'grass';
 return oldTerrain(x,y,zone,region);
}
export function blocked(x,y,zone,region=0){return ['water','void'].includes(terrain(x,y,zone,region));}
