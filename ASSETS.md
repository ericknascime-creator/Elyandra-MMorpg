# Arte original — alpha0.5

`dist/assets/material-atlas-v1.png` foi criado com a ferramenta nativa de geração de imagens. Nenhum arquivo deCabal foi extraído ou reutilizado. O atlas é usado no terreno e nas superfícies de interface. Personagens, armas, ícones e efeitos são desenhados comCanvas/SVG no código para responderem aos equipamentos e animações.

Prompt final:

Use case: stylized-concept. Asset type: production game terrain texture atlas for an original dark fantasy isometric MMORPG named Elyndra. Create a single square texture atlas, exact 2 by 2 grid with equal square quadrants, no gaps or borders. Top-left: richly detailed mossy forest grass, tiny blades and earth, desaturated dark olive. Top-right: old weathered grey stone paving slabs with narrow cracks and patches of moss, dark warm grey. Bottom-left: ancient dungeon basalt flagstones with thin subtle cyan mineral cracks, deep cool charcoal. Bottom-right: oxidized dark bronze and navy forged metal, fine scratches, subtle hammered finish. Orthographic overhead flat material surfaces with NO perspective, no objects, no lettering, no characters, no UI, no icons, no logos. Hand-painted realistic RPG diffuse textures, rich fine surface detail, controlled low contrast, no strong directional shadows, tiles suitable for repeating at small scale. This is a texture atlas to be used inside the actual playable game, not a screenshot or concept scene.

## Alpha0.8 — original gameplay art

Generated using the built-in image_gen tool. Exact final prompts and asset paths are in `dist/art-manifest.json`. Four original transparent atlases, encoded as WebP quality90 with alpha preserved:

- `dist/assets/warrior-atlas-v1.webp`: twelve Ruptor poses, idle/walk/attack, four columns and three rows.
- `dist/assets/garden-atlas-v1.webp`: grass/stone textures, tree and ruin, two columns and two rows.
- `dist/assets/wolf-atlas-v1.webp`: nine wolf idle/run/attack poses, three columns and three rows.
- `dist/assets/weapon-atlas-v1.webp`: common/rare/legendary/ultra greatswords, two columns and two rows; shared between inventory and in-world weapon.

Source PNG outputs are kept in the generating workspace; the project ships optimized WebP files. No commercial game textures or character models were copied. User screenshots were visual references for density, materials and scale; not source textures.

### Alpha0.10 generated assets
Built-in image_gen, four original production briefs: (1)4×3 isometric silver/gold/navy male Ruptor with long heavy curved two-handed daikatana, both hands gripping same hilt, idle/walk/overhead slash; (2)4×6 atlas of archer, assassin, mage, tank, duelist, astral blade with windup/release/followthrough/recovery; (3)4×2 transparent cyan missile, golden arrow, violet impact, gold slash, cyan shockwave, crimson slash, violet rune, lightning impact; (4)wide original twilight citadel/forest/crystal-portal login environment with quiet left interface space. Transparent outputs preserved; ffmpeg used only for WebP encoding. Paths: dist/assets/ruptor-motion-v3.webp, attacks-v3.webp, effects-v3.webp, login-v3.webp. Layout metadata and runtime consumers in dist/engine/visual-assets.js, world.js and visual-garden.css.

## Alpha0.11 · imagens integradas

Arte original criada comimage_gen integrado; sem uso de arte dos jogos de referência. WebP preserva alpha. Registro detalhado emdist/art-manifest.json.

| Arquivo | Consumo funcional |
|---|---|
| companions-v4.webp | 3×2 · Três pets: slime astral, raposa lunar e draco; três montarias: lobo de prata, pantera astral e cervo solar. Arte original isométrica detalhada, células iguais com alpha. |
| npcs-v4.webp | 2×2 · Ilyra guardiã, Borun ferreiro, Selene mercadora e Aeris guardiã de criaturas. Figuras originais de corpo inteiro, isométricas, quadrantes isolados transparentes. |
| sigils-v4.webp | 4×2 · Seis estágios de núcleos de energia, pluma e essência, ícones de tecnomagia originais com alpha. |
| logo-v4.webp | single · Logo original ELYNDRA, ASCENSÃO DAS RELÍQUIAS, metal gravado e asas com cristais. Transparente. |
| frames-v4.webp | custom UV · Primeira geração de molduras ornamentadas. Conservada para histórico, substituída em runtime porframes-v5. |
| ground-v5.webp | 2×2 · Materiais planos originais para terreno: relva esmeralda, calçamento calcário, piso de masmorra em ardósia e areia. Sem perspectiva, quadrantes opacos. |
| scenery-v5.webp | 3×2 · Objetos isométricos transparentes: carvalho, salgueiro azul, rocha cristalina, portal, pavilhão e flores. |
| mobs-v5.webp | 3×2 · Criaturas originais isométricas: lobo blindado, escorpião cristalino, autômato, demônio, espírito e guardião do vazio. Alpha. |
| presence-v5.webp | 3×2 · Seis mantos de energia de corpo inteiro, centro vazio: branco/cian, verde, violeta, ouro, cian divino e violeta primordial. Alpha e margens para desenhar o herói no centro. |
| weapon-energy-v5.webp | 3×2 · Seis plumas verticais estreitas de energia viva, sem espada, do brilho branco discreto ao plasma cósmico cian/violeta, filamentos e faíscas. Alpha. Usadas sobre o eixo da arma com animação procedural. |
| frames-v5.webp | custom UV, 4 · Quatro molduras de titânio escuro futuristas, linhas finas cian/ouro/violeta/teal, cantos angulares. Interior e exterior transparentes, sem texto e sem controles desenhados. UV emui-assets.js; aplicação9slice. |

Movimento em tempo real: UV de animação dos personagens existentes; respiração/impacto das criaturas; manto deMagículas traseiro/frontal; partículas ascendentes e fragmentos; emissão de arma por eixo e grau; luz dos portais. As novas folhas de criaturas não são ciclos completos de locomoção: usam deformações/transformações limitadas. Botões e atributos permanecem texto e controles vivos, não uma imagem de interface falsa.

## Alpha0.12

assets/commands-v6.webp: folha4×4original gerada para16sistemas, usada noHUD, central e avisos. Mantida a transparência; somente codificaçãoWebP88. As imagens de referência do jogador foram estudadas, não copiadas para os recursos distribuídos.

## Alpha0.13

pet-forms-v7:18formas originais,6porpet, mudança de silhueta e materiais. pressure-burst-v7:6quadros de liberação espiritual, centro transparente e corteUVtécnico4px para evitar linhas de divisão. Arte gerada comimage_gen; WebP88preserva alpha. Capturas reais do navegador emdocs/qa, sem composição com imagens geradas.

## Atlas dos reinos —0.16

Arquivo integrado: `dist/assets/realm-landmarks-v16.webp` (derivadoPNG com alfa preservado; WebP88). Gerado pela ferramenta integrada image_gen, modo transparente; sem API/CLI externo. Uso: atlas, fortalezas e marcos no mundo. Quatro células2×2: Bastião da Alvorada, Coroa de Obsidiana, Santuário do Eclipse e Observatório do Infinito.

Prompt de produção: “Use case: stylized-concept. Production isometric fantasy MMORPG environment sprite atlas for original game Elyndra.2by2grid transparent sprite sheet, four separate complete buildings centered in equal square quadrants, no overlap. Consistent orthographic isometric camera, entrances facing lower right, crisp hand-painted realistic3D stone, metal, stained glass and luminous runes. Top left: ivory/gold celestial fortress, three towers, cyan beacon, sun heraldry. Top right: obsidian/silver fortress, purple spires, red windows, moon heraldry. Bottom left: forest sanctuary of roots and pale stone, emerald pool, canopy and lanterns. Bottom right: floating arcane observatory, ivory rings, star crystal, gold astrolabe and blue marble steps. Small stone bases, transparent empty background, no sky/fog/rectangular backdrops/text/UI/characters. Complete architectural silhouettes contained in cells.”

## Alpha0.18 — cosmic atlas
Built-in image generation, original 3×2 transparent atlas. Final: `dist/assets/cosmic-atlas-v18.webp` (preserved alpha; WebP88). Used by relic/sign panels, high-stage wings/aura, persistent Magículas mantle, evolved drake. Prompt: premium original techno-fantasy game atlas,6 isolated centered assets in equal3×2cells: black-platinum celestial hourglass/cyan starlight/gold orbit; twelve-star cobalt/gold constellation astrolabe; detailed articulated silver wings with violet/cyan tips; circular gold/cyan cosmic sigil; translucent upward plasma mantle with clear center; sapphire armored celestial dragon companion. Crisp sculpted metallic detail, no text, no frames, transparent background. Motion is procedural, not claimed to be a generated animation.

## Revisão visual 0.20 — arte original gerada

Ferramenta: image_gen, geração e edição por referência; conversão para WebP preservando transparência. Referências oficiais de Crystal Saga foram estudadas como direção visual, sem distribuição de capturas como arte do jogo.

- `dist/assets/visual-concept-v20.webp`: prancha de direção, guerreiro com arma de duas mãos, asas emplumadas, arco com energia e magia cristalina; exibida como conceito no ateliê.
- `dist/assets/feather-wings-v20.webp`: atlas original de seis pares de asas, marfim, verde, ametista, ouro, ciano e violeta; penas detalhadas e centro livre.
- `dist/assets/fantasy-effects-v20.webp`: pluma de lâmina, trilha de flecha, lança de mana, impacto cristalino, fita e centelha. Regiões UV manuais evitam presumir uma grade perfeita.
- `dist/assets/fantasy-slash-v20.webp`: corte crescente isolado transparente, ciano/violeta com filamentos dourados.
- `dist/assets/fantasy-seal-v20.webp`: selo rúnico isolado transparente, seis pétalas ornamentais, ouro/ciano e centro aberto.

Prompts de produção solicitaram fantasia própria, contornos nítidos em escala móvel, ausência de texto e molduras, energia presa à arma, asas de penas e transparência para composição. Crescente e selo foram gerados separadamente após inspeção do atlas. Sem buracos negros ou astros literais. Animação é executada no Canvas; imagens não contêm movimento por si mesmas.

## Revisão 0.21 — supremo e direção narrativa

Built-in image_gen, geração original; conversão para WebP com transparência preservada.

- `dist/assets/visual-concept-v21.webp`: prompt: prancha premium de fantasia para ELYNDRA, porto amplo, santuário, fortaleza, guerreiro de duas mãos; estudos +25/+75/+100 com energia progressiva, arco verde, cajado violeta, daikatana dourada, katana índigo. Sem astros literais ou logos de terceiros. Imagem de conceito, não captura do jogo.
- `dist/assets/supreme-energy-v21.webp`: prompt: pluma única vertical estreita transparente para arma, filamentos ciano, veios dourados, línguas violetas e centelhas, núcleo controlado, sem arma ou personagem, legível em cerca de20×100px, sem neblina opaca. Composta e animada pelo Canvas, não vídeo.
