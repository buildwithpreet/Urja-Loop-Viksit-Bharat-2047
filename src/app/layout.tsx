import type { Metadata } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/shared/LayoutWrapper"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { LanguageProvider } from "@/components/shared/LanguageProvider"
import { ModeProvider } from "@/components/shared/ModeProvider"
import { PwaRegister } from "@/components/shared/PwaRegister"
import { Toaster } from "@/components/ui/sonner"

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight"
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
      <body className={`${interTight.variable} font-sans antialiased min-h-screen relative bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
