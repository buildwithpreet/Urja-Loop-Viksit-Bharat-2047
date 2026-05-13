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

  // 4. Seed Vehicles (Fleet)
  const vehicles = [
    { plate_number: "DL-1CB-4521", type: "urban_truck", status: "on_route", driver_name: "Suresh Kumar", current_lat: 28.6130, current_lng: 77.2095 },
    { plate_number: "DL-3SA-9812", type: "electric_van", status: "idle", driver_name: "Amit Singh", current_lat: 28.6155, current_lng: 77.2120 },
    { plate_number: "PB-12-TR-0091", type: "rural_tractor", status: "on_route", driver_name: "Baljeet Singh", current_lat: 30.9010, current_lng: 75.8573 }
  ]
  const { error: vehicleError } = await supabase.from('vehicles').upsert(vehicles, { onConflict: 'plate_number' })
  if (vehicleError) console.error("Vehicle Seed Error:", vehicleError)

  // 5. Seed Collection Centers (Rural)
  const centers = [
    { name: "Ludhiana Biomass Hub", location_name: "Focal Point, Ludhiana", capacity: 500, current_stock: 120, type: "biomass", lat: 30.9010, lng: 75.8573 },
    { name: "Punjab Agri-Processing Unit", location_name: "Moga Highway", capacity: 300, current_stock: 45, type: "processing", lat: 30.9100, lng: 75.8600 }
  ]
  const { error: centerError } = await supabase.from('collection_centers').upsert(centers, { onConflict: 'name' })
  if (centerError) console.error("Center Seed Error:", centerError)

  // 6. Seed Processed Outputs (Marketplace)
  const outputs = [
    { name: "Biofuel Briquettes", description: "High-density biomass fuel from crop residue", category: "Biofuel", price_per_unit: 1200, unit: "ton", stock: 50, image_url: "https://images.unsplash.com/photo-1610634289758-5f9175344487" },
    { name: "Organic Bio-Fertilizer", description: "Premium compost enriched with micronutrients", category: "Fertilizer", price_per_unit: 450, unit: "bag", stock: 200, image_url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d" },
    { name: "Recycled PET Pellets", description: "Industrial grade recycled plastic raw material", category: "Recycled Plastic", price_per_unit: 800, unit: "kg", stock: 1000, image_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b" }
  ]
  const { error: outputError } = await supabase.from('processed_outputs').upsert(outputs, { onConflict: 'name' })
  if (outputError) console.error("Output Seed Error:", outputError)

  console.log("Seeding Completed Successfully! 🚀")
}
