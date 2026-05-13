"use client"

import { useState, useEffect } from "react"
import { 
  AlertTriangle, MapPin, Camera, CheckCircle2, Clock,
  Upload, ShieldCheck, AlertCircle, ChevronRight,
  Filter, MessageSquare, Image as ImageIcon, Target, Zap, Phone
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import NextImage from "next/image"
import { toast } from "sonner"
import { useLanguage } from "@/components/shared/LanguageProvider"
import { supabase, getSessionUser } from "@/lib/supabase"

const STATUS_STEPS = ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved"]

export default function Complaints() {
  const [activeTab, setActiveTab] = useState<"new" | "history">("history")
  const [complaints, setComplaints] = useState<any[]>([])
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [formStep, setFormStep] = useState(0)
  const [selectedSeverity, setSelectedSeverity] = useState<string>("Medium")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useLanguage()

  // Form State
  const [formData, setFormData] = useState({
    type: "Overflowing Bin",
    location: "Sector 14 · New Delhi",
    severity: "Medium",
    description: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fetchComplaints = async () => {
    setIsLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    
    let query = supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (session) {
      query = query.eq('user_id', session.user.id)
    }

    const { data, error } = await query
    
    if (data) {
      setComplaints(data)
      if (data.length > 0) setSelectedComplaint(data[0])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchComplaints()

    // Real-time Subscription for Complaints
    const channel = supabase
      .channel('complaints-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'complaints' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setComplaints((prev: any[]) => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setComplaints((prev: any[]) => prev.map(c => c.id === payload.new.id ? payload.new : c))
          setSelectedComplaint((prev: any) => prev?.id === payload.new.id ? payload.new : prev)
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const user = await getSessionUser()
    if (!user) {
      toast.error("Please login or setup a demo profile to submit a report")
      setIsSubmitting(false)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (!session && !user.isDemo) {
        toast.error("Session expired. Please login again.")
        setIsSubmitting(false)
        return
    }

    let uploadedImageUrl = null

    // 1. Upload Image to Supabase Storage
    if (selectedFile && !user.isDemo) {
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `complaints/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('complaints')
        .upload(filePath, selectedFile)

      if (uploadError) {
        toast.error("Failed to upload image: " + uploadError.message)
        setIsSubmitting(false)
        return
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('complaints')
        .getPublicUrl(filePath)
      
      uploadedImageUrl = publicUrl
    }

    const newComplaint = {
      user_id: user.isDemo ? null : session?.user.id,
      type: formData.type,
      location_name: formData.location,
      severity: selectedSeverity,
      description: formData.description,
      status: "Submitted",
      status_idx: 0,
      image_url: uploadedImageUrl,
      ai_validated: true,
      created_at: new Date().toISOString()
    }

    const { error } = await supabase.from('complaints').insert([newComplaint])

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Complaint submitted successfully!")
      setSelectedFile(null)
      setImagePreview(null)
      setActiveTab("history")
      fetchComplaints()
    }
    setIsSubmitting(false)
  }

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700 min-h-screen">
      
      {/* Header */}
      <div className="pt-2 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("complaints_title")}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{t("complaints_subtitle")}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-2xl">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">AI Verified</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("complaints_stats_open"), value: "2", color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: t("complaints_stats_progress"), value: "1", color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("complaints_stats_resolved"), value: "12", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        ].map((s) => (
          <div key={s.label} className={cn("p-3 rounded-2xl", s.bg)}>
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Switch */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <button onClick={() => setActiveTab("new")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", 
            activeTab === "new" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          {t("complaints_tab_new")}
        </button>
        <button onClick={() => setActiveTab("history")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "history" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          {t("complaints_tab_history")}
        </button>
      </div>

      {activeTab === "new" ? (
        /* --- FILE NEW COMPLAINT FORM --- */
        <Card className="border border-border bg-card shadow-sm rounded-3xl">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-base font-bold text-foreground">{t("complaints_form_title")}</h2>
              
              {/* Photo Upload */}
              <div 
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="w-full aspect-video border-2 border-dashed border-border rounded-2xl bg-muted/40 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-muted/60 transition-all cursor-pointer group relative overflow-hidden"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-card rounded-2xl border border-border flex items-center justify-center mb-3 group-hover:border-primary/40 transition-all">
                      <Camera size={20} className="text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{t("complaints_photo_title")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("complaints_photo_desc")}</p>
                  </>
                )}
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageSelect}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("complaints_label_location")}</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-3 p-3 bg-muted/40 border border-border rounded-2xl">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    <input type="text" value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      aria-label="Complaint location"
                      className="bg-transparent border-none outline-none text-sm text-foreground flex-1 focus-ring" />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground px-1">{t("complaints_gps_note")}</p>
              </div>

              {/* Issue Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("complaints_label_type")}</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full p-3 bg-muted/40 border border-border rounded-2xl text-sm text-foreground outline-none focus:border-primary/50 transition-all"
                >
                  <option>Overflowing Bin</option>
                  <option>Illegal / Open Dumping</option>
                  <option>Damaged Infrastructure</option>
                  <option>Bio-Hazard / Health Risk</option>
                  <option>Missed Collection</option>
                </select>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("complaints_label_severity")}</label>
                <div className="flex gap-2" role="radiogroup" aria-label="Complaint severity">
                  {["Low", "Medium", "High"].map((level) => (
                    <button key={level} type="button" role="radio" aria-checked={selectedSeverity === level} onClick={() => setSelectedSeverity(level)} className={cn("flex-1 py-2 rounded-xl text-xs font-bold border transition-all",
                      selectedSeverity === level && level === "High" ? "border-red-500 bg-red-500/20 text-red-600 dark:text-red-400 ring-2 ring-red-500/30" :
                      selectedSeverity === level && level === "Medium" ? "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/30" :
                      selectedSeverity === level && level === "Low" ? "border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30" :
                      level === "High" ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400" :
                      level === "Medium" ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    )}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("complaints_label_desc")}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder={t("complaints_desc_placeholder")}
                  rows={3}
                  aria-label="Complaint description"
                  className="w-full p-3 bg-muted/40 border border-border rounded-2xl text-sm text-foreground focus-ring focus:border-primary/50 transition-all resize-none placeholder:text-muted-foreground/60"
                />
              </div>

              {/* AI Validation Note */}
              <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-2xl">
                <ShieldCheck size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t("complaints_ai_note_title")}</span> {t("complaints_ai_note_desc")}
                </p>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-sm font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 focus-ring">
                {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Upload size={16} /> {t("complaints_submit")}
                    </>
                )}
              </button>
            </CardContent>
          </form>
        </Card>
      ) : (
        /* --- COMPLAINT HISTORY --- */
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground">Fetching your reports...</p>
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-muted-foreground/40" />
              </div>
              <p className="text-sm font-semibold text-foreground">No reports found</p>
              <p className="text-xs text-muted-foreground">File a new report to see it here.</p>
            </div>
          ) : complaints.map((complaint) => (
            <Card key={complaint.id}
              onClick={() => setSelectedComplaint(complaint)}
              className={cn("border bg-card shadow-sm rounded-3xl cursor-pointer transition-all hover:shadow-md",
                selectedComplaint?.id === complaint.id ? "border-primary/40" : "border-border"
              )}>
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image */}
                  <div className="relative w-24 h-full min-h-[120px] flex-shrink-0 rounded-l-3xl overflow-hidden">
                    {complaint.image_url ? (
                      <NextImage src={complaint.image_url} alt={complaint.type} fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ImageIcon size={20} className="text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">{complaint.id}</p>
                        <p className="text-sm font-bold text-foreground">{complaint.type}</p>
                      </div>
                      <Badge className={cn("text-[10px] border-none rounded-xl px-2 py-0.5 font-semibold flex-shrink-0",
                        complaint.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        complaint.status === "In Progress" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                        "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      )}>
                        {complaint.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={10} className="text-muted-foreground" />
                      <p className="text-[11px] text-muted-foreground">{complaint.location_name}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex gap-1">
                      {STATUS_STEPS.map((_, i) => (
                        <div key={i} className={cn("flex-1 h-1 rounded-full transition-all",
                          i <= (complaint.status_idx || 0) ? "bg-primary" : "bg-muted"
                        )} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">{STATUS_STEPS[complaint.status_idx || 0]}</span>
                      {complaint.ai_validated && (
                        <div className="flex items-center gap-1">
                          <ShieldCheck size={10} className="text-primary" />
                          <span className="text-[10px] text-primary font-semibold">AI Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {selectedComplaint?.id === complaint.id && (
                  <div className="border-t border-border mx-4 pt-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/40 rounded-2xl">
                        <p className="text-[10px] text-muted-foreground">Assigned To</p>
                        <p className="text-xs font-semibold text-foreground mt-1">{complaint.assigned_to || "Awaiting Assignment"}</p>
                      </div>
                      <div className="p-3 bg-muted/40 rounded-2xl">
                        <p className="text-[10px] text-muted-foreground">Resolution ETA</p>
                        <p className="text-xs font-semibold text-foreground mt-1">{complaint.expected_resolution || "Pending Review"}</p>
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</p>
                      {STATUS_STEPS.slice(0, (complaint.status_idx || 0) + 1).map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={11} className="text-primary" />
                          </div>
                          <p className="text-xs text-foreground font-medium">{step}</p>
                        </div>
                      ))}
                      {STATUS_STEPS.slice((complaint.status_idx || 0) + 1).map((step, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-40">
                          <div className="w-5 h-5 rounded-full border border-border flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
