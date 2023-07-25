# Résumé des commandes principales:

### 1. Migration de la base de donnée

`npx prisma migrate dev` ---> Commande permettant de générer la base de donnée et les tables correspondantes.

### 2. Enrichissement de la base de donnée

`npx ts-node ./prisma/seeds.ts` ---> Commande permettant de créer les premières données et de les ajouter aux tables souhaitées.