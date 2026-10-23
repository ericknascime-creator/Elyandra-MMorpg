# Elyndra0.8 — Jardins de Hélion

## Implemented scope

A separate playable visual slice entered through **JOGAR NOVA ÁREA GRÁFICA** on the welcome screen. One Ruptor armor family, four greatsword appearances, twelve body frames, nine wolf frames, two ground textures, tree and ruin art, three main attack skills, a short3wolf→Fenrir objective. Existing classic classes and campaign remain accessible. The slice is a level175 laboratory profile; it does not participate in ranking. Original armor art is used for a fully equipped Ruptor; removing armor parts uses the existing modular renderer, so missing equipment is visible. It is not a library of1035unique3Dmodels.

## Renderer

- CPU Canvas2D composes terrain, sprites and effects to an offscreen scene canvas.
- `engine/gpu.js` uploads the composed scene once per frame, extracts bright pixels into a one-third-resolution framebuffer, applies horizontal/vertical blur and combines bloom with restrained color grading. This is a WebGL postprocessing compositor, not a full3Dengine or GPU sprite batcher.
- Framebuffers/textures are allocated on resize only. Repeated ground/decor drawing uses existing caches. Character and creature frames are cropped from texture atlases at runtime. Props are depth sorted; foreground overlaps fade.
- `engine/vfx.js` has a fixed256particle pool, additive particles, layered blade trails and the equipped greatsword. Unequipping the weapon removes it.
- Device-pixel ratio capped1.25 on narrow screens. Target60fps on WebGL,30in economy or Canvas fallback; sustained slow render calls reduce target30. Targets are not measured performance promises.
- On missing WebGL, the game uses Canvas2D. On runtime GPU failure/context loss, an input-transparent scene canvas can continue displaying the game. Real iPhone/Android GPU performance is not yet benchmarked.
- Browser QA environment reports WebGL unavailable. The compatibility path, artwork, controls and combat were tested there; the actual GPU shader execution still needs testing on a WebGL-enabled device.

## Data separation

Stats, equipment, enhancement and cash rules remain in core/progression/loadout/premium modules. New art does not itself grant stats. The slice grants explicit lab resources and starts in level175gear. Its save uses the existing laboratory slot, backing up a prior laboratory profile to`elyndra-lab-before-visual08`; campaign storage is separate.

## Art

Original generated art; all exact prompts in`dist/art-manifest.json`. WebP sheets total approximately2MB, compared with severalMB of PNGsource art. Images are not3Dmodels: animation uses a finite sprite atlas with mirrored facing, not eight-direction skeletal animation. The new portrait and in-world art therefore share the same material/detail language, with the corresponding limits of2.5D sprites.

## Remaining expansion

Finish directional animation, build more equipment families and class-specific art, expand the new scene set, add GPU-native sprite batching when justified by profiling, and measure on physical phones. The broader multiplayer server, account persistence and payments remain separate pending work.
