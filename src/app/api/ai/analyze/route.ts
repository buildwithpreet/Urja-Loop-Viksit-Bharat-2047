import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize a service-role client for backend operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

export async function POST(req: Request) {
  try {
    const { imageUrl, userId } = await req.json()

    // 1. Simulate AI Processing Delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 2. Mock AI Logic (In a real app, you'd call Gemini/Vision API here)
    const classifications = [
      { type: 'Plastic Bottle', category: 'Recyclable', credits: 15, co2: 0.5, message: "Detected PET Plastic. High recycling value." },
      { type: 'Glass Container', category: 'Recyclable', credits: 20, co2: 0.8, message: "Detected Glass. Can be re-melted indefinitely." },
      { type: 'Organic Waste', category: 'Compostable', credits: 10, co2: 0.3, message: "Detected Food Waste. Perfect for bio-fuel conversion." },
      { type: 'Cardboard Box', category: 'Paper', credits: 12, co2: 0.4, message: "Detected Paper. Please ensure it's dry." }
    ]
    
    // Pick a random result for the demo
    const result = classifications[Math.floor(Math.random() * classifications.length)]

    // 3. If userId is provided, update the database
    if (userId && userId !== 'demo-user') {
      // Add Credits to Profile
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('eco_credits, waste_processed, co2_saved')
        .eq('id', userId)
        .single()

      if (profile) {
        await supabaseAdmin
          .from('profiles')
          .update({
            eco_credits: (profile.eco_credits || 0) + result.credits,
            waste_processed: (profile.waste_processed || 0) + 0.5, // 0.5kg avg
            co2_saved: (profile.co2_saved || 0) + result.co2
          })
          .eq('id', userId)

        // Log Activity
        await supabaseAdmin.from('activity_log').insert({
          user_id: userId,
          action: 'Scanned Waste',
          description: `Identified ${result.type} (+${result.credits} Credits)`,
          points_earned: result.credits
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        confidence: 0.94 + (Math.random() * 0.05),
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
