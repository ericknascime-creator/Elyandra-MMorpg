# Alpha 0.17 — ataque básico

Um toque parado mantém ataques após pointerup; segundo toque desativa. Movimento manual cancela a trava, mas manter o botão pressionado permite atacar em movimento. Soltar durante movimento encerra os ataques. Menus, perda de foco, morte, navegação e mudanças de área limpam a intenção. Ataques respeitam recarga e alcance. O alvo da arena nasce a 80% do alcance da classe, corrigindo o posicionamento anterior fora do alcance.

Verificação: 92 testes passaram. Prévia Chromium: toque único manteve aria-pressed=true; alvo de treino perdeu vida em impactos repetidos; toque no chão cancelou; joystick em viewport 896×358 mudou aria-pressed de true para false e deslocou personagem. Testes unitários cobrem as duas ordens de soltar joystick/ataque e limpeza de estado. Multitoque simultâneo em iPhone/Android físicos não verificado.

A expansão solicitada (nível1000, companheiros500, equipamentos100, relíquias750 e signos850) não faz parte deste hotfix e permanece pendente, assim como o novo balanceamento global.
