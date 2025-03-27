
export interface Threat {
  id: string;
  name: string;
  probability: number;
  impact: number;
  category: string;
  description: string;
}

export interface ThreatAssessmentProps {
  threats: Threat[];
}
