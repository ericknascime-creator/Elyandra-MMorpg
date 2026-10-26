# Elyndra0.26 — Renascimento e correção dos jogadores simulados

## Renascimento

Missão automática no nível999 ou1000: derrotar3 inimigos reais de nível950+ e voltar à Ilyra. Alvos de treino e abates autônomos de bots não contam. O ritual não cobra cash, ouro ou materiais.

Cada ciclo acrescenta500 pontos permanentes para FOR/INT/DES, sem limite predefinido de ciclos. Os pontos de níveis anteriores são guardados, inclusive os já distribuídos. O nível e aEXP retornam a1/0. O crescimento base já conquistado é preservado, assim como equipamentos e sistemas. Os requisitos já alcançados continuam reconhecidos para equipamentos e habilidades; os limites de crítico, cadência e resistências continuam valendo.

| Renascimentos | Pontos extras de renascimento | Pontos de níveis anteriores |
|---|---:|---:|
|1, feito no999 |500 |4.990 |
|2, ambos feitos no999 |1.000 |9.980 |
|3, feitos no999 |1.500 |14.970 |

Os pontos do nível atual somam-se a essas duas reservas. Nenhum ciclo devolve e concede novamente os mesmos pontos.

Por ciclo: +1.000HP, +100ATK, +40defesa, +25penetração, +0,5ponto percentual de dano crítico e +0,1ponto percentual de velocidade de ataque. Bônus planos participam das fórmulas normais, então modificadores percentuais do personagem podem ampliar seu resultado. Cadência e outros atributos com teto não ultrapassam esse teto. A quantidade de ciclos continua acumulando.

A aba mostra contador, reserva de pontos, bônus por ciclo, total acumulado, ganho estimado de poder do pacote, missão e confirmação. A ação fica no rodapé, fora da rolagem. O HUD mostra R1/R2 junto ao nível e o acesso Renascimento.

## Por que um bot inferior derrotou o GM

Na0.25, a arena equalizada copiava o orçamento de atributos do primeiro lutador para o segundo. O perfil ainda mostrava o poder original; a barra não mostrava o poder efetivo da luta. Era uma apresentação incoerente. O adversário de1,8milhão não estava usando aquele conjunto de atributos no combate equalizado.

A0.26 remove essa equalização do fluxo do jogo. Convites e arena usam atributos reais por padrão, mostram PODER REAL e renderizam o equipamento verdadeiro, em vez de desenhar todos como SSS+50. O parâmetro técnico de equalização fica apenas na função de diagnóstico; nenhuma opção do produto o ativa.

O número de poder é uma soma calibrada de atributos, não uma regra que força uma vitória. Dano depende de ataque, defesa, penetração, ampliação, crítico, resistências, cadência, alcance e execução. Para verificar este caso concreto,80 duelos automatizados com sementes diferentes compararam o GM completo com builds antigas muito inferiores, nas quatro classes: o GM venceu80/80 com os atributos preservados. O teste não impõe vencedor pelo número de poder.

## Vida autônoma dos50 bots

Todos começam no nível1 com equipamento inicial comum e sem encantamento. Há residentes nas21 regiões,30 free,12 VIP e8 de alto investimento. Novatos em regiões avançadas fazem entregas em áreas de acampamento; não recebem capacidade artificial para enfrentar monstros950/1000.

No mapa ativo, quem tem nível apropriado procura inimigos reais da região, caminha com colisão, ataca, usa técnicas liberadas, gasta mana, sofre dano de resposta, usa poções, recua, recupera e pode morrer. Abates rendemEXP, ouro e materiais ao próprio bot. Não concedem progresso de missão ao dono. Nas outras regiões, tarefas de entrega e coleta usam estados de ida, trabalho, volta e recompensa.

Cada cinco tarefas/caças, uma recompensa pode substituir uma peça de nível inferior por uma peça adequada. As distribuições de atributos acompanham o nível. A cada30min de vida, a rotina de preparação pode tentar aprimorar a arma: free usa ouro/cristais; perfis pagos usam a cotação de cash do jogo quando há saldo. Recursos não são ilimitados.

Orçamento dos perfis pagos:10.000/100.000cash no primeiro dia e a cada24h decorridas. Pactos usam o próprio orçamento, não são poder concedido sem custo. Contador de vida usa segundos reais, não um dia a cada12segundos.

Ao voltar depois de tempo ausente, tarefas são estimadas pelo tempo decorrido. A compensação roda em lotes de até um dia, mantendo o restante em fila; não atribui um nível fixo por hora. É uma aproximação de entregas, não uma reprodução de todos os combates com o navegador fechado.

A população é compartilhada pelos personagens deste navegador. Saves antigos recebem uma migração para o início no nível1, conforme pedido; um resumo do estado anterior fica arquivado. Itens, nível e dinheiro do personagem do dono não são apagados pela migração.

## Encontrar e conversar

Bots existem no cenário sem ativar uma opção. O painel Social é um cadastro e um acesso à arena. O minimapa usa pontos ciano para os aventureiros da região.

O perfil informa região, coordenadas, horas de vida, nível, poder e últimas ações. “Ir até este jogador” leva o jogador à localização do bot, respeitando acesso à região; não teleporta o bot para fingir que estava ali.

O chat reconhece localização, objetivo, evolução e convites como “vem comigo”. Um convite remoto registra tempo de viagem antes da chegada ao grupo. Respostas são produzidas por regras com consulta ao estado real. Não são pessoas, nem conversa generativa de domínio aberto. O modo ainda é local, sem servidor compartilhado entre dispositivos.

## Visual

Nova ilustração original de portal com fênix, marfim, metal azul e filigrana dourada aplicada ao Santuário do Renascimento. A interface recebeu molduras, barras e botões mais coerentes com fantasia e tecnomagia. As armaduras e armas aprovadas foram preservadas.

Isto não reconstrói todos os mapas ou animações. O redesenho completo do mundo permanece pendente; a imagem do santuário é arte de interface, não um novo mapa3D.

## Verificação

146 testes automatizados: reservas de pontos em três ciclos, missão e proximidade, conservação de equipamentos e crescimento em quatro classes, ganho real de poder, migração sem apagar o GM, população1–50 nas21regiões, progresso por hora, movimento, chat contextual, caça comEXP própria e80 duelos de regressão do caso GM.

A inspeção visual usa667×375 horizontal. Não há certificação em aparelhos físicos, multiplayer, segurança de servidor, economia comercial ou equilíbrio definitivo de classes.

QA no navegador: missão concluída com3 abates950+, retorno à Ilyra e ritual confirmado. O GM ficou Nv1·R1 e manteve equipamentos; poder25.064.143→25.087.863 antes da distribuição. Ao recarregar, contador1, reserva de renascimento500, reserva de níveis4.995 e500 pontos livres persistiram. A sugestão da classe consumiu a reserva disponível sem perder pontos antigos; aplicação levou o poder para25.240.198.

QA dos bots: Seraphine foi encontrada no Limiar da Eternidade, ainda de nível3 e depois4, com0,25h de vida e18 missões. O toque no corpo da personagem abriu o perfil diretamente no cenário. O chat respondeu com a região, coordenadas e tarefa atuais. Não houve erro do cliente no console filtrado por terminal.local. Capturas: renascimento026, bots026 e jogador026.
