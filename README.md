# divercities-frontend

A React JS user interface for the SMARTPORT Marseille Hackaviz challenge

Cette application intéragit avec l'API disponible <https://github.com/antoine-tech/divercities-api> pour recupérer les informations en base de donnée

l'application déployée est disponible à l'adresse suivante <https://hackaviz-frontend.herokuapp.com/>

## Présentation

Donner à voir le port du futur

Le French Smart Port in Med affirme la vocation portuaire et numérique de la Métropole Aix-Marseille-Provence en organisant un concours centré sur la DataVisualisation. Les acteurs économiques et institutionnels souhaitent mobiliser des étudiants pour participer au premier Hackaviz Smart Port du territoire.

Les partenaires de la démarche Smart Port Data inviteront les candidats à relever des défis qui leurs seront proposés pour visualiser et inventer le port du futur et ses nouveaux services.

Ils pourront découvrir les environnements logistique et énergétique liés au Grand Port Maritime de Marseille et au territoire de la Métropole, à travers l’exploitation de jeux de données variés et l’implication de partenaires de premier rang (MGI, l'Union Maritime et Fluviale Marseille Fos,Traxens, Métropole Aix-Marseille-Provence, GPMM, CCIMP, AMU, RTE, GRT Gaz, Enedis, AtmoSud…).


## Quick Start

Pour lancer le serveur en local vous devez disposez de node js et npm installé sur votre machine

Vous devez également vous procurer un token d'accès aux services de MAPBOX pour l'affichage des cartes <https://docs.mapbox.com/help/how-mapbox-works/access-tokens/>

1) Cloner le repertoire Github <https://github.com/antoine-tech/divercities-frontend>

```
git clone https://github.com/antoine-tech/divercities-frontend
```

2) Ouvrir un terminal et se placer dans le repertoire cloné

```
cd divercities-frontend
```
3) Installer les dépendances

```
npm i
```

4) crér un fichier .env à la racine du dossier

```
touch .env
```

5) Ajouter la variable d'environnement suivante pour référencé votre token MAPBOX dans le fichier .env

```
MAPBOX_TOKEN="votre_token_mapbox"
```

5) Lancer le serveur en developpement

```
npm run dev
```


## Collaborateurs

- Gregory Moreau
- Ming Ming Du
- Vladimir Borel
- Antoine LE GUILLOU
