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

export async function pushRecordsToCloud(): Promise<{ ok: boolean; count?: number; error?: string }> {
  if (!db || !auth?.currentUser || !isConfigured) {
    return { ok: false, error: "未ログインまたはFirebase未設定" };
  }
  try {
    const records = await localDb.records.toArray();
    const uid = auth.currentUser.uid;
    const coll = collection(db, "users", uid, RECORDS_COLLECTION);
    for (const r of records) {
      const docRef = doc(coll, recordDocId(r));
      await setDoc(docRef, {
        category: r.category,
        date: r.date,
        startTime: r.startTime,
        endTime: r.endTime,
        duration: r.duration,
      });
    }
    return { ok: true, count: records.length };
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
    const existingKeys = new Set(existing.map((r) => recordDocId(r)));
    let added = 0;
    for (const d of snapshot.docs) {
      const data = d.data() as DocumentData;
      const key = d.id;
      if (existingKeys.has(key)) continue;
      const row: RecordRow = {
        category: data.category as RecordRow["category"],
        date: data.date as string,
        startTime: data.startTime as number,
        endTime: data.endTime as number,
        duration: data.duration as number,
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
