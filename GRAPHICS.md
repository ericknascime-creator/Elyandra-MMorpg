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

## Alpha 0.9
Seven detailed class cutouts now replace the single warrior in world, selection and paperdoll when fully equipped. The greatsword is painted into the held pose, eliminating the detached transform. Main/offhand energy traces share the character transform. Class movement remains a posed sprite with bob/lunge, not a complete directional rig. Individual unequipped pieces use the existing procedural character to preserve correct equipment visibility. Inventory uses new weapon/helmet/chest art; other piece icons retain vector art. Three wing silhouettes and layered runic aura textures are integrated. Aura rings rotate at 0.022–0.035 rad/s (roughly 180–285 seconds/revolution); layers unlock every20levels. Original crest appears on welcome. Not all1035items have individual raster designs.

## Alpha0.10: animated attack sheets and unified entry
One welcome/character creation flow now serves the same raster renderer in campaign and testing. Existing saves resume; former isolated visual area is no longer exposed. Default test entry is250 with ULTRA+15, relics80, two million simulated cash and access to maps; campaign starts1. Entry is local, not account authentication.
New original imagegen WebP assets: ruptor-motion-v3 (4×3 idle/walk/attack with long two-handed daikatana), attacks-v3 (4×6 four attack poses for six other classes), effects-v3 (4×2 projectiles/impact/slash/storm), login-v3 (original citadel environment). Per-frame UV crops preserve alpha; runtime pose, particles and projectile transforms supply animation. Other classes still have single idle/walk body poses, mirrored facing; no eight-direction skeletal rigs. Full silhouettes use the current test appearance; no claim of individual raster designs for every rarity. Unequipped body parts retain procedural fallback.
Weapon enchants now have distinct stages0/5/10/15/20/25: neutral, gold, blue, cyan, violet and exuberant white/cyan at25. More flowing motes, core lines and layered highlights unlock with stage; main and offhand read their own enchant. The old unrelated stationary gold ellipse is removed. Cloud browser QA verified Canvas2D fallback and visible skill damage; no physical iPhone/Android or GPU-path performance certification.

## Alpha0.11
Atlases adicionais: companions/npcs/sigils/logo-v4; ground/scenery/mobs/presence/frames/weapon-energy-v5. Manto deMagículas em duas passagens, partículas limitadas e energia dearma com emissão por eixo. Molduras9slice futuristas e botõesDOM. Herói menor em paisagem. Interface final desta revisão ainda semQAvisual: falha interna da autorização do navegador.
