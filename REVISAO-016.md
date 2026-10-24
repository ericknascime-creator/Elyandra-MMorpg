# Elyndra0.16 — edição do criador e reinos

Inclui integralmente a revisão0.15: Magículas na central, oficina compacta,49skills com20níveis e méritos divinos limitados a3canais.

## Interface
AnalisadasIMG_0189/0190/0191: corte na terceira coluna do menu, artefato preto na rolagem e telas internas com linguagem visual desigual. Overlay fixo opaco, scroller isolado/recortado sem overflowhorizontal ou backdrop-filter; grades com largura mínima0. Evolução usa ícones originais e cards, skills têm lista de seleção e oficina, atlas recebe identidade própria. Atalhos de pet/montaria passam do joystick para baixo do minimapa.

## GM local
GM_BUILD=true nesta edição de testes. Não confere permissões de hospedagem, conta, banco ou servidor. Não há verificação de papel por backend. O jogo é solo e os privilégios só alteram seu estado local. Uma versão pública/multiplayer precisará remover esse provisionamento e verificar autorização no servidor.

Criação e migração inicial concedem250,ULTRA+25,3opções no teto,3runas,relíquias100,Magículas100,skills20,todos os companheiros100,estilospremium e materiais de todas as receitas. Arma doRuptor continua unificada, sem secundária. Cada personagem é equipado conforme sua classe.

Reservas finitas e seguras:999.999.999ouro/cash,1.000.000materiais/cristais/runas,9.999poções. Reposição antes de salvar e uma vez por segundo noHUD; não altera níveis/equipamentos após provisionamento. Console permite restaurar full ou reduzir evolução ao1/encantamento0 para testar custos e botões. Até14personagens locais, sem sincronização entre aparelhos. PersonagensGM ficam fora do ranking de campanha.

## Mundo e movimento
As12regiões jogáveis existentes foram organizadas emAurion,Vespera,Nhal,Asterion. AliançaSolar eDomínioLunar são identidades das nações; fronteiras e origens são territórios neutros/disputados. Fortalezas têm artes novas e botão de visita; viagens/DGs preservam rotas e regras. Não foram implementadas guerras online nem continentes de mundo aberto contínuo.

Quatro habitantes têm trajetos leves e validação de terreno, sem mudar osNPCs de missão/loja. Monstros comuns patrulham perto do ponto natal, mantendo aggro e perseguição. Alvo de treino e chefes ficam fora dessa patrulha. Órbitas indicam crítico, velocidade,AMP e proteção ativos. Magículas permanecem contínuas. Partículas ambientais variam cor por região e mantêm contagem limitada.

## Verificação e limites
88testes passaram, cobrindo7buildsGM,49evoluções de skills, materiais, idempotência, estoque seguro, personagens, continentes, atributos, dano, slots e regressões. No navegador896×358, criação deArcanista entrou diretamenteGM com6.072.462poder e reservas máximas. Rolagem do menu chegou365px sem overflow(scrollWidth=clientWidth=371). Validação física noSafari/iPhone eAndroid não foi feita.

O objetivo desta atualização é uma alpha testável com sistemas ligados. Persistem etapas de produção: servidor autoritativo, cooperação/PvP real, infraestrutura de contas e saves, animação esquelética e conteúdo narrativo mais extenso. Não se declara o jogo finalizado ou livre de bugs.

Validação adicional: Arcanista eRuptor criados sem ativar modo; duas identidades disponíveis no seletor. Ruptor mostrou secundária reservada eULTRA+25 em todas as peças. LançaArcana20reduziu o alvo de23.682.000para22.817.521(864.479dano) e entrou em recarga. Viagem paraNhal e entrada da fortaleza verificadas. Em667×375 todos os onze atalhos da central de evolução ficaram visíveis.
