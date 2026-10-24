import {ascensionTier,STYLES} from './ascension.js?v=16';
// Code-native crystal panels: each feather is a separate moving metallic facet.
export function divineWings(rank=40,style='mystic'){
 const tier=ascensionTier(rank),c=rank<10?'#ffffff':STYLES[style]?.color||tier.color;
 return `<div class="divineRelic tier-${tier.key}" style="--relic-color:${c};--relic-level:${rank/50}" aria-label="Asas ${tier.name}, evolução ${rank}"><div class="relicOrbit"></div>${[-1,1].map(side=>`<div class="divineWing ${side<0?'left':'right'}">${Array.from({length:rank>=30?3:1},(_,layer)=>`<div class="wingFan fan-${layer}">${Array.from({length:9},(_,n)=>`<i class="crystalFeather" style="--feather:${n};--fan:${layer}"></i>`).join('')}</div>`).join('')}</div>`).join('')}<div class="wingHeart"></div>${Array.from({length:8},(_,n)=>`<i class="relicMote" style="--mote:${n}"></i>`).join('')}</div>`;
}
export function auraRelic(rank=40,style='mystic'){
 const tier=ascensionTier(rank),c=rank<10?'#ffffff':STYLES[style]?.color||tier.color;
 return `<div class="cssAura tier-${tier.key}" style="--relic-color:${c}">${rank>=20?'<div class="auraVeil"></div>':''}${Array.from({length:rank>=40?4:rank>=20?3:rank>=10?2:1},(_,n)=>n).map(n=>`<i style="--orbit:${n}"></i>`).join('')}<span>✧</span></div>`;
}
export function legendarySwordCard(){return `<article class="legendarySwordCard rarity-legendary"><div class="swordShowcase"><div class="swordEnergy"></div><div class="cssSword"><i class="swordBlade"></i><i class="swordGuard"></i><i class="swordGrip"></i><i class="swordGem"></i></div><span>+25</span></div><div class="swordLore"><small>RELÍQUIA LENDÁRIA · CONCEITO VISUAL</small><h3>Hélion, Fio do Amanhecer</h3><p>Uma lâmina de metal negro atravessada por veios de ouro vivo. Ao despertar, o núcleo projeta um fio de plasma e libera faíscas a cada golpe.</p><div class="swordTraits"><span>✦ Ataque físico</span><span>◆ Dano crítico</span><span>◈ Ampliação de espada</span></div><small>Mostruário de arte. Os valores jogáveis aparecem no equipamento selecionado no inventário.</small></div></article>`;}
