// frontend/src/types/tracking.ts
export interface TrackingEntry {
    bottles: number;
    diapers: number;
    breastPumping: number;
    timestamp: Date;
  }
  
  export interface StatisticEntry {
    bottles: number;
    diapers: number;
    breastPumping: number;
  }

  export interface RecapEntry {
    time: string;
    description: string;
  }
  
  export interface Stats {
    totalBottles: number;
    totalDiapers: number;
    totalBreastPumping: number;
  }