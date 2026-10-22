# Elyndra — Ascensão das Relíquias · alpha 0.4

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

Esta é uma alpha **solo, com salvamento no navegador**, não um MMORPG com servidor. Regiões usam arenas de terreno e cores diferentes; ainda não são12mapas finais produzidos individualmente. DGs de grupo são adaptadas para teste solo. Algumas mecânicas de habilidades ainda são aproximações; Interceptar exige aliado e não funciona no teste solo. Guildas, guerras, leilão entre jogadores, rankings globais, contas, economia segura e compras reais ainda não existem. O catálogo de fantasias, montarias, pets e chefes não equivale à implementação integral desses sistemas. Os gráficos são vetoriais procedurais, não modelos3D finais. Os testes de viewport não substituem teste em aparelhos físicos iOS/Android.

## Validação

`npm test` executa testes de fórmulas, equipamento, progressão, criação e aprimoramento. Interface também verificada em viewports horizontais844×390 e667×375. Para atualizar sem perder o personagem, publique no mesmo domínio e preserve o armazenamento do navegador.
