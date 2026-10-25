import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {loadSaga,sagaObjective,sagaProgress,claimSaga} from '../dist/saga.js';
import {terrain,blocked} from '../dist/world-layout.js';import {findPath} from '../dist/navigation.js';
const data=JSON.parse(readFileSync(new URL('../dist/saga.json',import.meta.url)));
await loadSaga(async()=>({ok:true,json:async()=>structuredClone(data)}));
test('six acts require actual exploration, combat, dungeon and correct boss; rewards never duplicate',()=>{
 const p={level:1000,region:0,zone:'coast',x:12,y:12,gold:0,materials:{}};
 for(const a of data.acts){p.region=a.region;for(const k of a.steps){if(k.type==='visit'){p.x=k.x;p.y=k.y;}assert.equal(sagaProgress(p,{type:k.type,region:999,level:1000,zone:'coast',division:k.division}),false);for(let i=0;i<k.target;i++)sagaProgress(p,{type:k.type,region:a.region,level:1000,zone:'coast',division:k.division});}assert(sagaObjective(p).ready);p.x=p.y=12;const old=p.gold;assert(claimSaga(p).ok);assert.equal(p.gold-old,a.reward.gold);assert(!claimSaga(p).ok);}
 assert.equal(sagaObjective(p),null);assert.equal(p.saga.titles.length,6);
});
test('locked acts and training cannot advance; distant sites have reachable roads in every region',()=>{
 const p={level:1,region:0,zone:'coast',x:46,y:18};assert(!sagaProgress(p,{type:'visit',region:0,training:true}));
 p.saga={act:5,step:0,count:0,titles:[]};assert(!sagaProgress(p,{type:'visit',region:20}));
 for(let region=0;region<21;region++)for(const goal of [{x:46,y:18},{x:54,y:43},{x:47,y:27}]){const path=findPath({x:12,y:14},goal,(x,y)=>blocked(x,y,'coast',region));assert(path.length>0,region+JSON.stringify(goal));assert(path.every(v=>!blocked(v.x,v.y,'coast',region)));}
 assert.equal(terrain(66,18,'coast'),'water');assert.equal(terrain(54,43,'coast'),'path');
});
