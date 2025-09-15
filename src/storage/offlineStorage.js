// offlineStorage.js
import { openDB } from "idb";

// ✅ Initialize DB with 3 object stores
export async function getDB() {
  return openDB("school-capture-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("staffs")) {
        db.createObjectStore("staffs", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("learners")) {
        db.createObjectStore("learners", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("facilities")) {
        db.createObjectStore("facilities", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

// ✅ Save data offline
export async function saveOffline(store, data) {
  const db = await getDB();
  await db.add(store, { ...data, synced: false, createdAt: Date.now() });
}

// ✅ Fetch unsynced data
export async function getUnsynced(store) {
  const db = await getDB();
  return await db.getAll(store);
}

// ✅ Mark a record as synced
export async function markSynced(store, id) {
  const db = await getDB();
  const record = await db.get(store, id);
  if (record) {
    record.synced = true;
    await db.put(store, record);
  }
}
