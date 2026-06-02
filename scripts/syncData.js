import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables (.env.local overrides .env)
dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Re-initialize the same Firebase client for this Node script execution
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1rvvKrT9x7JjkyiCCb5OeRCsYR6U0Pa8IeiIyYKC-42c/gviz/tq?tqx=out:json";

async function syncUniversities() {
  console.log("Connecting to Google Sheets...");
  try {
    const response = await fetch(SHEET_URL);
    let text = await response.text();
    
    // Strip out the google.visualization.Query wrapper
    text = text.replace("/*O_o*/\n", "").replace("google.visualization.Query.setResponse(", "").slice(0, -2);
    
    const data = JSON.parse(text);
    const rows = data.table.rows;
    
    let updatedCount = 0;
    
    // Iterate from row 1 (skipping header)
    for (let i = 1; i < rows.length; i++) {
        const c = rows[i].c;
        if (!c || c.length === 0 || !c[0] || !c[0].v) continue; // Skip empty rows
        
        const uniId = c[0].v;
        const name_en = c[1] && c[1].v ? c[1].v : "";
        const name_kh = c[2] && c[2].v ? c[2].v : "";
        const location_en = c[3] && c[3].v ? c[3].v : "";
        const tuitionRange = c[4] && c[4].v ? c[4].v : "";
        const telegramUrl = c[5] && c[5].v ? c[5].v : "";
        const tagsRaw = c[6] && c[6].v ? c[6].v : "";
        const primaryColor = c[7] && c[7].v ? c[7].v : "";
        const accentColor = c[8] && c[8].v ? c[8].v : "";
        const logoUrl = c[9] && c[9].v ? c[9].v : "";
        const bannerUrl = c[10] && c[10].v ? c[10].v : "";
        
        let tags = [];
        if (tagsRaw) {
            // Parse comma-separated tags and trim whitespace
            tags = tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean);
        }
        
        const docRef = doc(db, "universities", uniId);
        
        const uniData = {
            id: uniId,
            name_en,
            name_kh,
            location_en,
            tuitionRange,
            telegramUrl,
            tags,
            primaryColor,
            accentColor,
            logoUrl,
            bannerUrl
        };
        
        await setDoc(docRef, uniData, { merge: true });
        console.log(`✅ Synced: ${name_en} (${uniId})`);
        updatedCount++;
    }
    
    console.log(`\n🎉 Sync complete! Successfully updated ${updatedCount} universities.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error syncing data:", error);
    process.exit(1);
  }
}

syncUniversities();
