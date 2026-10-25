// Bounded four-neighbour pathfinding for the 65×65 isometric world.
export function findPath(start,goal,isBlocked,size=65){
 const inside=(x,y)=>x>=0&&y>=0&&x<size&&y<size;
 let gx=Math.round(goal.x),gy=Math.round(goal.y);if(!inside(gx,gy)||isBlocked(gx,gy)){let found=null;for(let r=1;r<=3&&!found;r++)for(let dx=-r;dx<=r&&!found;dx++)for(let dy=-r;dy<=r;dy++)if(inside(gx+dx,gy+dy)&&!isBlocked(gx+dx,gy+dy)){found={x:gx+dx,y:gy+dy};break;}if(!found)return [];gx=found.x;gy=found.y;}
 const sx=Math.round(start.x),sy=Math.round(start.y);if(!inside(sx,sy))return [];const key=(x,y)=>y*size+x,first=key(sx,sy),last=key(gx,gy),parents=new Int32Array(size*size).fill(-1),queue=[first];parents[first]=first;
 for(let i=0;i<queue.length&&parents[last]<0;i++){const id=queue[i],x=id%size,y=Math.floor(id/size);for(const [dx,dy] of [[1,0],[0,1],[-1,0],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(!inside(nx,ny)||parents[k]>=0||isBlocked(nx,ny))continue;parents[k]=id;queue.push(k);}}
 if(parents[last]<0)return [];const path=[];for(let k=last;k!==first;k=parents[k])path.push({x:k%size,y:Math.floor(k/size)});return path.reverse();
}
