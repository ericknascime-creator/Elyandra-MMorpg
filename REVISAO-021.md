# Elyndra 0.21 — objetivo, mundo e poder visível

## O motivo para jogar

Aster transforma pessoas e memórias em armas perfeitas. O jogador descobre que foi marcado para alimentar essa máquina. A campanha pergunta quem paga pelo poder dos soberanos: Ilyra investiga desaparecimentos, Borun assume sua participação nas correntes, Selene expõe a guerra que abastece o Trono e Aeris encontra memórias de sua família aprisionadas em equipamentos.

Seis atos vão do nível 1 ao 1000. Cada ato tem uma missão, cinco objetivos registrados, conclusão e título permanente. O jogador precisa explorar dois marcos, derrotar guardiões, concluir uma DG da região e vencer um chefe do patamar. Não basta alcançar o contador de poder. A conclusão não reinicia o progresso nem duplica recompensas. A história está em `dist/saga.json`; rastreamento e regras em `dist/saga.js`.

Os 21 capítulos regionais continuam acessíveis pelo diário. As nove regiões finais receberam textos próprios ligados ao conflito; antes repetiam a mesma explicação. Os títulos épicos ficam no registro Meu legado; não foram acrescentados como bônus arbitrários de dano.

## O motivo para continuar depois

Disponível nesta alpha: completar seis atos e seus títulos, aperfeiçoar a build, explorar regiões, enfrentar Cataclismos, obter materiais específicos e treinar execução das habilidades. A campanha exige jogar; cash não compra a conclusão. Recursos e cash são simulados, sem pagamentos.

Projeto para a fase multiplayer: temporadas de oito semanas, três fortalezas de fronteira com proprietários temporários, ataques e defesa em janelas anunciadas, troféus pessoais por contribuição e um estandarte visível da guilda vencedora. Vencer exige objetivos e composição de grupo; poder bruto não deve substituir captura, posicionamento e proteção de rotas. Troféus de guerra não serão vendidos. Não há servidor de guerras nesta revisão e nenhum botão simula jogadores humanos.

Cash deve ter utilidade em materiais e apresentação, com custo previsível, sem prometer liderança eterna. Um jogador maximizado ainda precisa de conteúdo que o desafie e adversários reais. A justificativa para investir é gostar dessa experiência e identidade, não recuperar dinheiro nem comprar uma vitória garantida. Não há base para vender esta alpha como um MMO pronto.

## Mundo ampliado

Área externa: grade antes 43×43, agora 65×65, aproximadamente 2,28 vezes a quantidade de células delimitadas. Isso não significa 2,28 vezes mais conteúdo artesanal. Rodovias garantidas conectam o porto ao Acampamento dos Exilados, Santuário Partido e Fortaleza do Limiar. Novos objetos de cenário, oito encontros externos e cinquenta posições decorativas possíveis usam os conjuntos de arte existentes. Não são 21 mapas inteiramente redesenhados.

O caminho automático, o minimapa e a camada de solo usam os limites ampliados. Dungeon continua com o limite anterior. A camada de solo é armazenada em cache; a arte fora da tela não é desenhada. Testes verificam a conectividade dos pontos nas 21 regiões.

## Arma suprema

A nova prancha original mostra a diferença pretendida entre +25, +75 e +100 e está disponível no ateliê como conceito. O sprite de emissão é original, transparente e integrado ao motor. Sua imagem não é uma animação pronta: o motor combina o sprite com curvas e centelhas em movimento sobre a geometria medida da arma.

Orçamento por arma: +25 tem 2 correntes e 8 partículas; +75 tem 4 e 16; +100 tem 5 e 22. Há halos locais, brilho de núcleo, plumas tangentes e arcos secundários a partir de +75. Zero não emite energia. O contorno do arco continua usando sua curva, não uma reta que flutua fora da arma. O orçamento é carregado do JSON e validado (máximo 28 partículas, 6 correntes e halo 24). O desenho evita uma nuvem branca cobrindo o personagem. Efeitos não aumentam dano.

## Referências estudadas

- ArenaNet, The Megaserver System: World Bosses and Events: https://www.guildwars2.com/en-gb/news/the-megaserver-system-world-bosses-and-events/ — referência para conteúdo desbloqueado por eventos encadeados, não apenas listas de inimigos.
- NCSOFT, Castle Siege patch notes: https://www.lineage2.com/en-us/news/castle-siege-patch-notes — referência para propriedade temporária e objetivos coletivos de cerco. Aplicação aqui está no planejamento, não em um servidor implementado.
- A direção visual segue o estudo anterior de asas e selos de Crystal Saga. Arte, narrativa e nomes novos são próprios; não foram extraídos modelos, texturas ou código desses jogos.

## Limites e validação

114 testes aprovados, incluindo seis atos completos por eventos, bloqueio por nível, rejeição de treino, região errada, ausência de recompensa duplicada e caminhos externos. Testes visuais em navegador horizontal não equivalem a validação de desempenho em iPhone/Android físico. Narrativa interativa tem registro e desfechos textuais, sem cinematográficas ou dublagem. Os atos usam cinco categorias repetidas de objetivos; escolta, puzzles ambientais, escolhas com estados persistentes de cidades e cercos são próximas expansões, não implementações reivindicadas.
