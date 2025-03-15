# Public Buildings Module Documentation

## Structure Overview

The public buildings module is organized into a modular structure where building types are categorized based on their function and purpose in Roman society. Each category is maintained in its own file for better organization and maintainability.

### Category Structure

The public buildings are divided into the following categories:

1. **Administrative Buildings** (`administrativeBuildings.ts`)
   - Buildings related to governance and administration of the Republic
   - Examples: Curie, Forum Républicain, Archives d'État

2. **Security Buildings** (`securityBuildings.ts`)
   - Buildings related to public safety, security, and law enforcement
   - Examples: Præsidium, Caserne de la Garde Urbaine, Prison Républicaine

3. **Entertainment Buildings** (`entertainmentBuildings.ts`)
   - Buildings providing public entertainment and cultural activities
   - Examples: Amphithéâtre, Cirque, Odeon

4. **Utility Buildings** (`utilityBuildings.ts`)
   - Buildings providing essential public services
   - Examples: Aqueduc, Thermes Publics, Granarium Public

5. **Public Monuments** (`publicMonuments.ts`)
   - Monuments and charitable establishments
   - Examples: Statue, Maison des Indigents

## How to Add New Building Types

### Step 1: Determine the Appropriate Category

Choose which category file your new building belongs to based on its primary function.

### Step 2: Define the Building Object

Add a new entry to the appropriate category file following this template:

```typescript
building_key: {
  id: "building_key",         // Unique identifier (required)
  name: "Building Name",      // Display name
  description: "Detailed description explaining the building's purpose and historical context.",
  advantages: [
    "Primary benefit",
    "Secondary benefit",
    "Additional benefit"
  ],
  initialCost: 50000,         // Cost to construct in As (Roman currency)
  maintenanceCost: 5000,      // Annual maintenance cost
  prestige: 15,               // Prestige value (0-50 scale)
  reputation: 10,             // Reputation gain
  popularite: 20,             // Optional: Popularity impact
  piete: 5,                   // Optional: Piety impact for religious buildings
  slaves: {
    required: 5,              // Minimum slaves needed for operation
    optimal: 10,              // Optimal number of slaves for maximum efficiency
    maxProfit: 0              // Direct profit from the building (if applicable)
  },
  // Optional: For buildings that produce resources
  production: {
    type: "resource_type",
    amount: 100,
    unit: "unit_name"
  }
}
```

### Step 3: Update the Index File

The `index.ts` file in the public directory automatically combines all building categories. No changes are needed unless you are adding an entirely new category.

### Required Properties

All building entries MUST include these properties:

- `id`: String identifier (must match the object key)
- `name`: Display name
- `description`: Detailed description
- `advantages`: Array of benefits
- `initialCost`: Construction cost
- `maintenanceCost`: Upkeep cost
- `prestige`: Prestige value
- `slaves`: Object with `required`, `optimal`, and `maxProfit` properties

### Optional Properties

Buildings may include these additional properties as needed:

- `reputation`: Impact on family reputation
- `popularite`: Impact on popularity with the people
- `piete`: Impact on religious piety
- `income`: Direct financial income
- `production`: Resource production details

## Example: Adding a New Public Monument

To add a new monument called "Arc de Triomphe":

```typescript
// In publicMonuments.ts
export const publicMonuments: Record<string, BuildingDescription> = {
  // ... existing monuments
  
  arc_triomphe: {
    id: "arc_triomphe",
    name: "Arc de Triomphe",
    description: "Monument commémoratif célébrant une victoire militaire importante, ornée de reliefs détaillant les exploits.",
    advantages: [
      "Immortalise une victoire militaire",
      "Renforce le prestige familial",
      "Symbole durable de la gloire romaine"
    ],
    initialCost: 80000,
    maintenanceCost: 2000,
    prestige: 25,
    reputation: 30,
    slaves: {
      required: 0,
      optimal: 2,
      maxProfit: 0
    }
  }
};
```

## Updating Building Data

When modifying existing buildings, ensure that all required properties are maintained. The game's economy balancing depends on consistent property values across all building types.
