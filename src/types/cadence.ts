export interface PillarData {
  id: string;
  number: string;
  kicker: string;
  title: string;
  description: string;
  tag: string;
  accentColor: string;
}

export interface AppItem {
  id: string;
  name: string;
  badge: string;
  url: string;
  description: string;
  bullets: string[];
  color: string;
  iconName: string;
  previewType: 'roadmap' | 'otis' | 'timer';
}

export interface Milestone {
  period: string;
  duration: string;
  company: string;
  location: string;
  country: string;
  flag: string;
  role: string;
  isCurrent?: boolean;
}

export interface SyncPoint {
  day: number;
  timeLabel: string;
  sprintPhase: string;
  releaseState: string;
  strategicNote: string;
  harmonyLevel: number;
}
