
# Module de Propriétés Rurales

Ce module contient la définition des différentes catégories de propriétés rurales disponibles dans le jeu.

## Catégories de propriétés rurales

Les propriétés sont organisées en différentes catégories :

1. **Domaines agricoles** (`agriculturalDomains.ts`) - Propriétés axées sur la culture de plantes et céréales
   - Domaines céréaliers
   - Vignobles
   - Oliveraies

2. **Élevages** (`livestockFarms.ts`) - Propriétés dédiées à l'élevage d'animaux
   - Élevages d'équidés
   - Élevages de bovins 
   - Élevages de moutons

## Structure des données

Chaque propriété rurale doit avoir les propriétés suivantes :

### Propriétés obligatoires
- `id` : Identifiant unique de la propriété (chaîne de caractères)
- `name` : Nom de la propriété
- `description` : Description détaillée de la propriété
- `advantages` : Tableau de chaînes décrivant les avantages de posséder cette propriété
- `initialCost` : Coût initial d'acquisition
- `maintenanceCost` : Coût de maintenance périodique
- `prestige` : Points de prestige gagnés par la possession

### Propriétés optionnelles
- `income` : Revenu généré périodiquement
- `production` : Détails sur ce que produit la propriété
  - `type` : Type de production
  - `amount` : Quantité produite
  - `unit` : Unité de mesure
- `slaves` : Informations sur les esclaves nécessaires
  - `required` : Nombre minimum d'esclaves requis
  - `optimal` : Nombre optimal d'esclaves
  - `maxProfit` : Profit maximum avec le nombre optimal d'esclaves

## Comment ajouter un nouveau type de propriété

1. Identifiez la catégorie appropriée pour votre nouvelle propriété
2. Ajoutez la définition de votre propriété dans le fichier correspondant
3. Assurez-vous d'inclure toutes les propriétés requises et les propriétés optionnelles pertinentes
4. Mettez à jour le fichier index.ts si vous ajoutez une nouvelle catégorie
