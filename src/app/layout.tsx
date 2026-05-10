import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/shared/LayoutWrapper"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { LanguageProvider } from "@/components/shared/LanguageProvider"
import { ModeProvider } from "@/components/shared/ModeProvider"
import { PwaRegister } from "@/components/shared/PwaRegister"
import { Toaster } from "@/components/ui/sonner"

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "UrjaLoop | Neural Waste Intelligence Platform",
  description: "AI-powered smart waste management platform for Viksit Bharat 2047. Real-time monitoring, rewards, and circular economy.",
  keywords: ["waste management", "AI", "smart city", "Viksit Bharat", "circular economy", "sustainability"],
  openGraph: {
    title: "UrjaLoop | Neural Waste Intelligence",
    description: "The future of urban waste management for Bharat.",
    type: "website",
  },
  manifest: "/manifest.json",
  themeColor: "#10b981",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UrjaLoop",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-mesh min-h-screen relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ModeProvider>
              <PwaRegister />
              <Toaster position="top-center" richColors theme="system" />
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </ModeProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
