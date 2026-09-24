# Joel Lopes Ribeiro — Digital Resume

V1 technique du portfolio en français : Next.js 16.3.6 (App Router), React 19, TypeScript strict et CSS standard. Aucun kit UI, police externe, tracking ou backend d’envoi.

## Installation et lancement

Node.js 20.9 minimum, avec npm. Utiliser de préférence une version LTS maintenue.

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000. Le fichier `package-lock.json` est fourni ; `npm ci` permet une installation reproductible.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Organisation

- `app/` : page d’assemblage, layout, metadata et styles.
- `components/layout/`, `components/sections/`, `components/ui/` : structure, sections et composants réutilisables.
- `data/` : collections et coordonnées dans `profile.ts`.
- `types/index.ts` : contrats TypeScript des données.
- `lib/public-assets.ts` : détection serveur des fichiers personnels disponibles.

Les Client Components sont `Navigation.tsx`, `ContactForm.tsx` et `ScrollCompanion.tsx` (décoration animée au défilement). La page est prérendue au build.

## Personnalisation

La photo fournie est intégrée à `public/images/profile.png` ; ajouter le vrai CV à `public/documents/cv.pdf`. Sans photo, seules les initiales sont affichées. Sans PDF, le bouton CV reste masqué : aucun libellé « CV à ajouter » ni lien menant à une erreur 404. Dès qu’ils sont présents, la photo utilise `next/image` et le bouton télécharge `/documents/cv.pdf`. Relancer le serveur de développement si nécessaire et **reconstruire/redéployer en production après ajout ou remplacement**. Aucun faux fichier n’est fourni.

Renseigner les URLs réelles dans `socialLinks` de `data/profile.ts` pour remplacer les indications LinkedIn/GitHub. Utiliser des URLs HTTPS complètes.

Ajouter les projets dans le tableau de `data/projects.ts`, conformément au type `Project` : titre unique, description, puis technologies, repositoryUrl et demoUrl facultatifs. La liste vide affiche un état neutre. Les autres collections sont modifiables dans leurs fichiers `data/` respectifs.

Le MSc 2027–2029 est explicitement une formation prévue. La progression des compétences reprend les trois statuts fournis : acquis, en cours et à venir.

La palette, les espacements et les dimensions principales sont centralisés dans `:root` de `app/globals.css` pour préparer la V2. Les groupes de règles sont commentés.

## Contact et accessibilité

Le formulaire valide localement les champs obligatoires et l’email, place le focus sur la première erreur et annonce une confirmation de **simulation**. Il n’envoie, ne stocke et ne journalise aucune donnée. Les liens email et téléphone permettent le contact réel.

Navigation mobile avec fermeture après sélection et touche Échap ; lien d’évitement, focus visible, labels, titres hiérarchisés et grilles responsive. Aucun service externe à configurer.

## Vérifications réalisées

- Installation npm, lint ESLint, TypeScript et build de production : réussis.
- Navigateur Edge/Chromium : largeurs 320, 375, 768, 1024 et 1440 px, sans débordement horizontal.
- Vérification des ancres, d’un seul h1 et des dix sections.
- Lien d’évitement, menu au clavier, touche Échap et fermeture après navigation : vérifiés.
- Champs vides, email invalide, confirmation simulée et remise à zéro : vérifiés.
- Aucune erreur JavaScript ni requête externe observée pendant ces tests.

La photo fournie est intégrée sans retouche. Le PDF reste à fournir. Les tests ci-dessus ne constituent pas un audit exhaustif d’accessibilité.

Les livrables excluent `node_modules/`, `.next/` et les fichiers temporaires.


## Animations discrètes

Les cartes Poker et Sport affichent une illustration animée au survol et au focus clavier. Le personnage pixel art suit les bordures supérieures des cartes et séparateurs avec des poses marche, attente et assise. Il est décoratif, invisible aux lecteurs d’écran et ne bloque aucun clic.

Les animations sont isolées dans `app/animations.css` ; le suivi du défilement est dans `components/ui/ScrollCompanion.tsx`, sans dépendance supplémentaire. La préférence `prefers-reduced-motion` désactive le personnage et les animations.

Vérifications après modification : nouveaux textes, suppression des anciens libellés, animations au survol et au clavier, déplacement du personnage et réduction des animations ; lint, TypeScript, build et tests navigateur réussis.

Le personnage prolonge sa marche de 700 ms après le défilement et privilégie un même support pendant 950 ms tant qu’il reste visible. Le portrait conserve son cadrage carré, avec un cadre translucide discret (196 px sur mobile, 272 px sur ordinateur).

Les pieds sont alignés sur la bordure du support sans interpolation verticale. La marche garde un pied posé ; les changements entre supports sont directs, sans marche dans le vide. Le hero affiche deux lignes : Joel / Lopes Ribeiro.

## Progression des compétences

Les 3 étapes et leurs 17 catégories sont définies dans `data/skills.ts` (type `SkillStage`). Les cartes sont rendues côté serveur ; les styles sont isolés dans `app/skills.css`. Les technologies restent lisibles sans survol, notamment sur écran tactile. Le survol est léger et la réduction des animations est respectée.


## Langues et animation spéciale

Les cartes Langues utilisent les niveaux fournis (NATIF ou CECRL B2), avec des motifs décoratifs sans pourcentage ni conversion arbitraire du CECRL. Le mot de salutation est décoratif, masqué aux lecteurs d’écran, visible au survol et au focus clavier.

La chute du personnage est isolée dans `lib/companion-fall.ts`. Elle nécessite un défilement descendant supérieur à 700 pixels sur 140 ms après une interaction molette ou tactile ; les clics d’ancres ne la déclenchent pas. Chute de 760 ms, pause de 400 ms, puis retour sur un support. Le cooldown est de 5 secondes. La préférence de réduction des animations désactive l’ensemble du personnage et interrompt une chute en cours.

Validation complémentaire : 17 cartes de compétences (dont 7 catégories à venir), 4 cartes Langues, survol et focus clavier, défilement lent, chute rapide, retour sur une bordure, cooldown et annulation en mode réduction des animations testés dans le navigateur.

Les sauts ordinaires sont limités aux supports proches (135 px plus bas, 80 px plus haut, 110 px horizontalement). La trajectoire suit les bordures pendant le scroll, avec impulsion, vol, réception et reprise depuis le point exact de contact. Les grands espaces ne sont pas franchis par des bonds démesurés : le personnage accompagne son support hors écran puis réapparaît discrètement sur un support entrant. La chute spéciale reste réservée au scroll très rapide.
