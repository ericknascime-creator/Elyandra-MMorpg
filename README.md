# Elyndra — Ascensão das Relíquias · alpha 0.12

RPG de ação isométrico para navegador, com interface horizontal para toque. Código original em JavaScript/Canvas2D, sem dependências de execução. Referências de organização: inventário com personagem e peças, barra de habilidades, forja com receitas e atributos de equipamento.

## Jogar

Sirva `dist/` por HTTP. Em hospedagens como Netlify, publique a pasta `dist`; `netlify.toml` já aponta para ela. Não abra o HTML diretamente pelo sistema de arquivos, pois módulos e catálogo precisam de HTTP.

Campanha: comece no nível1, fale com Ilyra e toque na missão para caminhar. O ataque requer toque ou botão pressionado; ao soltar, para. Teclado: WASD, Espaço, F, I, Q/E,1–5 e R. O mapa permite viajar conforme o nível mínimo. É possível sair e repetir DGs. Contratos de cinco inimigos dão EXP e ouro continuamente.

- **Itens:** personagem com peças atuais, filtros, requisitos, comparação de poder, equipar/desequipar e venda confirmada.
- **Evoluir:** atributos, aprimoramento, fabricação por receita, materiais e poções.
- **Pontos:** cinco por nível ganho, entre FOR/INT/DES; contador permanente abaixo do perfil. No nível1 há zero; no250 são1245.
- **Poder:** indicador permanente, recalculado com o equipamento, atributos e buffs. Estimativa de ataque sustentado e sobrevivência; não prevê o resultado de um duelo. Considera crítico, velocidade, precisão contra alvo do mesmo nível, perfuração, ampliação útil para a classe, HP, defesa e evasão. Ampliação física não aumenta o poder de um mago, nem mágica o de um arqueiro.
- **Aprimorar:** +0 a+25, só aumenta a base. Falhas não destroem a peça; garantia por faixa. Opções adicionais e runas permanecem constantes.
- **Níveis:** progressão local até250, custo de EXP duplicado a partir de150. Campanha e laboratório têm saves separados; backups são feitos ao criar nova campanha.
- **Laboratório250:** catálogo de1035peças, sete classes,49habilidades,12regiões e36DGs para inspeção e teste. Dinheiro, itens de referência e facilidades do laboratório não são progresso obtido na campanha.

## Limites reais desta versão

Esta é uma alpha **solo, com salvamento no navegador**, não um MMORPG com servidor. Regiões usam arenas de terreno e cores diferentes; ainda não são12mapas finais produzidos individualmente. DGs de grupo são adaptadas para teste solo. Algumas mecânicas de habilidades ainda são aproximações; Interceptar exige aliado e não funciona no teste solo. Guildas, guerras, leilão entre jogadores, rankings globais, contas, economia segura e compras reais ainda não existem. Pets, montarias e Magículas possuem aquisição/evolução local e bônus reais. Fantasias não têm ainda todo o sistema final planejado. Gráficos combinam atlases originais gerados, Canvas2D e composição WebGL; não são modelos3D completos. Os testes de viewport não substituem teste em aparelhos físicos iOS/Android.

## Validação

`npm test` executa testes de fórmulas, equipamento, progressão, criação e aprimoramento. Interface também verificada em viewports horizontais844×390 e667×375. Para atualizar sem perder o personagem, publique no mesmo domínio e preserve o armazenamento do navegador.

## Revisão visual0.5 e encaixes

Textura original gerada com a ferramenta nativa de imagens (atlas de grama, pedra, basalto e metal). Prompt registrado em `ASSETS.md`. Aplicada no terreno com cache, e na interface. Personagens redesenhados emCanvas com proporção adulta, tecido, placas, armas e efeitos de aprimoramento. Inventário tem filtros Equipáveis e Aumentam poder. Skills usam ícones vetoriais próprios e círculos de conjuração.

A nova solicitação substitui o bônus antigo de2%relativo por uma tabela inspirada noForçaBook oficial doCabal. A correspondência dos graus com níveis é uma adaptação deElyndra, não uma regra deCabal: médio1+, alto100+, altíssimo175+, transcendente250. AMP normal7/7/7/8%; estendido8/9/10/11%. Três slotsAMP estendidos totalizam24/27/30/33%. Dano e taxa críticos possuem totais específicos ao repetir a3ªopção; o cálculo usa o delta do total sem inflar cada encaixe. Arma unificada deRuptor dobra os valores, como uma arma de duas mãos. Valores adicionais nativos e encantamento permanecem separados.

Fonte: https://www.cabal.co.kr/gameInfo/forcebook/장비슬롯확장


## Revisão0.6 — evolução, mundo e interface

- `theme-relics.css`: temaCSS próprio para molduras, barras, inventário, encaixes, dinheiro/cash, ranking e ascensão. Mundo e atores permanecem emCanvas2D para manter o desempenho; esta revisão não transforma o motor em3D.
- Asas e aura:10níveis cada,5formas, prévia e visibilidade individual. Asas abrem no10; aura no20; ápice250. Custos e bônus em `ascension.js`; efeitos em `ascension-art.js`. Plumas e essências vêm de caça/DGs/chefes. Os níveis8–10 exigem núcleos dosCataclismos.
- Set: a mesma tabela de AMP e encaixes para cabeça, corpo, mãos, pernas e pés; a exceção de valores dobrados pertence somente à arma unificada doRuptor. Extensor consumido de forma atômica, três slots recalculados sem multiplicação acumulada.
- Campanha exige nível, poder e umaDGda região anterior para viajar. O segundo mapa exige o capítulo inicial. Laboratório tem confirmação e faixa persistente informando os atalhos; pode ser retomado separadamente da campanha.
- Geometrias de região e famílias de criaturas variam. São mapas procedurais, não os mapas finais desenhados individualmente. Espíritos atacam à distância. Vida, defesa e dano dos chefes aumentaram; abaixo de30%HP eles causam40%mais dano.
- Cataclismos acessíveis175+, com temporizador **local** de24hapós a morte e recompensas de evolução. Outros chefes têm temporizador local. Duelos, competição entre servidores e respawn global ainda não existem. Grupos continuam adaptados para solo; a calibração demanda testes de jogo prolongados.
- Ouro e cash possuem saldos distintos. Loja de materiais e aparências funciona com cash de teste no laboratório. **Pagamento real não está integrado**, não há cobrança, preço ou checkout falso. O servidor e o provedor de pagamento devem validar uma recarga antes de liberar cashreal.
- Ranking registra personagens de campanha efetivamente salvos **neste navegador**. Laboratório fica fora. PvPnão contabiliza monstros. **Rankingglobal e PvPentrepessoas ainda dependem de multiplayer e validação no servidor**, portanto o contador permanece zero na ausência de vitórias reais. Nenhum adversário ou resultado online é inventado.
- Avisos temporários usam dimensões explícitas e são removidos ao acabar; mensagens vazias ficam ocultas.

Validação: testes das fórmulas, evolução de asas/aura, custos, cash separado, ranking local, acesso a regiões, extensão e encaixes uniformes. QAde interface em844×390 e667×375, com evolução0→10 nos dois sistemas, cash de teste e encontro de chefe final. Isto não substitui teste em aparelhos físicos.

## Alpha0.7 — Base MMORPG e atributos

Asas/aura0–50, hierarquia Comum→Ultra, componentes CSS de Asa Divina flutuante e card de espada Hélion, efeitos Canvas de canalização/impacto/tempestade/trajeto, cooldown radial e fluidosHP/MP. Menu→Relíquias & arena permite observar skills no LAB. Evoluir→Asas/Aura permite visualizar as50evoluções; o botão LAB equipa a prévia somente no laboratório.

Inventário→peça: tentativa com cash ou terceiro slot com compra automática de faltantes e confirmação do preço. Empório lista Extensor Astral por25000cash; aplicação automática cobra500. Laboratório novo concede100000cash e recursos de teste; recarga de cash no LAB tem botão de100000. Pagamentos reais continuam indisponíveis.

Combate e ficha agora separam AF/AM, AMP espada/magia, taxa crítica/limite/excedente, dano crítico, penetração e resistências. Referência oficial Cabal e adaptação por classe documentadas em [BALANCE.md](BALANCE.md). Não é emulação exata das fórmulas do servidor Cabal. São42testesautomatizados. Nenhum teste valida equilíbrio dePvP multiplayer.

## Alpha0.8 — playable graphics slice

Welcome→**JOGAR NOVA ÁREA GRÁFICA** enters Jardins de Hélion with a Ruptor in a level175 laboratory profile. New original character/creature/scene/equipment atlases, animated poses and circular skill controls. Three wolves awaken Fenrir. Weapon art is shared by inventory and character, with enhancement light. Classic campaign remains separate. See[GRAPHICS.md](GRAPHICS.md) for architecture, validation and limitations; exact art prompts in`dist/art-manifest.json`.

Canvas scene composition now has an optional WebGL bloom/color compositor, fixed-size particles, cached terrain and optimized WebP art. Canvas compatibility target30fps; WebGL target60fps with adaptive reduction. Physical-phone performance and GPU-path execution still require device testing. Browser QA used the fallback because its WebGL context was unavailable.43automatedtests.


## Atualização0.10
Entrada única, animação de ataque das7classes, daikatana de duas mãos com orçamento2× e migração dos itens existentes, poder v2 com decomposição, cash direto em fabricação/runas/aprimoramento/extensão/relíquias, novos projéteis e impactos.49testes. Alpha solo local; entrada não é autenticação de conta. Consulte BALANCE.md e GRAPHICS.md para coeficientes e limites.

## Alpha0.11 · combate, jornada e presença

Leia [a especificação atual](dist/GUIA-DE-COMBATE.md). Inclui novas imagens de criaturas/cenário/NPCs/companheiros, molduras futuristas, energia de arma+25, Magículas100, aquisição/evolução de pets e montarias, ganhos reais por nível de relíquia, análise de dano por skill e PvP matemático local. Campanha pós-introdução com12capítulos, recompensa única e navegação por caminhos.66testes passam. A revisão0.11 não teve QA visual final: o navegador de prévia foi bloqueado por erro interno de autorização. Não há benchmark em celular físico.

## Alpha0.12 · referências mobile

[Direção visual e comportamentos](dist/DIRECAO-VISUAL.md): central lateral com ícones originais, ações agrupadas, ataque circular e seis skills,HUD mais transparente, avisos funcionais de evolução e combo real sem bônus de dano.67testes passam. Arte2,5D; não é equivalente a modelos3D das referências. Inspeção visual final permanece indisponível pela falha de autorização da prévia.
