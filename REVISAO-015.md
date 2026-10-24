# Elyndra0.15 — oficina de evolução

## Problema observado e desenho
A capturaIMG_0188 mostra aura83/100,100marcas luminosas, personagem ocupando uma coluna enorme e botões fora do quadro visível. O novo painel usa prévia reduzida, nível numérico, duas ações no topo, ganho de poder e custos. Estilos, regras e seletor de prévia ficam recolhidos. Não se removeu o sistema de Magículas: a central Evoluir ganhou acesso explícito e as relíquias têm abaMagículas. O efeito permanece contínuo, sem habilidade de liberação.

## Treinamento de skills
Todos os sete personagens têm7skills, cada uma com20níveis. Save antigo começa no1, sem cobrança retroativa. O treino é garantido, salvo localmente e bloqueado em combate. Não há compra real.

Para skill de índicei, desbloqueioU=[1,10,25,45,70,8,130], nível atualr e próximo r+1:
- personagem mínimo=ceil(U+(250−U)×r/19);
- ouro=100×r²; suprema custa3vezes esse valor;
- cristais=ceil(r/3);
- multiplicador de dano=1+0,02×(r−1);
- multiplicador do custoMP=1−0,01×(r−1), arredondando custo final para cima;
- barreira/ampliação=valor base×(1+0,01×(r−1));
- cada nível treinado dá2HP,4MP e2precisão permanentes.

No20: +38%dano da própria skill, até19%menosMP e19%mais potência para barreira/amp. Básicos não recebem multiplicador de skill. Stun, alcance, invulnerabilidade, recarga e duração de buff não crescem com treino. Skills de suporte sem dano continuam escalando eficiência e domínio permanente. Os bônus da barreira eAMP são aplicados no estado de combate ao conjurar.

O poder ofensivo usa a média das skills de dano com seus níveis individuais, ponderada pela participação de básicos da classe; atributos permanentes entram na mesma fórmula de sobrevivência/precisão. Não se adicionam pontos de poder arbitrários por nível. A fórmula média é uma referência de ranking, não garantia de vitória.

Exemplo matemático: magia que causa10.000em condições constantes no1 causa13.800no20, antes do arredondamento; o básico permanece igual. PvP preserva os limites existentes de dano por impacto. Skill sem custoMP não ganha mana negativa nem vantagem falsa de custo.

## Méritos divinos
SSS+ Nv215+ é patamarDivino; ULTRA Nv250 usa o segundo valor. Cada parte possui um mérito fixo, separado das3opções aleatórias e dos slots. Três canais selecionados no máximo; pode liberar canais mesmo sem peça elegível equipada. Só peça equipada concede bônus. Troca bloqueada em combate; +25 e terceiro slot não multiplicam méritos.

|Parte|Mérito|Divino|Ultra|
|---|---|---|---|
|Principal|Fenda do Éter|Ignora2p.p.resistênciaAMP|4p.p.|
|Secundária|Espelho Astral|Resistência dano crítico4p.p.|8p.p.|
|Corpo|Pele de Constelação|Redução40por impacto|80|
|Cabeça|Mente Atemporal|Recarga1p.p.|2p.p.|
|Mãos|Toque Inevitável|Ignora1p.p.resistência taxa crítica|2p.p.|
|Pernas|Memória do Vazio|ResistênciaAMP2p.p.|4p.p.|
|Pés|Passo Dimensional|Movimento1,5%|3%|
|Colar|Olhar do Infinito|Limite crítico1p.p.|2p.p.|
|AnelI|Vontade Soberana|Resistência taxa crítica1p.p.|2p.p.|
|AnelII|Órbita Arcana|ResistênciaAMP1p.p.|2p.p.|

Recarga continua limitada globalmente a50%, limite crítico a95%. Ignorar resistência nunca produz resistência negativa. Redução de dano nunca reduz golpe acertado abaixo de1. Sem soma de10méritos: só três seleções, padrão principal/corpo/pés. Ruptor não recebe mérito extra de secundária, pois sua arma continua unificada.

Exemplo:80%AMP contra20%resistência produz multiplicador1,60; FendaUltra reduz resistência efetiva para16%, elevando para1,64, aproximadamente2,5%mais dano nesse cenário. Os80de redução equivalem a0,8%de um impacto de10.000, tendo maior valor contra ataques pequenos. Movimento melhora reposicionamento real; poder considera modestamente essa utilidade.

## Validação
83testes passaram: migração de skill, limites/custos/atomicidade,49upgrades aumentando atributos e poder,38%exatos no dano com básico intacto, requisitos dos méritos, três canais, desequipamento e redução real de dano.
Navegador896×358 e667×375: botão da aura visível até174/182px, duas evoluções80→82sem rolar; Magículas60→61, +1.825poder; Flecha1→2,100ouro+1cristal, +1.522poder; botão de treinar até152px. Não substitui testes físicos em iOS/Android nem balanceamento multiplayer. Cash segue simulado e o jogo é alpha solo.
