
// Shared enums for economy system
export enum ECONOMIE_TYPES {
  INCOME = "income",
  EXPENSE = "expense",
  TAX = "tax",
  COMMERCE = "commerce",
  MILITARY = "military",
  CONSTRUCTION = "construction"
}

export enum ECONOMIE_CATEGORIES {
  TAXES = "taxes",
  TRIBUTE = "tribute",
  COMMERCE = "commerce",
  CONSTRUCTION = "construction",
  MILITARY = "military",
  ADMINISTRATIVE = "administrative",
  RELIGIOUS = "religious",
  OTHER = "other"
}

export enum ECONOMIE_SOURCE {
  SENATE = "senate",
  PROVINCE = "province",
  CITIZEN = "citizen",
  FOREIGN = "foreign",
  GOVERNMENT = "government",
  MANUAL = "manual_entry"
}

export const RECURRING_INTERVALS = [
  "monthly",
  "quarterly",
  "biannually",
  "annually",
  "special"
];
