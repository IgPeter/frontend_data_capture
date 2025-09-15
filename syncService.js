// syncService.js
import { getUnsynced, markSynced } from "./src/storage/offlineStorage";
import { baseUrl } from "./src/utilities/BaseUrl";

const endpoints = {
  staffs: `${baseUrl}/staffs`,
  learners: `${baseUrl}/learners`,
  facilities: `${baseUrl}/facilities`,
};

export async function syncAllData() {
  for (const store of Object.keys(endpoints)) {
    const unsynced = await getUnsynced(store);

    for (let record of unsynced) {
      const { id, synced, createdAt, fingerprint, ...cleanData } = record;

      if (cleanData.staffId != " ") {
        // Append all fields
        const formData = new FormData();

        for (let key in cleanData) {
          if (
            cleanData[key] === undefined ||
            cleanData[key] === "" ||
            cleanData[key] === "undefined"
          ) {
            formData.append(key, "");
          } else {
            formData.append(key, cleanData[key]);
          }
        }

        try {
          const res = await fetch(endpoints[store], {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            await markSynced(store, record.id);
            console.log(`✅ Synced ${store} record:`, record);
          }
        } catch (err) {
          console.error(`❌ Failed to sync ${store} record:`, err);
        }
      } else {
        try {
          const res = await fetch(endpoints[store], {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cleanData),
          });

          if (res.ok) {
            await markSynced(store, record.id);
            console.log(`✅ Synced ${store} record:`, record);
          }
        } catch (err) {
          console.error(`❌ Failed to sync ${store} record:`, err);
        }
      }
    }
  }
}
