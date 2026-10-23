# Elyndra · direção visual 0.12

Estudo das seis imagens fornecidas pelo jogador. As capturas são referências de experiência e não são redistribuídas como arte do jogo.

| Referência observada | Princípio aproveitado | Adaptação original implementada |
|---|---|---|
| Menu lateral deIMG_0181 | Abrir sistemas sob demanda, com grade de ícones reconhecíveis | Central lateral translúcida, gruposPersonagem/Mundo/Sistema, controles reais e ícones próprios de cristal/titânio |
| Combate deIMG_0180 | Proporção contida do personagem, mundo visível, efeitos no ponto da ação | Herói menor, emissões no eixo da arma, projéteis e impactos separados; HUD menos opaco |
| Combate deIMG_0179 e0180 | Nome/HP do alvo no alto; habilidades ao alcance da mão direita | Alvo central superior compacto, ataque circular maior e seis ações ao redor, sem cobrir o centro |
| Campo deIMG_0178 | Missão curta com objetivo e progresso claros | Painel resumido da etapa regional; diário completo separado e navegação com caminho |
| Desbloqueio deIMG_0177 | Recompensa visível e chamada para usar o sistema liberado | Aviso temporário de nível/pontos ou capítulo, com açãoVer evolução e fechar; sem inventar recompensas |
| Combate deIMG_0176 | Leitura de sequência, golpe e área de impacto | Combo conta impactos reais, expira após3s sem acerto e não altera dano; nome da skill aparece ao executar |

## Identidade própria

Fantasia de tecnomagia: titânio azul-escuro, cristal opalino, energia cian e detalhes dourados. Qualidade do item e encantamento são informações diferentes. Raridade descreve a peça; emissão descreve seu grau. O+25 possui plasma branco/cian/violeta e faíscas, sem tornar toda peça comum visualmente divina.

O vocabulário de16ícones é arte original gerada: mochila, atributos, habilidades, mapa, asas, aura, pet, montaria, forja, runas, missão, chefe, loja, ranking, opções e retorno. A mesma mochila abre equipamentos no atalho e no menu. Texto, preços, cooldowns e valores permanecem elementos vivos.

## Comportamento das telas

- Mundo: controles ficam nas bordas; não abre janela vazia; ataque é manual e interrompe ao soltar.
- Central: abre pela engrenagem, ocupa a lateral direita, conserva o contexto visual do mundo. Pausa apenas a simulação solo. Voltar/fechar nunca executa compra.
- Inventário: personagem equipado à esquerda, mochila filtrável à direita. Abrir uma peça mostra valores,slots e ganho de poder. Voltar conserva filtro/rolagem.
- Atributos: edição é prévia, com orçamento real de pontos e comparação de poder. Só confirmar aplica.
- Empório: categoria → descrição/custo → confirmação → transação. Cash é moeda local de teste, sem pagamento real.
- Forja: peça/receita → materiais e probabilidade → tentativa → resultado. Compra inline considera materiais já possuídos.
- Jornada: contexto narrativo → etapa atual → progresso → recompensa única. Não avança etapas fora de ordem ou em outra região.
- Avisos: nível e capítulo possuem botão fechar e atalho para o sistema relacionado. Combo é indicador visual, sem bônus oculto.

Fonte principal é a pilha nativa do sistema, com pesos500–650 e números tabulares para recursos. Títulos têm mais contraste que descrições. Iluminação e molduras deixam áreas de texto escuras. Abertura180ms, pressão130ms; movimento reduzido desativa transições de janela/aviso. Botões de combate têm44px e ataque69px na implementação, independentemente do tamanho dos ícones.

## Limites técnicos que permanecem

As referências usam mundos/modelos3D; Elyndra é2,5D com atlases e efeitosCanvas/WebGL. Isso não equivale a câmera livre, animação esquelética ou armadura3D real. A evolução para esse patamar pede motor3D, modelos com esqueletos, animações direcionais, mapas e iluminação próprios, além do servidor paraMMORPG. Não se obtém isso somente trocandoCSS.

0.12 acrescenta organização e interação inspiradas nas referências e conserva as regras de combate0.11. Ainda não estabelece equilíbrio competitivo final. Testes de lógica passaram; inspeção visual final indisponível por falha interna de autorização do navegador de prévia, sem contorno da restrição. Medições de aparelho físico continuam pendentes.
