export type Language = 'en' | 'kh';

export const t = {
  en: {
    logo: "SalaHub",
    nav_home: "Home",
    nav_universities: "Universities",
    nav_majors: "Majors",
    nav_about: "About",
    nav_signin: "Sign In",
    lang_toggle: "EN / KH",
    hero_title: "Find Your Perfect Campus",
    hero_subtitle: "Explore local tuition fees, majors, and chat directly with student seniors inside our Telegram community groups.",
    search_placeholder: "Search universities, locations, or majors...",
    btn_search: "Search",
    filter_all: "All",
    filter_public: "Public",
    filter_private: "Private",
    filter_stem: "STEM",
    filter_business: "Business",
    btn_join_telegram: "Join Student Community Chat ↗",
    no_results: "No universities found matching your criteria.",
    clear_filters: "Clear all filters",
    back_to_search: "Back to Search",
    university_not_found: "University Not Found",
    majors_and_fees: "Available Majors",
    community_hub: "Student Community Hub",
    community_desc: "Have questions about this campus? Connect with current Year 3/4 seniors and alumni from this school inside our dedicated Telegram community forum."
  },
  kh: {
    logo: "SalaHub",
    nav_home: "Home",
    nav_universities: "Universities",
    nav_majors: "Majors",
    nav_about: "About",
    nav_signin: "Sign In",
    lang_toggle: "EN / KH",
    hero_title: "Find Your Perfect Campus", 
    hero_subtitle: "Explore local tuition fees, majors, and chat directly with student seniors inside our Telegram community groups.",
    search_placeholder: "Search universities, locations, or majors...",
    btn_search: "Search",
    filter_all: "All",
    filter_public: "Public",
    filter_private: "Private",
    filter_stem: "STEM",
    filter_business: "Business",
    btn_join_telegram: "Join Student Community Chat ↗",
    no_results: "No universities found matching your criteria.",
    clear_filters: "Clear filters",
    back_to_search: "Back to Search",
    university_not_found: "University Not Found",
    majors_and_fees: "Available Majors",
    community_hub: "Student Community Hub",
    community_desc: "Have questions about this campus? Connect with current Year 3/4 seniors and alumni from this school inside our dedicated Telegram community forum."
  }
};

export const MOCK_UNIVERSITIES = [
  {
    id: "rupp", 
    name_en: "Royal University of Phnom Penh", 
    name_kh: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ", 
    location_en: "Phnom Penh", 
    location_kh: "ភ្នំពេញ", 
    tuitionRange: "$500 - $1,200/year", 
    telegramUrl: "https://t.me/placeholder_rupp",
    tags: ["Public", "STEM"],
    majors: [
      { name: 'Computer Science (IT)', fee: '$600/year' },
      { name: 'English Literature', fee: '$500/year' },
      { name: 'Data Science', fee: '$800/year' }
    ]
  },
  {
    id: "itc", 
    name_en: "Institute of Technology of Cambodia", 
    name_kh: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា", 
    location_en: "Phnom Penh", 
    location_kh: "ភ្នំពេញ", 
    tuitionRange: "$600 - $1,200/year", 
    telegramUrl: "https://t.me/placeholder_itc",
    tags: ["Public", "STEM"],
    majors: [
      { name: 'Computer Science', fee: '$600/year' },
      { name: 'Civil Engineering', fee: '$800/year' },
      { name: 'Electrical & Energy Engineering', fee: '$750/year' }
    ]
  },
  {
    id: "num", 
    name_en: "National University of Management", 
    name_kh: "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង", 
    location_en: "Phnom Penh", 
    location_kh: "ភ្នំពេញ", 
    tuitionRange: "$400 - $900/year", 
    telegramUrl: "https://t.me/placeholder_num",
    tags: ["Public", "Business"],
    majors: [
      { name: 'Business Administration', fee: '$450/year' },
      { name: 'International Business', fee: '$600/year' },
      { name: 'Finance and Banking', fee: '$500/year' }
    ]
  }
];
