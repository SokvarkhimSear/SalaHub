import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

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
    const querySnapshot = await getDocs(collection(db, "universities"));
    const universities: UniversityData[] = [];
    
    querySnapshot.forEach((doc) => {
      // We expect the document ID to be the university id or include it in data
      // For fallback we can add id: doc.id if it's missing.
      universities.push({
        id: doc.id,
        ...doc.data()
      } as UniversityData);
    });
    
    return universities;
  } catch (error) {
    console.error("Error fetching universities from Firestore:", error);
    return []; // fallback string array or handle error appropriately
  }
};
