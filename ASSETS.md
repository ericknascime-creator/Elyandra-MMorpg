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
