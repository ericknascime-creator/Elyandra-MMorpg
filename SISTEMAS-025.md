# Elyndra 0.25 — Sociedade de bots, grupos, VIP e arena

## Acesso visível

O botão **50 IA · MUNDO & ARENA · ALPHA 0.25** aparece no lado direito do HUD. A mesma função está no menu central. Ele abre quatro abas: Jogadores IA, Arena, Simulações e Pactos VIP. A indicação de versão permite distinguir esta entrega das anteriores.

## Cinquenta bots persistentes

30 perfis free, 12 VIP e 8 de alto investimento; quatro classes ativas, nomes únicos, personalidade, intenção, equipamento, habilidades e distribuição FOR/INT/DES. Cada personagem local tem sua própria sociedade. Nenhum bot recebe o provisionamento GM do dono.

Eles começam em diferentes níveis e builds. São personagens simulados; não são usuários conectados. As decisões usam regras locais, não um modelo de linguagem externo. Não há custo de API, processamento remoto de chat ou aprendizagem automática.

O cenário atual continua usando os mapas e os desenhos de classes existentes. A versão adiciona presença e interação; não reconstrói a geometria dos mapas.

### No mundo

Bots passeiam pela costa inicial. Toque no personagem ou selecione seu cartão para abrir o perfil. Para vê-lo perto de você em qualquer região, use **Observar no mundo**. A implementação limita os desenhos a 12 bots próximos, além do personagem, para conter o custo gráfico; os 50 continuam no cadastro e na simulação.

### Grupo

Convide até quatro bots: grupo de cinco contando com você. Eles seguem usando caminhos com colisão e mudam de região ou masmorra junto do personagem. Quando você entra em combate, ajudam no alvo selecionado, com ataques e golpes ofensivos. Cada aliado usa os próprios atributos e a fórmula de dano; recompensas do encontro cooperativo continuam no personagem do usuário.

Limite atual: são aliados de assistência. Inimigos ainda concentram aggro no jogador; não há distribuição de papéis, dano recebido e recuperação individual equivalente a uma party multiplayer completa. Eles não entram em guerras humanas nem negociam no leilão.

### Chat

Conversa individual no perfil, com histórico local, e conversa no HUD usando **@NomeDoBot**. Sem @, responde o último bot selecionado. Perguntas sobre equipamento, poder, free/VIP, grupo, história e arena consultam o estado do personagem. Outros assuntos recebem uma resposta de orientação. Não é conversa generativa de domínio aberto. Bots são identificados com **[IA]**.

## Progressão e cenários

Controles de 1, 7 ou 30 dias virtuais. A operação é assíncrona e preserva os bots; não altera seu personagem ou o calendário real.

| Perfil | Tempo virtual por dia | Entrada de cash simulado/dia | Política |
|---|---:|---:|---|
| Free | 2 h | 0 | Caça, EXP, ouro, materiais e tentativa de encantamento |
| VIP | 3 h | 10.000 | Mesma base, com treinamento comprado se houver saldo |
| Alto investimento | 4 h | 100.000 | Maior saldo e tempo; usa a mesma cotação de treinamento |

A caça usa entre 80 e 120 abates por hora virtual. EXP e ouro partem da recompensa de monstro do jogo. EXP é aplicada por `advanceXP`; treinamento usa `trainingQuote`/`buyTraining`; uma tentativa de encantamento por dia usa custo, chance e garantia do sistema real. Ao ultrapassar a arma em 25 níveis, o bot obtém uma arma adequada ao seu nível. Esta substituição é uma abstração do modelo, não a simulação de um drop completo com toda a tabela de itens.

Quando o mundo está aberto, um bot avança um dia virtual a cada 12 segundos, em rodízio; uma volta pelos 50 leva cerca de 10 minutos de jogo ativo. Menus pausam esse ciclo. O cenário acelerado usa a mesma política. Não há execução com o navegador fechado.

Relatório mostra nível médio, poder médio, evolução desde o início do cenário e cash efetivamente consumido por treinamento. Cash recebido e não gasto permanece na carteira do bot. Os grupos têm diferentes estados iniciais e tempos; os resultados não isolam o efeito causal do VIP, não garantem vantagem em todas as métricas e não certificam equilíbrio.

## Pactos VIP

Compra única com cash de teste. Patamares cumulativos: uma melhoria cobra só a diferença para o patamar escolhido.

| Pacto | Acumulado necessário | Bônus |
|---|---:|---:|
| Prata | 10.000 cash | +5% |
| Ouro | 50.000 cash | +10% |
| Astral | 200.000 cash | +15% |
| Soberano | 1.000.000 cash | +20% |

Bônus incide apenas em ouro e Fragmentos de Magícula de monstros comuns. Fragmentos fracionados acumulam até formar uma unidade, evitando que a porcentagem desapareça em recompensas de uma unidade. Não melhora dano, itens raros de chefe, chances de encantamento ou títulos. A compra pede confirmação do valor exato. Não há cobrança, assinatura ou pagamento real.

O personagem recebe indicação VIP junto ao nome no HUD. Os perfis dos bots identificam o perfil de investimento. Recursos da conta GM são repostos como antes, mas o pacto e seus benefícios continuam registrados; testar dedução durável de saldo exige um personagem sem reposição GM.

## Arena dos Ecos

- **Manual:** jogador contra bot. Botões de mover à esquerda/direita, ataque básico contínuo e sete habilidades da classe.
- **Espectador:** dois bots decidem movimento, ataque, suporte e uso de uma poção de emergência.
- **Equalizada:** mesmo orçamento de atributos, preservando classe, alcance e velocidade. Técnicas são liberadas no ensaio. Não implica chances de vitória idênticas entre classes.
- **Livre:** cada lado usa seus atributos e requisitos de nível atuais. GM pode ter grande vantagem.
- Até 90 segundos, barras próprias de HP/MP, alcance, recarga, mana, preparação, trajetória simplificada, impactos, controle e resultado local.
- Fórmula de dano compartilhada com o combate e regras próprias simplificadas para a execução da arena; não replica todas as interações avançadas de recursos, passivas e terreno do mundo.
- Vitórias e derrotas contra IA ficam na sociedade. Não contaminam o ranking de PvP humano. Não existem prêmios por derrotar bots.
- Sair encerra a partida sem vitória. Não consome itens ou HP da campanha.

## Persistência e desempenho

Estado no save local: bots, nível, equipamento, carteira, pactos, dias, histórico limitado de mensagens, grupo e placares. 100 mensagens no histórico da sociedade; 80 entradas no feed. Sem servidor, sem chat entre aparelhos e sem autenticação real de GM.

A IA de combate da arena atualiza a cada frame. Progressão agregada é espaçada e a simulação de dias cede execução ao navegador. Atores distantes não são desenhados. O desempenho final ainda precisa ser medido em iPhone e Android físicos.

## Verificação

138 testes automatizados, incluindo população 50/30/12/8, quatro classes, grupo com limite, compra VIP sem duplicação, bônus fracionado e exclusão de chefes, progressão free sem cash, histórico contextual e partidas que respeitam recarga e chegam a um resultado sem alterar HP de origem.

No navegador horizontal 667 × 375: conversa com Aeloria respondeu sobre convite; convidar alterou para Remover do grupo; grupo persistiu após recarregar; personagem apareceu no cenário; sete dias virtuais completaram com deltas e gasto de cash por perfil; arena espectador mostrou movimento, suporte, ataques e redução de HP. A validação manual final é complementada pelas capturas da entrega.

Validação manual adicional: Pacto Prata ativou VIP1 no nome e reduziu a cotação do Ouro de50.000 para40.000cash. Na arena manual, Flecha de choque consumiu mana e entrou em recarga de18s; os dois lados perderamHP com ataques registrados. Nenhum erro do cliente no console filtrado por terminal.local. O cenário passa a ficar congelado por trás de janelas; animações de retratos e arena continuam, evitando redesenhar os50atores enquanto um painel está aberto.
