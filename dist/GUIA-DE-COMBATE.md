# Elyndra · especificação de combate e experiência 0.11

Implementação original de fantasia e tecnomagia. Os números abaixo descrevem o código desta versão. Referências de Cabal orientam a separação dos atributos; não temos acesso à fórmula privada de seu servidor. A alpha é solo, com dados locais. PvP abaixo é laboratório matemático; guerra, guildas e economia multiplayer ainda exigem servidor autoritativo.

## Identidade das sete classes

| Classe | Armas | Como causa dano | Atributos prioritários | Ataques ativos no kit |
|---|---|---|---|---:|
| Vigia | Arco e aljava | Básicos rápidos, distância, marca e janela de crítico | DES, AF, velocidade, taxa/dano crítico, precisão e penetração | 1 |
| Espectro | Duas adagas | Básicos, golpes duplos e execução com selos | DES/FOR, AF, crítico, AMP espada e penetração | 3 |
| Arcanista | Cajado e orbe | Conjurações, explosões e tempestade | INT, AM, AMP magia, crítico, penetração mágica e recarga | 5 |
| Bastião | Espada e escudo | Interrupção, investida, guarda e sobrevivência | FOR, HP, defesa, resistências; AF/AMP espada para dano | 2 |
| Ruptor | Daikatana de duas mãos | Golpes lentos, área e fúria | FOR, AF, AMP espada, penetração e dano crítico | 5 |
| Duelista | Duas espadas | Sequência de cortes, ritmo e finalização | FOR/DES, AF, AMP espada, crítico e recarga | 5 |
| Lâmina Astral | Katana e selo | Físico, corte mágico e suprema híbrida | FOR/INT/DES, AF/AM, AMP apropriada, crítico e penetração | 4 |

Contagem inclui a suprema quando causa dano, exclui buffs e deslocamentos sem dano. Cada classe tem sete ações: cinco habilidades intercambiáveis em quatro espaços, uma defesa e uma suprema. Desbloqueios: níveis 1/10/25/45/70, defesa8 e suprema130. Mana é consumida uma vez; suprema exige100 energia. Interceptar do Bastião ainda requer aliado e permanece indisponível em solo.

Todos os ataques ofensivos podem critar. Ampliação afeta habilidades, nunca o ataque básico. Um mago aproveita crítico e dano crítico nas magias; uma classe física aproveita esses mesmos atributos nos golpes. O Vigia possui mais buffs e controle porque seus tiros sustentam o dano. O assassino mistura básicos com habilidades, sem virar um segundo mago.

## Ordem exata do dano

1. Selecionar a afinidade da ação: Arcanista usa AM/AMP magia/penetração mágica; Lâmina Astral usa magia no Corte Rúnico, físico nas outras ações e duas parcelas no Eclipse. Demais classes usam físico.
2. Testar acerto: `clamp(0,85 + (precisão − defesa_de_acerto_do_alvo)/10000 − evasão/20000 + bônus, 0,65, 0,99)`. Para monstros, defesa de acerto é10×nível. No laboratório PvP, usa a precisão do oponente como referência defensiva provisória.
3. Chance crítica: `clamp(min(limite_crítico, taxa_bruta+bônus) − max(0,resistência_taxa−ignorar_resistência),0,1)`.
4. AMP efetiva: `max(0,AMP_da_ação+bônus_de_buff−max(0,resistência_AMP−ignorar_resistência))`. Em básicos o resultado é sempre zero.
5. Defesa efetiva: `max(0,defesa_da_afinidade−penetração_da_afinidade)`. Exposição reduz defesa antes da penetração.
6. Mitigação: `clamp(defesa_efetiva/(1000+defesa_efetiva),0,003,0,95)`.
7. Parcela: `ataque × peso × coeficiente × bônus × (1+AMP) × (1−mitigação)`.
8. Somar parcelas; multiplicar por crítico quando ocorrer. Multiplicador crítico: `max(1,20,multiplicador_total−max(0,resistência_dano_crítico−ignorar_resistência))`.
9. Subtrair redução plana; mínimo1. Escudos absorvem o dano antes do HP. Arredondar só no final do impacto.

Taxa inicial5%, limite inicial50%, bônus crítico inicial20%: um crítico inicial multiplica por1,20. Opções de+30% dano crítico somam0,30 ao multiplicador. Taxa acima do limite não aumenta o dano esperado até que o limite também aumente.

**Exemplo reproduzível:** AM10.000, coeficiente2,1, AMP40%, penetração500, alvo com defesa3.000, sem redução plana. Defesa efetiva2.500; dano normal8.400, crítico a2×16.800. Com50% crítico e99% acerto, média12.474 por lançamento. É média estatística, não dano garantido.

**Eclipse:** `65%×AF×(1+AMP espada)` e `35%×AM×(1+AMP magia)` passam separadamente por defesa e penetração. Somar AF e AM ou multiplicar médias de AMP gerava benefícios cruzados indevidos; esse caminho foi removido do dano real e da estimativa de poder.

Golpes duplos geram dois impactos com metade do coeficiente cada, separados no tempo, com acerto e crítico independentes. Veneno de Execução usa três pulsos de10% do coeficiente final da execução.

## Cadência e sincronização

Intervalo básico=`intervalo_da_classe/(1+velocidade)`, com velocidade limitada a70%. Corda Veloz divide por1,25; Dança por1,15; piso180ms. Pressionar/segurar ataque inicia a sequência; soltar encerra. Não há combate automático iniciado por missão.

Conjuração bloqueia nova ação e deslocamento até concluir. Recuperação de skill400ms; básico impede sobreposição por até220ms. Há quatro momentos visuais: preparação, emissão, percurso e impacto. Projéteis causam dano após o tempo de viagem, corpo a corpo após a preparação. Cada golpe atrasado guarda a ação de origem, a geração do encontro e a vida do monstro. Trocar mapa, morrer ou o monstro renascer invalida golpes antigos.

## PvP proposto e laboratório entregue

A mesma função `resolveStrike` opera PvE real e laboratório PvP. No PvP simulado: dano×0,55×(1+bônusPvP), com bônus limitado a50%. Cada impacto é limitado a20% do HP máximo do alvo. Esse teto é uma regra experimental de Elyndra. Tenacidade reduz duração do controle, até75%; stun no modelo é limitado a800ms antes da tenacidade.

O simulador usa passos50ms, semente reproduzível, ações simultâneas por quadro, custos de mana, recargas, ataques básicos, crítico, acerto e controle. Limite90s no módulo/60s na interface. É estático e aproximado: não modela navegação, decisões humanas, combos de recursos, todos os buffs, latência ou cooperação. Não concede vitórias, itens, moedas ou ranking. Os49pares validados provam consistência e reprodutibilidade, não equilíbrio competitivo final. Ainda é necessário medir taxas de vitória com jogadores e equipamento comparável.

## Pontos e poder

Cada nível ganho entrega5 pontos; de1 a250:1245. FOR/INT/DES têm coeficientes próprios por classe em `attributes.js`. FOR25 aumenta HP0,5%; FOR50 dá1p.p. dano crítico; INT25 dá0,5%MP; INT50 dá1p.p. AMP magia; DES25 dá0,25p.p. crítico; DES50 dá0,5% velocidade. A interface mostra pontos livres, prévia de AF/AM/HP/MP/defesa/precisão/evasão e poder antes de confirmar. Fechar descarta a prévia.

Poder=`2×ofensivo_estimado+2×sobrevivência_estimada`, arredondados por componente. Ofensivo mistura dano médio básico e skill contra defesa de referência do nível, cadência e recarga. Peso de básicos: Vigia88%, Espectro45%, Arcanista10%, Bastião40%, Ruptor25%, Duelista30%, Lâmina25%. Os pesos representam uma construção de referência, não impõem como o jogador deve jogar. A escala×2 é conservada. Não multiplica dano. Poder não prevê quem vence um duelo e pode mudar ao corrigir uma fórmula.

## Aprimoramento e identidade visual

+0–4: metal sem emissões; +5–9: luz discreta; +10–14: energia azul; +15–19: plasma; +20–24: emissão divina; **+25: textura cósmica exclusiva, filamentos escapando, faíscas e descargas brancas**. A emissão segue o eixo da arma. Principal e secundária leem encantamentos independentes. O Ruptor reserva os dois espaços para a daikatana: base/opções e runas possuem orçamento de duas armas.

Encantamento aumenta apenas base: AF/AM/defesa1,2% por grau, HP0,8%, precisão0,6%. Não multiplica adicionais nem slots. Slots usam a tabela única por grau e peça em `runes.js`; extensão recalcula valores sem acumular multiplicações. Requisitos175+, peça175+, SS+ou melhor e dois encaixes naturais permanecem.

## Relíquias, companheiros e Magículas

Asas e aura100níveis; faixas1–19 comum,20–39 raro,40–59 épico,60–79 lendário,80–99 divino,100ultra. Ultra exige personagem250. Cada nível aumenta atributos e poder nas sete classes. Asas100:30% ataque e500 precisão; aura100:20%HP,30% defesa e12,5p.p. dano crítico, antes do estilo premium selecionado.

Magículas100: por nível+0,15% ataque,+0,1%HP,+2penetração,+0,05% redução de dano recebidoPvE. Leitura μ=`round(poder×(1+nível/100)/10)`, sempre visível; é índice energético próprio, não uma regra canônica do anime. A presença envolve o corpo, com camadas20/40/60/80/100, partículas ascendentes, anéis de pressão, fragmentos e relâmpagos. Nenhum atributo cresce só por olhar a prévia.

Três pets e três montarias adquiríveis e evoluíveis até100. Somente um de cada equipado concede bônus. Montar acrescenta movimento; desmontar conserva bônus passivos, sem duplicar poder. Atacar ou lançar skill desmonta. Ouro e cash de teste são separados. Serviços mostram custo, compram somente faltantes e executam aquisição/evolução uma vez, sem débito quando requisitos ou saldo falham.

## Jornada, mapas e interface

Introdução: Ilyra → cinco lobos → recompensa → Cripta. Depois,12capítulos regionais com história própria, investigação de selo, coleta registrada por combate, conclusão de masmorra regional e retorno seguro para recompensa única. Quest exige região e ordem corretas; não pode ser resgatada duas vezes. Migração preserva regiões anteriores dos saves existentes. Tutorial e contratos permanecem como fontes de progressão.

Navegação usa busca limitada em43×43células e contorna água/obstáculos. Toque na missão caminha, joystick cancela; combate e entrada na DG são manuais. Portal regional abre as DGs corretas; sair retorna à região de origem. As12regiões têm traçados e paletas diferentes, mas ainda compartilham biblioteca de objetos e estrutura de arena. Não são12mundos finais produzidos individualmente.

Painéis: titânio escuro, linhas cian, tipografia de sistema, hierarquia de título/subtítulo/dados, foco visível, botão fechar nomeado e Escape. Abertura180ms, pressão de botão130ms; preferência por movimento reduzido remove transição. Inventário conserva filtro e rolagem na volta do item. Dados, botões e preços são DOM funcional; imagens decoram molduras, ícones, criaturas e efeitos. Cash exige confirmação no jogo e não cobra dinheiro real.

## Validação e limites

66testes automatizados incluem1035itens, todas as skills ofensivas, afinidades, crítico, custo/transações,100evoluções de relíquias, companheiros/Magículas,49pares PvP, caminhos nas12regiões e ciclo dos12capítulos. A inspeção visual desta revisão ficou bloqueada por falha interna de autorização da prévia; não foi substituída por outro navegador. Sem teste em aparelhos físicos, não há garantia de FPS no iPhone/Android. A alpha continua em desenvolvimento.

## Fontes primárias consultadas

- Cabal Forcebook: https://cabal.game.daum.net/gameInfo/forcebook/캐릭터능력치
- Cabal slots: https://cabal.game.daum.net/gameInfo/forcebook/속성부여
- Black Desert Mobile, guia de equipamentos: https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=901
- Black Desert Mobile, encantamento: https://www.world.blackdesertm.com/Ocean/Wiki?wikiNo=16

Inspiração de organização e categorias; fórmulas, preços, história, nomes e arte de Elyndra são adaptações originais.
