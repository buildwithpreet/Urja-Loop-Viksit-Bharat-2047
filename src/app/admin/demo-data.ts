// Demo events for hackathon simulation
export const DEMO_EVENTS = [
  { action: "Waste Scanned", user: "Preet S.", location: "Sector 14, Delhi", credits: 25, icon: "scan", color: "emerald" },
  { action: "Complaint Filed", user: "Ankit G.", location: "Market Area", credits: 0, icon: "alert", color: "red" },
  { action: "Bin Alert — 93% Full", user: "System", location: "Smart Bin 07", credits: 0, icon: "bin", color: "amber" },
  { action: "Purchase: Organic Compost", user: "Neha K.", location: "Marketplace", credits: -250, icon: "cart", color: "blue" },
  { action: "New Citizen Registered", user: "Rahul M.", location: "GK-II, Delhi", credits: 500, icon: "user", color: "purple" },
  { action: "Fleet Dispatched", user: "UrjaVan #402", location: "Sector 14 Loop", credits: 0, icon: "truck", color: "blue" },
  { action: "Agri-Waste Identified", user: "Ramesh P.", location: "Ludhiana, Punjab", credits: 300, icon: "scan", color: "emerald" },
  { action: "Complaint Resolved", user: "Municipal Team", location: "Lane 4 Market", credits: 0, icon: "check", color: "emerald" },
  { action: "Eco Credits Redeemed", user: "Simran T.", location: "Marketplace", credits: -100, icon: "cart", color: "amber" },
  { action: "Bin Serviced", user: "Collector #12", location: "Main Gate Bin", credits: 50, icon: "check", color: "emerald" },
  { action: "Pickup Scheduled", user: "Vikram J.", location: "Farm ID #PB-4029", credits: 0, icon: "truck", color: "blue" },
  { action: "AI Analysis Complete", user: "System AI", location: "Scan Station 01", credits: 0, icon: "scan", color: "purple" },
  { action: "Waste Scanned", user: "Deepika R.", location: "Park Entrance", credits: 15, icon: "scan", color: "emerald" },
  { action: "New Collector Onboarded", user: "Suresh V.", location: "Sector 22", credits: 500, icon: "user", color: "purple" },
  { action: "Bin Alert — 87% Full", user: "System", location: "Smart Bin 12", credits: 0, icon: "bin", color: "amber" },
]

export const DEMO_COMPLAINTS = [
  { id: "CMP-4821", type: "Overflowing Bin", location: "Sector 14 Market", severity: "High", status: "Submitted", time: "2m ago" },
  { id: "CMP-4820", type: "Illegal Dumping", location: "Park Lane 3", severity: "High", status: "Under Review", time: "15m ago" },
  { id: "CMP-4819", type: "Missed Collection", location: "Block C, GK-II", severity: "Medium", status: "Assigned", time: "1h ago" },
  { id: "CMP-4818", type: "Damaged Bin", location: "Metro Station", severity: "Low", status: "In Progress", time: "3h ago" },
  { id: "CMP-4817", type: "Bio-Hazard", location: "Hospital Road", severity: "High", status: "Resolved", time: "5h ago" },
]

export const DEMO_BINS = [
  { id: 1, name: "Smart Bin 01", location: "Main Gate", fill: 18, status: "active" },
  { id: 2, name: "Smart Bin 04", location: "Central Park", fill: 45, status: "active" },
  { id: 3, name: "Smart Bin 07", location: "Market Complex", fill: 93, status: "active" },
  { id: 4, name: "Smart Bin 09", location: "Metro Exit 2", fill: 67, status: "active" },
  { id: 5, name: "Smart Bin 12", location: "Hospital Road", fill: 87, status: "active" },
  { id: 6, name: "Smart Bin 15", location: "School Zone", fill: 22, status: "active" },
]

export const DEMO_VEHICLES = [
  { id: 1, plate: "DL-14-UR-0402", driver: "Suresh K.", status: "on_route", type: "Electric Van" },
  { id: 2, plate: "DL-14-UR-0108", driver: "Ramesh P.", status: "idle", type: "Urban Truck" },
  { id: 3, plate: "PB-10-AG-0033", driver: "Vikram S.", status: "on_route", type: "Rural Tractor" },
]
