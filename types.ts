
export interface SheepSkin {
  id: string;
  name: string;
  bodyColor: string;
  headColor: string;
  woolColor: string;
  accentColor: string; // Added for extra detail
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  scale: number;
}

export interface StoryResponse {
  title: string;
  content: string;
}
