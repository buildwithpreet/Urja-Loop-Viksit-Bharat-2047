import { supabase } from './supabase'

export const seedDatabase = async () => {
  console.log("Starting Database Seeding...")

  // 1. Seed Smart Bins
  const bins = [
    { location_name: "Main Gate, Sector 14", fill_level: 18, status: "active", lat: 28.6139, lng: 77.2090 },
    { location_name: "Park Entrance South", fill_level: 67, status: "active", lat: 28.6145, lng: 77.2100 },
    { location_name: "Market Complex Lane 2", fill_level: 91, status: "active", lat: 28.6125, lng: 77.2085 },
    { location_name: "Metro Station Exit 1", fill_level: 42, status: "active", lat: 28.6150, lng: 77.2115 },
    { location_name: "Community Center", fill_level: 5, status: "active", lat: 28.6110, lng: 77.2070 }
  ]

  const { error: binError } = await supabase.from('smart_bins').upsert(bins, { onConflict: 'location_name' })
  if (binError) console.error("Bin Seed Error:", binError)

  // 2. Seed Marketplace (Urban)
  const urbanItems = [
    { name: "Compostable Bin Liners", type: "urban", category: "Eco-Home", price: 450, stock: 120, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", verified: true, demand: "High" },
    { name: "Recycled Plastic Planner", type: "urban", category: "Stationery", price: 850, stock: 45, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800", verified: true, demand: "Medium" },
    { name: "Eco-Friendly Bamboo Set", type: "urban", category: "Kitchen", price: 1200, stock: 30, image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800", verified: true, demand: "High" }
  ]

  const { error: urbanError } = await supabase.from('marketplace_items').upsert(urbanItems, { onConflict: 'name' })
  if (urbanError) console.error("Urban Item Seed Error:", urbanError)

  // 3. Seed Marketplace (Rural)
  const ruralItems = [
    { name: "Bio-Fuel Briquettes", type: "rural", category: "Energy", price: 1500, stock: 500, image: "https://images.unsplash.com/photo-1610634289758-5f9175344487?auto=format&fit=crop&q=80&w=800", verified: true, demand: "Very High" },
    { name: "Organic Crop Residue", type: "rural", category: "Raw Material", price: 2000, stock: 1000, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800", verified: true, demand: "High" }
  ]

  const { error: ruralError } = await supabase.from('marketplace_items').upsert(ruralItems, { onConflict: 'name' })
  if (ruralError) console.error("Rural Item Seed Error:", ruralError)

  // 4. Seed Mock Profiles (Community Members)
  const communityProfiles = [
    { full_name: "Rahul Sharma", role: "citizen", eco_credits: 4500, waste_processed: 124.5, co2_saved: 28.2 },
    { full_name: "Anita Desai", role: "citizen", eco_credits: 3200, waste_processed: 82.1, co2_saved: 15.4 },
    { full_name: "Farmer Jagdish", role: "rural", eco_credits: 12000, waste_processed: 2450, co2_saved: 450.0 }
  ]
  // Note: These usually require auth.users, but we can update them if they exist.
  // For demo, we just focus on the community impact stats.

  console.log("Seeding Completed Successfully! 🚀")
}
