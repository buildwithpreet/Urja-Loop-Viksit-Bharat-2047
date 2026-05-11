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
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬी" },
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
    nav_map: "Tactical Map",
    nav_shop: "Resource Hub",
    nav_complaints: "Incident Log",
    nav_community: "Urja Matrix",
    nav_profile: "Profile Node",
    nav_bot: "Urja AI",
    profile_platinum: "Platinum Citizen",
    profile_total_waste: "Total Waste Managed",
    profile_carbon: "Carbon Offset",
    profile_credits: "Urja Credits Balance",
    profile_activity: "Chronological Feed",
    profile_settings: "System Config",
    profile_logout: "Terminate Session",
  },
  hi: {
    nav_map: "सामरिक मानचित्र",
    nav_shop: "संसाधन केंद्र",
    nav_complaints: "घटना लॉग",
    nav_community: "ऊर्जा मैट्रिक्स",
    nav_profile: "प्रोफ़ाइल नोड",
    nav_bot: "ऊर्जा एआई",
    profile_platinum: "प्लेटिनम नागरिक",
    profile_total_waste: "कुल अपशिष्ट प्रबंधित",
    profile_carbon: "कार्बन ऑफसेट",
    profile_credits: "ऊर्जा क्रेडिट शेष",
    profile_activity: "कालानुक्रमिक फ़ीड",
    profile_settings: "सिस्टम कॉन्फ़िगरेशन",
    profile_logout: "सत्र समाप्त करें",
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
