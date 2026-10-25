# Elyndra0.22 — ULTRA, ATK e pontuação de poder

## Alterações reais

- Toda arma +100 usa o estágio máximo de encantamento, independentemente da raridade. Modelo/ornamentos ULTRA são separados do brilho. Os quatro conjuntos novos só aparecem na combinação de arma e armadura ULTRA; conjuntos mistos ainda usam o renderizador anterior.
- Atlas transparente original com quatro poses para Arqueiro, Mago, Guerreiro e Espadachim, seguindo a prancha aprovada das armaduras. Armas foram redesenhadas em uma segunda prancha e o atlas foi editado para acompanhá-las. Há idle, preparação, liberação e recuperação; não é um personagem3D com oito direções ou uma animação esquelética final. Recortes e alinhamento são aproximações medidas por quadro e continuam sujeitos a refinamento visual.
- Bases ULTRA são calculadas em2,7× no motor e no inspetor, sem multiplicar opções nativas e runas. Não ocorre migração destrutiva nem multiplicação repetida de saves. Méritos por arma: +18pp dano crítico, +260 penetração, +1,5pp ignorar resistência AMP e +1pp ignorar resistência à taxa crítica. Méritos por peça defensiva: +75 redução por impacto, +4pp resistência ao dano crítico, +2,5pp resistência AMP e +1,2pp tenacidade. Eles não crescem com enchant.
- Receitas ULTRA: ouro8×, materiais12×, mais30 Núcleos Soberanos por peça. Cataclismo de nível1000 concede um núcleo por vitória; a compra simulada de faltantes custa50.000cash por núcleo. ULTRA continua apenas por criação, sem drop direto. Dificuldade de perfeição nativa e três opções/slots continuam regidas pelas tabelas anteriores.
- Bônus de asas, aura, Magículas, pets, montarias, relíquias, constelações e alma são ampliados4,5× a partir do nível600. Não é uma promessa de4,5× no PC total nem multiplicação recursiva de sistemas. Movimento não recebe4,5×; limites de chance crítica, ataque, recarga, tenacidade e pressão continuam aplicados. Ressonâncias divinas de equipamentos são méritos próprios, não parte desse multiplicador.
- Inimigos de faixa600+ receberam HP12,15× e ataque4,5× no orçamento de encontros, para acompanhar a inflação de equipamentos. Essa é uma primeira escala de teste, não equilíbrio certificado de todos os chefes.

## ATK único e poder comum

O jogador vê ATK. O motor converte bases antigas AF/AM e o novo atributo ATK para o canal da classe. Espadachim usa um ataque compartilhado pelos seus golpes físicos, mágicos e híbridos. Os identificadores antigos continuam internamente para preservar arquivos, fontes e saves. Opções nativas do catálogo foram consolidadas em ATK. Opções AF/AM em saves antigos são convertidas para ATK na entrada, preservando os valores; os identificadores antigos continuam aceitos pelas funções de compatibilidade. A interface principal e bases equipadas usam ATK.

O exemplo do usuário “28pp de dano crítico =20.000” NÃO virou uma regra fixa. `scripts/calibrate-power.mjs` mede os ganhos marginais em uma referência comum de atributos nas quatro classes, a partir da raiz de DPS de rotação × HP efetivo. A mediana produz preços universais em `dist/power-calibration.json`. Tenacidade e danoPvP usam orçamentos de cenário explícitos porque não têm efeito na rotaçãoPvE. A escolha de normalização em1.000.000pontos e desses dois orçamentos é de design, não descoberta de uma unidade física de poder.

Pesos desta versão (arredondados para leitura): ATK +1 =5poder; HP +1 =0,5; defesa +1 =36,12; precisão +1 =62,31; penetração +1 =350,98; dano crítico +1pp =908,68; chance crítica +1pp =6.795,10; ampliação útil +1pp =1.946,79; velocidade de ataque +1pp =1.196,83; redução de recarga +1pp =3.322,07. Assim,+28pp de dano crítico vale aproximadamente25.443pontos, igual nas quatro classes (até1ponto de arredondamento).

Ampliação incompatível com a classe não pontua. Taxa crítica acima do limite não pontua. PC é a pontuação de atributos; dano estimado e sobrevivência permanecem cálculos separados. Preços iguais não significam que todas as combinações produzem o mesmo DPS ou a mesma taxa de vitória. A auditoria de900duelos ainda mostra confrontos desiguais; não há alegação de equilíbrio final nem PvP real online.

## Prazo de35anos confirmado pelo usuário

Referência explícita:2horas por dia;100horas iniciais estimadas e25.467,5horas entre600e1000. A soma é25.567,5horas=35×365,25×2. Sem bloqueio de calendário.

A curva tem forma6×(1+A×u³)horas por nível, u=(nível−600)/399. A é calculado para fechar o orçamento. Exemplos:600→601=3dias;700→701=4,81dias;800→801=17,49dias;900→901=51,9dias;999→1000=118,05dias, sempre com2h/dia.

XP exigido usa uma renda de referência de34,9×xpBase/hora, combinando300mobs,60contratos,6DGs e2chefes por hora. É uma hipótese de calibração, não promessa de que um jogador fará essa quantidade ou levará exatamente35anos. Eficiência de farm, eventos, equipe e novas fontes mudam o prazo. O período inicial de100horas é uma hipótese de orçamento, não um cronômetro verificado na campanha atual.

Ascensão Soberana, na central Evoluir, mostra tempo e preço por nível. Treinamento custa500cash por hora de referência e concede EXP equivalente ao nível atual, com confirmação, preservando EXP anterior. Recurso é simulado, sem pagamento ou cotação em reais. GM continua no1000 com recursos livres. Sustentabilidade financeira não foi validada; um prazo extremo pode prejudicar retenção, e não se afirma que ele financiará o servidor.

## Correções verificadas

O minimapa agora acompanha o marco épico atual, em vez de marcar Ilyra sempre. Caminho até o Acampamento foi testado pela interface e mudou o diário para o segundo objetivo. HP/MP do GM entram cheios depois das mudanças de atributos. A recompensa deDG usava variável `boss` inexistente; foi corrigida e recebeu teste. Magículas foram ampliadas além das asas e ganharam fitas preenchidas em gradiente, além de partículas. A ponte e água receberam detalhes para reduzir a aparência de faixas planas.

120testes automatizados passaram: crescimento e cash atômico, igualdade de crédito crítico, ATK genérico entre classes, caminho nas21regiões, geometria finita dos efeitos e proteção de configurações. Verificação visual em navegador667×375. Dispositivos físicos, anatomia quadro a quadro completa e equilíbrio final dePvP ainda precisam de revisão.
