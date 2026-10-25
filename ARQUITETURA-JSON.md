# Elyndra — dados e motor web

`dist/game-design.json` fornece parâmetros efetivamente carregados na inicialização: elenco de criação, sete registros históricos de classes, atributos base, crescimento por classe, escalas FOR/INT/DES, sete habilidades por classe, passivas, multiplicadores de dano, limites de acerto/PvP e estilos visuais das Magículas. Apenas Arqueiro, Mago, Guerreiro e Espadachim aparecem na criação; saves das demais classes continuam legíveis.

`dist/content.json` mantém o catálogo de equipamentos, receitas, mapas, masmorras e chefes. `dist/art-manifest.json` cataloga arte. Imagens WebP são arquivos separados: JSON referencia e parametriza dados, não substitui texturas.

`dist/game-data.js` valida estrutura, números finitos, textos, elenco, identificadores de comportamento e proporções antes de aplicar qualquer alteração. Uma configuração inválida impede a entrada do catálogo de teste, sem aplicação parcial. Mudanças de esquema exigem migração; não basta adicionar uma propriedade arbitrária.

O motor JavaScript continua responsável por movimento, colisões, fórmulas, IA, animações Canvas e entrada por toque. A mesma base de cliente pode ser empacotada futuramente em aplicativo; APK/iOS, serviços online, autenticação de GM e pagamentos reais ainda não estão implementados. A versão atual é uma alpha local, não um servidor MMORPG completo.

## Verificação desta revisão

112 testes automatizados aprovados, incluindo aplicação real de crescimento vindo do JSON, rejeição atômica de configuração inválida e preservação das classes arquivadas. Auditoria de combate: 900 duelos simulados entre quatro classes, sem equivaler a certificação de equilíbrio em PvP humano. Testes em aparelhos físicos continuam pendentes.
