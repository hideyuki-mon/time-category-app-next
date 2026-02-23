import {
  collection,
  doc,
  setDoc,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { auth, db, isConfigured } from "./firebase";
import { db as localDb, type RecordRow } from "./db";

const RECORDS_COLLECTION = "records";

function recordDocId(r: { date: string; startTime: number; category: number }) {
  return `${r.date}_${r.startTime}_${r.category}`;
}

function isValidRecord(r: RecordRow): r is RecordRow & { date: string; startTime: number; endTime: number; duration: number } {
  return (
    r != null &&
    r.date !== undefined &&
    r.date !== null &&
    typeof r.date === "string" &&
    r.date.length > 0 &&
    r.startTime !== undefined &&
    r.startTime !== null &&
    typeof r.startTime === "number" &&
    !Number.isNaN(r.startTime) &&
    r.endTime !== undefined &&
    r.endTime !== null &&
    typeof r.endTime === "number" &&
    !Number.isNaN(r.endTime) &&
    r.duration !== undefined &&
    r.duration !== null &&
    typeof r.duration === "number" &&
    !Number.isNaN(r.duration) &&
    r.category !== undefined &&
    r.category !== null &&
    typeof r.category === "number" &&
    r.category >= 0 &&
    r.category <= 3
  );
}

export async function pushRecordsToCloud(): Promise<{ ok: boolean; count?: number; error?: string }> {
  if (!db || !auth?.currentUser || !isConfigured) {
    return { ok: false, error: "未ログインまたはFirebase未設定" };
  }
  try {
    const allRecords = await localDb.records.toArray();

    // 1. 事前に不正レコードをすべてローカルDBから削除
    const toDelete: number[] = [];
    for (const r of allRecords) {
      if (!isValidRecord(r)) {
        const id = (r as RecordRow).id;
        if (typeof id === "number") toDelete.push(id);
      }
    }
    for (const id of toDelete) {
      try {
        await localDb.records.delete(id);
      } catch {
        /* ignore */
      }
    }

    // 2. 正しいレコードのみをアップロード
    const validRecords = allRecords.filter(isValidRecord);
    const uid = auth.currentUser.uid;
    const coll = collection(db, "users", uid, RECORDS_COLLECTION);
    let pushed = 0;

    for (const r of validRecords) {
      const docId = recordDocId(r);
      if (docId.includes("undefined") || docId.includes("null")) continue;

      const cat = typeof r.category === "number" && !Number.isNaN(r.category) ? r.category : null;
      const date = typeof r.date === "string" && r.date ? r.date : null;
      const start = typeof r.startTime === "number" && !Number.isNaN(r.startTime) ? r.startTime : null;
      const end = typeof r.endTime === "number" && !Number.isNaN(r.endTime) ? r.endTime : null;
      const dur = typeof r.duration === "number" && !Number.isNaN(r.duration) ? r.duration : null;
      if (cat === null || date === null || start === null || end === null || dur === null) continue;

      const payload = { category: cat, date, startTime: start, endTime: end, duration: dur };

      try {
        const docRef = doc(coll, docId);
        await setDoc(docRef, payload);
        pushed++;
      } catch {
        /* 個別失敗はスキップ */
      }
    }

    return { ok: true, count: pushed };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}

export async function pullRecordsFromCloud(): Promise<{
  ok: boolean;
  count?: number;
  error?: string;
}> {
  if (!db || !auth?.currentUser || !isConfigured) {
    return { ok: false, error: "未ログインまたはFirebase未設定" };
  }
  try {
    const uid = auth.currentUser.uid;
    const coll = collection(db, "users", uid, RECORDS_COLLECTION);
    const snapshot = await getDocs(coll);
    const existing = await localDb.records.toArray();
    const existingKeys = new Set(
      existing.filter(isValidRecord).map((r) => recordDocId(r))
    );
    let added = 0;
    for (const d of snapshot.docs) {
      const data = d.data() as DocumentData;
      const key = d.id;
      if (existingKeys.has(key)) continue;
      const cat = data.category;
      const date = data.date;
      const startTime = data.startTime;
      const endTime = data.endTime;
      const duration = data.duration;
      if (
        typeof cat !== "number" ||
        cat < 0 ||
        cat > 3 ||
        typeof date !== "string" ||
        !date ||
        typeof startTime !== "number" ||
        Number.isNaN(startTime) ||
        typeof endTime !== "number" ||
        Number.isNaN(endTime) ||
        typeof duration !== "number" ||
        Number.isNaN(duration)
      ) {
        continue;
      }
      const row: RecordRow = {
        category: cat as RecordRow["category"],
        date,
        startTime,
        endTime,
        duration,
      };
      await localDb.records.add(row);
      existingKeys.add(key);
      added++;
    }
    return { ok: true, count: added };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}

export async function syncRecords(): Promise<{
  ok: boolean;
  pushed?: number;
  pulled?: number;
  error?: string;
}> {
  const pushResult = await pushRecordsToCloud();
  if (!pushResult.ok) return pushResult;
  const pullResult = await pullRecordsFromCloud();
  if (!pullResult.ok) return pullResult;
  return {
    ok: true,
    pushed: pushResult.count,
    pulled: pullResult.count,
  };
}
