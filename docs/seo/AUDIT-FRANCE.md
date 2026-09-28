# Audit SEO France — Wonka AI

Date : 24 septembre 2026. Base GitHub : `4742e7b` (`Caezarr/website/main`). Le dossier de travail habituel, qui contenait des changements non commités, n'a pas été modifié.

## Priorités retenues

1. **Répondre à une vraie décision d'achat.** Refondre les comparatifs français Dust, Langdock et ChatGPT ; ajouter Claude ; proposer des critères, des tests métier et des sources consultables. Une plateforme concurrente n'est pas assimilée à un compte ChatGPT personnel.
2. **Fiabiliser les URL proposées aux moteurs.** Nettoyer le sitemap, les variantes linguistiques, les canoniques et les données structurées. Prévenir l'indexation des previews et les régressions par tests.
3. **Installer la mesure.** OpenSEO v0.1.9 tourne en local, projet France/français configuré. Le plan de mots-clés est prêt. DataForSEO et Search Console restent à connecter pour prioriser avec de vraies mesures.

Le site disposait déjà de pages commerciales EN/FR/NL, d'un maillage vers les ressources, de métadonnées par page et de génération statique. Il fallait renforcer ces fondations et les pages de décision, plutôt que créer des dizaines de pages quasi identiques.

## Constats et corrections

| Constat vérifié | Conséquence | Correction dans cette PR |
|---|---|---|
| `/fr/vs/claude` renvoyait 404 ; ChatGPT, Dust et Langdock avaient déjà une URL | Couverture incomplète des quatre concurrents demandés | Ajout de Claude ; réutilisation des trois URL existantes, sans doublon ChatGPT |
| Comparatifs FR datés : nombre fixe de connecteurs, prix ambigu « par siège/an », rapprochement avec ChatGPT personnel, absence de sources liées | Un acheteur ne peut pas vérifier le périmètre ; risque de perte de confiance | Guide propre à chaque concurrent, reconnaissance de leurs capacités, tests concrets, sources et date de revue |
| `/nl/vs/dust` renvoyait 200 avec du texte anglais et une canonique EN | Variante linguistique non publiée servie comme page valide | FR/EN seulement ; NL renvoie 404 ; même protection pour Langdock |
| `x-default` des hubs pointait vers l'accueil plutôt que le hub EN | Le lien de secours ne représente pas le même contenu | `x-default` vers `/vs`, `/blog`, `/learn`, etc. |
| Le layout de langue injectait les accueils en alternates de pages qui n'en définissaient pas | Héritage d'alternates sans rapport avec la page | Suppression de l'héritage global ; alternates définis par les pages vérifiées |
| Origine canonique pouvait provenir d'un hostname Vercel de déploiement | Canonique de preview possible si l'environnement de site était omis | Origine de production stable, surcharge explicite validée ; noindex des previews |
| `lastmod` des pages statiques renouvelé à chaque génération | Dates ne correspondant pas aux mises à jour éditoriales | Dates CMS conservées ; dates éditoriales pour les comparatifs ; omission quand inconnues |
| `/terms`, `/privacy`, `/cookies` figuraient dans le sitemap malgré leur `noindex` | Signaux contradictoires | Retrait du sitemap, pages toujours accessibles |
| Deux URL de cas clients étaient ajoutées en dur sans dépendre de leur publication CMS | URL non garanties dans le sitemap | Le CMS devient la source de ces entrées |
| Erreur CMS avalée lors du sitemap | Un problème de CMS pouvait publier silencieusement un sitemap partiel | La génération échoue explicitement et permet à la révalidation de conserver son ancienne réponse |
| Le schéma des intégrations déclarait systématiquement un prix de 0 € | Offre gratuite non justifiée par le contenu | Retrait du prix et de l'offre synthétique |
| Les pages France utilisaient par défaut `en_US` pour Open Graph | Métadonnées linguistiques erronées | Locale française explicite |
| La zone servie des landing pages omettait la France | Description incomplète du marché visé | Ajout explicite de la France |

Les nouvelles pages ont un seul H1, un fil d'Ariane visible, un tableau accessible, des FAQ identiques au JSON-LD et des liens directs vers diagnostic, tarifs, sécurité, Odoo et autres comparatifs. Le hub `/fr/vs` les référence même si aucune comparaison n'est présente dans Sanity. Aucun contenu Sanity n'a été écrasé : les quatre comparatifs FR sont désormais pilotés par le dépôt et prioritaires sur le CMS pour ces URL.

## Mesures et couverture

- `production-baseline.json` : lecture de 21 URL publiques et du sitemap de 174 entrées via gstack, HTML reçu avant exécution JavaScript. Ce relevé n'est pas un classement Google.
- `local-validation.json` : contrôle de toutes les 169 URL du sitemap après correction : HTTP 200, canonique propre, indexabilité, titre, description, H1 et JSON-LD valide ; réciprocité des alternates publiés ; 404 attendues sur les variantes non publiées.
- Les 169 titres et descriptions contrôlés sont uniques.
- Build Next.js de production : 201 documents HTML générés. Aucun moteur d'IA ni SDK OpenSEO ajouté au bundle du site.
- 8 tests de contrats SEO ; lint du périmètre ; TypeScript ; validation du design system. Vérification navigateur sur mobile et ordinateur, tableau à défilement interne et parcours vers le diagnostic.
- OpenSEO : installation Docker saine, projet « Wonka France », France/français ; audit natif terminé sur la production : **185 pages, 0 erreur, 13 avertissements, 120 informations**. Exports complets : `openseo-status.json` et `openseo-issues.json`. Ces résultats décrivent la production avant fusion, pas la branche corrigée.

### Limites importantes

Les volumes de recherche, positions Google France, backlinks, clics Search Console et Core Web Vitals terrain **ne sont pas mesurés**. Les thèmes de `keyword-map.csv` sont des hypothèses d'intention, pas des estimations de trafic. Aucun classement, trafic ou revenu n'est promis.

Les pages officielles de Dust, Langdock et Anthropic ont été lues pendant la session. Les pages OpenAI ont renvoyé un blocage 403 au navigateur : la page ChatGPT n'en reproduit ni tarifs ni inventaire de fonctions ; elle présente les questions à vérifier sur les offres professionnelles. La revue éditoriale et la comparaison ne sont pas présentées comme un test comparatif de modèles.

Le root layout conserve `<html lang="en">` pour la génération statique partagée. Le shell fournit désormais `lang` côté serveur autour du contenu localisé et le document prend la bonne langue après hydratation, y compris au retour en anglais. Obtenir un attribut racine FR/NL dès le premier octet demande une migration des root layouts ; elle reste hors de cette PR pour préserver l'architecture statique et les parcours actuels.

En local, Sanity Live refuse l'origine de test non autorisée en CORS ; les pages compilées et leur contenu fonctionnent. Les intégrations de tracking peuvent aussi produire des erreurs hors domaine de production. Aucun réglage CORS ou compte d'analytics n'a été changé.

## Lecture des 133 observations OpenSEO

- **5 pages orphelines** : `/ai-agent-blueprint`, `/vs/dust`, `/vs/langdock`, `/fr/vs/dust`, `/fr/vs/langdock`. Toutes reçoivent maintenant un lien HTML depuis leur hub pertinent. Le contrôle local vérifie ce maillage, ainsi que celui des pages Claude et ChatGPT.
- **8 contenus courts** : les trois pages contact et le diagnostic avec quatre variantes de tracking. Les pages contact répondent à une intention de navigation : pas d'ajout de texte artificiel. Le diagnostic est un formulaire interactif ; il reste accessible depuis les CTA mais devient `noindex` et sort du sitemap. `/fr/audit-ia` porte le contenu destiné à la recherche.
- **65 titres longs / 43 descriptions longues** : remarques de longueur, pas des erreurs d'indexation. Les métadonnées du périmètre comparatif sont réécrites. Pas de troncature aveugle des articles CMS qui risquerait de supprimer le sujet ou de créer des doublons ; leur optimisation devra s'appuyer sur les requêtes et taux de clic Search Console.
- **7 canoniques vers une autre URL** : notamment alias du workspace et paramètres de campagne. Le principe est conservé ; le sitemap ne contient que les URL canoniques.
- **4 pages noindex / 1 description courte** : choix de pages utilitaires/légales ; exclusion du sitemap contrôlée. Les pages restent accessibles aux visiteurs.

Le fichier `public/llms.txt` est également recentré sur des informations factuelles et des liens vers les pages françaises. Il n'est pas présenté comme un levier de classement garanti. Les descriptions d'organisation n'ajoutent plus d'affirmations contractuelles à partir d'un texte générique.

## Prochaines actions après fusion

| Action | Méthode | Critère de décision |
|---|---|---|
| Vérifier le déploiement | Relancer `seo:check` avec l'URL de production | Canoniques, indexabilité et 404 correctes sur l'ensemble du sitemap |
| Mesurer la demande France | Configurer DataForSEO puis vérifier chaque cluster du CSV | Volumes, SERP et difficulté observés ; ne pas additionner les variantes qui se recouvrent |
| Suivre les conversions organiques | Connecter Search Console ; rapprocher pages d'entrée et diagnostics/essais qualifiés | Clics et leads qualifiés par page, pas seulement impressions |
| Consolider les preuves | Publier des cas clients autorisés avec situation initiale, méthode, résultat et périmètre | Preuve vérifiable et pertinente pour les métiers français |
| Développer l'autorité | Relations éditoriales et partenaires métier/Odoo ; contenus apportant une preuve originale | Liens éditoriaux pertinents et visibilité auprès des acheteurs |
| Revoir les comparatifs | Relire les sources officielles lors de chaque évolution majeure et dater la revue réelle | Exactitude des capacités, prix, contrats et conditions |
| Harmoniser les contenus historiques | Auditer les anciens articles CMS et les variantes anglaises avec les mêmes sources | Pas de promesses, prix ou comparaisons périmées |

Le travail hors site, les preuves client et la mesure sont nécessaires pour viser un positionnement compétitif face à des domaines établis. Une PR ne peut pas remplacer leur autorité ni garantir leur dépassement.

## Sources

- [OpenSEO](https://github.com/every-app/open-seo) et [installation Docker](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md).
- [Dust](https://dust.tt/), [Langdock](https://langdock.com/), [Claude entreprise](https://claude.com/solutions/enterprise) : consultation du 24 septembre 2026.
- [OpenAI offres](https://openai.com/business/chatgpt-pricing/) et [confidentialité](https://openai.com/enterprise-privacy/) : références proposées à la vérification ; consultation automatisée bloquée.
- Pages Wonka : `/fr`, `/fr/security`, `/fr/pricing`, `/fr/wonka-chat/odoo`, `/fr/start-ai` et sources du dépôt.

## Reproduire la validation

```sh
bun run test:seo
bun run typecheck
bun run ds:check
bun run build
bun run start --port 3101
# Autre terminal :
SEO_BASE_URL=http://127.0.0.1:3101 bun run seo:check
```

`SEO_CANONICAL_ORIGIN` permet de changer l'origine attendue (par défaut `https://www.wonka-ai.com`). `SEO_REPORT_PATH` enregistre la preuve JSON. Le contrôle ne soumet aucun formulaire et n'exécute aucune requête DataForSEO.
