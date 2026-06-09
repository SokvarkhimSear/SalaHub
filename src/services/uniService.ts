import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { MOCK_UNIVERSITIES } from "../data";

export interface UniversityData {
  id: string;
  name_en: string;
  name_kh: string;
  location_en: string;
  location_kh: string;
  tuitionRange: string;
  telegramUrl: string;
  tags: string[];
  majors?: { name: string; fee: string }[];
  primaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  bannerUrl?: string;
  aboutInfo?: string;
  scholarshipsInfo?: string;
  websiteUrl?: string;
  facebookUrl?: string;
}

export const fetchUniversitiesFromDB = async (): Promise<UniversityData[]> => {
  try {
    if (!db) {
       console.warn("Firestore not initialized, returning mock data");
       return MOCK_UNIVERSITIES as unknown as UniversityData[];
    }
    
    // Quick timeout for Firestore
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore request timed out")), 2000)
    );
    
    const querySnapshot: any = await Promise.race([
      getDocs(collection(db, "universities")),
      timeoutPromise
    ]);
    
    const universities: UniversityData[] = [];
    
    querySnapshot.forEach((doc: any) => {
      universities.push({
        id: doc.id,
        ...doc.data()
      } as UniversityData);
    });
    
    if (universities.length === 0) {
      return MOCK_UNIVERSITIES as unknown as UniversityData[];
    }
    return universities;
  } catch (error) {
    console.error("Error fetching from DB, using mock:", error);
    return MOCK_UNIVERSITIES as unknown as UniversityData[];
  }
};

export const updateUniversityInDB = async (id: string, data: Partial<UniversityData>): Promise<void> => {
  if (!db) throw new Error("Firestore not initialized");
  await updateDoc(doc(db, "universities", id), data);
};

export const addUniversityToDB = async (id: string, data: UniversityData): Promise<void> => {
  if (!db) throw new Error("Firestore not initialized");
  await setDoc(doc(db, "universities", id), data);
};

