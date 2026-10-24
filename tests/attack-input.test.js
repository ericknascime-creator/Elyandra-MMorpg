import test from 'node:test';
import assert from 'node:assert/strict';
import {createAttackInput} from '../dist/attack-input.js';
test('quick stationary tap survives release and repeats until toggled',()=>{const a=createAttackInput();a.press(1);a.release(1);assert.equal(a.active,true);a.press(2,{active:a.active});a.release(2);assert.equal(a.active,false);});
test('joystick cancels stationary auto attack and does not resume on stop',()=>{const a=createAttackInput();a.press(1);a.release(1);a.move();assert.equal(a.active,false);assert.equal(a.latched,false);});
test('held attack while kiting ends on release; both pointer release orders work',()=>{for(const releaseBeforeMove of [true,false]){const a=createAttackInput();a.press(1);if(releaseBeforeMove)a.release(1);a.move();if(!releaseBeforeMove){assert.equal(a.active,true);a.release(1);}assert.equal(a.active,false);}const a=createAttackInput();a.press(3,{moving:true});assert.equal(a.active,true);assert.equal(a.latched,false);a.move();a.release(3);assert.equal(a.active,false);});
test('menus, blur and zone changes clear all held inputs and latch',()=>{const a=createAttackInput();a.press(1);a.reset();a.release(1);assert.equal(a.active,false);});
