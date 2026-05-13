import type { Metadata, Viewport } from "next"
import { Inter_Tight } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/shared/LayoutWrapper"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { LanguageProvider } from "@/components/shared/LanguageProvider"
import { UserProvider } from "@/components/shared/UserContext"
import { ModeProvider } from "@/components/shared/ModeProvider"
import { AccessibilityProvider } from "@/components/shared/AccessibilityProvider"
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "UrjaLoop",
  },
  openGraph: {
    title: "UrjaLoop | Neural Waste Intelligence",
    description: "The future of urban waste management for Bharat.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${interTight.variable} font-sans antialiased min-h-screen relative bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <UserProvider>
              <ModeProvider>
                <AccessibilityProvider>
                  <PwaRegister />
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
                </AccessibilityProvider>
              </ModeProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
