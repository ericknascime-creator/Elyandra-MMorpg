# Elyndra 0.7 — Atributos e referência Cabal

## Referências verificadas em 23/10/2026

- [Forcebook oficial: atributos](https://www.cabal.co.kr/gameInfo/forcebook/캐릭터능력치).
- [Warrior](https://www.cabal.co.kr/gameInfo/forcebook/워리어), [Blader](https://www.cabal.co.kr/gameInfo/forcebook/블레이더), [Wizard](https://www.cabal.co.kr/gameInfo/forcebook/위저드).
- [Force Shielder](https://www.cabal.co.kr/gameInfo/forcebook/포스%20실더), [Force Blader](https://www.cabal.co.kr/gameInfo/forcebook/포스%20블레이더), [Force Archer](https://www.cabal.co.kr/gameInfo/forcebook/포스%20아처).

Referência confirmada: taxa crítica inicial5%, limite inicial50%, dano crítico adicional inicial20%; ataque e amplificação de espada/magia separados; crítico e resistências; defesa e penetração. Não é uma reprodução exata do servidor Cabal. Curvas, equipamentos, coeficientes de skill, acerto, poder, progressão250 e marcos25/50 são regras próprias de Elyndra. O arqueiro físico solicitado pelo jogador difere do Force Archer mágico de Cabal. As classes Espectro e Duelista também são adaptações próprias.

## Crescimento por nível e identidade

Cada nível ganho concede5 pontos; nível250 soma1245 pontos livres. Os atributos também concedem marcos cumulativos: FOR25→HP+0,5%; FOR50→dano crítico+1p.p.; INT25→MP+0,5%; INT50→AMP mágica+1p.p.; DES25→taxa crítica+0,25p.p.; DES50→velocidade+0,5%. Os coeficientes por ponto constam em `dist/attributes.js`; a sugestão é editável e pode ser redistribuída fora de combate.

| Classe | HP/nível | MP/nível | AF/nível | AM/nível | DEF/nível | Foco de distribuição |
|---|---:|---:|---:|---:|---:|---|
| Vigia |30|3|5|1|2,6|20%FOR,80%DES|
| Espectro |28|3|5,4|1|2,4|40%FOR,60%DES|
| Arcanista |24|6|1|6|2|10%FOR,80%INT,10%DES|
| Bastião |44|3|4,2|1,4|4,5|70%FOR,10%INT,20%DES|
| Ruptor |38|2,5|6,5|1|3,5|80%FOR,20%DES|
| Duelista |32|3,5|5,2|1|2,8|60%FOR,40%DES|
| Lâmina Astral |31|4,5|4,3|3,2|3|40%FOR,30%INT,30%DES|

As somas AF/AM originais dos equipamentos novos são preservadas. Itens antigos com apenas `atk` recebem afinidade por classe na leitura (mago: AM; híbrido:65%AF/35%AM; demais:AF). O indicador Ataque foi separado em físico/mágico na ficha. Itens antigos não são rerrolados na migração. Novos pools de opções do mago, híbrido e tanque passam a oferecer dano crítico; joias SS+ ou superiores podem rolar limite crítico (1/1,5/2/3p.p. por qualidade). A rolagem continua aleatória; ter o atributo não garante seu teto.

## Equações implementadas

- Chance crítica efetiva = max(0,min(taxa bruta +buff,limite) − max(0,resistência − ignorar resistência)). Excedente acima do limite não serve de reserva contra resistência.
- Multiplicador crítico = max(1,20;1+bônus crítico − resistência efetiva). Não existe mais o teto arbitrário de150% adicional da alpha antiga.
- AMP útil = max(0,AMP do tipo − resistência efetiva). Habilidade física usa AF/AMP espada; magia usa AM/AMP magia. Lâmina: Iaijutsu físico, Corte rúnico mágico, Eclipse65%AF+35%AM e amplificação ponderada. Tiros básicos do Vigia não recebem AMP.
- Redução por defesa = clamp(max(0,DEF−PEN)/(1000+max(0,DEF−PEN)),0,003;0,95). A função racional é própria de Elyndra; os limites0,3% e95% seguem o Forcebook.
- Dano = max(1,arredondar(ataque×coeficiente×(1+AMP útil)×modificadores×crítico×(1−redução)−redução fixa)). Efeitos periódicos guardam a afinidade da skill de origem. Precisão/evasão são verificadas antes do dano.
- Recarga = max(0,2s;(recarga base−redução passiva)×(1−CDR)). CDR máximo local50%; máscara radial usa a duração real inicial da recarga.

`pen` é penetração geral, útil também em magia; `penM` acrescenta penetração exclusivamente mágica. O HP/MP e as resistências de itens, ignorados em partes da alpha anterior, agora participam dos cálculos implementados. Tenacidade e bônus exclusivos de PvP continuam reservados ao servidor de PvP; não inflam o poder atual.

## Poder e limites da simulação

Poder estima dano esperado por segundo e sobrevivência contra referência do mesmo nível. Usa taxa efetiva, dano crítico, intervalo de ataque, AF/AM úteis, amplificação da habilidade, precisão, penetração, CDR, HP, defesa, evasão e resistências defensivas. Peso de skills:12%Vigia,90%mago,65%demais. São pesos locais para estimativa, não probabilidades nem garantias de vitória. Status errados para o tipo de ataque e excesso de crítico não acrescentam dano ou poder.

A arena local não representa PvP real: o alvo não ataca, não dá loot/EXP e volta ao HP máximo quando derrotado. Serve para observar as skills e suas recargas. Grupos, resistência entre jogadores, latência, guerra e ranking global ainda precisam do servidor autoritativo e de balanceamento com telemetria real.

## Relíquias e cash

Asas e aura vão de0 a50. Faixas1–9Comum,10–19Raro,20–29Épico,30–39Lendário,40–49Divino,50Ultra. Evolução50 exige personagem250. Custos: ouro500×nível²; materiais ceil(5×nível^1,55); núcleos desde35. Bônus anteriores dos primeiros10níveis são preservados; os40seguintes dão25% do ganho por nível inicial. Asas50:24%ataque+400precisão. Aura50:16%HP,24%DEF,10p.p.dano crítico.

Serviço cash compra apenas faltantes, usa materiais próprios primeiro e executa uma ação atômica. Asas/aura:150serviço+8por material+1000por núcleo faltante+ceil(ouro faltante/50). Encantamento:200serviço+100por cristal faltante+ceil(ouro faltante/50), uma tentativa com chance e garantia normais, apenas base aumenta. Terceiro slot:25000extensor+500aplicação; nível175+, peça175+,SS+ou superior,2slots. O extensor também existe na loja e no loot de Cataclismos. Comprar o extensor na loja não o aplica automaticamente; o botão do item compra e aplica no mesmo fluxo.

Recarga monetária não conectada. Cash no laboratório é moeda de teste. Não existe cobrança real nesta versão.
