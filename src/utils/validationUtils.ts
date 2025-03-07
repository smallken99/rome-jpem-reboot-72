
/**
 * Validation utility functions for forms
 */

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

/**
 * Validates a password match
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Les mots de passe ne correspondent pas"
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates terms acceptance
 */
export const validateTermsAccepted = (acceptTerms: boolean): ValidationResult => {
  if (!acceptTerms) {
    return {
      isValid: false,
      error: "Vous devez accepter les conditions d'utilisation"
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Format d'email invalide"
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates password strength
 */
export const validatePasswordStrength = (password: string): ValidationResult => {
  if (password.length < 8) {
    return {
      isValid: false,
      error: "Le mot de passe doit contenir au moins 8 caractères"
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates a complete registration form
 */
export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  acceptTerms: boolean
): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: "Le nom d'utilisateur est requis" };
  }
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }
  
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }
  
  const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
  if (!passwordMatchValidation.isValid) {
    return passwordMatchValidation;
  }
  
  const termsValidation = validateTermsAccepted(acceptTerms);
  if (!termsValidation.isValid) {
    return termsValidation;
  }
  
  return { isValid: true, error: null };
};
