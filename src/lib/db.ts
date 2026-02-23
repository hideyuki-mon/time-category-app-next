import Dexie, { type Table } from "dexie";
import type { CategoryId } from "./constants/categories";

export interface RecordRow {
  id?: number;
  category: CategoryId;
  date: string;
  startTime: number;
  endTime: number;
  duration: number;
}

export interface DailyMemoRow {
  date: string;
  memo: string;
}

class Tap4DB extends Dexie {
  records!: Table<RecordRow, number>;
  dailyMemos!: Table<DailyMemoRow, string>;

  constructor() {
    super("Tap4DB");
    this.version(1).stores({
      records: "++id, category, date, startTime, endTime",
      dailyMemos: "date",
    });
  }
}

export const db = new Tap4DB();
