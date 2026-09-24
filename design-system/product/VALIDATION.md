# Vérification — 24 septembre 2026

- `bun run ds:check` : 95 tokens, 58 composants, 4 assets canoniques, 7 règles, 6 patterns ; aucune dérive générée.
- `bun run typecheck` : réussi.
- `bun run test:storybook` : 200 tests réussis, 44 fichiers ; tests d’interaction et accessibilité dans les thèmes clair et sombre.
- `bun test packages/product-ui/tests/motion.test.mjs` : 3 tests réussis ; timeline déterministe et mapping des outils/instructions des 70 templates.
- `bun run storybook:build` : réussi.
- `bun run --cwd apps/wonkachat-lab build` : réussi.
- `bun run --cwd apps/wonkachat-lab build-storybook` : réussi ; nouvelles stories centrales et anciennes stories du lab indexées.
- gstack browse : 12 assertions de parcours réussies (recherche template, instructions, builder, validation outils, connexion/déconnexion, invitation locale, composer et livrable). Aucune erreur console observée pendant ce parcours.
- Mobile 390×844 : largeur du document 390 px, aucun débordement horizontal ni logo manquant sur le catalogue de connecteurs ; dialogue de connexion vérifié et fermeture par Échap.
- 16 PNG de référence : chacun à 3840×2160 ; vues claires et sombres. Cadrage du builder ajusté pour isoler une section sans couper les contrôles.

Ces résultats valident les présentations et interactions locales. Ils ne constituent pas un test des API WonkaChat, OAuth, invitations, facturation ou opérations d’outils en production. Les contrôles du backend ne sont pas branchés dans ce lab.

Avertissements non bloquants des outils existants : taille de certains chunks Storybook, classes de durée Tailwind 3 ambiguës et migration future du chargement de configuration Vite. Aucun n’empêche les builds.
