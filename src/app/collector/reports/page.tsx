"use client"

import { motion } from "framer-motion"
import { FileText, Download, Calendar, Filter, CheckCircle2, Search } from "lucide-react"

const mockReports = [
  { id: "REP-9821", date: "May 13, 2026", shift: "Morning", totalBins: 24, totalWeight: "450 KG", status: "Verified" },
  { id: "REP-9820", date: "May 12, 2026", shift: "Evening", totalBins: 18, totalWeight: "320 KG", status: "Verified" },
  { id: "REP-9819", date: "May 12, 2026", shift: "Morning", totalBins: 22, totalWeight: "410 KG", status: "Verified" },
  { id: "REP-9818", date: "May 11, 2026", shift: "Evening", totalBins: 15, totalWeight: "280 KG", status: "Verified" },
]

export default function CollectorReports() {
  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">Collection Logs</h1>
          <p className="text-sm font-medium text-muted-foreground">View and export your daily shift reports.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search report ID..." 
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <Calendar size={14} /> Date
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-card/40 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden">
        {/* Table Header (Hidden on mobile) */}
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="col-span-1">Report ID</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Shift</div>
          <div className="col-span-1 text-center">Bins Collected</div>
          <div className="col-span-1 text-right">Total Weight</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-border">
          {mockReports.map((report, index) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 md:p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                <div className="col-span-1 flex items-center gap-2">
                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                    <FileText size={14} />
                  </div>
                  <span className="text-sm font-bold">{report.id}</span>
                </div>
                <div className="col-span-1 text-sm font-medium text-muted-foreground">{report.date}</div>
                <div className="col-span-1 text-xs font-bold uppercase tracking-widest">{report.shift}</div>
                <div className="col-span-1 text-center font-black">{report.totalBins}</div>
                <div className="col-span-1 text-right font-black text-primary">{report.totalWeight}</div>
                <div className="col-span-1 flex justify-end">
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={10} strokeWidth={3} /> {report.status}
                  </span>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                      <FileText size={14} />
                    </div>
                    <span className="text-sm font-bold">{report.id}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={10} strokeWidth={3} /> {report.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-background rounded-lg border border-border">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Date & Shift</p>
                    <p className="font-medium">{report.date} ({report.shift})</p>
                  </div>
                  <div className="p-2 bg-background rounded-lg border border-border">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Total Weight</p>
                    <p className="font-black text-primary">{report.totalWeight}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
