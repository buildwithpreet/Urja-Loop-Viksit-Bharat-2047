"use client"

import { createContext, useContext, ReactNode } from "react"

interface UserData {
  name: string
  firstName: string
  avatarSeed: string
  avatarUrl: string
  location: string
  sector: string
  city: string
  ecoCredits: number
  ecoCreditsValue: string
  ecoId: string
  tier: string
  verified: boolean
}

const mockUser: UserData = {
  name: "Alex Harrison",
  firstName: "Alex",
  avatarSeed: "Alex",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  location: "Sector 14 · New Delhi",
  sector: "Sector 14",
  city: "New Delhi",
  ecoCredits: 1240,
  ecoCreditsValue: "₹1,240.00",
  ecoId: "URJA-9821-DL14-AXH",
  tier: "Platinum Citizen",
  verified: true,
}

const UserContext = createContext<UserData>(mockUser)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={mockUser}>
      {children}
    </UserContext.Provider>
  )
}
