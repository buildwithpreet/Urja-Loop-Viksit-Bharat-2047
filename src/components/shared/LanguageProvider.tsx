"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    // Navigation
    nav_map: "Tactical Map",
    nav_shop: "Resource Hub",
    nav_complaints: "Incident Log",
    nav_community: "Urja Matrix",
    nav_profile: "Profile Node",
    nav_bot: "Urja AI",
    
    // Dashboard Extra
    dashboard_activity_title: "Area Activity",
    dashboard_facilities_title: "Nearby Facilities",
    dashboard_status_label: "Live Status",
    dashboard_index_label: "Cleanliness Index",
    dashboard_next_label: "Next Collection",
    
    // Map Page
    map_title: "Tactical Map",
    map_subtitle: "Real-time Waste Intelligence",
    map_legend_clean: "Clean",
    map_legend_medium: "Medium",
    map_legend_full: "Full",
    
    // Shop / Resource Hub
    shop_title: "Resource Hub",
    shop_subtitle: "Monetize your sustainable impact",
    shop_buy: "REDEEM",
    shop_category_all: "All Rewards",
    shop_category_vouchers: "Vouchers",
    shop_category_products: "Products",
    
    // Bot / Urja AI
    bot_title: "Urja AI",
    bot_subtitle: "Neural Processing Active",
    bot_greeting: "Hi! I'm Urja AI, your friendly neighborhood assistant. How can I help you keep our city clean today?",
    bot_placeholder: "Query the system...",
    
    // Profile
    profile_title: "Profile Node",
    profile_platinum: "Platinum Citizen",
    profile_total_waste: "Total Waste Managed",
    profile_carbon: "Carbon Offset",
    profile_credits: "Urja Credits Balance",
    profile_activity: "Chronological Feed",
    profile_settings: "System Config",
    profile_logout: "Terminate Session",
    
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
    
    // Common
    common_loading: "Synchronizing Network...",
    common_status: "Status",
  },
  hi: {
    // Navigation
    nav_map: "सामरिक मानचित्र",
    nav_shop: "संसाधन केंद्र",
    nav_complaints: "घटना लॉग",
    nav_community: "ऊर्जा मैट्रिक्स",
    nav_profile: "प्रोफ़ाइल नोड",
    nav_bot: "ऊर्जा एआई",
    
    // Dashboard
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
    dashboard_area_activity: "क्षेत्र गतिविधि",
    dashboard_activity_title: "क्षेत्र गतिविधि",
    dashboard_facilities_title: "आस-पास की सुविधाएं",
    dashboard_status_label: "लाइव स्थिति",
    dashboard_index_label: "स्वच्छता सूचकांक",
    dashboard_next_label: "अगला संग्रह",
    
    // Map Page
    map_title: "सामरिक मानचित्र",
    map_subtitle: "वास्तविक समय अपशिष्ट खुफिया",
    map_legend_clean: "साफ",
    map_legend_medium: "मध्यम",
    map_legend_full: "भरा हुआ",
    
    // Shop / Resource Hub
    shop_title: "संसाधन केंद्र",
    shop_subtitle: "अपने स्थायी प्रभाव का मुद्रीकरण करें",
    shop_buy: "भुनाएं",
    shop_category_all: "सभी पुरस्कार",
    shop_category_vouchers: "वाउचर",
    shop_category_products: "उत्पाद",
    
    // Bot / Urja AI
    bot_title: "ऊर्जा एआई",
    bot_subtitle: "तंत्रिका प्रसंस्करण सक्रिय",
    bot_greeting: "नमस्ते! मैं ऊर्जा एआई हूँ, आपकी सहायक। मैं आज हमारे शहर को साफ रखने में आपकी कैसे मदद कर सकती हूँ?",
    bot_placeholder: "सिस्टम से पूछें...",
    
    // Profile
    profile_title: "प्रोफ़ाइल नोड",
    profile_platinum: "प्लेटिनम नागरिक",
    profile_total_waste: "कुल अपशिष्ट प्रबंधित",
    profile_carbon: "कार्बन ऑफसेट",
    profile_credits: "ऊर्जा क्रेडिट शेष",
    profile_activity: "कालानुक्रमिक फ़ीड",
    profile_settings: "सिस्टम कॉन्फ़िगरेशन",
    profile_logout: "सत्र समाप्त करें",
    
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
    
    // Common
    common_loading: "नेटवर्क सिंक्रनाइज़ हो रहा है...",
    common_status: "स्थिति",
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("urjaloop_language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "hi")) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("urjaloop_language", lang)
  }

  const t = (key: string) => {
    return translations[language][key] || key
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
