# OpenSEO pour Wonka France

Instance locale de [every-app/open-seo](https://github.com/every-app/open-seo), séparée du site Next.js. Version **v0.1.9**, image épinglée par digest dans `compose.yaml`. Aucun script OpenSEO ni secret n'est envoyé aux visiteurs du site.

## Démarrage

Depuis la racine du dépôt :

```sh
cp ops/openseo/.env.example ops/openseo/.env
# Renseigner les clés dans ce fichier local si disponibles.
docker compose -f ops/openseo/compose.yaml up -d
```

Ouvrir **http://127.0.0.1:3001**. Utiliser cette adresse (IPv4) : `localhost` peut résoudre en IPv6 alors que Compose écoute seulement sur 127.0.0.1.

Le service conserve sa base dans le volume Docker `wonka-openseo_open_seo_data`. Son mode local n'a pas d'authentification : conserver l'écoute sur 127.0.0.1. La télémétrie OpenSEO est désactivée. Arrêter avec `docker compose -f ops/openseo/compose.yaml stop` ; ne pas utiliser `down -v` pour conserver les données.

## Configuration Wonka

Sur l'installation préparée le 24 septembre 2026 :

- Projet : **Wonka France** ; domaine : `wonka-ai.com`.
- Pays : **France** ; langue : **French**.
- Projet local : `3c5eb5bd-4095-4f42-a838-ba0b3aed1019` (un autre poste aura un autre ID).
- Audit technique terminé : `608c6638-8b90-4095-86cb-4fed5d06e97b`, depuis `https://www.wonka-ai.com/fr`, limite 200 pages, Lighthouse désactivé : **185 pages, 0 erreur, 13 avertissements, 120 remarques informatives**.

Sur une nouvelle installation, créer le projet avec les mêmes paramètres. Le contexte et les mots-clés proposés sont dans `docs/seo/project-context.json` et `docs/seo/keyword-map.csv` ; le contexte, les concurrents et les pages prioritaires ont aussi été enregistrés dans cette instance via son MCP local. Le CSV reste une liste de requêtes à mesurer, sans métriques inventées.

## Données SEO et accès

Les volumes, positions, backlinks et analyses concurrentielles nécessitent **DataForSEO** : encoder en base64 le login et le mot de passe **API**, puis renseigner `DATAFORSEO_API_KEY` dans le fichier local. Ne jamais le coller dans une PR. Redémarrer avec `docker compose -f ops/openseo/compose.yaml up -d --force-recreate` après modification. Les requêtes fournisseur sont payantes : contrôler les crédits et le budget avant de lancer une recherche.

Pour les clics et impressions réels, configurer OAuth Google puis connecter Search Console pour le domaine Wonka. OpenRouter est facultatif et sert uniquement aux fonctions IA de l'outil. Aucun de ces accès n'est nécessaire au build du site.

L'état de santé se lit sur `http://127.0.0.1:3001/api/health`. Sans clé DataForSEO, le service et sa base peuvent être sains avec un avertissement `dataforseo: warn`. Cela ne constitue pas une mesure de positions.

Pour connecter un agent, suivre **Agent setup** dans l'instance locale et la [documentation MCP amont](https://github.com/every-app/open-seo). Aucune configuration globale Codex ni compte payant n'est modifié par cette PR.
