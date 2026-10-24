// Stationary tap latches basic attacks; movement permanently clears that latch.
// Held input still allows attacks while moving. No movement/target action starts combat.
export function createAttackInput(){
  const held=new Set();let latched=false;
  return {
    press(id,{moving=false,active=false}={}){
      if(held.has(id))return;
      held.add(id);
      latched=moving?false:!active;
      if(!moving&&active)held.delete(id);
    },
    release(id){held.delete(id);},
    move(){latched=false;},
    reset(){held.clear();latched=false;},
    get active(){return latched||held.size>0;},
    get latched(){return latched;}
  };
}
