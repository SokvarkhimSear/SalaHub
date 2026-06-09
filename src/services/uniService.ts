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
  aboutInfo?: string;
  scholarshipsInfo?: string;
  websiteUrl?: string;
  facebookUrl?: string;
}

export const fetchUniversitiesFromDB = async (): Promise<UniversityData[]> => {
  // Directly return mock data for now to prevent loading delays
  // since Firebase is not yet fully configured with valid project credentials.
  return Promise.resolve(MOCK_UNIVERSITIES as UniversityData[]);
};
