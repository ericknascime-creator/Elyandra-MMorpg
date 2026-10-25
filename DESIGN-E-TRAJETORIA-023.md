# Elyndra — interface, trajetória e poder visível

## Contrato visual

Preservar as quatro classes e os conjuntos ULTRA aprovados. Identidade: metal escuro, ouro envelhecido, ciano de energia e cor própria da classe. As janelas devem parecer ferramentas do jogo: ícone, título, conteúdo, ação e resultado. Explicações de multiplicadores e laboratório ficam fora da central do jogador. Não afirmar que todos os mapas, animações e sistemas online estão concluídos.

### Componentes e medidas

Referência de teste:667×375, horizontal. Painel máximo:altura da janela−16px; margens laterais próximas de2%; cabeçalho40px; abas26–30px; conteúdo com rolagem própria. Texto principal10–12px, título14–16px, legenda8–9px. Campos de chat16px para evitar zoom ao focar no celular. Botões de combate continuam maiores; slots de equipamento38–44px nos painéis compactos. Números longos usam separadores e alteração em linha própria para não cortar comparações.

- Equipamento: personagem ao centro da metade esquerda; cabeça acima, torso/colar, mãos/pernas, armas e anéis/botas em pares laterais. Dez slots ligados ao inventário real. A mochila ocupa a metade direita e tem rolagem independente. No celular: tocar item, ver atributos, equipar/desequipar. Arrastar da mochila para o slot é uma alternativa de desktop e usa as mesmas validações de classe, nível e combate.
- Atributos: render equipado à esquerda, nome/nível/poder; editor FOR/INT/DES e resultados à direita. Mostrar valores atuais e delta sem duplicar números grandes na mesma linha. Sugestão da classe prepara uma prévia; Aplicar grava os pontos. Trocar de aba não aplica alterações pendentes.
- Habilidades: sete nós com ícones, seleção, nível treinado e requisito. Linhas organizam caminhos de função; não inventam pré-requisitos que o motor não aplica. Treinamento à direita, custo e ação visíveis. Passivas mantêm seleção real e uma ativa. Evolução segue os requisitos existentes até20.
- Evoluções: mostrar separadamente poder total ativo do sistema e ganho da próxima evolução. No máximo, escrever EVOLUÇÃO MÁXIMA, não usar +0 como se o sistema inteiro fosse inútil. Bônus listados da relíquia/signo selecionado refletem a escala avançada aplicada, em vez de somar todos os sistemas cósmicos no mesmo cartão.
- HUD: alvo eHP no topo central; a área sobre o personagem fica para identificação e combate. Não emitir avisos de alcance. Chat compacto acima do joystick, com faixa de espólio separada. O histórico expandido tem conversa local, drops e crônicas. Esta alpha não envia mensagens a outros jogadores.

## O que prende o jogador

Aster transforma pessoas e memórias em poder. Seu nome aparece na lista dos desaparecidos. Ilyra investiga capturas; Borun precisa reparar sua participação; Selene revela a mentira das coroas; Aeris reconhece memórias de sua família dentro do metal. A evolução dá meios para atravessar os reinos, recuperar provas e derrubar guardiões, mas o desfecho depende de completar os atos, não de comprar um número de poder.

O prólogo aparece na entrada e pode ser relido nas Crônicas. O diário mostra uma fala deNPC correspondente à etapa atual; a história completa e os próximos objetivos podem ser expandidos. Esta é narrativa textual com retratos e eventos jogáveis, sem dublagem, cinematográficas ou escolhas ramificadas de cidades.

### Trajetória do personagem

| Faixa | Objetivo e decisão de build | Conteúdo disponível / próximo marco |
|---|---|---|
|1–24|Aprender movimento, alcance, esquiva, poções e alvo; falar comIlyra e investigar o farol|Introdução, primeiraDG, primeiro ato; pet inicial, asas e aura ao atingir requisitos|
|25–99|Preencher o set; distribuir5pontos por nível e escolher habilidades de suporte|Regiões e capítulos locais, contratos, DGs e chefes; preparar a rota dos exilados|
|100–174|Criar uma especialização: crítico/velocidade no arqueiro, magia/AMP no mago, espada/AMP no guerreiro, combos no espadachim|Segundo ato, progressão regional e fontes de materiais;XP já desacelera após150|
|175–249|Escolher três opções nativas e runas úteis; conquistar extensor e materiais de chefes|Cataclismos, terceiro encaixe, famíliasSS+ e superiores; preparação para aOrigem|
|250–599|ConstruirULTRA e perseguir rolagens melhores sem confundir nativos e encantamento|Terceiro ato; aprimorar a base até+100, evoluir asas/aura/companheiros, explorar os domínios altos|
|600–749|Reorganizar limites e resistências após a escala avançada; escolher onde investir o farm|Quarto ato, forjas e biblioteca, treinamento de nível e materiais de evolução|
|750–849|Escolher foco de relíquia de acordo com a classe e a combinação real de atributos|Relíquias, cripta dosArcontes, preparação das assinaturas|
|850–999|Desenvolver signos e otimizar penetração, crítico, AMP e sobrevivência; não desperdiçar atributos acima de tetos|Quinto ato e limiar; avanço mais lento, custos visíveis e requisitos preservados|
|1000|Concluir o sexto ato, vencer aOrigem e provar domínio da build|Três Desafios doLegado, títulos por vitória e melhor tempo; aperfeiçoamento de itens e registros locais|

A curva extrema de35anos foi solicitada e confirmada pelo usuário na revisão anterior. Continua sendo uma referência de orçamento de farm a2h/dia, não uma garantia de duração real nem bloqueio de calendário. Custos e dados completos permanecem na documentação técnica0.22; não ocupam uma sessão de explicações no centro do jogo.

### Depois de ficar forte: conteúdo implementado nesta revisão

Três provas solo de nível1000: Vigília daOrigem, Ruptura doPacto e Ascendência doLegado. O guardião usa1×,2× e4× o orçamento deHP da primeira prova. Vitórias registram melhor tempo, quantidade de conclusões e títulos. A primeira vitória concede respectivamente1,2 e3Núcleos Soberanos; repetir não duplica o prêmio único. O título conquistado fica na identificação do personagem.

Essas provas são encontros locais reaproveitando a arena e o guardião existentes; não são três novos mapas artesanais. São uma ponte jogável para o fim de jogo, não um substituto para competição humana.

### Fim de jogo online: ainda não implementado

Guerras de nação, cercos de guilda, territórios temporários, chat entre contas, economia de leilão e temporadas competitivas precisam de servidor autoritativo, identidade, persistência e regras antifraude. O objetivo planejado é proteger rotas, conquistar fortalezas e ganhar troféus de contribuição. Esses objetivos não serão apresentados como funcionais nesta alpha local. Cash real também não está implementado.

## Armas: cálculo e apresentação

O erro do arco era de apresentação: o inspetor somavaAF/AM paraATK e depois removia a linhaATK por detectar os campos antigos. A linha passa a exibir a base unificada com encantamento, precisão e assinatura crítica fixa.

Assinaturas fixas por qualidade: B1pp crítico/2pp dano crítico; A2/4; S2,5/6; SS3/8; SS+4/10; SSS5/12; SSS+6/15; ULTRA8/18 para a principal. A secundária usa metade desse orçamento. A daikatana de duas mãos usa1,5× e ocupa ambos os espaços: o total é igual ao par de outras classes. D/C preservam crítico inicial de personagem sem assinatura adicional. Crítico fixo não escala com encantamento; opções sorteadas e runas continuam separadas.

ATK é convertido no canal da classe pelo motor. Arqueiro passa de11para16unidades de alcance básico, e Flecha/Marca17. Seleção retém alvos até pelo menos20unidades; não há aviso de alcance sobre o personagem. O alcance maior não significa que o arqueiro tenha o mesmo alcance de qualquer outra classe; esse é seu papel.

## Efeitos vivos

- Arma: chamas aderentes à geometria medida da lâmina/arco, com gradiente na cor da classe, núcleo luminoso e línguas que se deformam com o tempo. A cor não precisa ser vermelha. A quantidade e altura crescem com o estágio de encantamento. O mesmo+100vale para qualquer raridade; modelo exclusivo continuaULTRA.
- Magículas: seis estágios, de centelha até manto de pressão;2a12línguas de energia e6a21centelhas, com corpo visível, núcleo claro e camadas dianteira/traseira. No500, altura/radius e quantidade destacam a presença. Não é habilidade ativável nem objeto astronômico literal. Asas e aura continuam camadas separadas.
- Sem prometer efeito de vídeo: o desenho é calculado peloCanvas a cada quadro, com budgets limitados. A mesma gramática pode ser refinada por classe sem substituir regras de combate.

## Auditoria de poder

O zero nas evoluções máximas era o delta da próxima evolução, não a contribuição do sistema. O novo painel calcula contribuição marginal removendo apenas o sistema em uma cópia do personagem. Como os bônus interagem, contribuições não devem ser somadas como uma decomposição aditiva exata do poder total.

Exemplo da buildGM do arqueiro nesta revisão: relíquia853.858; signos1.227.426; asas6.118.629; aura4.512.994; Magículas7.448.605; pet351.409; montaria1.094.295; alma1.564.175 de contribuição marginal. Os testes verificam valores positivos nas quatro classes e que essa análise não altera o save.

## Validação e limites

127testes passaram antes da inspeção visual, incluindoATK no inspetor, crítico fixo com orçamento equivalente, contribuições reais dos sistemas no máximo, registros e recompensas únicas deLegado, nós funcionais da árvore, histórico limitado de chat e mudanças de inventário no feed. Verificação de navegador horizontal é feita em667×375; não equivale a validação física em iPhone/Android nem certificado de equilíbrioPvP. Cada ajuste de layout observado será registrado na revisão.

### Inspeção visual concluída

No navegador667×375: prólogo em três páginas, equipamento/desequipamento do arco com diferença real de5.352.295poder, navegação entre os três painéis, seleção de nós da árvore, chat local com entrada de texto e primeira prova deLegado concluída. O registro mostrou1vitória e11,8s. Capturas reais ficam em `docs/qa/`. Ajustes observados: comparação numérica cortava em colunas estreitas; foi trocada por valor atual e delta separado. Nome duplicado foi removido. A ação de distribuição foi alinhada em34px. Materiais raros e equipamento ficam no fim do lote de logs, priorizando sua exibição nas duas linhas compactas.
