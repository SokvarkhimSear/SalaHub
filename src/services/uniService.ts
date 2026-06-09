import { collection, getDocs } from "firebase/firestore";
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
}

export const fetchUniversitiesFromDB = async (): Promise<UniversityData[]> => {
  try {
    if (!db) {
       console.warn("Firestore not initialized, returning mock data");
       return MOCK_UNIVERSITIES as UniversityData[];
    }
    
    // Add a timeout to prevent hanging if Firebase is misconfigured but doesn't throw
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore request timed out")), 800)
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
      return MOCK_UNIVERSITIES as UniversityData[];
    }
    return universities;
  } catch (error) {
    console.error("Error fetching universities from Firestore:", error);
    return MOCK_UNIVERSITIES as UniversityData[]; // fallback string array or handle error appropriately
  }
};
