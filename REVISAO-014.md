# Revisão 0.14 — legibilidade e resposta ao toque

## Funcionamento
Magículas permanecem visíveis como uma aura contínua; a ativação da revisão0.13 foi removida. O menu continua oferecendo evolução até100, custos e prévia dos bônus. O contador principal de poder permanece no HUD; o bloco fixo de Magículas saiu.

As skills usam pointerdown para não depender do clique sintetizado após um toque. Teclado permanece disponível. Bloqueio de gestos, touch-action e prevenção do segundo toque rápido atuam na partida; menus preservam rolagem vertical.

Os brilhos do arco usam curvas específicas das quatro poses. As demais classes recebem eixos por pose, e o Ruptor recebe eixos próprios de sua animação. As partículas e a luz compartilham o transform do personagem. São sprites com quatro poses; não se trata ainda de rig esquelético3D.

Nomes são desenhados fora da escala reduzida das figuras, com contorno escuro. O backdrop-filter sobre o canvas foi removido durante a partida para reduzir os blocos de composição observados no Safari. Não foi possível reproduzir fisicamente o aparelho do usuário; a correção exige confirmação em iOS real. Canvas2D pode atingir60FPS se a medição permitir, com fallback30 após carga sustentada; economia continua30.

## Equipamentos e menus
Arte compacta e botões de aprimoramento antes dos atributos. Uma tentativa cobra os custos normais e preserva opções e runas. Cash sempre mostra confirmação e custo antes da compra de teste. Catálogo paginado em seis peças, filtros por faixa e tipo; editor de FOR/INT/DES com prévia e aplicar antes dos detalhes longos.

Classificação das opções nativas, independente da raridade do item:
- Fraco: abaixo de75% do teto, cinza.
- Razoável:75% até menos de90%, verde.
- Bom:90% até menos do teto, azul.
- Perfeito: teto exato, ouro.
- Acima do teto: alerta laranja; legado sem origem/cap conhecido: teto não informado.

O teto é recuperado pelo sourceId do catálogo ou pelo cap registrado. Não há reatribuição aleatória ao abrir o item. Aprimoramento aumenta a base, não muda qualidade das opções; slots continuam com tabela fixa.

## Verificação
77 testes de regras passaram antes da validação final. Navegador em896×358 e667×375: aprimorar visível sem rolar (limite inferior203px/217px), falha de tentativa cobra15.000ouro e atualiza garantia1/8; aplicar atributos visível até299px; catálogo exibe10peçasULTRA em duas páginas6+4. Flecha de choque entra em recarga, atordoa o alvo de treino e reduz seu HP de20.520.000 para20.506.844 (13.156de dano). Nenhum erro de execução registrado nessa sessão.

Limites: esta é alpha solo com cash simulado e save local. PvP multiplayer, pagamentos reais e verificação física em dispositivos não fazem parte desta validação.
