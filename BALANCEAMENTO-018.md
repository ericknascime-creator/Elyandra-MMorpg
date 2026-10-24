# Auditoria matemática0.18

Configuração:Nv1000, Origem+100, nativos perfeitos por classe, três slots, evoluções500, relíquia590, signos500, alma100, skills20.

Poder usa4×raiz(Pofensivo×Pdefensivo). Ofensivo estima rotação15s contra defesa6500/acerto2000; defensivo estimaHP,defesa,esquiva e resistências. O número é comparável numa referência comum, não probabilidade de vitória.

|Classe|Poder|DPS estimado|HP|
|---|---:|---:|---:|
|Vigia|16,766,364|596,868|325,872|
|Espectro|17,537,650|637,297|349,408|
|Arcanista|17,836,591|665,629|444,761|
|Bastião|14,694,681|246,923|450,397|
|Ruptor|18,445,964|584,860|427,208|
|Duelista|18,637,665|622,755|419,464|
|Lâmina Astral|17,564,530|572,422|355,023|

## DanoPvP

Após mitigação e multiplicadorPvP0,14, dano=H×0,24×D/(H×0,24+D). O teto é assintótico: elevar ataque ainda aumenta dano. Personagens com maisHP suportam mais ataques; habilidade de múltiplos impactos exige auditoria por execução. Fatores de orçamento por classe noCombatResolver também afetamPvE e são registrados noJSON; não são somente alterações cosméticas de poder. HP tem fator progressivo por classe para reduzir extremos de equipamento/atributos no1000, preservando o início.

## Simulações

3.150confrontos:21pares×50sementes×3cenários. Movimento/alcance1D, custoMP treinado, tempo de conjuração, projéteis, buffs e escudos. Inclui versões+50/85%dos adicionais e execução65%vs100%. Relatório íntegro em docs/research/combat-audit.json e noConsoleGM. Ainda não reproduz todas as passivas, cargas de classe, obstáculos, timing humano, servidor ou paridade de cada matchup. Portanto não certifica equilíbrio competitivo.

## Evidência de integração

100testes passaram. Na prévia667×375: relíquia1→2 comprada com250cash de teste, poder2.976.647→2.977.112, ações visíveis sem rolar ao fim. GMrestaurado ao1000 e17.836.591poder emArcanista. LançaArcana atingiu o alvo e reduziuHP152.335.000→151.421.501; Tempestade entrou em recarga após comando encadeado. Viagem aoSantuário daOrigemEterna funcionou, sem erro do aplicativo capturado. Testes físicosiOS/Android pendentes.
