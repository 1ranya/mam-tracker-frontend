import { TrackingEntry } from "../types";

export const todayTrackingData = (data: any) =>{
    data.filter((entry: TrackingEntry) => {
        const today = new Date();
        const entryDate = new Date(entry.timestamp);
        return (
          entryDate.getFullYear() === today.getFullYear() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getDate() === today.getDate()
        );
      });
} 