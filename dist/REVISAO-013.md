# Elyndra0.13 · regra, protótipo e validação

## Pets até100

Cada pet muda automaticamente de forma nos níveis1,20,40,60,80e100. São18imagens originais, seis por espécie. A forma não é uma compra extra e não altera o orçamento de atributos; cada nível continua aumentando o bônus.

| Nível | Lúmi | Aelys | Nyx |
|---|---|---|---|
|1|Gota Astral|Cria da Lua|Filhote do Vazio|
|20|Centelha Cristalina|Raposa Gêmea|Draco Jovem|
|40|Núcleo Estelar|Raposa Lunar|Draco Safira|
|60|Espírito Prismático|Espírito Pentacauda|Draco Obsidiano|
|80|Guardião Astral|Oráculo das Sete|Serpe do Vazio|
|100|Soberano de Lúmen|Soberana das Nove|Dragão Primordial|

Lúmi mantém a origem translúcida, mas desenvolve corpo de guardião, cauda e cristais. Aelys muda caudas/armadura; Nyx muda corpo, chifres, asas e placas. O slime é apenas uma opção: os outros pets continuam adquiríveis.

Bônus por nívelr: Lúmi ataque=1%+0,06%r,MP=2%+0,1%r; Aelys dano crítico adicional=1p.p.+0,06p.p.r e precisão=20+3r; NyxAMPespada e magia=1%+0,06%r. No100:Lúmi7%ataque/12%MP,Aelys7p.p.dano crítico/320precisão,Nyx7%AMP. Somente o pet equipado dá atributos. Evolução visual acompanha o nível salvo; não é uma prévia disfarçada de aquisição.

Custo do próximo níveln: personagem>=ceil(2,5n), mínimo5; ouro250n²; vínculoceil(3n^1,2). Sem alteração de preço nesta revisão. No100, botões bloqueiam e nenhuma moeda é debitada. Laboratório pode aplicar uma faixa para inspeção, explicitamente sem ser progressão de campanha.

## Magículas e intimidação

Mantêm bônus reais por nível e índiceμ da revisão anterior. Agora existeLIBERARnoHUD eLIBERARPODERno painel, além da teclaT. Ação emite plasma vertical, ondas de pressão, partículas que se afastam do corpo e descargas em níveis altos. Duração3,2s, recarga20s, sem custo deMP/cash e sem dano ou medo oculto. Não altera ranking. A presença cotidiana é mais discreta para que a liberação represente a demonstração de poder.

Raio de referência em pixels de tela=48+1,05r; altura=110+1,25r; partículas=12+floor(0,6r),máximo72; anéis=1+min(5,floor(r/20)). Efeito é desenhado fora da escala reduzida do herói. Economia usa metade das partículas e no máximo3anéis. A contagem é limitada; não cresce com o tempo de uso. Ativação antes de despertar ou durante recarga não modifica estado nem atributos. Tentar pelo painel durante recarga mostra aviso e conserva a janela aberta.

É uma interpretação original de presença espiritual inspirada na ideia de energia liberada em animes, não uma alegação de regra canônica de uma série.

## Escala e manejo

Herói em paisagem passa de0,64para0,50, redução de21,9%do desenho. NPCs usam62%do desenho original; mobs72%, mantendo chefes proporcionalmente maiores. Posições, distância de ataque e velocidade de jogo permanecem nas unidades do mundo. A redução visual não aumenta o dano nem transforma hitboxes em alvos minúsculos.

Tela de evolução mostra primeiro: nível atual/próximo, poder, AF/AM/HP/MP, ouro, material e os dois botões. Arte ocupa coluna menor. Regras e galeria ficam recolhidas. O próximo aprimoramento mantém a mesma posição; não exige procurar um botão no fim de um texto. Compra comcash continua confirmada e atômica. Evolução com material insuficiente fica desabilitada, com custo e alternativa claros.

## Evidência da validação

Navegador autorizado recuperado, usando prévia gerenciada. Viewports667×375e844×390. Testes realizados pela interface:

- Magículas1→2→3→4por materiais, sem rolar; botão continuou visível.
- Magículas4→5comcash:2.000.000→1.999.850; um débito de150.
- Pet19→20com materiais: forma2aplicada,CentelhaCristalina; forma100SoberanodeLúmenconferida no painel e no mundo.
- Magículas59→60por materiais:+1.765poder. Painel emscrollTop0,sem overflow horizontal.
- Botão de aprimoramento dentro da altura em375e390px. Em844×390,base aproximada320px, mantendo margem.
- Presença60e100observada no mundo; recarga20sfuncional. Tentativa em recarga mostrou19s e conservou o painel aberto.
- Quarta skill estava escondida porCSSantigo; visibilidade corrigida ePassoderecuoconferido noHUD.
- Flechadechoquenoalvo de treino: impacto,dano,atordoamento e recarga18sconfirmados.
- Reload preservou níveis e formas. Troca de faixa para baixo no laboratório agora limitaHP/MP imediatamente aos novos máximos.

71testes automatizados passaram, incluindo formas, limites, sequência, custos, dano e presença. ArquivosJS passam na verificação de sintaxe; recursos locais conferidos. Capturas de tela reais emdocs/qa no repositório. Inspeção utilizou fallbackCanvas2D, com alvo30FPS; isso não é benchmark nem garantia em iPhone/Android físicos. ServidorMMORPG/PvPonline continuam fora da alpha.
