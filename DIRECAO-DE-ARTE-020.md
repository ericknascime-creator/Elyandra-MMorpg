# Elyndra — revisão de direção de arte0.20

## Correção do briefing
A comparação com fenômenos astronômicos pedia intensidade e beleza. Não autorizava substituir a presença do personagem por buraco negro, planetas ou astrolábios flutuantes. Esses desenhos são retirados da representação e dos nomes; compras/estilos já salvos são migrados sem apagar progresso ou cobrar de novo.

## Referências visuais efetivamente inspecionadas
- Screenshot oficial Crystal Saga/R2: https://static.r2games.com/artwork/screenshot%20by%20s12.%28e1%29poopayx1.jpg — personagem pequeno sobre ponte; asas com penas longas e curvadas, duas curvas luminosas ascendentes, base circular dourada/ciano. A silhueta continua identificável.
- Painel oficial Soul: https://static.r2games.com/guideimg/333a%20%282%29.jpg — moldura metálica, motivos ornamentais e hierarquia de seleção/requisito/ação. Referência de linguagem, não arte incorporada.
- Imagens enviadas pelo usuário de jogos mobile: efeito de corte nasce na arma e ocupa arco coerente com golpe; HUDcompacto; alvo central; cenário e personagem continuam legíveis.
- Atlas existentes de Elyndra inspecionados para conservar as sete classes, suas armas e armaduras.

## Desenhar antes de integrar
1. Prancha de conceito original: guerreiro, arqueiro e mago com silhuetas atuais; asas orgânicas, energia aderente ao metal, aura que nasce no chão e impacto com forma. Prancha identificada como estudo visual, não como screenshot de entrega.
2. Atlas de seis evoluções de asas: seis pares distintos em grade3×2, fundo transparente; células independentes. Penas e cristais com volume e ponta reconhecível, não diagramas.
3. Atlas de oito texturas de efeitos em grade4×2: chama/rastro de lâmina, rastro de flecha, núcleo de magia, impacto cristalino, golpe crescente, selo de chão, fita ascendente, glint. Movimento fica no renderizador, não numa imagem achatada.
4. Implementar somente após inspeção dos assets. Comparar a aparência integrada com a intenção do desenho, sem afirmar equivalência entre conceptart e jogo.

## Camadas e limites
- Metal/tecido do personagem: source-over, sem brilho no sprite inteiro.
- Arma: fluxo estreito no eixo medido da peça; borda colorida +núcleo fino +glints esparsos +plumas de energia. Principal e secundária têm intensidade própria. Arco usa caminho curvo, não linha reta no ar.
- Asas: atrás do corpo, seis silhuetas por evolução; cada metade se move a partir da raiz, ponta tem filamentos/glints. Interior da asa nunca vira disco branco.
- Aura: um selo de chão nítido e uma camada secundária lenta; fitas sobem pelos lados e deixam o rosto/peitoral livre. Giro no eixo próprio, sem girar o personagem.
- Magículas: manto de pressão composto por faixas ascendentes, em duas passadas, sem objeto flutuante. Estilos se diferenciam por desenho, movimento e paleta. Evolução0–500 preservada.
- Magia: preparação→trajetória→contato→dissipação. Forma da magia não é o mesmo círculo de todas as classes. Materiais e forma coerentes com a classe.
- Tela: nomes e alvo desenhados depois dos efeitos; partículas com capacidade limitada; modo econômico reduz sobreposição, sem modificar dano.

## Identidade por classe
|Classe|Trajetória|Contato|
|---|---|---|
|Vigia|Flecha fina com cauda verde/dourada; brilho segue a curvatura do arco|Estilhaços estreitos e ponta de luz|
|Espectro|Duas incisões violeta em direções alternadas|Marca emX pequena e fragmentos rápidos|
|Arcanista|Lança de gelo/luz, cometa de mana e tempestade de cristais|Flor cristalina com pétalas/estilhaços; sem ponto branco gigante|
|Bastião|Investida dourada e arco de escudo|Selo protetor e fragmentos de impacto baixo|
|Ruptor|Arco pesado largo, ponta luminosa e rastro breve|Fenda no solo e leque de lascas|
|Duelista|Dois cortes cruzados com intervalo e direções próprias|Duas linhas de impacto e faíscas finas|
|Lâmina Astral|Corte crescente índigo e fita rúnica|Pétalas curvas e runas no contato|

## Aceite
Nenhum nome/objeto astronômico nas telas equipáveis; saves e compras preservados. Nenhuma mudança de fórmula/dano. Armasbrilham no próprio eixo emparado/ataque. Asas têm6silhuetas e movimento por metade; aura não é5selos idênticos acumulados. Skillspossuem preparação/trajetória/contato. Validar painel/combate em896×358e667×375, comparar imagem e executar testes antes de publicar. Não prometer animação esquelética de8direções onde o atlas ainda tem4poses.
