
import { EducationPath } from '../types/educationTypes';

export interface EducationPathCardProps {
  path: EducationPath;
  isSelected?: boolean;
  onSelect?: () => void;
}
