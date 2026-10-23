export const FORM_LEVELS=[1,20,40,60,80,100];
export const PET_FORMS={
 slime:['Gota Astral','Centelha Cristalina','Núcleo Estelar','Espírito Prismático','Guardião Astral','Soberano de Lúmen'],
 fox:['Cria da Lua','Raposa Gêmea','Raposa Lunar','Espírito Pentacauda','Oráculo das Sete','Soberana das Nove'],
 drake:['Filhote do Vazio','Draco Jovem','Draco Safira','Draco Obsidiano','Serpe do Vazio','Dragão Primordial']
};
export function petForm(id,rank=1){const r=Math.max(1,Math.min(100,Math.floor(Number(rank)||1))),stage=Math.max(0,FORM_LEVELS.findLastIndex(n=>r>=n)),row=['slime','fox','drake'].indexOf(id);if(row<0)return null;return {rank:r,stage,row,cell:row*6+stage,name:PET_FORMS[id][stage],level:FORM_LEVELS[stage],nextLevel:FORM_LEVELS[stage+1]||null,nextName:PET_FORMS[id][stage+1]||null};}
