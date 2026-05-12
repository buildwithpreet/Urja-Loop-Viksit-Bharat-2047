"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "ma", name: "Maithili", native: "मैथिली" },
  { code: "sa", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "ks", name: "Kashmiri", native: "कॉशुर" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "sd", name: "Sindhi", native: "سنڌي" },
  { code: "dg", name: "Dogri", native: "डोगरी" },
  { code: "ko", name: "Konkani", native: "कोंकणी" },
  { code: "mn", name: "Manipuri", native: "মণিপুরী" },
  { code: "sk", name: "Sanskrit", native: "संस्कृतम्" }
] as const

export type LanguageCode = typeof LANGUAGES[number]["code"]

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_scan: "Scan",
    nav_map: "Tactical Map",
    nav_shop: "Resource Hub",
    nav_complaints: "Incident Log",
    nav_community: "Urja Matrix",
    nav_profile: "Profile Node",
    nav_bot: "Urja AI",
    
    // Dashboard Extra
    greeting_morning: "Good Morning",
    greeting_afternoon: "Good Afternoon",
    greeting_evening: "Good Evening",
    dashboard_cleanliness_title: "Area Cleanliness",
    dashboard_good_condition: "✓ Good Condition",
    dashboard_weather_title: "Weather · Delhi",
    dashboard_sunny: "Sunny, Clear Skies",
    dashboard_humidity: "52% Humidity",
    dashboard_wind: "12 km/h Wind",
    dashboard_credits_title: "Eco Credits",
    dashboard_credits_desc: "Earn credits by verifying your daily waste disposal.",
    dashboard_credits_btn: "Redeem Credits",
    dashboard_credits_value: "≈ ₹1,240 value",
    dashboard_ai_insights: "AI Insights",
    dashboard_ai_live: "Live",
    dashboard_ai_alert_title: "Overflow Risk",
    dashboard_ai_alert_desc: "Bin at Market Complex likely to overflow in ~2 hours. Collection requested.",
    dashboard_ai_truck_title: "Collection Vehicle Nearby",
    dashboard_ai_truck_desc: "Truck #402 is 1.2km away, estimated arrival in 18 minutes.",
    dashboard_ai_trend_title: "Weekly Trend",
    dashboard_ai_trend_desc: "Your area recycling rate improved by 12% this week. Keep it up!",
    dashboard_activity_log: "Activity Log",
    dashboard_activity_feed_title: "Area Activity Feed",
    dashboard_act_1_title: "Street Sweeping Completed",
    dashboard_act_1_loc: "Sector 14 Main Road",
    dashboard_act_1_time: "Today, 6:00 AM",
    dashboard_act_1_type: "Cleaned",
    dashboard_act_2_title: "Overflowing Bin Reported",
    dashboard_act_2_loc: "Market Area",
    dashboard_act_2_time: "2 hours ago",
    dashboard_act_2_type: "Reported",
    dashboard_act_3_title: "Illegal Dumping Resolved",
    dashboard_act_3_loc: "Behind Metro Station",
    dashboard_act_3_time: "Yesterday",
    dashboard_act_3_type: "Resolved",
    dashboard_activity_title: "Area Transparency",
    dashboard_activity_view_map: "View Map",
    dashboard_activity_complaints: "Nearby Complaints",
    dashboard_activity_complaints_sub: "2 active · 1 resolved",
    dashboard_activity_bins: "Active Smart Bins",
    dashboard_activity_bins_sub: "9 operational",
    dashboard_activity_waste: "Waste Collected",
    dashboard_activity_waste_sub: "This week nearby",
    dashboard_facilities_title: "Nearby Smart Bins",
    dashboard_facilities_open_map: "Open Map",
    dashboard_status_label: "Live Status",
    dashboard_index_label: "Cleanliness Index",
    dashboard_next_label: "Next Collection",
    
    // Map Page
    map_title: "Tactical Map",
    map_subtitle: "Real-time Waste Intelligence",
    map_legend_clean: "Clean",
    map_legend_medium: "Medium",
    map_legend_full: "Full",
    map_search_placeholder: "Search locations, bins, complaints...",
    map_loading: "Loading map...",
    map_layer_heatmap: "Transparency Mode",
    map_layer_tracking: "Vehicle Tracking",
    map_btn_route: "AI Predicted Route",
    map_eta: "Estimated Arrival",
    map_load: "Current Load",
    map_reported: "Reported",
    map_update: "Update Status",

    // Shop / Resource Hub
    shop_title: "Eco Marketplace",
    shop_subtitle: "Waste → Processing → Circular Wealth",
    shop_credits: "Eco Credits",
    shop_credits_value: "≈ ₹1,240",
    shop_buy: "REDEEM",
    shop_category_all: "All Rewards",
    shop_category_vouchers: "Vouchers",
    shop_category_products: "Products",
    shop_search: "Search rewards, compost...",
    shop_tab_processed: "Processed Goods",
    shop_tab_raw: "Raw Materials",

    // Bot / Urja AI
    bot_title: "Urja AI",
    bot_subtitle: "Neural Processing Active",
    bot_greeting: "Hi! I'm **Urja AI**, your smart sustainability assistant. I can help with waste segregation guidance, complaint support, finding nearby facilities, and more. What would you like to know? 🌱",
    bot_placeholder: "Ask Urja AI a question...",
    
    // Profile
    profile_title: "Citizen Impact",
    profile_join_date: "Joined March 2024",
    profile_platinum: "Platinum Citizen",
    profile_total_waste: "Total Waste Managed",
    profile_carbon: "Carbon Offset",
    profile_credits: "Eco Credits",
    profile_credits_val: "1,240 credits · ≈ ₹1,240",
    profile_activity: "Activity Feed",
    profile_settings: "App Settings",
    profile_logout: "Log Out",
    profile_anti_fraud: "🔒 Credits awarded only after AI + weight sensor verification. Anti-fraud system active.",

    // Complaints Page
    complaints_title: "Complaint Center",
    complaints_subtitle: "Transparent · AI-Validated · Citizen-Powered",
    complaints_ai_verified: "AI Verified",
    complaints_stats_open: "Open",
    complaints_stats_progress: "In Progress",
    complaints_stats_resolved: "Resolved",
    complaints_tab_new: "+ File Report",
    complaints_tab_history: "My Complaints",
    complaints_form_title: "File a New Complaint",
    complaints_photo_title: "Capture or Upload Photo",
    complaints_photo_desc: "Evidence helps faster resolution",
    complaints_label_location: "Location",
    complaints_label_type: "Issue Type",
    complaints_label_severity: "Severity",
    complaints_label_desc: "Description",
    complaints_desc_placeholder: "Describe the issue clearly...",
    complaints_ai_note_title: "AI-Assisted Validation",
    complaints_ai_note_desc: "— Your complaint will be reviewed by our AI system for duplicate detection and severity confirmation before assignment.",
    complaints_submit: "Submit Complaint",
    complaints_gps_note: "📍 GPS location captured automatically",

    // Login
    login_title: "Access Terminal",
    login_subtitle: "UrjaLoop Network Authentication",
    login_phone_label: "Mobile Identifier",
    login_phone_placeholder: "X XXXX XXXX",
    login_terms_accept: "I accept the",
    login_terms_1: "Network Protocols",
    login_terms_and: "and",
    login_terms_2: "Privacy Matrix",
    login_btn: "Initialize Link",
    
    // Onboarding Full
    onboarding_1_title: "Neural Network Monitoring",
    onboarding_1_desc: "High-precision AI-driven urban sanitation control via real-time satellite & ground sensor fusion.",
    onboarding_2_title: "Hyperspectral Vision",
    onboarding_2_desc: "Advanced classification algorithms identifying resource molecular composition in milliseconds.",
    onboarding_3_title: "Urja Credit Economy",
    onboarding_3_desc: "Monetize sustainable impact through our blockchain-verified carbon credit & reward ecosystem.",
    onboarding_4_title: "Viksit Bharat Matrix",
    onboarding_4_desc: "Strategic infrastructure alignment with the 2047 national sustainable development protocol.",
    
    // Auth / Onboarding
    auth_skip: "Skip Protocol",
    auth_next: "Deploy Next Module",
    auth_finish: "Initialize Neural Sync",
    
    // Setup Profile
    setup_title: "Initialize Profile",
    setup_subtitle: "Network Node Setup",
    setup_name_label: "Primary Identifier",
    setup_name_placeholder: "ENTER FULL NAME",
    setup_zone_label: "Operational Zone",
    setup_urban: "Urban",
    setup_rural: "Rural",
    setup_loc_label: "Sector Designation",
    setup_loc_placeholder: "e.g. Sector 14, New Delhi",
    setup_btn: "Establish Node",
    setup_btn_loading: "Initializing...",

    // Verify OTP
    otp_title: "Enter Verification Code",
    otp_sent_to: "Sent to",
    otp_change: "Change Number",
    otp_expires: "Expires in",
    otp_resend: "Resend Code",
    otp_btn: "Authorize Session",
    otp_encrypted: "End-to-End Encrypted",
    
    // Landing Header
    landing_nav_bin: "The Smart Bin",
    landing_nav_app: "The App",
    landing_nav_rewards: "Rewards",
    landing_login: "Log In",
    landing_start: "Get Started",

    // Common
    common_loading: "Synchronizing Network...",
    common_status: "Status",
  },
  hi: {
    // Navigation
    nav_home: "होम",
    nav_scan: "स्कैन",
    nav_map: "सामरिक मानचित्र",
    nav_shop: "संसाधन केंद्र",
    nav_complaints: "घटना लॉग",
    nav_community: "ऊर्जा मैट्रिक्स",
    nav_profile: "प्रोफ़ाइल नोड",
    nav_bot: "ऊर्जा एआई",
    
    // Dashboard
    greeting_morning: "सुप्रभात",
    greeting_afternoon: "शुभ दोपहर",
    greeting_evening: "शुभ संध्या",
    dashboard_cleanliness_title: "क्षेत्र स्वच्छता",
    dashboard_good_condition: "✓ अच्छी स्थिति",
    dashboard_weather_title: "मौसम · दिल्ली",
    dashboard_sunny: "धूप, साफ आसमान",
    dashboard_humidity: "52% आर्द्रता",
    dashboard_wind: "12 किमी/घंटा हवा",
    dashboard_credits_title: "ऊर्जा क्रेडिट",
    dashboard_credits_desc: "अपने दैनिक कचरा निपटान को सत्यापित करके क्रेडिट अर्जित करें।",
    dashboard_credits_btn: "क्रेडिट भुनाएं",
    dashboard_credits_value: "≈ ₹1,240 मूल्य",
    dashboard_ai_insights: "एआई इनसाइट्स",
    dashboard_ai_live: "लाइव",
    dashboard_ai_alert_title: "ओवरफ्लो का खतरा",
    dashboard_ai_alert_desc: "मार्केट कॉम्प्लेक्स का बिन लगभग 2 घंटे में ओवरफ्लो हो सकता है। संग्रह का अनुरोध किया गया।",
    dashboard_ai_truck_title: "संग्रह वाहन पास में है",
    dashboard_ai_truck_desc: "ट्रक #402 1.2 किमी दूर है, 18 मिनट में पहुंचने का अनुमान है।",
    dashboard_ai_trend_title: "साप्ताहिक रुझान",
    dashboard_ai_trend_desc: "आपके क्षेत्र की रीसाइक्लिंग दर में इस सप्ताह 12% सुधार हुआ है। इसे बनाए रखें!",
    dashboard_activity_log: "गतिविधि लॉग",
    dashboard_activity_feed_title: "क्षेत्र गतिविधि फ़ीड",
    dashboard_act_1_title: "सड़क की सफाई पूरी हुई",
    dashboard_act_1_loc: "सेक्टर 14 मुख्य मार्ग",
    dashboard_act_1_time: "आज, सुबह 6:00 बजे",
    dashboard_act_1_type: "साफ़ किया गया",
    dashboard_act_2_title: "ओवरफ्लो होने वाले बिन की सूचना",
    dashboard_act_2_loc: "बाजार क्षेत्र",
    dashboard_act_2_time: "2 घंटे पहले",
    dashboard_act_2_type: "रिपोर्ट किया गया",
    dashboard_act_3_title: "अवैध डंपिंग का समाधान",
    dashboard_act_3_loc: "मेट्रो स्टेशन के पीछे",
    dashboard_act_3_time: "कल",
    dashboard_act_3_type: "हल किया गया",
    dashboard_activity_title: "क्षेत्र पारदर्शिता",
    dashboard_activity_view_map: "मानचित्र देखें",
    dashboard_activity_complaints: "आस-पास की शिकायतें",
    dashboard_activity_complaints_sub: "2 सक्रिय · 1 हल",
    dashboard_activity_bins: "सक्रिय स्मार्ट बिन",
    dashboard_activity_bins_sub: "9 चालू",
    dashboard_activity_waste: "एकत्रित कचरा",
    dashboard_activity_waste_sub: "इस सप्ताह आस-पास",
    dashboard_facilities_title: "आस-पास के स्मार्ट बिन",
    dashboard_facilities_open_map: "मानचित्र खोलें",
    dashboard_title: "नियंत्रण केंद्र",
    dashboard_subtitle: "सत्यापित शहर डेटा",
    dashboard_status_live: "लाइव स्थिति",
    dashboard_status_optimal: "इष्टतम",
    dashboard_cleanliness: "स्वच्छता सूचकांक",
    dashboard_next_collection: "अगला संग्रह",
    dashboard_wallet_balance: "ऊर्जा शेष",
    dashboard_redeem: "क्रेडिट भुनाएं",
    dashboard_nearby_facilities: "आस-पास की सुविधाएं",
    dashboard_open_map: "मैप खोलें",

    // Map Page
    map_title: "सामरिक मानचित्र",
    map_subtitle: "वास्तविक समय अपशिष्ट खुफिया",
    map_legend_clean: "साफ",
    map_legend_medium: "मध्यम",
    map_legend_full: "भरा हुआ",

    // Shop / Resource Hub
    shop_title: "इको मार्केटप्लेस",
    shop_subtitle: "कचरा → प्रसंस्करण → चक्रीय धन",
    shop_credits: "इको क्रेडिट",
    shop_credits_value: "≈ ₹1,240",
    shop_buy: "भुनाएं",
    shop_category_all: "सभी पुरस्कार",
    shop_category_vouchers: "वाउचर",
    shop_category_products: "उत्पाद",
    shop_search: "इनाम, खाद खोजें...",
    shop_tab_processed: "संसाधित सामान",
    shop_tab_raw: "कच्चा माल",

    // Bot / Urja AI
    bot_title: "ऊर्जा एआई",
    bot_subtitle: "तंत्रिका प्रसंस्करण सक्रिय",
    bot_greeting: "नमस्ते! मैं **ऊर्जा एआई** हूँ, आपकी स्मार्ट स्थिरता सहायक। मैं कचरा पृथक्करण मार्गदर्शन, शिकायत सहायता, आस-पास की सुविधाओं को खोजने और बहुत कुछ में मदद कर सकती हूँ। आप क्या जानना चाहेंगे? 🌱",
    bot_placeholder: "ऊर्जा एआई से एक प्रश्न पूछें...",
    
    // Profile
    profile_title: "नागरिक प्रभाव",
    profile_join_date: "मार्च 2024 में शामिल हुए",
    profile_platinum: "प्लेटिनम नागरिक",
    profile_total_waste: "कुल कचरा प्रबंधित",
    profile_carbon: "कार्बन ऑफसेट",
    profile_credits: "इको क्रेडिट",
    profile_credits_val: "1,240 क्रेडिट · ≈ ₹1,240",
    profile_activity: "गतिविधि फ़ीड",
    profile_settings: "ऐप सेटिंग्स",
    profile_logout: "लॉग आउट",
    profile_anti_fraud: "🔒 एआई + वजन सेंसर सत्यापन के बाद ही क्रेडिट दिए जाते हैं। एंटी-फ्रॉड सिस्टम सक्रिय है।",

    // Complaints Page
    complaints_title: "शिकायत केंद्र",
    complaints_subtitle: "पारदर्शी · एआई-सत्यापित · नागरिक-संचालित",
    complaints_ai_verified: "एआई सत्यापित",
    complaints_stats_open: "खुला",
    complaints_stats_progress: "प्रगति पर",
    complaints_stats_resolved: "हल हो गया",
    complaints_tab_new: "+ रिपोर्ट दर्ज करें",
    complaints_tab_history: "मेरी शिकायतें",
    complaints_form_title: "नई शिकायत दर्ज करें",
    complaints_photo_title: "फ़ोटो खींचें या अपलोड करें",
    complaints_photo_desc: "साक्ष्य तेजी से समाधान में मदद करता है",
    complaints_label_location: "स्थान",
    complaints_label_type: "समस्या का प्रकार",
    complaints_label_severity: "गंभीरता",
    complaints_label_desc: "विवरण",
    complaints_desc_placeholder: "समस्या का स्पष्ट वर्णन करें...",
    complaints_ai_note_title: "एआई-सहायक सत्यापन",
    complaints_ai_note_desc: "— आपकी शिकायत की समीक्षा हमारे एआई सिस्टम द्वारा डुप्लिकेट का पता लगाने और असाइनमेंट से पहले गंभीरता की पुष्टि के लिए की जाएगी।",
    complaints_submit: "शिकायत दर्ज करें",
    complaints_gps_note: "📍 जीपीएस स्थान स्वचालित रूप से कैप्चर किया गया",

    // Login
    login_title: "एक्सेस टर्मिनल",
    login_subtitle: "ऊर्जालूप नेटवर्क प्रमाणीकरण",
    login_phone_label: "मोबाइल पहचानकर्ता",
    login_phone_placeholder: "X XXXX XXXX",
    login_terms_accept: "मैं स्वीकार करता हूँ",
    login_terms_1: "नेटवर्क प्रोटोकॉल",
    login_terms_and: "और",
    login_terms_2: "गोपनीयता मैट्रिक्स",
    login_btn: "लिंक प्रारंभ करें",
    
    // Onboarding Full
    onboarding_1_title: "न्यूरल नेटवर्क मॉनिटरिंग",
    onboarding_1_desc: "वास्तविक समय उपग्रह और ग्राउंड सेंसर फ्यूजन के माध्यम से उच्च-सटीक एआई-संचालित शहरी स्वच्छता नियंत्रण।",
    onboarding_2_title: "हाइपरस्पेक्ट्रल विजन",
    onboarding_2_desc: "मिलीसेकंड में संसाधन आणविक संरचना की पहचान करने वाले उन्नत वर्गीकरण एल्गोरिदम।",
    onboarding_3_title: "ऊर्जा क्रेडिट अर्थव्यवस्था",
    onboarding_3_desc: "हमारे ब्लॉकचेन-सत्यापित कार्बन क्रेडिट और इनाम पारिस्थितिकी तंत्र के माध्यम से स्थायी प्रभाव का मुद्रीकरण करें।",
    onboarding_4_title: "विकसित भारत मैट्रिक्स",
    onboarding_4_desc: "2047 राष्ट्रीय सतत विकास प्रोटोकॉल के साथ रणनीतिक बुनियादी ढांचा संरेखण।",
    
    // Auth / Onboarding
    auth_skip: "प्रोटोकॉल छोड़ें",
    auth_next: "अगला मॉड्यूल",
    auth_finish: "तंत्रिका सिंक प्रारंभ करें",

    // Setup Profile
    setup_title: "प्रोफ़ाइल प्रारंभ करें",
    setup_subtitle: "नेटवर्क नोड सेटअप",
    setup_name_label: "प्राथमिक पहचानकर्ता",
    setup_name_placeholder: "पूरा नाम दर्ज करें",
    setup_zone_label: "परिचालन क्षेत्र",
    setup_urban: "शहरी",
    setup_rural: "ग्रामीण",
    setup_loc_label: "सेक्टर पदनाम",
    setup_loc_placeholder: "उदा. सेक्टर 14, नई दिल्ली",
    setup_btn: "नोड स्थापित करें",
    setup_btn_loading: "प्रारंभ हो रहा है...",

    // Verify OTP
    otp_title: "सत्यापन कोड दर्ज करें",
    otp_sent_to: "को भेजा गया",
    otp_change: "नंबर बदलें",
    otp_expires: "समाप्त होता है",
    otp_resend: "कोड फिर से भेजें",
    otp_btn: "सत्र अधिकृत करें",
    otp_encrypted: "एंड-टू-एंड एन्क्रिप्टेड",
    
    // Landing Header
    landing_nav_bin: "स्मार्ट बिन",
    landing_nav_app: "ऐप",
    landing_nav_rewards: "पुरस्कार",
    landing_login: "लॉग इन करें",
    landing_start: "शुरू करें",
    
    // Common
    common_loading: "नेटवर्क सिंक्रनाइज़ हो रहा है...",
    common_status: "स्थिति",
  }
  // For other languages, we'll fallback to English for the prototype
}

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("urjaloop_language") as LanguageCode
    if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
      // eslint-disable-next-line
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang)
    localStorage.setItem("urjaloop_language", lang)
  }

  const t = (key: string) => {
    return (translations[language] && translations[language][key]) || translations["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
